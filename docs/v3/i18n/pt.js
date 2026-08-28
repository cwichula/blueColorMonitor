/* docs/v3/i18n/pt.js — słownik WŁASNY wersji v3, portugalski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz PO docs/shared/i18n/pt.js. Plik
 * wersji dokłada się do tego samego obiektu (Object.assign), więc może
 * nadpisać dowolny klucz wspólny — i tylko w tę stronę.
 *
 * SKĄD TE ZDANIA: przekład z polskiego (docs/v3/i18n/pl.js jest redakcją
 * pierwotną), przy czym terminologia idzie za docs/shared/i18n/pt.js — to
 * stamtąd wzięto nazwy siedmiu wielkości („proporção de azul”, „brilho da
 * cena”, „temperatura de cor”, „impacto circadiano”, „cintilação”,
 * „uniformidade”, „conforto visual”), słowo „grandeza” na wielkość, „limite”
 * na próg i nazwy stref („dentro do normal”, „atenção”, „crítico”). Tam, gdzie
 * v4 mówi to samo zdanie po polsku, stoi tu DOKŁADNIE to samo zdanie co
 * w docs/v4/i18n/pt.js — jedna polszczyzna nie może dawać dwóch różnych
 * portugalszczyzn. Wariant ogólny 'pt': gdzie trzeba było wybrać, przeważa
 * użycie brazylijskie („câmera”, „tela”, „aba”, „arquivo”, „salvar”,
 * „configurações”), tak jak w warstwie wspólnej.
 *
 * CZEGO TU NIE MA — i dlaczego: kluczy, które stoją już w słowniku wspólnym
 * (docs/shared/i18n/pt.js) z DOKŁADNIE tym samym zdaniem. Nazwy stref, zdania
 * oceniające, noty o granicach metody, nazwy i opisy siedmiu wielkości oraz
 * zastrzeżenie medyczne są wspólne dla wersji i tłumaczy się je RAZ. Kształt
 * obiektu Scale.TEXT wskazuje na nie wprost — mapa „gałąź Scale.TEXT → klucz”
 * leży w docs/v3/scale.js i to ona jest miejscem, w którym widać oba źródła
 * naraz.
 *
 * ZESTAW KLUCZY wyznacza docs/v3/i18n/en.js: angielski jest wartością
 * zapasową, więc to on jest miarą kompletności. Klucza, którego tam nie ma,
 * nie wolno tu dopisywać.
 *
 * ZAPIS LICZB WE WZORACH: portugalski, jak polski, pisze przecinek dziesiętny
 * („0,3320”, „2,5 Hz”) — wzory czyta człowiek, a nie parser. Liczby wstawiane
 * przez '{…}' formatuje warstwa językowa.
 */
window.I18nData = window.I18nData || {};
window.I18nData['pt'] = Object.assign(window.I18nData['pt'] || {}, {

  /* ---- 8.1 listwa stanu i klawisze ---- */

  /* Wersaliki, a nie CSS text-transform: w kilku alfabetach (greka, gruziński)
     automatyczna zamiana na wersaliki psuje znaki diakrytyczne, więc wersja
     wersalikowa nazwy jest osobnym napisem do przetłumaczenia. */
  'app.wordmark': 'MONITOR DE LUZ',

  'state.idle': 'Pronto',
  'state.starting': 'Ligando',
  'state.running': 'Medindo',
  'state.runningTpl': 'Medindo {time}',
  'state.stopped': 'Parado',
  'state.error': 'Erro de câmera',
  /* Wstawką jest LICZBA, nie napis: warstwa językowa zapisze ją po myśli
     aktywnego języka (5,0 po portugalsku, 5.0 po angielsku, ٥٫٠ po arabsku). */
  'state.hzTpl': '{rate} Hz',

  'keys.start': 'Iniciar medição',
  'keys.starting': 'Ligando…',
  'keys.stop': 'Parar',
  'keys.flip': 'Virar',
  'keys.flipAria': 'Alternar a câmera, frontal ou traseira',
  'keys.menu': 'Menu',
  'keys.menuAria': 'Lista de módulos',
  'keys.back': '‹ Voltar',
  'keys.backAria': 'Voltar ao painel',
  'keys.dash': 'Painel',
  'keys.zoom': 'Ampliar',
  'keys.retry': 'Tentar novamente',
  'keys.refresh': 'Atualizar',
  'keys.close': 'Fechar',
  'keys.show': 'Mostrar',
  'keys.apply': 'Aplicar',
  'keys.remove': 'Excluir',

  'monitor.legend': 'Pré-visualização de controle',
  'monitor.badge': 'Ao vivo',

  'aim.title': 'Mira',
  'aim.hint': 'O quadro mostra exatamente a parte da imagem que a aplicação mede.',

  /* ---- 8.2 studnia odczytu ---- */

  'readout.legend': 'Canal principal',
  'readout.thresholdTpl': '(limite {value})',
  'readout.contextTpl': 'mín {min} · méd {avg} · máx {max} — últimos 60 s',
  'readout.contextEmpty': 'sem dados dos últimos 60 s',
  'readout.approxSign': '≈',

  /* ---- 7.6 nazwy dostępne ---- */

  'aria.help': 'O que isto significa: {name}',
  'aria.channel': '{name}, {value}, {zone}. Mostrar no visor grande.',
  'aria.channelStale': '{name}, sem dados. Mostrar no visor grande.',
  'aria.scale': 'Escala: {name}, de {min} a {max}. Agora {value}, {zone}. Limite de atenção {warn}, limite crítico {crit}.',
  'aria.readout': '{name}: {value}, {zone}.',
  'aria.readoutApprox': '{name}: cerca de {value}, {zone}. Valor aproximado.',
  /* Nazwa dostępna skali przed pierwszym odczytem — wpisana wprost w markupie
     index.html, więc mówi o kanale głównym, a nie o konkretnej wielkości. */
  'aria.scaleIdle': 'Escala do canal principal. Sem dados',

  /* ---- 8.3 zdania oceniające — tylko te WŁASNE v3 ---- */

  'verdict.idle': 'Pressione “Iniciar medição”, aponte o telefone para uma superfície iluminada e segure-o parado por alguns segundos.',
  /* Nadpisuje klucz wspólny: v3 odsyła do własnego modułu 01. */
  'verdict.critical.comfort': 'O conforto visual está baixo. Veja o módulo 01 para saber o que o reduz.',

  /* ---- 8.5 komunikaty ulotne i region live ---- */

  'transient.firstRun': 'Comece pelo botão “Iniciar medição” na parte de baixo da tela. A câmera só liga depois de você pressioná-lo.',
  'transient.measureStopped': 'Medição concluída · {time} · salva no histórico.',
  'transient.newVersion': 'Há uma nova versão da aplicação.',
  'transient.thresholdsSaved': 'Limites salvos.',
  'transient.thresholdsRejected': 'Não salvo — o limite de atenção e o limite crítico não podem se cruzar.',
  'transient.historyCleared': 'Histórico limpo.',

  'live.lead': 'Canal principal: {name}, {value}, {zone}.',
  'live.ready': 'Avaliação pronta. {name} {value}, {zone}.',
  'live.started': 'Medição iniciada.',
  'livebar.stopped': 'Medição parada',

  /* ---- 8.6 puste ekrany ---- */

  'empty.recorderNoHistory': 'Ainda não há nenhum registro. O histórico é gravado durante a medição — meça por um minuto e volte aqui.',
  'empty.recorderNoRange': 'Não houve medição neste intervalo.',
  'empty.coverageTpl': 'A medição cobriu {done} de {total} horas.',
  'empty.reportsNoData': 'O relatório diário aparecerá depois do primeiro dia completo com medições.',
  'empty.compareOneSession': 'A comparação precisa de duas sessões concluídas. Por enquanto você tem uma.',
  'empty.exportNoData': 'Não há nada para exportar. Inicie uma medição para que o histórico tenha conteúdo.',
  'empty.alertsOff': 'Os alertas estão desligados. Depois de ligados, funcionam apenas com a aplicação aberta.',
  'empty.scheduleEmpty': 'Nenhum horário foi definido. A agenda funciona apenas com a aplicação aberta.',
  'empty.historyEmpty': 'O histórico está vazio.',

  /* ---- 8.8 spis modułów ---- */

  'menu.title': 'Lista de módulos',

  'modules.01.title': 'Registrador',
  'modules.01.desc': 'O curso da medição ao longo do tempo, de um minuto a trinta dias.',
  'modules.02.title': 'Limites',
  'modules.02.desc': 'Defina os seus próprios limites de atenção e de alarme para cada grandeza.',
  'modules.03.title': 'Calibração',
  'modules.03.desc': 'A referência a uma fonte de luz conhecida e o que a calibração não conserta.',
  'modules.04.title': 'Relatórios',
  'modules.04.desc': 'Resumos diários e semanais no formato de uma impressão.',
  'modules.05.title': 'Exportação',
  'modules.05.desc': 'A gravação das leituras num arquivo CSV ou JSON, com a descrição das colunas.',
  'modules.06.title': 'Comparação',
  'modules.06.desc': 'Duas sessões lado a lado, com a diferença dada em números.',
  'modules.07.title': 'Teste da tela',
  'modules.07.desc': 'Padrões de teste para verificar o seu próprio monitor, passo a passo.',
  'modules.08.title': 'Agenda',
  'modules.08.desc': 'Medições nos horários que você definir.',
  'modules.09.title': 'Alertas',
  'modules.09.desc': 'Um aviso quando um limite é ultrapassado — e quando ele não funciona.',
  'modules.10.title': 'Apoio',
  'modules.10.desc': 'A aplicação é gratuita por inteiro. Aqui você pode pagar um café ao autor.',
  'modules.11.title': 'Documentação',
  'modules.11.desc': 'O que esta medição é e o que ela certamente não é.',
  'modules.12.title': 'Configurações',
  'modules.12.desc': 'Tema, tamanho do texto, redução de movimento, limpeza do histórico.',

  /* ---- listwa kanałów i arkusz pomocy ---- */

  'channels.groupAria': 'Canais de medição',
  'channels.pick': 'Mostrar no visor grande',
  'channels.stale': 'sem dados',
  'channels.approx': 'valor aproximado',

  'help.unit': 'Unidade',
  'help.range': 'Intervalo',
  'help.thresholds': 'Limites',
  'help.warn': 'Limite de atenção',
  'help.crit': 'Limite crítico',
  'help.now': 'agora',

  /* ---- nagłówki kolumn ----
     Jeden klucz na jedno pojęcie, choć te same słowa stoją w pięciu tabelach:
     „Grandeza” w dokumentacji, w raporcie i w porównaniu to za każdym razem to
     samo słowo i ma się tłumaczyć raz. */

  'col.metric': 'Grandeza',
  'col.unit': 'Unidade',
  'col.range': 'Intervalo',
  'col.direction': 'Direção',
  'col.time': 'Hora',
  'col.date': 'Data',
  'col.zone': 'Zona',
  'col.avg': 'Média',
  'col.min': 'Mínimo',
  'col.max': 'Máximo',
  'col.name': 'Coluna',
  'col.meaning': 'O que contém',
  'col.channel': 'Canal',
  'col.gain': 'Ganho',
  'col.a': 'A',
  'col.b': 'B',
  'col.diff': 'B − A',

  /* ---- moduł 01 Rejestrator ---- */

  'recorder.rangeAria': 'Intervalo de tempo',
  'recorder.range.60s': '60 s',
  'recorder.range.15min': '15 min',
  'recorder.range.1h': '1 h',
  'recorder.range.24h': '24 h',
  'recorder.range.30d': '30 dias',
  'recorder.gap': 'sem medição',
  'recorder.sessionTitle': 'Estatística da sessão',
  'recorder.zonesCaption': 'Distribuição das zonas para a proporção de azul',
  'recorder.tableCaption': 'Leituras do intervalo selecionado',
  'recorder.crosshair': 'Cruz de leitura',
  'recorder.prevAria': 'Ponto anterior',
  'recorder.nextAria': 'Ponto seguinte',

  /* ---- moduł 12 Ustawienia ---- */

  'settings.appearanceTitle': 'Aparência',
  'settings.themeLabel': 'Tema',
  'settings.themeSystem': 'Como no sistema',
  'settings.themeLight': 'Claro',
  'settings.themeDark': 'Escuro',
  'settings.themeHint': 'O tema “como no sistema” muda junto com a configuração do telefone.',
  'settings.textLabel': 'Tamanho do texto',
  /* Mnożnik jako LICZBA we wstawce — 1,15 po portugalsku, 1.15 po angielsku. */
  'settings.textScaleTpl': '×{scale}',
  'settings.textHint': 'Amplia a interface inteira, não só as letras — os botões e as linhas crescem junto com o texto.',
  'settings.motionGroup': 'Movimento',
  'settings.motionLabel': 'Reduzir o movimento',
  'settings.motionHint': 'Desliga todas as transições. O ponteiro da escala passa então a saltar uma vez por segundo, em vez de deslizar.',
  'settings.dataTitle': 'Dados',
  'settings.clearLabel': 'Limpar o histórico',
  'settings.clearHintTpl': 'O histórico guarda agora {count} pontos salvos.',
  'settings.clearHintEmpty': 'O histórico está vazio.',
  'settings.clearTitle': 'Limpar o histórico?',
  'settings.clearConfirm': 'Limpar todo o histórico de medições? Isto não pode ser desfeito.',
  'settings.clearKey': 'Limpar',
  'settings.aboutTitle': 'Sobre a aplicação',
  'settings.versionTpl': '{app}, versão {version}.',
  'settings.offlineText': 'A aplicação funciona sem rede. Depois da primeira abertura, todos os seus arquivos ficam na memória do navegador, então o modo avião não muda nada. Nada é enviado para nenhum servidor, porque a aplicação não faz nenhuma requisição de rede.',
  'settings.docsKey': 'Abrir a documentação',

  /* ---- napisy wspólne dla całej wersji ---- */

  'common.noValue': '—',
  'common.cancel': 'Cancelar',
  'common.save': 'Salvar',
  'common.reset': 'Restaurar o padrão',
  'common.yes': 'Sim',
  'common.no': 'Não',
  'common.on': 'Ligado',
  'common.off': 'Desligado',
  'common.sep': ' · ',
  'common.stepsTitle': 'Passo a passo',

  /* ---- moduł 02 Progi ---- */

  'modules.02.introTitle': 'Para que servem limites próprios',
  'modules.02.intro': 'O limite decide quando a aplicação diz “Atenção” e quando diz “Crítico”. Os valores padrão são a nossa avaliação editorial, não uma norma — se você mede em outras condições, ajuste-os a você. A avaliação e a frase do painel passam a ser calculadas com os novos limites imediatamente.',
  'modules.02.orderNormal': 'O limite de atenção deve ficar abaixo do crítico.',
  'modules.02.orderInvert': 'Aqui um valor mais alto é melhor, então o limite de atenção fica acima do crítico.',
  'modules.02.sliderAriaTpl': '{name} — {which}',
  'modules.02.previewAriaTpl': 'Pré-visualização da escala: {name}',
  'modules.02.nowTpl': 'agora {value}',
  'modules.02.resetDone': 'Limites padrão restaurados.',
  'modules.02.profilesTitle': 'Perfis',
  'modules.02.profilesHint': 'Um perfil é um conjunto salvo de limites das sete grandezas. Aplicar um perfil troca todos de uma vez.',
  'modules.02.profileSaveKey': 'Salvar os limites atuais',
  'modules.02.profileNameLabel': 'Nome do novo perfil',
  'modules.02.profileNameHint': 'O nome fica neste dispositivo. No máximo 40 caracteres.',
  'modules.02.profileNameEmpty': 'Informe um nome de perfil.',
  'modules.02.profileSavedTpl': 'Perfil “{name}” salvo.',
  'modules.02.profileAppliedTpl': 'Perfil “{name}” aplicado.',
  'modules.02.profileRemovedTpl': 'Perfil “{name}” excluído.',
  'modules.02.profileFailed': 'Não foi possível aplicar este perfil.',
  'modules.02.profileCustomTpl': 'Perfil próprio salvo em {date}.',
  'modules.02.builtin.default.name': 'Padrão',
  'modules.02.builtin.default.desc': 'Os limites do catálogo de grandezas — o ponto de partida de todas as medições.',
  'modules.02.builtin.evening.name': 'Noite — suave',
  'modules.02.builtin.evening.desc': 'Avisa mais cedo sobre a cor fria e o impacto circadiano.',
  'modules.02.builtin.work.name': 'Trabalho na mesa',
  'modules.02.builtin.work.desc': 'Admite luz do dia clara e fria; vigia a cintilação e a uniformidade.',

  /* ---- moduł 03 Kalibracja ---- */

  'modules.03.whyTitle': 'Por que isto funciona',
  'modules.03.why': 'O sensor da câmera tem um desvio fixo entre os canais. Medir uma folha de papel branco mostra o tamanho desse desvio e permite subtraí-lo. É o único recurso desta aplicação que realmente aumenta a precisão — e mesmo assim não transforma a câmera num espectrômetro.',
  'modules.03.steps.1': 'Coloque uma folha de papel branco sob a luz que você mede.',
  'modules.03.steps.2': 'Pressione “Iniciar medição” no painel e preencha o quadro com a folha.',
  'modules.03.steps.3': 'Volte aqui, pressione “Calibrar” e não mexa no telefone por três segundos.',
  'modules.03.runKey': 'Calibrar (3 s)',
  'modules.03.clearKey': 'Excluir a calibração',
  'modules.03.busyTpl': 'Medindo a folha… faltam {sec} s',
  'modules.03.statusNone': 'Sem calibração. A medição funciona; trate os valores como comparativos.',
  'modules.03.statusOnTpl': 'Calibrado em {date} às {time}.',
  'modules.03.gainsTitle': 'Ganhos dos canais',
  'modules.03.gainR': 'Vermelho',
  'modules.03.gainG': 'Verde',
  'modules.03.gainB': 'Azul',
  'modules.03.gainsNone': 'não definido',
  'modules.03.needRunning': 'Primeiro inicie a medição e aponte a câmera para uma folha de papel branco.',
  'modules.03.tooFew': 'Amostras insuficientes. Verifique se a medição está mesmo funcionando.',
  'modules.03.tooDark': 'A imagem está escura demais para calibrar. Ilumine melhor a folha e tente novamente.',
  'modules.03.refused': 'O desvio entre os canais é grande demais para ser aceito como calibração. Use papel branco sob luz uniforme.',
  'modules.03.done': 'Calibrado. A temperatura de cor e o impacto circadiano ficarão mais precisos agora.',
  'modules.03.cleared': 'Calibração excluída.',
  'modules.03.limitsTitle': 'O que a calibração não conserta',
  'modules.03.limits.1': 'A calibração nivela os três canais da câmera e nada além disso. Ela não dá um espectro à câmera, então a temperatura de cor e o impacto circadiano continuam sendo aproximações calculadas a partir das cores sRGB.',
  'modules.03.limits.2': 'Ela não transforma o brilho da cena numa grandeza absoluta — esse número continua relativo. Não desliga a exposição automática nem o balanço de branco, que deslocam a leitura por baixo.',
  'modules.03.limits.3': 'Ela não passa para outra luz: uma calibração feita sob uma lâmpada descreve aquela lâmpada. Com outra fonte, repita-a. E não muda nada no que esta medição não é — continua não sendo um exame nem base para diagnosticar uma doença.',

  /* ---- moduł 04 Raporty ---- */

  'modules.04.rangeAria': 'Período do relatório',
  'modules.04.rangeDay': 'Dia',
  'modules.04.rangeWeek': 'Semana',
  'modules.04.headTpl': 'De {from} a {to} · {count} pontos do histórico.',
  'modules.04.tableTitle': 'Resumo',
  'modules.04.tableCaption': 'Média, mínimo e máximo no período selecionado',
  'modules.04.panoramaTitle': 'Panorama',
  'modules.04.panoramaAriaTpl': 'Panorama: {name}, {span}.',
  'modules.04.panoramaSpanDay': 'as últimas 24 horas divididas por hora',
  'modules.04.panoramaSpanWeek': 'a última semana dividida por dia',
  'modules.04.panoramaHint': 'A altura e a cor da barra dizem a mesma coisa: dentro do normal — baixa, atenção — média, crítico — cheia. Um traço na base marca uma hora sem medição.',
  'modules.04.coverageDayTpl': 'A medição cobriu {done} de {total} horas.',
  'modules.04.coverageWeekTpl': 'A medição cobriu {done} de {total} dias.',
  'modules.04.zonesTitle': 'Distribuição das zonas',
  'modules.04.zonesCaptionTpl': 'Calculada para o canal principal: {name}.',
  'modules.04.worstTpl': 'Horário mais difícil: {value}.',
  'modules.04.worstNone': 'nenhum se destaca',
  'modules.04.worstHourTpl': 'às {hour}',
  'modules.04.adviceTitle': 'O que fazer com isso',
  'modules.04.adviceMelanopicTpl': 'O impacto circadiano médio foi de {value}×. À noite vale a pena ficar abaixo de 0,50 — o mais simples é uma lâmpada mais quente ou o modo noturno.',
  'modules.04.adviceKelvinTpl': 'A luz estava fria (em média {value} K). Para trabalhar, é impecável; nas duas horas antes de dormir, abaixo de 3000 K é mais suave.',
  'modules.04.adviceFlickerTpl': 'Há cintilação perceptível (em média {value}%). Em geral a causa é um regulador de intensidade barato ou a fonte da luz de fundo.',
  'modules.04.adviceUniformityTpl': 'A luz se distribui de modo irregular ({value}%). Mover a luminária ou mudar o ângulo costuma render mais do que trocar a lâmpada.',
  'modules.04.adviceWorstTpl': 'A maior parte das leituras fora dos limites se concentra às {hour}.',
  'modules.04.adviceNone': 'Neste período nada se destaca acima dos limites definidos.',
  'modules.04.limitsTitle': 'Isto não é um conselho de saúde',
  /* Zdanie kończy się zastrzeżeniem z klucza wspólnego 'legal.mdr' — składa je
     docs/v3/scale.js, żeby formuła z rozporządzenia (UE) 2017/745 była
     tłumaczona w jednym miejscu dla wszystkich wersji. */
  'modules.04.limitsLead': 'As conclusões decorrem apenas do que a câmera deste telefone viu. A aplicação não mede o espectro e não estabelece nenhum diagnóstico.',
  'modules.04.printHint': 'Esta página é pensada como uma impressão: a tabela e as legendas se leem igual no papel, na lupa do sistema e num leitor de tela.',

  /* ---- moduł 05 Eksport ---- */

  'modules.05.rangeAria': 'Intervalo de dados',
  'modules.05.range1h': 'Hora',
  'modules.05.range24h': 'Dia',
  'modules.05.range7d': '7 dias',
  'modules.05.range30d': '30 dias',
  'modules.05.csvKey': 'Salvar o arquivo CSV',
  'modules.05.jsonKey': 'Salvar o arquivo JSON',
  'modules.05.formatTitle': 'Formato do arquivo',
  'modules.05.formatCsv': 'CSV: o ponto e vírgula separa as colunas, a vírgula é o separador decimal, a codificação é UTF-8 com marca BOM. O Excel configurado para um idioma que usa a vírgula como separador decimal abre um arquivo assim sem precisar ajustar nada.',
  'modules.05.formatJson': 'JSON: os mesmos dados no campo “points”, com ponto decimal e marca de tempo em milissegundos — é o que o formato exige.',
  'modules.05.resolution': 'O histórico guarda um ponto a cada 5 segundos e alcança 30 dias para trás. O arquivo não contém a resolução completa de cinco amostras por segundo — o motor a mantém apenas por um minuto.',
  'modules.05.offline': 'O arquivo é criado no dispositivo e fica no dispositivo. A exportação não se conecta à rede.',
  'modules.05.columnsTitle': 'Descrição das colunas',
  'modules.05.columnsCaption': 'As colunas do arquivo e o seu significado',
  'modules.05.descDate': 'A data do ponto pelo relógio do dispositivo, escrita dia-mês-ano.',
  'modules.05.descTime': 'A hora do ponto, com precisão de um segundo.',
  'modules.05.descZone': 'A zona da proporção de azul no momento da gravação. O motor guarda a zona apenas para esta grandeza — para as outras, calcule-a a partir dos limites.',
  'modules.05.descMetricTpl': '{short} Unidade: {unit}. Intervalo {min}–{max}.',
  'modules.05.previewTitle': 'Pré-visualização',
  'modules.05.previewHint': 'As cinco primeiras linhas do arquivo, exatamente como serão gravadas.',
  'modules.05.savedTpl': 'Arquivo {name} salvo — {rows} linhas.',
  'modules.05.failed': 'Este navegador não permitiu salvar o arquivo.',

  /* ---- moduł 06 Porównanie ---- */

  'modules.06.intro': 'A aplicação guarda cada sessão de medição concluída neste dispositivo. Escolha duas para vê-las numa mesma fita e ler a diferença em números.',
  'modules.06.noSessions': 'Ainda não há nenhuma sessão concluída. Inicie uma medição, pare-a e volte aqui.',
  'modules.06.slotA': 'Sessão A',
  'modules.06.slotB': 'Sessão B',
  'modules.06.sessionTpl': '{date}, {time} · {dur}',
  'modules.06.tapeTitle': 'Fita',
  'modules.06.tapeAriaTpl': 'O curso da sessão {slot}, grandeza {name}.',
  'modules.06.tapeHint': 'As duas sessões são esticadas até a mesma largura: uma barra é a mesma fração da duração, não o mesmo horário. A altura e a cor dizem o mesmo que no painel.',
  'modules.06.tapeChannelTpl': 'A fita mostra o canal principal: {name}.',
  'modules.06.diffTitle': 'Diferença',
  'modules.06.diffCaption': 'As médias das duas sessões e a diferença entre elas',
  'modules.06.clearKey': 'Excluir as sessões salvas',
  'modules.06.cleared': 'As sessões salvas foram excluídas.',
  'modules.06.savedTpl': 'Sessão salva: {dur}.',
  'modules.06.limitsTitle': 'O que esta comparação não diz',
  'modules.06.limits': 'Você compara duas medições, não duas fontes de luz. Se entre as sessões mudou o enquadramento, a distância, a hora do dia ou a posição do telefone, a diferença também fala disso. A comparação mais honesta é a mesma cena antes e depois de uma mudança de iluminação.',
  'modules.06.keepTpl': 'São lembradas no máximo {count} das sessões mais recentes.',

  /* ---- moduł 07 Test ekranu ---- */

  'modules.07.intro': 'Os padrões de teste são exibidos em tela cheia neste dispositivo. Servem para olhar a tela com os próprios olhos: se o branco está uniforme, se os cinzas puxam para alguma cor e se a luz de fundo vaza pelos cantos.',
  'modules.07.steps.1': 'Ajuste o brilho da tela para o nível em que você costuma trabalhar e desligue o modo noturno do sistema.',
  'modules.07.steps.2': 'Escolha um padrão na lista abaixo. Ele preencherá a tela inteira.',
  'modules.07.steps.3': 'Olhe de uns sessenta centímetros, perpendicularmente à tela. Depois olhe o mesmo padrão de lado.',
  'modules.07.steps.4': 'Saia com o botão “Fechar o padrão” ou com a tecla Escape e passe para o seguinte.',
  'modules.07.planesTitle': 'Padrões',
  'modules.07.exitKey': 'Fechar o padrão',
  'modules.07.showAriaTpl': 'Mostrar o padrão: {name}',
  'modules.07.planeAriaTpl': 'Padrão de teste: {name}. O botão de fechar fica na parte de baixo da tela.',
  'modules.07.plane.white.name': 'Branco',
  'modules.07.plane.white.hint': 'Procure manchas, dominantes de cor e áreas mais claras junto às bordas. O branco deve ser uma só cor em toda a superfície.',
  'modules.07.plane.gray75.name': 'Cinza 75%',
  'modules.07.plane.gray75.hint': 'O cinza tem de ser cinza. Um tom esverdeado ou rosado significa que o balanço de branco da tela saiu do lugar.',
  'modules.07.plane.gray50.name': 'Cinza 50%',
  'modules.07.plane.gray50.hint': 'O melhor padrão para julgar a dominante de cor. Compare o centro com os cantos.',
  'modules.07.plane.gray25.name': 'Cinza 25%',
  'modules.07.plane.gray25.hint': 'O cinza escuro revela vazamentos da luz de fundo e faixas nos painéis baratos.',
  'modules.07.plane.black.name': 'Preto',
  'modules.07.plane.black.hint': 'Num quarto escuro, aqui se vê cada vazamento da luz de fundo e cada canto mais claro.',
  'modules.07.plane.red.name': 'Vermelho puro',
  'modules.07.plane.red.hint': 'O vermelho uniforme revela subpixels mortos e irregularidades do painel.',
  'modules.07.plane.green.name': 'Verde puro',
  'modules.07.plane.green.hint': 'O verde carrega mais brilho — é nele que um pixel danificado é mais fácil de encontrar.',
  'modules.07.plane.blue.name': 'Azul puro',
  'modules.07.plane.blue.hint': 'O azul mostra a sujeira e as manchas na superfície da tela melhor do que o branco.',
  'modules.07.plane.grid.name': 'Grade',
  'modules.07.plane.grid.hint': 'As linhas têm de estar tão nítidas nos cantos quanto no centro. O borrão nas bordas é questão do redimensionamento da imagem.',
  'modules.07.warn': 'O padrão cobre a tela inteira, inclusive o painel de controle com o botão de medição. É o único lugar da aplicação em que isso acontece, e por isso o botão de saída é grande e está sempre visível. Enquanto o padrão está na tela, a medição continua e não pode ser parada — feche o padrão para voltar aos botões.',
  'modules.07.cameraTitle': 'O que você não faz aqui',
  'modules.07.camera': 'O telefone não vê a própria tela, então você não mede estes padrões com o mesmo dispositivo. Para medir um monitor, exiba o padrão no monitor e faça a medição com o telefone — são dois dispositivos diferentes e dois papéis diferentes.',

  /* ---- moduł 08 Harmonogram ---- */

  'modules.08.intro': 'A agenda lembra você de medir num horário definido. Ela não liga a câmera sozinha: na hora marcada mostra um lembrete, e você inicia a medição com o botão “Iniciar medição” no painel. Igual à primeira vez.',
  'modules.08.onlyOpenTitle': 'Quando isto não vai funcionar',
  'modules.08.onlyOpen': 'A agenda funciona apenas com a aplicação aberta. Uma aba do navegador fechada não conta o tempo e não lembra nada. Não pedimos permissão para notificações do sistema e não enviamos nada para a rede.',
  'modules.08.enableLabel': 'Ligar os lembretes',
  'modules.08.timesTitle': 'Horários',
  'modules.08.timeAriaTpl': 'Horário {n}: hora do lembrete',
  'modules.08.addKey': 'Adicionar horário',
  'modules.08.removeAriaTpl': 'Excluir o horário {time}',
  'modules.08.addedTpl': 'Horário {time} adicionado.',
  'modules.08.removedTpl': 'Horário {time} excluído.',
  'modules.08.badTime': 'Informe a hora no formato 22:00.',
  'modules.08.nextTpl': 'Próximo lembrete: {time}.',
  'modules.08.nextNone': 'Os lembretes estão desligados.',
  'modules.08.dueTpl': 'Horário de medição agendado: {time}.',
  'modules.08.dueKey': 'Mostrar o painel',

  /* ---- moduł 09 Alerty ---- */

  'modules.09.intro': 'Um alerta vigia uma grandeza e só se manifesta quando ela mantém a zona escolhida sem interrupção pelo tempo definido. Nunca para a medição e nunca cobre os botões.',
  'modules.09.enableLabel': 'Ligar os alertas',
  'modules.09.metricLabel': 'Grandeza vigiada',
  'modules.09.levelLabel': 'A partir de que zona',
  'modules.09.levelWarning': 'De atenção para cima',
  'modules.09.levelCritical': 'Apenas crítica',
  'modules.09.sustainLabel': 'Depois de quantos segundos sem interrupção',
  'modules.09.sustainHint': 'Tempos mais curtos dão mais alarmes falsos quando você mexe no telefone. Abaixo de cinco segundos não descemos.',
  'modules.09.soundLabel': 'Um sinal sonoro curto',
  'modules.09.soundHint': 'O som é produzido no dispositivo. Nada é baixado da rede.',
  'modules.09.cooldownHint': 'No máximo um alerta a cada dois minutos. Um alarme repetido a cada amostra é um alarme que acaba desligado para sempre.',
  'modules.09.whenNotTitle': 'Quando o alerta não funciona',
  'modules.09.whenNot': 'O aviso fica dentro da aplicação, não no sistema. Não funciona quando a aplicação está fechada ou escondida em segundo plano, quando a medição não está em curso e quando a grandeza vigiada não pode ser medida naquele momento. Não pedimos permissão para notificações do sistema.',
  'modules.09.firedTpl': '{name}: {zone} há {sec} s — agora {value}.',
  'modules.09.saved': 'Configurações do alerta salvas.',
  'modules.09.statusOnTpl': 'Vigiando: {name}, {level}, depois de {sec} s.',

  /* ---- moduł 10 Wsparcie ---- */

  'support.freeTitle': 'Esta aplicação é gratuita',
  'support.freeText': 'Todas as sete grandezas mostram números desde a primeira abertura. O registrador, os limites, a calibração, os relatórios, a exportação, a comparação de sessões e todo o histórico de trinta dias funcionam sem conta, sem pagamento e sem limites — igualmente no modo off-line. Nada aqui está guardado atrás de um pagamento para depois.',
  'support.whyTitle': 'Por que eu peço isto',
  'support.whyText': 'Faço e mantenho o Monitor de Luz sozinho, fora do horário de trabalho. O apoio vai para o tempo necessário às correções, aos testes em mais telefones e às próximas ferramentas da lista de módulos. Nada vai deixar de funcionar se ninguém pagar nada.',
  'support.nothingTitle': 'O que a doação dá',
  'support.nothingText': 'Nada. Nenhum número, nenhum módulo e nenhuma configuração se desbloqueiam depois de uma doação, porque tudo está desbloqueado desde o começo. Fica apenas isto: eu sei que serviu para alguém.',
  'support.keyTitle': 'Se você quiser ajudar',
  'support.keyLabel': 'Pague-me um café',
  'support.keyAria': 'Pague-me um café — abre uma página externa numa nova aba',
  'support.serviceText': 'O perfil de doações é mantido por um serviço externo, por exemplo o Buy Me a Coffee. A aplicação não carrega dele nenhum script, nenhum widget e nenhuma imagem — aqui há um link comum e nada além dele.',
  'support.privacyText': 'Pressionar este botão abre uma página externa numa nova aba, e esse é o único momento em que alguma coisa sai deste dispositivo. As medições, o histórico e as configurações ficam onde estavam — na memória deste navegador.',
  'support.privacyPendingText': 'Quando o endereço existir, pressionar o botão abrirá uma página externa numa nova aba, e esse será o único momento em que alguma coisa sai deste dispositivo. As medições, o histórico e as configurações ficam onde estavam — na memória deste navegador.',
  'support.emptyTitle': 'O perfil ainda não está conectado',
  'support.emptyText': 'O endereço do perfil de doações ainda não foi informado, então não há aqui um botão que levasse a lugar nenhum. O resto da aplicação funciona sem mudanças — nada espera por essa doação.',

  /* ---- moduł 11 Dokumentacja ---- */

  'docs.notTitle': 'O que esta aplicação NÃO mede',
  'docs.notList.1': 'Não mede o espectro. A câmera tem três canais de cor largos, exposição automática e balanço de branco automático.',
  'docs.notList.2': 'Não mede valores absolutos. O brilho da cena é um indicador relativo, não o resultado de uma medição fotométrica.',
  'docs.notList.3': 'Não mede a temperatura de cor diretamente. A temperatura de cor e o impacto circadiano são aproximações calculadas a partir das cores sRGB.',
  'docs.notList.4': 'Não vê a cintilação da rede elétrica. A amostragem a 5 Hz só vê pulsações abaixo de 2,5 Hz — os 100 Hz da rede estão fora do alcance e a aplicação nunca os apresentará como resultado.',
  'docs.notList.5': 'Não estabelece diagnóstico e não dá conselho de saúde. Nenhum resultado é uma coisa nem outra.',
  'docs.notList.6': 'Não compara a sua luz com nenhum padrão oficial. Os limites são configurações que você pode alterar no módulo 02.',
  'docs.whatTitle': 'O que ela mede e como',
  'docs.whatLead': 'A câmera do telefone olha para uma superfície iluminada e, cinco vezes por segundo, a aplicação calcula as médias dos canais R, G e B do recorte central do quadro. Desses três números ela deriva sete indicadores.',
  'docs.whatCrop': 'O recorte são os 60% centrais da largura e os 60% centrais da altura do quadro — exatamente o retângulo que a mira contorna na tela MIRA. Fora dele nada é calculado.',
  'docs.whatRate': 'Uma amostra a cada 200 ms, ou seja, 5 vezes por segundo. O último minuto fica na memória em resolução completa; tudo o que é mais antigo é gravado a cada 5 segundos e alcança trinta dias para trás.',
  'docs.metricsTitle': 'As sete grandezas',
  'docs.formulasTitle': 'Fórmulas',
  'docs.formula.share.formula': 'proporção = B / (R + G + B) × 100%',
  'docs.formula.share.text': 'Calculada sobre os valores sRGB sem inverter a gama — de propósito, porque é a mesma definição da versão anterior da aplicação, e os limites definidos naquela época continuam significando o mesmo. Separa a cor do brilho.',
  'docs.formula.brightness.formula': 'brilho = (R + G + B) / 3 / 255 × 100%',
  'docs.formula.brightness.text': 'O valor médio dos canais em porcentagem do intervalo. A exposição automática o desloca por baixo, então é um indicador relativo — compare duas cenas, em vez de ler um único número como uma medição.',
  'docs.formula.kelvin.title': 'Temperatura de cor — a aproximação de McCamy',
  'docs.formula.kelvin.formula': 'n = (x − 0,3320) / (y − 0,1858)\nCCT = −449 n³ + 3525 n² − 6823,3 n + 5520,33',
  'docs.formula.kelvin.text': 'Primeiro invertemos a gama sRGB, depois passamos pela matriz para CIE XYZ com o branco D65 e calculamos a cromaticidade x, y. A fórmula de McCamy é confiável mais ou menos entre 2000 K e 12500 K. Fora desse intervalo a cúbica se desvia, então o resultado é cortado e marcado como não confiável — a linha de base da escala fica tracejada e aparece a frase “fora do alcance do método”.',
  'docs.formula.melanopic.title': 'Impacto circadiano — o fator melanópico',
  'docs.formula.melanopic.formula': 'mel = 0,0016 R + 0,3110 G + 0,8460 B\nY = 0,2127 R + 0,7152 G + 0,0722 B\nresultado = (mel / Y) × normalização para 1,00 no branco neutro',
  'docs.formula.melanopic.text': 'Os três canais em valores lineares. A grandeza verdadeira é a integral do espectro com a curva de sensibilidade da melanopsina (pico por volta de 490 nm); a câmera tem três canais largos, então ponderamos as primárias sRGB pela sensibilidade melanópica nos seus comprimentos de onda aproximados (R 612 nm, G 549 nm, B 465 nm). A direção da mudança é confiável, o valor absoluto não é — por isso este número vem com o sinal “≈”.',
  'docs.formula.flicker.formula': 'cintilação = (máx − mín) / (máx + mín) × 100%',
  'docs.formula.flicker.text': 'A definição da IES, calculada a partir de uma janela de amostras de brilho. Estimamos a frequência pelo número de vezes em que o sinal cruza o seu valor médio. A amostragem a 5 Hz só vê modulação abaixo de 2,5 Hz (o limite de Nyquist), e só consideramos confiável uma frequência entre 0,2 e 2 Hz com amplitude a partir de 0,5% — abaixo desse limite, os cruzamentos da média são ruído do sensor, não a pulsação da fonte.',
  'docs.formula.uniformity.formula': 'uniformidade = campo mais escuro / campo mais claro × 100%',
  'docs.formula.uniformity.text': 'Dividimos o recorte em nove campos numa grade 3×3 e comparamos os extremos. 100% é a luz distribuída de modo perfeitamente uniforme. Um valor baixo numa tela significa vazamento da luz de fundo ou um reflexo; numa mesa de trabalho, uma luminária mal posicionada. É a única grandeza, junto com o conforto, em que mais alto quer dizer melhor.',
  'docs.formula.comfort.formula': '100 pontos menos as penalidades:\nimpacto circadiano acima de 0,75 — até 35 pts\ncor acima de 4000 K — até 25 pts\ncintilação acima de 5% — até 25 pts\nuniformidade abaixo de 60% — até 15 pts',
  'docs.formula.comfort.text': 'Uma avaliação em vez de seis números. A grandeza que não pôde ser medida não gera penalidade nenhuma — a falta de dados nunca se faz passar por um bom resultado. Os pesos são a nossa avaliação editorial, não uma norma; por isso o módulo 01 mostra a divisão em componentes, para que dê para discordar dessa avaliação.',
  'docs.rangesTitle': 'Intervalos e limites',
  'docs.rangesLead': 'Os limites abaixo são os que valem neste momento — se você os alterou no módulo 02, a tabela mostra os seus valores, não os de fábrica.',
  'docs.dirNormal': 'mais baixo quer dizer mais suave',
  'docs.dirInvert': 'mais alto quer dizer melhor',
  'docs.privacyTitle': 'Dados e privacidade',
  'docs.privacyText': 'A imagem da câmera não é enviada nem gravada em lugar nenhum — de cada quadro ficam apenas três números. As medições, os limites e as configurações ficam na memória do navegador neste dispositivo. A aplicação não faz nenhuma requisição de rede e funciona no modo off-line.',
  'docs.mdrTitle': 'Aviso legal',
  'docs.freeText': 'A aplicação é gratuita por inteiro e continua assim: todas as sete grandezas, o histórico, os relatórios, a exportação e o modo off-line funcionam sem conta, sem pagamento e sem limites. Quem quiser agradecer encontra o módulo 10, “Apoio”.',

  /* ---- spis kontrolny startu (boot.js) ----
     Zdania widoczne tylko wtedy, gdy któryś plik aplikacji się nie wczytał.
     boot.js ma je też wbudowane PO ANGIELSKU jako ostateczność — na wypadek,
     gdy plikiem, który nie dojechał, jest sam słownik. */

  'boot.title': 'A aplicação carregou de forma incompleta',
  'boot.filesTpl': 'Estes arquivos não carregaram: {list}.',
  'boot.modulesTpl': 'Estes módulos não se apresentaram: {list} — essas entradas não vão abrir a partir da lista.',
  'boot.modulesRangeTpl': 'módulos {from}–{to}',
  'boot.tail': 'Recarregue a página. Se isso não ajudar, os arquivos no servidor estão incompletos.',
  'boot.loss.bus': 'os módulos deixarão de se ver e a medição não vai começar',
  'boot.loss.metrics': 'nenhum valor será calculado',
  'boot.loss.scaleCore': 'somem a geometria da escala e a formatação dos números',
  'boot.loss.scaleText': 'somem todos os textos da interface',
  'boot.loss.shell': 'não será possível abrir nenhum módulo',
  'boot.loss.engine': 'a câmera e a medição não vão iniciar',
  'boot.loss.dash': 'o painel ficará vazio'
});
