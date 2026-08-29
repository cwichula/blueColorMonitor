/* docs/v2/i18n/pt.js — słownik WERSJI 2, portugalski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/pt.js. Kolejność
 * jest treścią umowy: ten plik dokłada się do tego samego obiektu, więc może
 * nadpisać dowolny klucz warstwy wspólnej — i tylko w tę stronę.
 *
 * CO TU JEST: wszystko, co opisuje UKŁAD tej wersji — nazwy pięciu zakładek,
 * dziewięciu ekranów nakładkowych, siedmiu narzędzi, podpisy przycisków,
 * komunikaty i zdania kreatorów. Nazwy i opisy siedmiu wielkości, strefy,
 * jednostki, zastrzeżenie medyczne i prywatność leżą w warstwie wspólnej i tu
 * ich NIE MA — poza wyjątkami wypisanymi niżej.
 *
 * SKĄD TE ZDANIA: przekład z polskiego (pl.js jest redakcją pierwotną), przy
 * czym terminologia siedmiu wielkości i rejestr idą za docs/shared/i18n/pt.js:
 * proporção de azul, brilho da cena, temperatura de cor, impacto circadiano,
 * cintilação, uniformidade, conforto visual. Klucze *.nameLower to te same
 * nazwy małą literą, bo stoją w środku zdania. Wariant ogólny 'pt' z przewagą
 * użycia brazylijskiego — tak samo jak w warstwie wspólnej i w słowniku v5.
 * Zastrzeżenia medyczne i akapity o prywatności przetłumaczone DOKŁADNIE, bez
 * osłabiania i bez dodawania obietnic — to zdania o skutkach prawnych.
 *
 * „Start” i „Stop” na przyciskach zostają po angielsku: warstwa wspólna
 * (engine.idle) cytuje napis „Start” wprost, więc przetłumaczenie go tutaj
 * rozjechałoby zdanie z przyciskiem.
 *
 * LICZEBNIKI: portugalski ma trzy kategorie CLDR — one, many i other. Forma
 * 'many' nie jest „dużą liczbą” w potocznym sensie: sięga po nią
 * Intl.PluralRules przy milionach i zapisie wykładniczym, gdzie portugalski
 * wymaga przyimka („um milhão DE leituras”). Dlatego stoi w niej „de”.
 *
 * NADPISANIA WARSTWY WSPÓLNEJ (i dlaczego):
 *   'zone.warning'        — wspólne mówi „Atenção”, ta wersja od zawsze mówi
 *                           mocniej: „Alerta” (i „Alertas” w podsumowaniu);
 *   'zone.spoken.warning' — to samo słowo dla czytnika ekranu;
 *   'privacy.external', 'privacy.externalPending' — ta wersja nazywa Buy Me
 *                           a Coffee wprost, bo walidacja adresu w support.js
 *                           nie przepuszcza żadnego innego serwisu i mówi „As medições”,
 *                           a nie „A medição”.
 *
 * ZASADY: klucze kropkowane po angielsku, wstawki '{nazwa}' identyczne we
 * wszystkich językach, liczba mnoga jako obiekt form CLDR rozstrzygany przez
 * Intl.PluralRules. Patrz nagłówek docs/shared/i18n.js.
 */
window.I18nData = window.I18nData || {};
window.I18nData['pt'] = Object.assign(window.I18nData['pt'] || {}, {

  /* ==================================================================
     Powłoka: pasek górny, zakładki, tytuł dokumentu
     ================================================================== */

  'app.documentTitle': 'Monitor de Luz — medição da luz azul',
  'app.description': 'Monitor de Luz — medição da proporção de luz azul com a câmera do telefone. Sete métricas, gráfico e histórico. Tudo disponível, sem conta e sem pagamento.',
  'app.skipToContent': 'Ir para o conteúdo',
  'app.measuring': 'Medindo',
  'app.docsButton': 'Documentação e explicações',
  /* Numer wersji to nie tłumaczenie, ale zdanie wokół niego już tak. */
  'app.version': '{app} — versão 2',

  'nav.aria': 'Navegação principal',
  'nav.tablistAria': 'Telas da aplicação',
  'nav.measure': 'Medir',
  'nav.history': 'Histórico',
  'nav.tools': 'Ferramentas',
  'nav.support': 'Apoio',
  'nav.more': 'Mais',

  /* Dziewięć ekranów nakładkowych. Ta sama nazwa stoi w nagłówku ekranu,
     w ogłoszeniu dla czytnika ekranu i w wierszu listy narzędzi. */
  'panel.docs': 'Documentação',
  'panel.thresholds': 'Limiares e perfis',
  'panel.reports': 'Relatórios',
  'panel.export': 'Exportação de dados',
  'panel.compare': 'Comparação A/B',
  'panel.calibration': 'Calibração com papel branco',
  'panel.screenCheck': 'Verificar meu monitor',
  'panel.schedule': 'Programação',
  'panel.alerts': 'Alertas de exposição',

  /* ==================================================================
     Czasowniki wspólne dla wielu ekranów
     ================================================================== */

  'action.back': 'Voltar',
  'action.close': 'Fechar',
  'action.refresh': 'Atualizar',
  'action.apply': 'Aplicar',
  'action.delete': 'Excluir',
  'action.hide': 'Ocultar',
  'action.start': 'Start',
  'action.stop': 'Stop',
  'action.switch': 'Trocar',
  'action.switchAria': 'Trocar de câmera: frontal ou traseira',
  'action.resetDefaults': 'Restaurar padrão',
  'action.reports': 'Relatórios',
  'action.exportCsv': 'Exportar CSV',

  /* ==================================================================
     Zdania mówione przez czytnik ekranu
     ==================================================================
     Osobne klucze, bo to nie są te same zdania co napisy na ekranie:
     czytnik dostaje zdanie skończone, przycisk — etykietę. */

  'a11y.screenAnnounce': 'Tela: {name}',
  'a11y.measureStarted': 'Medição iniciada.',
  'a11y.measureStopped': 'Medição parada.',
  'a11y.measureStoppedSummary': 'Medição parada. Tempo: {duration}, {samples}.',
  'a11y.zoneAnnounce': '{name}: {zone}, {value} {unit}',
  'a11y.profileApplied': 'Perfil de limiares aplicado.',

  /* ==================================================================
     Arkusze: potwierdzenie i pomoc do wielkości
     ================================================================== */

  'dialog.title': 'Confirmação',
  'dialog.confirm': 'Confirmar',
  'dialog.cancel': 'Cancelar',
  'dialog.infoTitle': 'Informação',
  'dialog.ok': 'Entendi',

  'help.sheetTitle': 'Sobre esta métrica',
  'help.unit': 'Unidade',
  'help.scaleRange': 'Faixa da escala',

  /* ==================================================================
     Progi
     ==================================================================
     Cztery napisy, które w wielu językach brzmią podobnie i dlatego mają
     osobne klucze: podpis suwaka, podpis legendy wykresu i dwie etykiety dla
     czytnika ekranu. Te ostatnie są osobnymi zdaniami, a nie nazwą
     przepuszczoną przez toLowerCase() — po niemiecku rzeczownik w środku zdania
     zostaje wielką literą i taka „drobna wygoda” zepsułaby tam każdą etykietę. */

  'threshold.warn': 'Alerta',
  'threshold.crit': 'Crítico',
  'threshold.warnLabel': 'Limiar de alerta',
  'threshold.critLabel': 'Limiar crítico',
  'threshold.warnAria': '{name} — limiar: alerta',
  'threshold.critAria': '{name} — limiar: crítico',

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

  'firstRun.title': 'Como medir',
  'firstRun.text': 'Pressione “Start”, aponte o telefone para uma superfície iluminada e segure-o parado por alguns segundos. A mira na prévia mostra o trecho que a aplicação realmente lê.',
  'firstRun.close': 'Fechar a dica',

  'camera.live': 'AO VIVO',
  'camera.idle': 'A câmera está desligada. Pressione “Start”, aponte o telefone para uma superfície iluminada e segure-o parado por alguns segundos.',
  'camera.stopped': 'Medição parada. Pressione “Start” para medir de novo.',

  'error.cameraStart': 'Não foi possível ligar a câmera.',
  'error.engineMissing': 'O módulo de medição não foi carregado.',

  'metrics.sevenTitle': 'Sete métricas',
  'measure.tilesSub': 'Atualizadas 5 vezes por segundo',

  'session.title': 'Esta sessão',
  'session.duration': 'Tempo de medição',
  'session.samples': 'Amostras',

  /* Nagłówki liczników stref — liczba mnoga rzeczownika, nie nazwa strefy.
     „Alertas” to nie to samo słowo co „Alerta” pod suwakiem. */
  'zone.count.good': 'Dentro do normal',
  'zone.count.warning': 'Alertas',
  'zone.count.critical': 'Críticos',

  'note.calibrated': 'Medição calibrada com papel branco — os canais estão nivelados.',

  'tile.helpAria': 'O que isto significa: {name}',
  'tile.noMeasurement': 'Sem medição',
  'tile.outOfScale': 'Fora da escala',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'zone.warning': 'Alerta',
  'zone.spoken.warning': 'alerta',

  /* ==================================================================
     Ekran Historia: wykres i tabela
     ================================================================== */

  'history.title': 'Ao longo do tempo',
  'history.pickHint': 'Escolha uma métrica e um intervalo',
  'history.metricLabel': 'Métrica',
  'history.rangeAria': 'Intervalo de tempo do gráfico',
  'history.emptyTitle': 'Sem dados neste intervalo',
  'history.emptyText': 'Comece a medir na tela Medir — o gráfico se enche em poucos segundos.',
  'history.tableTitle': 'Últimas leituras',
  'history.tableHide': 'Ocultar a tabela',
  'history.tableShow': 'Mostrar a tabela',
  'history.tableCaption': 'As últimas leituras da medição, a mais recente no topo.',
  'history.tableEmpty': 'Sem leituras. Comece a medir na tela Medir.',

  'table.time': 'Hora',
  'table.metric': 'Métrica',

  /* Skróty jednostek czasu na pięcioprzyciskowym przełączniku. Bez kropek:
     dłuższy zapis łamał się na dwie linie. */
  'range.1m': '1 min',
  'range.1h': '1 h',
  'range.24h': '24 h',
  'range.7d': '7 dias',
  'range.30d': '30 dias',

  'chart.now': 'agora',
  'chart.countSub': {
    one: '{n} leitura no intervalo escolhido',
    many: '{n} de leituras no intervalo escolhido',
    other: '{n} leituras no intervalo escolhido'
  },
  'chart.aria': '{name}, intervalo {range}, {count}, último valor {value} {unit}.',
  'chart.ariaZone': '{name}, intervalo {range}, {count}, último valor {value} {unit}, zona: {zone}.',
  'chart.ariaEmpty': '{name} — sem dados no intervalo {range}.',

  /* ==================================================================
     Ekran Narzędzia
     ================================================================== */

  'tools.sub': 'Assistentes e recursos auxiliares',
  'tools.note': 'As ferramentas ajudam a interpretar a medição. Todas estão disponíveis de imediato, e a medição em si funciona independentemente delas.',

  'tool.thresholds.sub': 'Quando um valor deve acender um alerta',
  'tool.compare.sub': 'Qual das duas luzes é mais suave',
  'tool.calibration.sub': 'O único recurso que realmente aumenta a precisão',
  'tool.screenCheck.sub': 'Cinco passos e uma conclusão pronta sobre a tela',
  /* Wiersz listy nazywa się inaczej niż sam ekran: „Programação de limiares”
     kontra „Programação”. Tak było i tak zostaje. */
  'tool.schedule.title': 'Programação de limiares',
  'tool.schedule.sub': 'Outros limiares à noite, sem precisar lembrar',
  'tool.alerts.sub': 'Um sinal quando a zona crítica dura tempo demais',

  /* ==================================================================
     Ekran Więcej: ustawienia, wygląd, dane
     ================================================================== */

  'more.settingsTitle': 'Configurações',
  'more.thresholdsSub': 'Quando um valor deve acender um alerta',
  'more.docsSub': 'Como medir e o que esta medição não diz',
  'more.appearanceTitle': 'Aparência e acessibilidade',

  'settings.theme': 'Tema',
  'theme.auto': 'Seguir o sistema',
  'theme.light': 'Claro',
  'theme.dark': 'Escuro',

  'settings.textScale': 'Tamanho do texto',
  'textScale.100': 'Padrão',
  'textScale.115': 'Maior (115%)',
  'textScale.130': 'Máximo (130%)',

  'settings.contrast': 'Contraste mais alto',
  'settings.contrastSub': 'Bordas mais fortes e texto secundário mais escuro.',
  'settings.sound': 'Som dos alertas',
  'settings.soundSub': 'Um sinal curto quando um alerta de exposição é acionado.',
  'settings.vibrate': 'Vibração nos alertas',
  'settings.vibrateSub': 'Funciona apenas em dispositivos que a suportam.',

  'more.dataTitle': 'Dados',
  'more.clearHistory': 'Limpar o histórico de medições',
  'more.clearHistorySub': 'Apaga as leituras guardadas neste dispositivo. Os limiares, os perfis e as configurações ficam.',

  /* Zdanie i odsyłacz są osobno, bo przyciskiem jest tylko druga połowa. */
  'more.freeLine': 'A aplicação é gratuita por inteiro. ',
  'more.supportLink': 'Você pode apoiá-la voluntariamente.',

  'dialog.clearHistory.title': 'Apagar o histórico guardado?',
  'dialog.clearHistory.body': {
    one: 'Vamos apagar {n} ponto de medição guardado neste dispositivo. Isso não pode ser desfeito. Os limiares, os perfis e as configurações ficam intactos.',
    many: 'Vamos apagar {n} de pontos de medição guardados neste dispositivo. Isso não pode ser desfeito. Os limiares, os perfis e as configurações ficam intactos.',
    other: 'Vamos apagar {n} pontos de medição guardados neste dispositivo. Isso não pode ser desfeito. Os limiares, os perfis e as configurações ficam intactos.'
  },
  'dialog.clearHistory.confirm': 'Apagar o histórico',
  'dialog.clearHistory.cancel': 'Manter',

  'toast.historyCleared': 'Histórico de medições apagado.',
  'toast.screenUnavailable': 'Esta tela ainda não está disponível nesta versão.',

  /* ==================================================================
     Ekran Dokumentacja
     ==================================================================
     Trzy z czterech kroków „jak mierzyć” leżą w warstwie wspólnej
     (note.howTo.hold / aim / compare); czwarty jest tylko tutaj. */

  'docs.leadTitle': 'O que esta aplicação mede',
  'docs.leadText': 'A câmera do telefone olha para uma superfície iluminada, e cinco vezes por segundo a aplicação calcula a média dos canais R, G e B do trecho central do quadro. Desses três números ela deriva sete métricas.',
  'docs.limitsTitle': 'Os limites do método',
  'docs.limitsText': 'A câmera tem três canais de cor largos, exposição automática e balanço de branco automático. Ela não mede o espectro e não conhece valores absolutos, por isso o brilho é um indicador relativo, e não lux. A temperatura de cor e o impacto circadiano são aproximações calculadas a partir das cores sRGB. A amostragem a {rate} Hz só vê cintilação abaixo de {limit} Hz — os 100 Hz da rede elétrica estão fora do alcance e a aplicação nunca os apresentará como resultado.',

  'note.howTo.repeat.title': 'Repita a medição',
  'note.howTo.repeat.text': 'Uma leitura isolada é um instantâneo. Uma dúzia de segundos de medição dá uma imagem mais confiável.',

  'docs.scale': 'Escala',
  'docs.direction': 'Direção',
  'docs.directionHigher': 'Mais alto é melhor',
  'docs.directionLower': 'Mais baixo é mais suave',
  'docs.privacyTitle': 'Dados e privacidade',
  'docs.privacyText': 'A imagem da câmera não é enviada nem guardada em lugar nenhum — de cada quadro ficam apenas três números. As medições, os limiares e as configurações ficam na memória do navegador neste dispositivo. A aplicação não faz nenhuma requisição de rede e funciona offline.',
  'docs.freeLine': 'As sete métricas, o histórico, o gráfico, as ferramentas e o modo offline funcionam para todos, sem conta e sem pagamento.',

  /* ==================================================================
     Ekran Wsparcie
     ================================================================== */

  'support.heroTitle': 'Está tudo disponível',
  'support.heroText': 'As sete métricas, o histórico de medições, o gráfico, todas as ferramentas e o modo offline funcionam para todos, de imediato. Sem conta, sem limites e sem pagamento.',
  'support.whyTitle': 'Por que estou pedindo',
  'support.whyText': '{app} é feito nas horas vagas e não ganha nada de ninguém: não tem publicidade, não coleta dados e não tem nada para vender. Manter a aplicação e levá-la adiante — novas métricas, correções, testes em mais telefones — custa tempo. Se ela foi útil para você, pode contribuir. Não precisa.',
  'support.whatTitle': 'O que a doação dá',
  'support.whatText': 'Nada. Ela realmente não desbloqueia nada e não acelera nada — a aplicação tem exatamente a mesma aparência e o mesmo funcionamento antes e depois dela. Dá apenas isto: o autor fica sabendo que este trabalho serviu para alguém.',
  'support.button': 'Me pague um café',
  'support.pendingTitle': 'O perfil ainda não está conectado',
  'support.pendingText': 'Ainda não há aqui um endereço para onde enviar apoio. Ele aparecerá neste lugar quando estiver pronto — até lá, tudo na aplicação funciona exatamente igual.',

  /* Nadpisania warstwy wspólnej — patrz nagłówek pliku. */
  'privacy.external': 'O botão abre a página externa do Buy Me a Coffee numa nova aba. Esse é o único momento em que alguma coisa sai deste dispositivo — e só acontece depois de você clicar. As medições, o histórico e as configurações ficam aqui.',
  'privacy.externalPending': 'Quando o endereço existir, o clique abrirá uma página externa numa nova aba. Esse será o único momento em que alguma coisa sai deste dispositivo. As medições, o histórico e as configurações ficam aqui.',

  /* ==================================================================
     Spis startowy (boot.js)
     ==================================================================
     Komunikat o niekompletnym wczytaniu jest jedynym miejscem, w którym
     aplikacja mówi o swoich własnych plikach. Nazwy plików są danymi, nie
     tłumaczeniem — poza jednym nawiasem, który jest zdaniem. */

  'boot.file.bus': '../shared/bus.js (reserva em ui-core.js)',
  'boot.need.metrics': 'nenhum valor será calculado',
  'boot.need.bus': 'os módulos deixarão de se ver',
  'boot.need.ui': 'não dá para trocar de tela',
  'boot.need.engine': 'a câmera e a medição não vão começar',
  'boot.need.support': 'a tela Apoio ficará vazia',
  'boot.need.tools': 'a aba Ferramentas ficará vazia',
  'boot.missingItem': '{file} — {effect}',
  'boot.missing': 'Estes módulos não foram carregados: {list}.',
  'boot.consoleHint': 'Verifique a ordem e os caminhos das tags <script> em index.html.',
  'boot.incompleteTitle': 'A aplicação carregou de forma incompleta',
  'boot.incompleteText': '{missing} Recarregue a página; se isso não ajudar, os arquivos no servidor estão incompletos.',
  'boot.newVersion': 'Há uma nova versão da aplicação.',

  /* ==================================================================
     Narzędzie 1: Progi i profile
     ================================================================== */

  'thresholds.noteTitle': 'O que os limiares fazem. ',
  'thresholds.noteText': 'O limiar de alerta acende o estado amarelo; o limiar crítico, o vermelho. A mudança vale de imediato — inclusive para a leitura que já está na tela. Você pode guardar o seu próprio conjunto de limiares com um nome e voltar a ele quando quiser.',
  'thresholds.profilesTitle': 'Perfis de limiares',
  'thresholds.profilesSub': 'Os três integrados e os seus',
  'thresholds.customName': 'Nome do seu perfil',
  'thresholds.customPlaceholder': 'por exemplo Quarto à noite',
  'thresholds.save': 'Salvar os limiares atuais',
  'thresholds.saveHelp': 'Salva exatamente os limiares definidos acima.',

  'profile.builtin.default.name': 'Padrão',
  'profile.builtin.default.desc': 'Os limiares do catálogo de métricas — o ponto de partida para todas as medições.',
  'profile.builtin.evening.name': 'Noite — suave',
  'profile.builtin.evening.desc': 'Avisa mais cedo sobre a cor fria e o impacto circadiano.',
  'profile.builtin.work.name': 'Trabalho na mesa',
  'profile.builtin.work.desc': 'Admite luz do dia clara e fria; fica de olho na cintilação e na uniformidade.',
  'profile.custom.desc': 'Perfil próprio salvo em {date}.',

  'toast.thresholdsReset': 'Limiares padrão restaurados.',
  'toast.thresholdOrder': 'O limiar de alerta precisa ser menor que o crítico.',
  'toast.thresholdOrderInverted': 'Para esta métrica, o limiar de alerta precisa ser maior que o crítico.',
  'toast.profileNameMissing': 'Digite um nome para o perfil.',
  'toast.profileSaved': 'Perfil “{name}” salvo.',
  'toast.profileApplied': 'Perfil “{name}” aplicado.',
  'toast.profileApplyFailed': 'Não foi possível aplicar este perfil.',
  'toast.profileRemoved': 'Perfil excluído.',

  /* ==================================================================
     Narzędzie 2: Harmonogram
     ================================================================== */

  'schedule.noteTitle': 'Para que serve a programação. ',
  'schedule.noteText': 'À noite fazem sentido limiares diferentes dos do meio-dia. Uma regra “de–até” troca o perfil sozinha, para que não seja preciso lembrar disso. A programação nunca inicia nem para uma medição.',
  'schedule.toggle': 'Ligar a troca automática',
  'schedule.toggleSub': 'Verificada a cada minuto no relógio do dispositivo.',
  'schedule.emptyTitle': 'Sem regras',
  'schedule.emptyText': 'Adicione a primeira regra com o botão abaixo.',
  'schedule.add': 'Adicionar regra',
  'schedule.to': 'até',
  'schedule.profile': 'Perfil',
  'schedule.fromAria': 'Regra {n}: hora de início',
  'schedule.toAria': 'Regra {n}: hora de término',
  'toast.scheduleTimeFormat': 'Informe as horas no formato 22:00.',
  'toast.scheduleEnded': 'A programação terminou — os limiares anteriores voltaram.',
  'toast.scheduleApplied': 'A programação ativou o perfil “{name}”.',

  /* ==================================================================
     Narzędzie 3: Alerty ekspozycji
     ================================================================== */

  'alerts.noteTitle': 'O que o alerta faz. ',
  'alerts.noteText': 'Ele fica de olho em uma métrica e só se manifesta quando ela mantém a zona escolhida sem interrupção pelo tempo definido. Nunca para a medição e nunca cobre os botões.',
  'alerts.toggle': 'Ligar os alertas de exposição',
  'alerts.toggleSub': 'Funcionam apenas durante uma medição em andamento.',
  'alerts.metric': 'Métrica vigiada',
  'alerts.level': 'A partir de que zona',
  'alerts.level.warning': 'De alerta para cima',
  'alerts.level.critical': 'Somente crítica',
  'alerts.sustain': 'Depois de quantos segundos sem interrupção',
  'alerts.sustainHelp': 'Tempos mais curtos dão mais alarmes falsos quando você mexe no telefone.',
  'alerts.sound': 'Um sinal sonoro curto',
  'alerts.soundSub': 'O som é gerado localmente. Também dá para desligá-lo globalmente na tela Mais.',
  'alerts.barTitle': 'Alerta de exposição',
  /* Dwa osobne zdania zamiast wklejania nazwy strefy w środek jednego:
     po polsku strefa stoi tu w bierniku, a w wielu językach szyk jest inny. */
  'alerts.message.warning': '{name} mantém a zona de alerta há {seconds} s — agora {value} {unit}.',
  'alerts.message.critical': '{name} mantém a zona crítica há {seconds} s — agora {value} {unit}.',

  /* ==================================================================
     Narzędzie 4: Porównywarka A/B
     ================================================================== */

  'compare.noteTitle': 'Como comparar. ',
  'compare.noteText': 'Comece a medir, aponte a câmera para a primeira fonte e salve-a como A. Sem mudar a distância nem o ângulo, troque a luz e salve B. A comparação só faz sentido se a cena for a mesma.',
  'compare.slotA': 'Luz A',
  'compare.slotB': 'Luz B',
  'compare.save': 'Salvar a leitura atual',
  'compare.savedAt': 'Salvo em {date}, {time}',
  'compare.empty': 'Nada salvo ainda.',
  'compare.verdictTitle': 'Resultado da comparação',
  'compare.verdictEmpty': 'Salve as duas luzes para ver qual delas é mais suave.',
  'compare.notEnough': 'Dados insuficientes para comparar estas duas medições.',
  'compare.tie': 'As duas fontes saem praticamente iguais ({metric}: {a} e {b} {unit}). A diferença cabe no ruído da medição.',
  'compare.betterA': 'A luz A é a mais suave — {metric} é {better} {unit} contra {worse} {unit}.',
  'compare.betterB': 'A luz B é a mais suave — {metric} é {better} {unit} contra {worse} {unit}.',
  'compare.clear': 'Limpar a comparação',
  'toast.compareSavedA': 'Luz A salva.',
  'toast.compareSavedB': 'Luz B salva.',
  'toast.compareCleared': 'Comparação limpa.',
  'toast.measureFirst': 'Primeiro comece a medir na tela Medir.',

  /* Nazwa wielkości w środku zdania. Po portugalsku małą literą, po niemiecku
     wielką — dlatego osobne klucze, a nie toLowerCase() na nazwie. */
  'metric.share.nameLower': 'proporção de azul',
  'metric.brightness.nameLower': 'brilho da cena',
  'metric.kelvin.nameLower': 'temperatura de cor',
  'metric.melanopic.nameLower': 'impacto circadiano',
  'metric.flicker.nameLower': 'cintilação',
  'metric.uniformity.nameLower': 'uniformidade',
  'metric.comfort.nameLower': 'conforto visual',

  /* ==================================================================
     Narzędzie 5: Kalibracja białą kartką
     ================================================================== */

  'calib.noteTitle': 'Por que isto funciona. ',
  'calib.noteText': 'O sensor da câmera tem um desvio fixo entre os canais. Medir uma folha de papel branca mostra o tamanho desse desvio e permite subtraí-lo. É o único recurso desta aplicação que realmente aumenta a precisão — e ainda assim não transforma a câmera num espectrômetro.',
  'calib.step1': 'Coloque uma folha de papel branca sob a luz medida',
  'calib.step2': 'Comece a medir e preencha o quadro com o papel',
  'calib.step3': 'Pressione “Calibrar” e não mexa no telefone por 3 segundos',
  'calib.done': 'Calibrado em {date}, {time}.',
  'calib.none': 'Sem calibração. A medição funciona; trate os valores como comparativos.',
  'calib.gain': 'Ganho {channel}',
  'calib.gainsLabel': 'Ganhos dos canais',
  'calib.gainsUnset': 'não definidos',
  'calib.start': 'Calibrar (3 s)',
  'calib.clear': 'Excluir a calibração',
  'toast.calibCleared': 'Calibração excluída.',
  'calib.error.noEngine': 'O módulo de medição não está disponível.',
  'calib.error.notRunning': 'Comece a medir primeiro e aponte a câmera para uma folha de papel branca.',
  'calib.error.busy': 'A calibração já está em andamento.',
  'calib.error.tooFewSamples': 'Amostras insuficientes. Verifique se a medição está mesmo funcionando.',
  'calib.error.tooDark': 'A imagem está escura demais para calibrar. Ilumine melhor o papel e tente de novo.',
  'calib.error.tooSkewed': 'O desvio entre os canais é grande demais para ser aceito como calibração. Use papel branco sob luz uniforme.',
  'calib.ok': 'Calibrado. A temperatura de cor e o impacto circadiano ficarão mais precisos agora.',

  /* ==================================================================
     Narzędzie 6: Sprawdź mój monitor
     ================================================================== */

  'screencheck.noteTitle': 'Para que isto serve. ',
  'screencheck.noteText': 'Cinco passos verificam um monitor do jeito que uma análise o verifica: o branco em dois níveis de brilho, a uniformidade da luz de fundo e se o modo noturno do sistema muda mesmo alguma coisa. O assistente lê uma medição em andamento; ele mesmo não inicia nenhuma.',
  'screencheck.step.white100.title': 'Branco no brilho máximo',
  'screencheck.step.white100.hint': 'Abra uma página branca no monitor, ponha o brilho no máximo e preencha o quadro com a tela.',
  'screencheck.step.white20.title': 'Branco em brilho baixo',
  'screencheck.step.white20.hint': 'Reduza o brilho do monitor para cerca de um quinto e não mude o enquadramento.',
  'screencheck.step.corners.title': 'Os cantos da tela',
  'screencheck.step.corners.hint': 'Volte ao brilho máximo e mostre a tela inteira à câmera — estamos verificando a uniformidade da luz de fundo.',
  'screencheck.step.nightOff.title': 'Modo noturno desligado',
  'screencheck.step.nightOff.hint': 'Certifique-se de que o filtro de luz azul está desligado.',
  'screencheck.step.nightOn.title': 'Modo noturno ligado',
  'screencheck.step.nightOn.hint': 'Ligue o filtro de luz azul do sistema e repita o mesmo enquadramento.',
  'screencheck.stepHeading': 'Passo {n} de {total}: {title}',
  'screencheck.idleTitle': 'O assistente não está em andamento',
  'screencheck.idleHint': 'Comece a medir na tela Medir, depois volte aqui e pressione “Iniciar”.',
  'screencheck.next': 'Salvar o passo e seguir',
  'screencheck.cancel': 'Interromper',
  'screencheck.start': 'Iniciar o assistente',
  'screencheck.clearResult': 'Limpar o resultado',
  'screencheck.resultTitle': 'Resultado',
  'screencheck.resultEmpty': 'Nenhum passo foi salvo ainda.',
  'screencheck.resultPartial': '{done} de {total} passos salvos. As conclusões aparecerão quando houver o que comparar.',
  'screencheck.note.uniformityLow': 'A uniformidade da luz de fundo é de {value}% — há diferenças claras de brilho no quadro.',
  'screencheck.note.uniformityOk': 'A luz de fundo é uniforme ({value}%).',
  'screencheck.note.nightWorks': 'O modo noturno reduz a proporção de azul em {value} pontos percentuais — funciona.',
  'screencheck.note.nightWeak': 'O modo noturno muda a proporção de azul em apenas {value} pontos percentuais. É menos do que um filtro do sistema costuma dar.',
  'screencheck.note.pwm': 'Em brilho baixo, a cintilação sobe de {from}% para {to}% — o sinal típico da regulação por pulsos (PWM).',
  'toast.screencheckDone': 'Assistente concluído. O resultado está abaixo.',

  /* ==================================================================
     Narzędzie 7: Raporty
     ================================================================== */

  'reports.noteTitle': 'De onde vêm estes números. ',
  'reports.noteText': 'O relatório é calculado a partir do histórico guardado neste dispositivo — um ponto a cada cinco segundos. O motor o recolhe desde a primeira medição, por isso o relatório fica pronto de imediato.',
  'reports.rangeAria': 'Intervalo do relatório',
  'reports.day': 'Últimas 24 horas',
  'reports.week': 'Últimos 7 dias',
  'reports.date': 'Relatório do dia {date}.',
  'report.headerDay': 'Dia de {from} a {to} — {count}.',
  'report.headerWeek': 'Semana de {from} a {to} — {count}.',
  'count.points': { one: '{n} ponto', many: '{n} de pontos', other: '{n} pontos' },
  'count.samples': { one: '{n} amostra', many: '{n} de amostras', other: '{n} amostras' },
  'report.emptyTitle': 'Sem dados neste período',
  'report.emptyText': 'Comece a medir na tela Medir — o histórico se guarda sozinho.',
  'report.colAvg': 'Média',
  'report.colMin': 'Mínimo',
  'report.colMax': 'Máximo',
  'report.zonesTitle': 'Distribuição das zonas',
  'report.worstHour': 'Pior hora do dia',
  'report.worstHourNone': 'nenhuma se destaca',
  'report.hour': '{hour}:00',
  'report.adviceTitle': 'O que fazer com isto',
  'report.disclaimerTitle': 'Isto não é um conselho de saúde. ',
  'report.disclaimerText': 'As conclusões decorrem exclusivamente do que a câmera deste telefone viu. A aplicação não mede o espectro, não conhece lux e não estabelece nenhum diagnóstico.',

  'advice.melanopic': 'O impacto circadiano médio foi de {value}×. À noite vale a pena descer abaixo de 0,50 — o mais simples é uma lâmpada mais quente ou o modo noturno.',
  'advice.kelvin': 'A luz estava fria ({value} K em média). Para trabalhar, é impecável; nas duas horas antes de dormir, abaixo de 3000 K é melhor.',
  'advice.flicker': 'Foi detectada cintilação perceptível ({value}% em média). Em geral, a culpa é de um regulador de intensidade barato ou da fonte da luz de fundo.',
  'advice.uniformity': 'A luz se distribui de modo irregular ({value}%). Mudar a luminária de lugar ou trocar o ângulo costuma render mais do que trocar a lâmpada.',
  'advice.worstHour': 'A pior hora do dia é {hour}:00 — é aí que se concentram mais leituras fora do normal.',
  'advice.none': 'Neste período nada se destaca fora do normal. O que mais renderia agora seria comparar duas fontes de luz na comparação A/B.',

  /* ==================================================================
     Narzędzie 8: Eksport CSV
     ================================================================== */

  'export.noteTitle': 'Formato do arquivo. ',
  'export.noteText': 'Ponto e vírgula como separador de colunas, vírgula como separador decimal, codificação UTF-8 com marca BOM. O Excel configurado para uma região que usa a vírgula como separador decimal abre um arquivo assim sem precisar de ajuste nenhum.',
  'export.range': 'Intervalo de dados',
  'export.columns': 'Colunas do arquivo',
  'export.chipFilled': ' — coluna preenchida',
  'export.help': 'O arquivo contém todas as sete colunas — o motor as calcula desde a primeira medição e todas elas vão para o arquivo.',
  'export.run': 'Salvar o arquivo CSV',
  'export.previewEmpty': 'Sem leituras neste intervalo. Comece a medir — o histórico se guarda sozinho.',
  'csv.range.hour': 'Última hora',
  'csv.range.day': 'Últimas 24 horas',
  'csv.range.week': 'Últimos 7 dias',
  'csv.range.month': 'Últimos 30 dias',
  'csv.colDate': 'Data',
  'csv.colTime': 'Hora',
  'csv.colZone': 'Zona',
  'csv.colMetric': '{name} [{unit}]',
  'toast.exportEmpty': 'Não há nenhuma leitura no intervalo escolhido.',
  'toast.exportFailed': 'Este navegador não permitiu salvar o arquivo.',
  'toast.exportSaved': {
    one: 'Arquivo {filename} salvo ({n} linha).',
    many: 'Arquivo {filename} salvo ({n} de linhas).',
    other: 'Arquivo {filename} salvo ({n} linhas).'
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
