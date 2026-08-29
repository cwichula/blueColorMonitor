/* Monitor Światła v5 — słownik portugalski (wariant brazylijski).
 *
 * Powstał z pl.js (treść) i z en.js (terminologia oraz rejestr). NIE JEST
 * KALKĄ żadnego z nich: polskie i angielskie zdania przełożono na naturalną
 * portugalszczyznę brazylijską. Zachowane zostało to, co niesie znaczenie:
 * liczby, progi, jednostki, nazwy wstawek i — co do treści — zastrzeżenia
 * medyczne oraz zdania o prywatności. Tych ostatnich nie wolno osłabiać ani
 * wzmacniać: „nie zastępuje rozmowy z lekarzem” i „obraz nie opuszcza
 * urządzenia” znaczą po portugalsku dokładnie tyle samo, ani mniej, ani więcej.
 *
 * WARIANT: brazylijski (pt-BR) — to on ma najwięcej użytkowników. Stąd „tela”
 * (nie „ecrã”), „aba” (nie „separador”), „aplicativo” (nie „aplicação”)
 * i „celular” (nie „telemóvel”).
 * REJESTR: bezpośrednie „você”, ciepło i wprost, jak w brazylijskich
 * aplikacjach użytkowych; „o senhor” brzmiałoby jak pismo urzędowe.
 * Cudzysłowy: “ … ”. Przecinek dziesiętny (1,00), znak % bez spacji (40%) —
 * tak formatuje `Intl` dla pt-BR.
 *
 * TERMINOLOGIA (trzymana bez wyjątków, także w zdaniach opisowych i pomocy):
 *   proporção de azul, brilho da cena, temperatura de cor, impacto circadiano
 *   (w opisie: fator melanópico), cintilação, uniformidade, conforto visual.
 * STREFY: seguro / moderado / prejudicial — mówią o świetle, a nie o stanie
 * aplikacji, i wchodzą w zdanie „zona: {zone}” tak samo jak polskie
 * „bezpiecznie / umiarkowanie / szkodliwie”.
 * POZOSTAŁE STAŁE ODPOWIEDNIKI: histórico (historia), sessão (sesja),
 * amostra (próbka), medição (pomiar), leitura (odczyt), métrica (wielkość),
 * limiar (próg), quadro (kadr), mostrador (wskaźnik).
 *
 * KSZTAŁT WPISU:
 *   'klucz.kropkowany': 'Texto com uma inserção {name}'   — napis zwykły,
 *   'klucz.kropkowany': { one, many, other }              — forma zależna od
 *                                                           liczby.
 * Portugalski ma w CLDR trzy formy: `one`, `many` i `other`. `many` obsługuje
 * wyłącznie okrągłe miliony („1 milhão de sessões”) i dlatego jest tu równy
 * `other` — słowo w obu wypadkach brzmi tak samo. Nazwy wstawek są identyczne
 * jak w pl.js — pilnuje tego keys.test.js. Kolejność wstawek w zdaniu wolno
 * zmieniać (i tak robimy w datach), nazwy — nigdy.
 */

export default {

  /* ───────────────────────────  Nawigacja i powłoka  ─────────────────────── */

  'app.name': 'Monitor de Luz',
  'app.description': 'Monitor de Luz — a câmera mede sete métricas da luz ao seu redor. Tudo é calculado neste dispositivo; nada sai para a rede.',
  /* Tytuł karty przeglądarki: nazwa ekranu i nazwa aplikacji. */
  'app.documentTitle': '{screen} — Monitor de Luz',
  'app.skipToContent': 'Ir para o conteúdo',
  'app.nav.aria': 'Navegação principal',
  'app.noscript.title': 'Este aplicativo precisa de JavaScript',
  'app.noscript.text': 'Toda a medição acontece dentro desta aba do navegador: é o JavaScript que lê os quadros da câmera e calcula com eles as sete métricas da luz. Sem ele, não há com o que medir. Ative o JavaScript para esta página e abra-a de novo — mesmo assim, nada será enviado para a rede.',

  'nav.measure': 'Medir',
  'nav.history': 'Histórico',
  'nav.tools': 'Ferramentas',
  'nav.support': 'Apoio',

  /* Wskaźnik trwającego pomiaru w górnym pasku. */
  'shell.live.label': 'Medindo',
  'shell.live.aria': 'Medindo. {metric}: {value}. Voltar para a tela de medição.',
  'shell.live.metricFallback': 'Métrica principal',
  'shell.action.fallback': 'Ação da tela',

  'shell.loadFail.title': 'Não foi possível carregar a tela “{screen}”',
  'shell.loadFail.text': 'Provavelmente faltam alguns arquivos na memória do dispositivo. Conecte-se à rede e recarregue a página.',
  'shell.fatal.title': 'Algo deu errado',
  'shell.fatal.text': 'O aplicativo não conseguiu montar a tela. Recarregar a página costuma bastar — as medições e as configurações salvas continuam onde estão.',
  'shell.fatal.reload': 'Recarregar a página',
  'shell.boot.failTitle': 'O aplicativo não conseguiu iniciar',
  'shell.boot.failText': 'A estrutura do aplicativo não iniciou. Recarregue a página — as medições e as configurações salvas continuam onde estão.',
  'shell.background.error': 'Algo quebrou em segundo plano',
  'shell.background.action': 'Recarregar',
  'shell.update.title': 'Há uma nova versão disponível',
  'shell.update.action': 'Recarregar',

  'onboarding.title': 'Antes de começar',
  'onboarding.lead': 'O Monitor de Luz usa a câmera para olhar a luz ao seu redor e calcula sete métricas a partir dela — da proporção de azul ao conforto visual.',
  'onboarding.privacy': 'A imagem nunca sai deste dispositivo: não há servidor, não há conta e não há nada para enviar. As sete métricas funcionam de imediato, sem login e sem pagamento.',
  'onboarding.honesty': 'Isto é uma orientação aproximada, não um instrumento de medição nem um exame médico. O que não dá para medir não é mostrado — no lugar do número você verá um traço.',
  'onboarding.start': 'Vamos começar',

  /* ─────────────────────  Nakładki: komunikat, arkusz, dialog  ───────────── */

  'overlay.toast.action': 'Aplicar',
  'overlay.toast.close': 'Dispensar mensagem',
  'overlay.sheet.label': 'Janela',
  'overlay.sheet.close': 'Fechar',
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

  'measure.title': 'Medição',

  'measure.intro.aria': 'Iniciar uma medição',
  'measure.intro.headline': 'Veja a luz que cai sobre você',
  'measure.intro.lead': 'A câmera mostra quanto azul há na luz que cai sobre você agora — e se, a esta hora do dia, é azul demais.',
  'measure.intro.start': 'Iniciar medição',
  'measure.intro.hint': 'O navegador vai pedir permissão para usar a câmera. A medição começa assim que você conceder.',
  'measure.intro.privacy': 'A imagem da câmera é processada neste dispositivo e nunca sai dele. Não enviamos, não salvamos e não compartilhamos nenhum quadro.',

  'measure.live.aria': 'Medição em andamento',
  'measure.badge.starting': 'Iniciando',
  'measure.badge.paused': 'Pausado',
  'measure.badge.running': 'Medindo',
  'measure.stale': 'Esperando a imagem — a prévia congela enquanto o aplicativo está em segundo plano.',
  'measure.crop': 'Medimos o centro do quadro — os {percent}% marcados da largura e da altura da imagem.',
  'measure.facing.front': 'câmera frontal',
  'measure.facing.back': 'câmera traseira',

  'measure.boot.title': 'Iniciando a câmera…',
  'measure.boot.text': 'Se o navegador pedir permissão, conceda — sem imagem não há o que medir. A permissão vale só para esta página e você pode revogá-la depois.',
  'measure.boot.cancel': 'Cancelar',

  'measure.hold': 'Leituras congeladas. A câmera continua funcionando, mas nada chega ao histórico nem às médias.',
  'measure.gridHint': 'Escolha um bloco para levar essa métrica ao mostrador grande.',

  'measure.stop': 'Parar',
  'measure.pause': 'Pausar',
  'measure.resume': 'Retomar',
  'measure.flip.aria': 'Trocar de câmera',
  'measure.flip.toBack': 'Mudar para a câmera traseira',
  'measure.flip.toFront': 'Mudar para a câmera frontal',

  'measure.fail.aria': 'Erro de câmera',
  'measure.fail.headline': 'A câmera não iniciou',
  'measure.fail.retry': 'Tentar de novo',
  'measure.fail.back': 'Voltar',
  'measure.fail.savedSession': 'A sessão anterior à interrupção ({duration}) foi salva no histórico.',
  'measure.error.fallback': 'Não foi possível iniciar a câmera.',

  'measure.summary.aria': 'Resumo da sessão',
  'measure.summary.title': 'Resumo da sessão',
  'measure.summary.paused': 'pausada por {duration}',
  'measure.summary.nothingMeasured': 'Nenhuma métrica registrou leitura — a câmera não viu luz durante a sessão inteira.',
  'measure.summary.note': 'As médias contam apenas as amostras feitas fora da pausa. As métricas que não chegaram a ser medidas ficam de fora, não entram como zero.',
  'measure.summary.nearThreshold': 'Mais perto do limiar',
  'measure.summary.worstPoint': 'Ponto mais fraco',
  'measure.summary.averageZone': '{zone} na média',
  'measure.summary.tooShort': 'A sessão durou {duration} — curta demais para entrar sozinha no histórico. Você pode salvá-la à mão.',
  'measure.summary.again': 'Medir de novo',
  'measure.summary.save': 'Salvar no histórico',
  'measure.summary.saved': 'Salva no histórico',
  'measure.summary.savedToast': 'Sessão salva no histórico.',
  'measure.summary.close': 'Fechar',

  'measure.method.title': 'Como medimos isto',
  'measure.method.p1': 'O aplicativo amostra a imagem da câmera dez vezes por segundo e calcula as métricas a partir dos {percent}% centrais do quadro — a mira na prévia marca exatamente essa área.',
  'measure.method.p2': 'A câmera de um celular tem três canais largos e ainda ajusta sozinha a exposição e o balanço de branco. Ela vê as proporções da luz, não o espectro dela.',
  'measure.method.p3': 'A proporção de azul, o brilho, a cintilação e a uniformidade são o que a câmera de fato mede. A temperatura de cor e o impacto circadiano são aproximações assumidas, calculadas a partir das primárias sRGB.',
  'measure.method.p4': 'A cintilação só aparece abaixo de quatro hertz. A cintilação da rede elétrica, de 100 Hz, está muito além do alcance desta amostragem e nunca será apresentada como leitura.',
  'measure.method.p5': 'Nenhum destes números é uma medição fotométrica nem um resultado médico. A imagem da câmera não sai do dispositivo.',
  'measure.method.ok': 'Entendi',

  /* Zdania dla czytnika ekranu — nie widać ich, ale są jedynym opisem stanu
     dla kogoś, kto nie patrzy na ekran. */
  'measure.announce.startCancelled': 'Inicialização da câmera cancelada.',
  'measure.announce.stoppedNoSamples': 'Medição parada. Nenhuma amostra foi coletada.',
  'measure.announce.stopped': 'Medição parada. O resumo da sessão está pronto.',
  'measure.announce.interrupted': 'Medição interrompida. O resumo da sessão está pronto.',
  'measure.announce.paused': 'Medição pausada. Leituras congeladas.',
  'measure.announce.resumed': 'Medição retomada.',
  'measure.announce.switchedFront': 'Trocou para a câmera frontal. Começa uma nova sessão.',
  'measure.announce.switchedBack': 'Trocou para a câmera traseira. Começa uma nova sessão.',
  'measure.announce.lead': 'Métrica principal: {metric}.',
  'measure.announce.cameraError': 'Erro de câmera. {message}',

  /* Zalecenia po sesji — jedno zdanie na wielkość, osobne na wieczór i na
     resztę dnia, bo ta sama liczba znaczy o 22:00 co innego niż o 11:00. */
  'measure.advice.good': 'A luz ficou na faixa segura durante a sessão inteira — deixe a luminária como está e confira de novo depois do anoitecer, quando outra fonte estiver acesa.',
  'measure.advice.share.evening': 'A proporção de azul ficou em {value} na média — ative o modo noturno nas telas e apague a luz do teto, deixando uma luminária quente na altura da mesa.',
  'measure.advice.share.day': 'A proporção de azul ficou em {value} na média — durante o dia isso é aceitável, mas programe a tela para passar sozinha ao modo quente duas horas antes de dormir.',
  'measure.advice.brightness': 'O quadro ficou superexposto ({value} na média) — afaste-se da fonte de luz ou reduza o brilho da tela que você está medindo, porque com essa exposição as outras métricas também perdem precisão.',
  'measure.advice.kelvin.evening': 'A temperatura de cor ficou em {value} na média — depois do anoitecer, desça abaixo de 3000 K: mude a luminária para o modo quente ou coloque uma lâmpada de 2700 K.',
  'measure.advice.kelvin.day': 'A temperatura de cor ficou em {value} na média — para o dia é um branco bom, que desperta, mas à noite ajuste essa mesma luminária para 2700 K.',
  'measure.advice.melanopic.evening': 'O impacto circadiano ficou em {value} na média — nas duas horas antes de dormir, desça abaixo de 0,50 ×, diminuindo a luz principal e iluminando da altura da mesa em vez do teto.',
  'measure.advice.melanopic.day': 'O impacto circadiano ficou em {value} na média — a esta hora essa dose ajuda, mas à noite troque essa fonte por uma mais fraca e mais quente.',
  'measure.advice.flicker': 'A cintilação chegou a {value} na média — em geral é um dimmer ou uma luz de fundo muito baixa: suba o brilho da tela acima de 40% ou troque o dimmer por um que não use PWM.',
  'measure.advice.uniformity': 'A luz caiu de forma desigual ({value} na média) — ponha a luminária de lado em relação à mesa e acrescente uma segunda fonte, mais fraca, do lado oposto, em vez de um único ponto forte.',
  'measure.advice.comfort': 'O conforto visual ficou em {value} na média — comece por uma única mudança: reduza pela metade o brilho da fonte principal e só depois cuide da cor da luz.',
  'measure.advice.default': 'Mude uma coisa na sua iluminação e meça de novo — comparar duas sessões diz mais do que uma leitura isolada.',

  /* ──────────────────────────────  Ekran historii  ───────────────────────── */

  'history.title': 'Histórico',
  'history.action.export': 'Exportar o histórico',

  'history.metricGroup.aria': 'Escolha da métrica',
  'history.announce.metric': 'Métrica: {metric}',
  'history.rangeGroup.aria': 'Intervalo de tempo',
  'history.range.aria': 'Últimos {range}',

  'history.stats.title': 'Estatísticas do intervalo',
  'history.stats.head': '{metric}\u00A0—\u00A0últimos {range}',
  'history.stats.note': 'Calculadas a partir do que o gráfico mostra. O tempo sem medição não entra na conta — não colocamos zero no lugar dele.',
  'history.stat.min': 'Mínimo',
  'history.stat.avg': 'Média',
  'history.stat.max': 'Máximo',
  'history.trend.up': 'subindo neste intervalo',
  'history.trend.flat': 'sem mudança clara',
  'history.trend.down': 'caindo neste intervalo',
  'history.trend.none': 'nada com que comparar',

  'history.sessions.title': 'Sessões de medição',
  'history.sessions.count': '{sessions}, da mais recente',
  'history.sessions.empty': 'Nenhuma sessão ainda',
  'history.sessions.hint': 'A sessão é salva quando você para a medição.',
  'history.session.desc': '{duration} · {samples} · {relative}',
  'history.session.spread': 'faixa: {range}',
  'history.session.noMeasure': 'nada medido',

  'history.data.title': 'Dados',
  'history.data.subtitle': 'O histórico fica guardado somente neste dispositivo.',
  'history.export.csv': 'Exportar CSV',
  'history.export.json': 'Exportar JSON',
  'history.export.ok': 'Arquivo pronto para salvar',
  'history.export.fail': 'Não foi possível preparar o arquivo. No modo privado, e em uma janela embutida em outro aplicativo, o navegador bloqueia o salvamento — abra a página em uma aba comum.',
  'history.export.sheet.title': 'Exportação do histórico',
  'history.export.sheet.text': 'O CSV abre em uma planilha (separado por ponto e vírgula, vírgula como marca decimal). O JSON guarda tudo, inclusive a lista de sessões e os trechos em que nada foi medido.',
  'history.export.sheet.csv': 'CSV',
  'history.export.sheet.json': 'JSON',

  'history.clear': 'Limpar o histórico',
  'history.clear.title': 'Limpar o histórico?',
  'history.clear.text': 'Vamos apagar {points} e {sessions}. Isso não pode ser desfeito — se quiser guardar os dados, exporte-os antes.',
  'history.clear.confirm': 'Limpar',
  'history.clear.announce': 'Histórico limpo.',
  'history.clear.toast': 'Histórico limpo',

  'history.empty.title': 'Ainda não há o que mostrar',
  'history.empty.text': 'O histórico se enche conforme você mede — um ponto por segundo. Tudo fica neste dispositivo.',
  'history.empty.action': 'Ir para a medição',

  /* Zakresy czasu wykresu — te same identyfikatory co history.RANGES. */
  'range.1m': '1 min',
  'range.5m': '5 min',
  'range.1h': '1 h',
  'range.24h': '24 h',
  'range.7d': '7 dias',
  'range.30d': '30 dias',

  /* Nagłówki eksportu CSV. */
  'export.csv.timestamp': 'Data e hora',
  'export.csv.column': '{metric} [{unit}]',

  /* Stan pamięci — ten sam komunikat w module historii i na dwóch ekranach. */
  'storage.full': 'A memória do dispositivo está cheia — novas medições não estão mais sendo salvas.',
  'storage.blocked': 'O navegador não permite salvar o histórico — os dados vão sumir quando você fechar a aba.',

  /* ─────────────────────────────  Ekran narzędzi  ────────────────────────── */

  'tools.title': 'Ferramentas',
  'tools.action.about': 'Sobre a medição',

  /* Karta języka. Stoi pierwsza, bo od niej zależy zrozumiałość wszystkich
     pozostałych ustawień. „Auto” znaczy tu to samo, co w motywie: decyduje
     urządzenie. Nazwy języków są endonimami i NIE tłumaczą się — mieszkają
     w js/i18n/index.js, nie w słownikach. */
  'tools.language.title': 'Idioma',
  'tools.language.subtitle': 'Por padrão, o aplicativo segue o idioma do dispositivo; a escolha nesta lista vale na hora e fica guardada neste navegador.',
  'tools.language.aria': 'Idioma da interface',
  'tools.language.system': 'Auto',
  'tools.language.announce': 'Idioma da interface: {language}.',

  'tools.appearance.title': 'Aparência',
  'tools.appearance.theme.title': 'Tema',
  'tools.appearance.theme.desc': '“Auto” segue a configuração do sistema.',
  'tools.appearance.theme.aria': 'Tema',
  'tools.theme.system': 'Auto',
  'tools.theme.light': 'Claro',
  'tools.theme.dark': 'Escuro',
  'tools.appearance.accent.title': 'Cor de destaque',
  'tools.appearance.accent.desc': 'A cor dos botões, das seleções e dos controles deslizantes.',
  'tools.appearance.accent.aria': 'Cor de destaque',
  'tools.appearance.textScale.title': 'Tamanho do texto',
  'tools.appearance.textScale.desc': 'Amplia a interface inteira, não só os rótulos.',
  'tools.appearance.textScale.aria': 'Tamanho do texto',
  'tools.appearance.density.title': 'Densidade',
  'tools.appearance.density.desc': 'A compacta cabe mais conteúdo em uma tela só.',
  'tools.appearance.density.aria': 'Densidade do layout',
  'tools.density.comfortable': 'Confortável',
  'tools.density.compact': 'Compacta',
  'tools.appearance.motion.title': 'Menos movimento',
  'tools.appearance.motion.desc': 'Desliga as animações e o deslize do ponteiro. A configuração do sistema é respeitada de qualquer jeito.',

  /* Nazwy palet akcentu — identyfikatory ze store.ACCENTS. */
  'accent.ocean': 'Oceano',
  'accent.violet': 'Violeta',
  'accent.amber': 'Âmbar',
  'accent.mint': 'Menta',
  'accent.rose': 'Rosa',

  'tools.thresholds.title': 'Limiares',
  'tools.thresholds.subtitle': 'A partir de que valor o aplicativo deve dizer “moderado” e a partir de qual deve dizer “prejudicial”. Os limiares padrão são a nossa sugestão, não uma norma — ajuste-os ao seu caso.',
  'tools.thresholds.warn': 'Limiar de alerta',
  'tools.thresholds.crit': 'Limiar de alarme',
  'tools.thresholds.warn.aria': 'Limiar de alerta — {metric}',
  'tools.thresholds.crit.aria': 'Limiar de alarme — {metric}',
  'tools.thresholds.reset': 'Padrão',
  'tools.thresholds.reset.aria': 'Restaurar os limiares padrão: {metric}',
  'tools.thresholds.moved': '{threshold} movido para {value}.',
  'tools.thresholds.resetAll': 'Restaurar todos os limiares',
  'tools.thresholds.resetAll.title': 'Restaurar os limiares padrão?',
  'tools.thresholds.resetAll.text': 'As sete métricas voltarão aos limiares sugeridos pelo aplicativo. O histórico de medições fica intacto.',
  'tools.thresholds.resetAll.confirm': 'Restaurar',
  'tools.thresholds.resetAll.cancel': 'Manter os meus',
  'tools.thresholds.resetAll.toast': 'Os limiares voltaram ao padrão',

  /* Legenda pasma stref pod suwakami progów. */
  'tools.legend.zone': '{zone}:',
  'tools.zoneRange.goodAbove': 'acima de {warn}',
  'tools.zoneRange.warnInvert': '{crit} – {warn}',
  'tools.zoneRange.critBelow': '{crit} ou menos',
  'tools.zoneRange.goodBelow': 'abaixo de {warn}',
  'tools.zoneRange.warn': '{warn} – {crit}',
  'tools.zoneRange.critAbove': '{crit} ou mais',

  'tools.calibration.title': 'Calibração',
  'tools.calibration.subtitle': 'Para quem tem com o que comparar.',
  'tools.calibration.intro': 'Dois celulares apontados para a mesma luminária mostram números um pouco diferentes — cada sensor tem um tom próprio. Se você tiver à mão uma medição em que confia, pode reforçar ou baixar aqui, com delicadeza, cada canal da imagem. Os multiplicadores agem antes de qualquer cálculo, por isso mudam as sete métricas de uma vez.',
  'tools.calibration.neutral': 'Não tem com o que comparar? Deixe em 1,00 — é o ajuste de fábrica e não estraga nada.',
  'tools.calibration.forward': 'A mudança vale de agora em diante. As medições já guardadas no histórico continuam como estavam no momento em que foram salvas — não as recalculamos, porque isso reescreveria os dados depois do fato.',
  'tools.calibration.reset': 'Zerar a calibração',
  'tools.calibration.reset.toast': 'Calibração zerada',
  'tools.calibration.channel.r': 'Canal vermelho',
  'tools.calibration.channel.g': 'Canal verde',
  'tools.calibration.channel.b': 'Canal azul',
  'tools.calibration.channel.aria': '{channel} — multiplicador de calibração',
  'tools.calibration.gain': '{value}\u00A0×',

  'tools.measurement.title': 'Medição',
  'tools.measurement.wake.title': 'Manter a tela ligada',
  'tools.measurement.wake.desc': 'A tela fica acesa durante a medição. A bateria cai mais rápido assim.',
  'tools.measurement.wake.unsupported': 'Este navegador não deixa manter a tela acesa.',
  'tools.measurement.haptics.title': 'Vibração',
  'tools.measurement.haptics.desc': 'Uma confirmação curta ao iniciar, ao parar e ao trocar de métrica.',
  'tools.measurement.haptics.unsupported': 'Este dispositivo não informa ter motor de vibração.',

  'tools.about.title': 'Sobre a medição',
  'tools.about.subtitle': 'O que exatamente cada uma das sete métricas calcula e onde termina a honestidade deste método.',
  'tools.about.scale': 'Escala: de {min} a {max}.',
  'tools.about.threshold': 'Avisamos a partir de {warn} e disparamos o alarme a partir de {crit}.',
  'tools.about.thresholdInvert': 'Avisamos abaixo de {warn} e disparamos o alarme abaixo de {crit}.',
  'tools.about.limitsHead': 'O que esta medição não consegue fazer',
  'tools.about.limit.spectrum.title': 'A câmera não vê a cor como um instrumento vê',
  'tools.about.limit.spectrum.text': 'A câmera de um celular tem três canais: vermelho, verde e azul. Um instrumento de medição de luz separa a luz em dezenas de faixas estreitas. O que você vê aqui é derivado desses três números — de um jeito razoável, mas ainda é um cálculo, não um espectro medido.',
  'tools.about.limit.exposure.title': 'A câmera regula sozinha o próprio brilho',
  'tools.about.limit.exposure.text': 'Aponte o celular para a janela e a câmera escurece a imagem para não superexpor. O “brilho da cena” então cai, embora nada tenha mudado no cômodo. Por isso, compare este valor dentro de uma mesma tomada, não entre cômodos.',
  'tools.about.limit.flicker.title': 'Uma câmera lenta não capta cintilação rápida',
  'tools.about.limit.flicker.text': 'Conferimos a imagem {hz} vezes por segundo. Uma pulsação mais rápida que {nyquist} vezes por segundo pode aparecer nesta medição como mais lenta do que é de fato, ou sumir por completo — e a cintilação da rede elétrica é exatamente assim. Se o aplicativo captar alguma coisa, trate isso como um sinal de que “tem algo pulsando aqui”, não como uma frequência medida.',
  'tools.about.limit.medical.title': 'Isto não é um exame nem uma orientação médica',
  'tools.about.limit.medical.text': 'O aplicativo ajuda a perceber que a luz ao redor está fria, forte ou inquieta, e sugere o que dá para fazer a respeito. Ele não emite juízo sobre a sua saúde e não substitui uma conversa com um médico nem uma medição com um medidor profissional.',
  'tools.about.privacy': 'Tudo é calculado no seu dispositivo. A imagem da câmera nunca é enviada nem salva em lugar nenhum — só os números calculados chegam à memória.',

  'tools.data.title': 'Dados',
  'tools.data.subtitle': 'Tudo fica na memória deste navegador e não sai daqui para lugar nenhum.',
  'tools.data.summary.empty': 'Ainda não há nenhuma medição salva.',
  'tools.data.summary': 'Na memória: {points} e {sessions}.',
  'tools.data.export.csv': 'Exportar CSV',
  'tools.data.export.json': 'Exportar JSON',
  'tools.data.clear': 'Limpar o histórico',
  'tools.data.reset': 'Configurações padrão',
  'tools.data.reset.title': 'Restaurar as configurações padrão?',
  'tools.data.reset.text': 'A aparência, os limiares, a calibração e as configurações de medição voltarão ao estado inicial. O histórico de medições fica intacto.',
  'tools.data.reset.confirm': 'Restaurar',
  'tools.data.reset.toast': 'Configurações padrão restauradas',
  'tools.data.wipe': 'Apagar todos os dados',
  'tools.data.wipe.title': 'Apagar todos os dados do aplicativo?',
  'tools.data.wipe.text': 'Vão sumir: todo o histórico de medições e a lista de sessões, os seus limiares e a sua calibração, e as configurações de aparência. O aplicativo voltará ao estado da primeira abertura.',
  'tools.data.wipe.note': 'Não temos cópia destes dados — eles nunca saíram deste dispositivo, então não há de onde restaurá-los.',
  'tools.data.wipe.check': 'Entendo que isso não pode ser desfeito',
  'tools.data.wipe.confirm': 'Apagar tudo',
  'tools.data.wipe.toast': 'Todos os dados do aplicativo foram apagados',
  'tools.data.wipe.announce': 'Todos os dados do aplicativo foram apagados. As configurações voltaram ao padrão.',
  'tools.data.storage.blocked': 'Este navegador não deixa guardar nada de forma permanente (modo privado ou dados de sites bloqueados). Tudo o que você configurar aqui vai sumir quando fechar a aba.',
  'tools.data.storage.full': 'A memória do navegador encheu e novas medições não estão mais sendo salvas. Limpar o histórico libera espaço.',

  /* ─────────────────────────────  Ekran wsparcia  ────────────────────────── */

  'support.title': 'Apoio',
  'support.free.title': 'Está tudo disponível',
  'support.free.lead': 'As sete métricas, o histórico completo, os limiares, a calibração e a exportação funcionam desde a primeira abertura — sem conta, sem limites e sem pagamento.',
  'support.free.note': 'A medição é calculada inteiramente neste dispositivo e funciona sem rede. Não existe aqui uma versão melhor guardada atrás de um muro.',
  'support.why.title': 'Por que estou pedindo',
  'support.why.lead': 'O Monitor de Luz é feito nas horas vagas, sem publicidade, sem patrocinador e sem empresa por trás. O apoio paga o tempo gasto com correções, com novas métricas e com a manutenção do que já funciona.',
  'support.what.title': 'O que a doação dá',
  'support.what.lead': 'Nada. A doação não desbloqueia nada — nenhum recurso extra, nenhum selo ao lado do seu nome, nenhuma prioridade. Tudo o que o aplicativo faz, você já tem.',
  'support.what.note': 'Sobra só isto: eu fico sabendo que serviu para alguém. Isso já é motivo suficiente.',
  'support.cta.title': 'Se você quiser ajudar',
  'support.cta.button': 'Me pague um café',
  'support.cta.nolink': 'O perfil de doações ainda não está conectado. Quando estiver, um botão vai ficar neste lugar.',
  'support.cta.privacy': 'Este link abre a página externa do Buy Me a Coffee em uma nova aba. Esse é o único momento em que alguma coisa sai deste dispositivo — a medição em si fica sempre aqui.',
  'support.cta.privacyFuture': 'Quando o endereço estiver no lugar, o botão vai abrir a página externa do Buy Me a Coffee em uma nova aba. Esse será o único momento em que alguma coisa sai deste dispositivo — a medição em si fica sempre aqui.',
  'support.cta.note': 'Aqui não há contagem regressiva, nem lembretes, nem janela que se abre sozinha. Este pedido espera nesta aba e em nenhum outro lugar.',

  /* ────────────────────────────  Wskaźnik i wykres  ──────────────────────── */

  'gauge.spark.label': 'último minuto',
  'gauge.aria': '{metric}: {value}, zona: {zone}',
  'gauge.aria.note': '{metric}: {value}, zona: {zone}, {note}',
  'gauge.aria.initial': '{metric}: sem dados',
  'gauge.value.none': 'sem dados',
  /* Odczyt słowny z jednostką: „27 por cento”, „1,20 vezes”. Osobny wzorzec, bo
     w części języków jednostka mówiona stoi przed liczbą. */
  'gauge.value.spoken': '{value} {unit}',
  'gauge.note.approx': 'valor aproximado',
  'gauge.note.offScale': 'fora da escala',
  'gauge.metric.unknown': 'Métrica desconhecida',

  'chart.aria.label': 'Gráfico do histórico de medições',
  'chart.hint': 'Gráfico interativo. As setas para a esquerda e para a direita movem o cursor de leitura, Home e End vão para o começo e o fim do intervalo, Esc esconde o cursor.',
  'chart.empty.title': 'Sem dados',
  'chart.empty.text': 'Comece a medir — o gráfico aparece depois das primeiras leituras.',
  'chart.few.title': 'Dados insuficientes',
  'chart.few.text': 'Temos uma leitura: {value}. Uma linha precisa de duas.',
  'chart.legend.line': 'medição',
  'chart.legend.gap': 'trecho sem medição',
  'chart.aria.head': 'Gráfico: {metric}, intervalo {range}',
  'chart.aria.empty': 'Sem dados neste intervalo.',
  'chart.aria.one': 'Uma leitura: {value}.',
  'chart.aria.summary': 'De {min} a {max}, média {avg}, {points}.',
  'chart.aria.gaps': 'A série tem falhas — nesses trechos não estávamos medindo.',
  'chart.readout.empty': 'Sem dados neste intervalo.',
  'chart.readout.point': '{metric}: {value}, {time}',
  'chart.readout.pointZone': '{metric}: {value}, {zone}, {time}',
  'chart.readout.few': 'Dados insuficientes para desenhar o gráfico.',
  'chart.readout.hint': 'Arraste sobre o gráfico, ou use as setas, para ler uma medição isolada.',
  'chart.time.now': 'agora',
  'chart.time.justNow': 'agora há pouco',
  'chart.time.ago': 'há {duration}',
  /* Etykieta podziałki osi czasu w trybie „ile temu”: znak minus (U+2212)
     przed czasem trwania. W piśmie od prawej do lewej znak zmienia stronę. */
  'chart.axis.ago': '\u2212{duration}',
  /* Plakietka nad kursorem odczytu: wartość i chwila pomiaru. */
  'chart.cursor.badge': '{value} · {time}',
  /* Napisy-wzorce: nikt ich nie widzi, mierzymy nimi najszerszą etykietę osi
     czasu, zanim narysujemy podziałki. Muszą być tak długie jak realne
     etykiety w tym samym języku — stąd „30 de ago.”, bo tak brazylijskie
     ustawienia regionalne skracają datę, i zegar dwudziestoczterogodzinny. */
  'chart.sample.ago': '\u221230\u00A0min',
  'chart.sample.clock': '00:00',
  'chart.sample.date': '30\u00A0de\u00A0ago.',

  /* ───────────────────────────  Siedem wielkości  ────────────────────────── */

  /* Nazwa niesie termin techniczny, zdanie „short” mówi, co ta liczba znaczy
     dla człowieka, a „help” dodaje jedną wskazówkę praktyczną. */
  'metric.share.name': 'Proporção de azul',
  'metric.share.short': 'Quanto da luz que vemos cabe ao canal azul.',
  'metric.share.help': 'Separa a cor do brilho — é este valor que se mexe quando você liga o modo noturno.',
  'metric.brightness.name': 'Brilho da cena',
  'metric.brightness.short': 'O brilho médio da imagem da câmera.',
  'metric.brightness.help': 'Um valor relativo, não lux — a exposição automática da câmera o desloca por baixo.',
  'metric.kelvin.name': 'Temperatura de cor',
  'metric.kelvin.short': 'Se a luz é quente ou fria.',
  'metric.kelvin.help': 'Abaixo de 3000 K a luz é quente e mais suave à noite. 6500 K é o branco padrão da maioria das telas.',
  'metric.melanopic.name': 'Impacto circadiano',
  'metric.melanopic.short': 'Com que força esta luz age sobre o relógio biológico.',
  'metric.melanopic.help': 'Uma aproximação do fator melanópico. 1,00 é o branco neutro da luz do dia; à noite vale a pena descer abaixo de 0,50.',
  'metric.flicker.name': 'Cintilação',
  'metric.flicker.short': 'A pulsação invisível da fonte de luz.',
  'metric.flicker.help': 'Dimmers e luzes de fundo baratos pulsam. O olho não vê, mas essa é uma causa conhecida de cansaço e dor de cabeça.',
  'metric.uniformity.name': 'Uniformidade',
  'metric.uniformity.short': 'Se a luz se espalha por igual pelo quadro.',
  'metric.uniformity.help': 'Um valor baixo em uma tela significa vazamento da luz de fundo ou reflexo; em uma mesa — luminária mal posicionada.',
  'metric.comfort.name': 'Conforto visual',
  'metric.comfort.short': 'Uma nota no lugar de seis números.',
  'metric.comfort.help': 'Reúne as outras medições em uma nota de 0 a 100 e mostra o que mais a derruba. Os pesos são o nosso julgamento editorial, não uma norma.',

  /* ──────────────────────────────────  Strefy  ───────────────────────────── */

  /* Słowna nazwa strefy jest obowiązkowa wszędzie, gdzie strefę pokazuje kolor —
     sam kolor nie wystarcza przy deuteranopii. */
  'zone.good': 'seguro',
  'zone.warn': 'moderado',
  'zone.crit': 'prejudicial',
  'zone.none': 'sem dados',

  /* ────────────────────────────  Czas i liczebniki  ──────────────────────── */

  /* Skróty miesięcy dla dat bez roku ('24 de ago.'). */
  'date.month.short.1': 'jan.',
  'date.month.short.2': 'fev.',
  'date.month.short.3': 'mar.',
  'date.month.short.4': 'abr.',
  'date.month.short.5': 'mai.',
  'date.month.short.6': 'jun.',
  'date.month.short.7': 'jul.',
  'date.month.short.8': 'ago.',
  'date.month.short.9': 'set.',
  'date.month.short.10': 'out.',
  'date.month.short.11': 'nov.',
  'date.month.short.12': 'dez.',

  'date.clock': '{hours}:{minutes}',
  /* Portugalski wiąże dzień z miesiącem przyimkiem „de”, a datę z rokiem
     drugim „de” — „30 de ago. de 2025”. Nazwy wstawek zostają te same,
     zmienia się wyłącznie to, co stoi między nimi. */
  'date.short': '{day}\u00A0de\u00A0{month}',
  'date.shortWithYear': '{date}\u00A0de\u00A0{year}',
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
     dopóki różnica jest mniejsza niż minuta, mówimy „agora há pouco”. */
  'time.justNow': 'agora há pouco',
  'time.aMinuteAgo': 'há um minuto',
  'time.minutesAgo': 'há {minutes}\u00A0min',
  'time.hoursAgo': 'há {hours}\u00A0h',
  'time.yesterday': 'ontem',
  'time.daysAgo': 'há {days}\u00A0dias',

  /* Formy zależne od liczby. Portugalski ma w CLDR trzy: `one`, `many`
     i `other`. Rozstrzyga je Intl.PluralRules dla języka aktywnego. `many`
     dotyczy wyłącznie okrągłych milionów („1 milhão de sessões”), a słowo jest
     w niej takie samo jak w `other` — stąd obie formy równe. */
  'time.days.plural': { one: 'dia', many: 'dias', other: 'dias' },
  'unit.sample.plural': { one: 'amostra', many: 'amostras', other: 'amostras' },
  'unit.measurement.plural': { one: 'medição', many: 'medições', other: 'medições' },
  /* Polski rozdzielił mianownik od biernika, bo ma dla nich różne formy.
     Portugalski ma jedną — oba klucze zostają (kształt słownika jest wspólny
     dla wszystkich języków), a wartości są tu identyczne. */
  'unit.session.plural': { one: 'sessão', many: 'sessões', other: 'sessões' },
  'unit.session.accusative.plural': { one: 'sessão', many: 'sessões', other: 'sessões' },
  /* Punkty na wykresie (dane) i punkty komfortu (jednostka) to dwie różne
     rzeczy, choć po portugalsku brzmią tak samo — w innych językach już nie. */
  'unit.chartPoint.plural': { one: 'ponto', many: 'pontos', other: 'pontos' },
  'unit.point.plural': { one: 'ponto', many: 'pontos', other: 'pontos' },
  'unit.kelvin.plural': { one: 'kelvin', many: 'kelvins', other: 'kelvins' },

  /* Jednostki zapisane słowem: czytnik ekranu przeczyta „%” jako „por cento”
     tylko czasem, a „×” najczęściej pominie zupełnie. */
  'unit.spoken.percent': 'por cento',
  'unit.spoken.times': 'vezes',

  /* ─────────────────────────────  Błędy kamery  ──────────────────────────── */

  /* Interfejs nigdy nie pokazuje err.message: to teksty przeglądarki, po
     angielsku i bez rady, co zrobić dalej. Każdy kod ma tu jedno zdanie
     diagnozy i jedno zdanie rady. */
  'camera.error.denied': 'A permissão para usar a câmera não foi concedida. Libere a câmera para esta página nas configurações do navegador e tente de novo.',
  'camera.error.notfound': 'Nenhuma câmera encontrada. Verifique se o dispositivo tem uma e se ela não está desligada no sistema.',
  'camera.error.inuse': 'A câmera está ocupada por outro aplicativo. Feche aquele aplicativo ou aba e tente de novo.',
  'camera.error.insecure': 'A câmera só funciona por HTTPS ou em localhost. Abra esta página em um endereço que comece com “https://”.',
  'camera.error.unsupported': 'Este navegador não oferece a câmera aqui. Tente o Chrome ou o Safari, em uma janela comum — não em uma visualização embutida em outro aplicativo.',
  'camera.error.unknown': 'Não foi possível iniciar a câmera.'
};
