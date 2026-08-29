/* docs/v1/i18n/pt.js — słownik WŁASNY wersji v1, portugalski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, zaraz po słowniku wspólnym tego samego
 * języka. Kolejność jest treścią umowy: plik wersji dokłada się do tego samego
 * obiektu i może nadpisać dowolny klucz wspólny — nigdy odwrotnie.
 *
 * DLACZEGO TEN SŁOWNIK JEST SAMOWYSTARCZALNY. v1 nie ładuje ani jednego pliku
 * z docs/shared poza silnikiem językowym: ma własny pomiar w app.js, własne
 * dwie wielkości zamiast siedmiu i własne nazwy stref („Segura” zamiast
 * wspólnego „Dentro do normal”). Dlatego wszystko, co v1 pokazuje, stoi TUTAJ
 * — także klucze, które przypadkiem brzmią tak samo jak wspólne. Gdyby kiedyś
 * warstwa wspólna zmieniła brzmienie stref albo nazwę aplikacji, v1 ma zostać
 * nietknięta.
 *
 * SKĄD TE ZDANIA: przekład z pl.js (redakcja pierwotna), przy czym terminologia
 * i rejestr idą za en.js tego katalogu. Wariant ogólny 'pt', tak jak
 * w docs/shared/i18n/pt.js: słownictwo zrozumiałe po obu stronach Atlantyku,
 * a tam, gdzie trzeba było wybrać, przeważa użycie brazylijskie („câmera”,
 * „tela”, „aba”) — CLDR pod kodem 'pt' trzyma właśnie je.
 *
 * ZE SŁOWNIKA WSPÓLNEGO wzięto bez zmian: „proporção de azul”, „sem dados”,
 * zdania o prywatności i brzmienie zastrzeżenia medycznego. Nazwy stref są
 * jednak własne — v1 mówi o świetle („zona segura / moderada / prejudicial”),
 * a nie o stanie aplikacji; te same trzy słowa stoją w v5.
 *
 * LICZEBNIKI: portugalski ma trzy kategorie CLDR — one, many i other. Forma
 * 'many' nie jest „dużą liczbą” w potocznym sensie: sięga po nią
 * Intl.PluralRules przy milionach i zapisie wykładniczym, gdzie portugalski
 * wymaga przyimka („um milhão DE leituras”). Dlatego stoi w niej „de”.
 *
 * MARKUP W WARTOŚCIACH. Część kluczy (rozdziały Dokumentacji) zawiera znaczniki
 * <b>, <i>, <code> i encje HTML. Wstawiane są przez data-i18n-html, czyli tylko
 * tam, gdzie autor tekstu świadomie tego chciał — nigdy do treści pochodzącej
 * od użytkownika. Bez tego wyróżnienia w akapitach Dokumentacji trzeba by było
 * rozbić każde zdanie na kilkanaście kluczy po jednym słowie.
 */
window.I18nData = window.I18nData || {};
window.I18nData['pt'] = Object.assign(window.I18nData['pt'] || {}, {

  /* ---- aplikacja ---- */

  'app.name': 'Monitor de Luz Prejudicial',
  'app.description': 'Mede com a câmera a intensidade da cor azul na tela e mostra-a num gráfico legível com zonas: segura, moderada, prejudicial.',

  /* ---- wybór języka ---- */

  'language.label': 'Idioma',
  'language.help': 'O idioma de toda a aplicação. Todos os idiomas já estão neste dispositivo — nada é transferido e nada é enviado para lugar nenhum.',
  'language.auto': 'Seguir o dispositivo',

  /* ---- nawigacja ---- */

  'nav.aria': 'Menu principal',
  'nav.tabsAria': 'Vistas da aplicação',
  'nav.announce': 'Tela: {screen}',
  'nav.camera': 'Câmera',
  'nav.monitoring': 'Monitoramento',
  'nav.support': 'Apoio',
  'nav.more': 'Mais',
  'nav.docs': 'Documentação',
  'nav.about': 'Sobre e contato',
  'nav.settings': 'Limiares de alerta',

  /* ---- czynności wspólne dla kilku ekranów ---- */

  'action.back': '← Voltar',
  'action.back.aria': 'Voltar para a tela anterior',
  'action.openDocs': 'Ir para a documentação',
  'action.exportCsv': 'Exportar CSV',
  'action.delete': 'Excluir',
  'action.closeNotification': 'Fechar a notificação',

  /* ---- strefy ----
     v1 ma własne nazewnictwo stref — „Segura / Moderada / Prejudicial”, a nie
     wspólne „Dentro do normal / Atenção / Crítico”. Przymiotnik stoi w rodzaju
     żeńskim, bo opisuje „a zona”. Wersja plakatowa (zone.badge.*) jest osobnym
     kluczem, a nie zapisem wielkimi literami przez CSS: tureckie „i” i greckie
     akcenty nie znoszą automatycznej zamiany. */

  'zone.good': 'Segura',
  'zone.warning': 'Moderada',
  'zone.critical': 'Prejudicial',
  'zone.none': 'Sem dados',

  'zone.badge.good': 'SEGURA',
  'zone.badge.warning': 'MODERADA',
  'zone.badge.critical': 'PREJUDICIAL',

  /* ---- dwie wielkości tej wersji ---- */

  'metric.raw.name': 'Brilho do canal B',
  'metric.raw.unitLabel': '% de brilho do canal B',
  'metric.share.name': 'Proporção de azul',
  'metric.share.longName': 'Proporção de azul na luz',
  'metric.share.unitLabel': '% de proporção de azul',
  'stat.overallBrightness': 'Brilho geral da cena',

  /* ---- ekran „Kamera” ---- */

  'camera.aria': 'Pré-visualização da câmera',
  'camera.pressStart': 'Pressione “Start”.',
  'camera.start': 'Start',
  'camera.stop': 'Stop',
  'camera.switch': 'Trocar de câmera',
  'camera.error': 'Não foi possível ligar a câmera. Verifique a permissão de câmera do navegador e tente novamente. ({message})',

  /* ---- ekran „Monitoring”: odczyty ---- */

  'reading.aria': 'Leituras atuais',
  'disclaimer.short': 'Resultado aproximado. Isto não é um dispositivo médico.',
  'disclaimer.more': 'Mais',

  /* ---- wykresy ---- */

  'chart.aria': 'Gráficos ao longo do tempo',
  'chart.title': 'Gráficos ao longo do tempo (últimos {seconds} s)',
  'chart.empty': 'Ligue a câmera para ver o gráfico',
  'chart.axis.past': '-{seconds}s',
  'chart.axis.now': 'agora',
  'chart.raw.aria': 'Gráfico do brilho do canal B ao longo do tempo, com as zonas segura, moderada e prejudicial marcadas',
  'chart.share.aria': 'Gráfico da proporção de azul na luz ao longo do tempo, com as zonas segura, moderada e prejudicial marcadas',

  /* ---- tabela odczytów ---- */

  'table.show': 'Mostrar como tabela',
  'table.hide': 'Ocultar a tabela',
  'table.caption': 'Últimas leituras (a mais recente no topo)',
  'table.col.time': 'Hora',
  'table.col.zone': 'Zona',

  /* ---- ustawienia progów ---- */

  'settings.title': 'Configurações dos limiares das zonas',
  'settings.boundary.critical': 'Limite amarelo / vermelho:',
  'settings.boundary.warning': 'Limite verde / amarelo:',

  /* ---- historia i raport (features.js) ---- */

  'history.title': 'Histórico e relatório',
  'history.rangeAria': 'Intervalo do histórico',
  'history.unavailable': 'Os dados do histórico estão temporariamente indisponíveis.',
  'history.empty': 'Nenhuma leitura salva neste intervalo. Comece a medir — o histórico se enche sozinho.',
  'history.savedReadings': 'Leituras salvas: {count}. Divisão do tempo por zona:',
  'history.zoneLine': '{zone}: {percent}% ({readings})',

  'range.1h': '1 h',
  'range.24h': '24 h',
  'range.7d': '7 dias',
  'range.30d': '30 dias',

  'report.dailyTitle': 'Relatório diário',
  'report.empty': 'O relatório aparece quando houver leituras salvas no intervalo escolhido.',
  'report.dailyCaption': 'Proporção do tempo em cada zona, dia após dia',
  'report.col.day': 'Dia',
  'report.col.week': 'Semana',
  'report.col.readings': 'Leituras',
  'report.compare.day': 'Comparação dia a dia: {day} — {percent}% do tempo na zona prejudicial, {change}',
  'report.compare.dayPending': 'A comparação dia a dia aparece depois do segundo dia de medições.',
  'report.compare.week': 'Comparação semana a semana: {week} — {percent}% do tempo na zona prejudicial, {change}',
  'report.compare.weekPending': 'A comparação semana a semana aparece depois da segunda semana de medições.',
  'report.change.same': 'o mesmo que {other}.',
  'report.change.more': '{points} a mais que {other}.',
  'report.change.less': '{points} a menos que {other}.',
  'report.peak': 'A maior parte das leituras na zona prejudicial ficou entre {from} e {to}.',
  'report.peak.none': 'Nenhuma leitura na zona prejudicial foi salva neste intervalo.',
  'report.weeklyTitle': 'Relatório semanal',
  'report.weeklyEmpty': 'O relatório semanal aparece quando houver leituras salvas no intervalo escolhido.',
  'report.weeklyCaption': 'Proporção do tempo em cada zona, semana após semana',
  'report.weekLabel': 'Semana {week} ({year})',
  'report.footnote': 'Os números são a proporção das leituras salvas no intervalo escolhido, não o tempo exato de exposição.',

  /* ---- profile progów ---- */

  'profiles.title': 'Perfis de limiares',
  'profiles.empty': 'Você ainda não salvou nenhum perfil.',
  'profiles.itemActive': '{name} (ativo)',
  'profiles.applyAria': 'Aplicar o perfil {name}',
  'profiles.deleteAria': 'Excluir o perfil {name}',
  'profiles.applied': 'Perfil “{name}” aplicado.',
  'profiles.deleted': 'Perfil “{name}” excluído.',
  'profiles.saved': 'Perfil “{name}” salvo.',
  'profiles.namePlaceholder': 'Nome do perfil (por exemplo, Noite)',
  'profiles.saveLabel': 'Salvar os limiares atuais como perfil',
  'profiles.saveBtn': 'Salvar o perfil',
  'profiles.needName': 'Digite um nome para o perfil.',
  'profiles.limit': {
    one: 'Você pode salvar no máximo {n} perfil. Exclua um para adicionar outro.',
    many: 'Você pode salvar no máximo {n} de perfis. Exclua um para adicionar outro.',
    other: 'Você pode salvar no máximo {n} perfis. Exclua um para adicionar outro.'
  },

  /* ---- eksport CSV ----
     Nagłówek pliku jest napisem widocznym dla człowieka (Excel pokazuje go
     w pierwszym wierszu), więc podlega tłumaczeniu. Nazwa pliku też — ale musi
     zostać bezpieczna dla systemu plików: bez ukośników i dwukropków. */

  'csv.header': 'tempo;brilho_B_pct;proporcao_azul_pct;brilho_cena_pct;zona',
  'csv.filename': 'monitoramento-de-luz-{stamp}.csv',
  'csv.empty': 'Não há leituras para exportar. Comece a medir e tente novamente.',
  'csv.done': 'Exportamos {readings} para um arquivo CSV.',

  /* ---- alert progowy i podsumowanie sesji ----
     Cała treść alertu jest JEDNYM kluczem z formami CLDR, a nie sklejeniem
     zdania z odmienioną liczbą minut. Powód: po polsku wypada tam dopełniacz
     („od 5 minut”), a po portugalsku forma 'many' dokłada przyimek („há
     1 milhão DE minutos”) — w każdym z trzydziestu języków może wypaść
     inaczej, więc pisze się całe zdanie, a nie jego okrawek. */

  'alert.exposure': {
    one: 'Alerta de limiar: há {n} minuto a leitura está na zona prejudicial. Considere uma pausa ou reduzir a proporção de azul na tela.',
    many: 'Alerta de limiar: há {n} de minutos a leitura está na zona prejudicial. Considere uma pausa ou reduzir a proporção de azul na tela.',
    other: 'Alerta de limiar: há {n} minutos a leitura está na zona prejudicial. Considere uma pausa ou reduzir a proporção de azul na tela.'
  },

  'session.title': 'Resumo da última sessão',
  'session.line': 'Tempo de medição: {duration}. Leituras salvas: {count}.',
  'session.zoneLine': '{zone}: {percent}% do tempo da sessão.',
  'session.endedAt': 'O resumo é da sessão encerrada às {time}.',
  'session.toast': 'Sessão encerrada: {duration}, {readings}, {percent}% do tempo na zona prejudicial.',

  'duration.seconds': '{n} s',
  'duration.minutesSeconds': '{minutes} min {seconds} s',

  /* ---- liczebniki ----
     Portugalski ma trzy kategorie CLDR: one (0–1), many (miliony i zapis
     wykładniczy — stąd „de”) oraz other. Formę wybiera Intl.PluralRules('pt'),
     nie nasza reguła. */

  'count.readings': { one: '{n} leitura', many: '{n} de leituras', other: '{n} leituras' },
  'count.points': {
    one: '{n} ponto percentual',
    many: '{n} de pontos percentuais',
    other: '{n} pontos percentuais'
  },

  /* ---- ekran „Więcej” ---- */

  'more.title': 'Mais',
  'more.section.settings': 'CONFIGURAÇÕES',
  'more.section.help': 'AJUDA',
  'more.thresholds.title': 'Limiares de alerta',
  'more.thresholds.sub': 'Defina os limites das zonas segura, moderada e prejudicial.',
  'more.docs.title': 'Documentação',
  'more.docs.sub': 'Como funciona a medição, unidades, normas e zonas.',
  'more.about.title': 'Sobre e contato',
  'more.about.sub': 'Versão, privacidade e contato.',
  'more.free': 'A aplicação é gratuita por inteiro.',
  'more.supportLink': 'Se quiser, você pode apoiá-la voluntariamente.',
  'more.version': 'Versão {version} · Todos os recursos disponíveis sem conta e sem pagamento',

  /* ---- ekran „O aplikacji i kontakt” ---- */

  'about.title': 'Sobre e contato',
  'about.version': 'Versão {version}',
  'about.what.title': 'O que é esta aplicação',
  'about.what.p1': '{app} mede com a câmera do telefone quanta luz azul o sensor registra e mostra isso em dois mostradores e em gráficos com zonas. Todos os recursos — a medição, o histórico, os relatórios, os perfis de limiares, o alerta de limiar, a exportação CSV e a Documentação — estão disponíveis para todos, sem conta e sem pagamento.',
  'about.what.p2': 'A aplicação é fornecida “no estado em que se encontra”, para uso informativo. O resultado de uma medição é aproximado e não serve de base para decisões de saúde.',
  'about.privacy.title': 'Privacidade e dados',
  'about.privacy.p1': 'A imagem da câmera é analisada exclusivamente no seu dispositivo e nunca é enviada para nenhum servidor. Não criamos contas e não coletamos os seus dados. As configurações dos limiares, os perfis e o histórico de medições são salvos apenas na memória deste dispositivo e deste navegador.',
  'about.privacy.p2': 'A aplicação não exibe publicidade e não se comunica com a rede. A única exceção é o botão na tela “Apoio”: quando você o pressiona, o navegador abre uma página externa numa nova aba. Nada acontece enquanto você mesmo não fizer isso.',
  'about.contact.title': 'Contato',
  'about.contact.p1': 'Comentários, erros e sugestões: [E-MAIL]. Respondemos sempre que dá — este é um projeto mantido nas horas vagas.',

  /* ---- ekran „Wsparcie” ---- */

  'support.title': 'Apoio',
  'support.free.title': 'Está tudo disponível',
  'support.free.text': 'A aplicação inteira é gratuita: a medição, o histórico e os relatórios, os perfis de limiares, o alerta, a exportação CSV e a Documentação. Tudo funciona logo de início, sem conta, sem limites e sem internet.',
  'support.why': '{app} é feito nas horas vagas. Se for útil para você, pode me pagar um café. Isso ajuda a manter a aplicação e a levá-la adiante — melhorar a medição, escrever mais Documentação e testá-la em mais telefones.',
  'support.nothing': 'A doação não desbloqueia nada. Não existe versão melhor nem pior — depois do apoio, a aplicação funciona exatamente do mesmo jeito. A única diferença é que o autor fica sabendo que aquilo serviu para alguém.',
  'support.button': 'Me pague um café',
  'support.button.aria': 'Me pague um café — abre o perfil de doações numa nova aba',
  'support.pending': 'O perfil de doações ainda não está conectado. Assim que estiver, o botão vai ficar neste lugar. Até lá não há nada a fazer — a aplicação é gratuita por inteiro de qualquer forma.',
  'support.privacy': 'O botão abre uma página externa (o Buy Me a Coffee) numa nova aba do navegador. Esse é o único momento em que alguma coisa sai deste dispositivo. A imagem da câmera e todas as suas medições ficam aqui — não são enviadas para lugar nenhum, nem antes de você pressioná-lo, nem depois.',
  'support.privacyPending': 'Quando o endereço existir, pressionar o botão abrirá uma página externa (o Buy Me a Coffee) numa nova aba do navegador. Esse será o único momento em que alguma coisa sai deste dispositivo. A imagem da câmera e todas as suas medições ficam aqui — não são enviadas para lugar nenhum.',

  /* =====================================================================
     DOKUMENTACJA (#panelMethodology)
     Klucze z sufiksem, których wartość zawiera <b>, <i> albo <code>, są
     wstawiane przez data-i18n-html. Reszta idzie przez textContent.
     ===================================================================== */

  'doc.aria': 'Documentação',

  'disclaimer.title': 'Isto não é um dispositivo médico',
  'disclaimer.body.docs': 'Esta aplicação não é um dispositivo médico. Não se destina a diagnosticar, tratar nem prevenir nenhuma doença. Os resultados medidos com a câmera de um telefone são aproximados e não substituem um exame nem o conselho de um médico. Em questões de saúde ocular, consulte um médico ou um optometrista. Os limiares das zonas nesta aplicação não reproduzem nenhuma norma de segurança — os detalhes estão no capítulo 3.',
  'disclaimer.body.about': 'Esta aplicação não é um dispositivo médico. Não se destina a diagnosticar, tratar nem prevenir nenhuma doença. Os resultados medidos com a câmera de um telefone são aproximados e não substituem um exame nem o conselho de um médico. Em questões de saúde ocular, consulte um médico ou um optometrista. Os limiares das zonas nesta aplicação não reproduzem nenhuma norma de segurança — os detalhes estão na Documentação, capítulo 3.',

  'doc.toc.aria': 'Índice da documentação',
  'doc.toc.title': 'Índice',

  'doc.ch1.title': 'Início rápido',
  'doc.ch2.title': 'Como funciona a medição',
  'doc.ch3.title': 'Unidades e normas',
  'doc.ch4.title': 'Zonas e limiares',
  'doc.ch5.title': 'Diferenças entre dispositivos',

  'doc.ch1.heading': '1. Início rápido',
  'doc.ch2.heading': '2. Como funciona a medição',
  'doc.ch3.heading': '3. Unidades e normas',
  'doc.ch4.heading': '4. Zonas e limiares',
  'doc.ch5.heading': '5. Diferenças entre dispositivos',

  /* --- rozdział 1 --- */

  'doc.ch1.tips.title': 'Como medir com mais precisão',
  'doc.ch1.tips.li1': 'Na tela “Câmera” (o primeiro botão da barra inferior), pressione “Start” e aponte a câmera traseira para a tela ou para a fonte de luz que quer verificar.',
  'doc.ch1.tips.li2': 'Vá para a tela “Monitoramento” (o segundo botão da barra inferior) — no alto você vê os dois mostradores ao mesmo tempo e, abaixo deles (role a página), os gráficos das mudanças ao longo do tempo. A medição continua rodando em segundo plano, seja qual for a tela que você esteja olhando.',
  'doc.ch1.tips.li3': 'Mantenha o telefone a uma distância fixa da tela (15–20 cm, por exemplo), sem mudar a iluminação do ambiente durante a medição.',
  'doc.ch1.tips.li4': 'Use a câmera traseira — as correções automáticas dela são menos agressivas que as da frontal.',
  'doc.ch1.tips.li5': 'Trate os resultados como indicadores relativos (%), não como unidades físicas absolutas — compare-os entre si (o modo noturno ligado ou desligado, por exemplo).',
  'doc.ch1.tips.li6': 'Ajuste os limiares das zonas nas configurações ao brilho da sua própria tela (capítulo 4).',

  'doc.ch1.fonts.title': 'Letras grandes e mostradores — sempre',
  'doc.ch1.fonts.p1': 'A aplicação inteira usa letras grandes e legíveis e mostradores em tamanho cheio, para que pessoas com baixa visão (e todas as outras) consigam ler os dados sem configurações extras. Na tela “Monitoramento”, os dois mostradores cabem juntos numa só tela, sem rolagem — os gráficos das mudanças ao longo do tempo ficam logo abaixo, a uma rolagem de distância.',

  /* --- rozdział 2 --- */

  'doc.ch2.spectro.title': 'A câmera de um telefone e um espectrômetro',
  'doc.ch2.spectro.p1.html': 'Medir de verdade “quanta luz azul prejudicial existe” exige separar a luz em comprimentos de onda — é o que faz um <b>espectrômetro</b>: um prisma ou uma rede de difração dispersa a luz em dezenas ou centenas de faixas estreitas (a cada 1–5 nm, por exemplo) e mede a potência óptica de cada uma separadamente. Só a partir dessa distribuição espectral completa é que se calculam unidades como lux, lúmen ou irradiância ponderada pela função de risco da luz azul.',
  'doc.ch2.spectro.p2.html': '<b>A câmera de um telefone não faz nada disso.</b> Ela tem três filtros largos (Bayer: R/G/B), e cada um recolhe luz de uma faixa ampla e sobreposta de comprimentos de onda — o “canal azul” não é uma faixa estreita em torno de 435–440 nm (o pico do risco para a retina), e sim mais ou menos 400–570 nm misturados com o verde. Pelo caminho entram ainda a demosaicagem, a exposição automática, o balanço de branco automático e a compressão gama sRGB — o navegador não deixa desligar por completo nenhum desses passos. Como resultado, o valor de pixel que o JavaScript enxerga não tem relação linear com a potência óptica real que chega ao sensor. É uma limitação fundamental do hardware, não um defeito desta aplicação.',

  'doc.ch2.raw.title': 'Gráfico 1 — Brilho do canal B',
  'doc.ch2.raw.what.html': '<b>O que mostra:</b> o brilho médio só do canal azul (B) no trecho amostrado da imagem, numa escala de 0–255 convertida para %.',
  'doc.ch2.raw.algo.html': '<b>O algoritmo:</b>',
  'doc.ch2.raw.step1': 'Pegamos um quadro da câmera 5 vezes por segundo.',
  'doc.ch2.raw.step2': 'Recortamos os 60% centrais do quadro (isso evita as bordas da imagem e os reflexos das laterais).',
  'doc.ch2.raw.step3': 'Reduzimos o trecho recortado para uma grade de 32×32 pixels (preciso o bastante e muito mais rápido do que calcular na resolução cheia — o que importa em hardware mais fraco, como aparelhos Xiaomi ou Ulefone de baixo custo).',
  'doc.ch2.raw.step4': 'Tiramos a média do valor de B de todos os 1024 pixels dessa grade.',
  'doc.ch2.raw.step5.html': '<code>resultado = média_B ÷ 255 × 100</code>',
  'doc.ch2.raw.why.html': '<b>Por que o mantivemos:</b> é a leitura mais simples e direta de “quanto sinal azul o sensor registra afinal”. O ponto fraco é que ele mistura brilho com cor — uma cena muito clara, mas de um branco neutro, também dá um resultado alto, mesmo não sendo especialmente “azul”. Por isso mostramos o gráfico 2 ao lado dele.',

  'doc.ch2.share.title': 'Gráfico 2 — Proporção de azul na luz',
  'doc.ch2.share.what.html': '<b>O que mostra:</b> qual porcentagem de toda a luz registrada (R+G+B) corresponde à componente azul — ou seja, o deslocamento da cor para o frio, independentemente de quão clara a cena esteja.',
  'doc.ch2.share.algo.html': '<b>O algoritmo:</b> os mesmos passos 1–4 de cima, mas, em vez de só o B, calculamos:',
  'doc.ch2.share.formula.html': '<code>resultado = B ÷ (R + G + B) × 100</code>',
  'doc.ch2.share.neutral.html': 'O branco neutro (R≈G≈B) dá cerca de <b>33%</b>. Luz mais quente e mais avermelhada dá menos. Luz fortemente azul dá mais, até um limite de ~100% para uma luz quase puramente azul.',
  'doc.ch2.share.why.html': '<b>Por que esta é a medida mais precisa do “azul prejudicial”:</b> é o mesmo princípio em que funcionam os filtros do tipo modo noturno / Night Shift — o que conta é a <b>cor</b>, não o brilho. Uma tela muito clara, mas neutra, não será marcada falsamente como prejudicial; uma tela apagada, mas fortemente azul, será. Por isso é esta a métrica que comanda a cor da zona na tabela de leituras.',

  /* --- rozdział 3 --- */

  'doc.ch3.units.title': 'Por que não lux nem lúmens',
  'doc.ch3.units.p1.html': 'O <b>lúmen (lm)</b> descreve o fluxo luminoso total emitido por uma fonte — é uma propriedade da própria fonte, não daquilo que chega a um dado ponto. O <b>lux (lx)</b> já é a iluminância num ponto (lm/m²) — mais perto do que nos interessa, mas ainda uma unidade <b>fotométrica</b>: pondera o espectro pela curva de sensibilidade do olho humano ao brilho (V(λ)), não pela curva de risco da luz azul. Para medir o risco de verdade é preciso uma terceira unidade, mais estreita: a irradiância ponderada espectralmente, em <b>W/m²</b> (norma IEC 62471, com o pico de sensibilidade em torno de 435–440 nm), e isso exige um espectrômetro — veja a seção acima.',
  'doc.ch3.units.p2.html': 'Mesmo que ficássemos nos lux: um telefone sem um sensor de luz externo e calibrado não consegue determiná-los de forma confiável. Aliás, o sensor de luz embutido no telefone (onde ele existe) mede a luz do <b>lado oposto</b> da carcaça em relação àquele que você aponta para a tela com a câmera traseira — mediria, portanto, a luz atrás das suas costas, não a que vem da tela. Por isso, em vez de adivinhar um número numa unidade que seria pouco confiável de qualquer forma, mostramos um <b>indicador relativo (%)</b> descrito honestamente — útil para comparações no mesmo telefone e nas mesmas condições (o modo noturno ligado ou desligado, por exemplo), não como valor absoluto.',

  'doc.ch3.norms.title': 'Existem normas globais para os limiares de segurança?',
  'doc.ch3.norms.p1.html': 'Em resumo: <b>não existe norma expressa em porcentagem de um canal da câmera</b> — isso nem sequer é uma unidade em que se regule o que quer que seja. Normas reais sobre a luz azul existem, mas medem outras grandezas, em outras unidades, e dizem respeito a um fenômeno diferente daquele que normalmente temos em mente ao dizer que “a luz azul cansa os olhos”.',
  'doc.ch3.norms.p2.html': '<b>Dano fotoquímico agudo à retina — IEC 62471 / ICNIRP.</b> O único “risco da luz azul” de fato regulado — uma norma para lâmpadas e sistemas de iluminação, apoiada pelas diretrizes da ICNIRP (International Commission on Non-Ionizing Radiation Protection). Ela classifica as fontes em grupos de risco RG0–RG3 com base na radiância ponderada pela função de risco B(λ), em <b>W·m⁻²·sr⁻¹</b>, com um limite de tempo de exposição (<code>t_max = 100 / L_B</code> segundos). As telas de telefones e de monitores — mesmo no brilho máximo — ficam na prática sempre em <b>RG0 (isento, sem restrições)</b>. Essa norma diz respeito a fontes muito mais intensas (arcos de solda, alguns projetores, LEDs industriais), não a telas de consumo.',
  'doc.ch3.norms.p3.html': '<b>Efeito sobre o ritmo circadiano e o sono — CIE S 026.</b> É este o fenômeno de que normalmente se fala (a tela à noite “desperta”) — mas não é um dano ao olho, e sim um efeito sobre o relógio biológico através das células ganglionares da retina (ipRGC), mais sensíveis em torno de 480 nm. A norma CIE S 026:2018 define a unidade <b>lux melanópico (melanopic EDI)</b>. O mais próximo de um consenso científico “oficial” é o artigo de Brown e coautores (<i>PLOS Biology</i>, 2022), que recomenda, a título de orientação: à noite &lt; 10 lux melanópicos, durante o dia &gt; 250. São recomendações de pesquisadores do sono, não uma exigência legal.',
  'doc.ch3.norms.p4.html': '<b>A OMS.</b> A Organização Mundial da Saúde não publica limites próprios e independentes de exposição à luz azul — em segurança da radiação óptica, ela remete à ICNIRP (acima). O único documento concreto e de autoria própria da OMS sobre telas é o <i>Guidelines on physical activity, sedentary behaviour and sleep for children under 5 years of age</i> (2019) — e ele trata do <b>tempo</b> passado diante de uma tela, não da cor nem da intensidade da luz: nada de tela abaixo de 1 ano de idade, no máximo 1 hora dos 2 aos 4 anos. Para adultos, a OMS não tem orientações numéricas igualmente concretas.',
  'doc.ch3.norms.p5.html': '<b>Por que nada disso ajuda a calibrar a aplicação:</b> as duas famílias de normas (IEC/ICNIRP e CIE) exigem uma distribuição espectral completa e uma radiância calibrada numa geometria de medição conhecida — exatamente o que um telefone não consegue entregar através do navegador (veja a seção “A câmera de um telefone e um espectrômetro”, acima). Não existe conversão do tipo “33% de proporção de azul = X lux melanópicos”, e por isso os limiares desta aplicação <b>não reproduzem nenhuma norma de segurança</b> (OMS, IEC, ICNIRP ou CIE — para este indicador simplesmente não existe nenhuma). Os valores padrão do limiar da proporção de azul são, em compensação, derivados de temperaturas de cor reais da luz e da recomendação prática, amplamente repetida, de luz quente à noite — uma base mais sólida que um simples arredondamento, mas ainda assim não uma norma formal (a derivação completa está no capítulo 4). Você sempre pode alterá-los para os seus próprios nas configurações.',

  /* --- rozdział 4 --- */

  'doc.ch4.zones.title': 'As zonas de cor e de onde vêm os limiares',
  'doc.ch4.zones.p1.html': 'As duas métricas têm limiares próprios, ajustáveis de forma independente (tela “Monitoramento” → “Configurações dos limiares das zonas”, no fim da página) — 33%/66% numa delas não significa o mesmo que na outra (veja o capítulo 2, acima). É a <b>proporção de azul</b> que decide a cor na legenda sob os gráficos e na tabela de leituras:',
  'doc.ch4.zones.li1.html': '<b>Verde — segura:</b> luz quente ou neutra, os olhos descansam.',
  'doc.ch4.zones.li2.html': '<b>Amarela — moderada:</b> um deslocamento perceptível para o azul, vale a pena fazer pausas.',
  'doc.ch4.zones.li3.html': '<b>Vermelha — prejudicial:</b> luz fortemente azul, cansa bastante os olhos numa exposição mais longa (especialmente à noite).',
  'doc.ch4.zones.p2.html': '<b>De onde vêm estes números.</b> O <b>brilho do canal B</b> não tem um ponto de referência natural — um valor de limiar sensato depende exclusivamente de quão clara é a cena que você está filmando (é uma medida de brilho, não de cor). Os 33%/66% padrão continuam sendo aqui um ponto de partida convencional — ajuste-o por tentativa ao brilho típico da sua tela e do seu ambiente.',
  'doc.ch4.zones.p3.html': 'A <b>proporção de azul</b> tem limiares padrão derivados de temperaturas de cor reais da luz (física, não arredondamento), e não de alguma norma de segurança — para esta grandeza não existe norma assim (capítulo 3). Os pontos de referência:',
  'doc.ch4.zones.li4.html': '<b>~4000K</b> (“branco quente”, uma lâmpada LED típica) → cerca de <b>26%</b> de proporção de azul. Luz mais quente do que essa (temperatura de cor mais baixa) é a faixa amplamente recomendada para a noite por ferramentas como o f.lux ou o Night Shift — daí o limiar inferior.',
  'doc.ch4.zones.li5.html': '<b>6500K (D65)</b>, o ponto branco padrão da maioria das telas de telefones e monitores de fábrica — cerca de <b>33%</b>. Desse valor para cima começa a faixa em que tipicamente se aplicam as recomendações de limitar a luz azul — daí o limiar superior.',
  'doc.ch4.zones.p4.html': '<b>Uma ressalva importante:</b> o quanto uma luz é “azul” não depende da hora do dia, mas as recomendações de limitar a luz azul dizem respeito, na prática, apenas <b>ao fim da tarde e à noite</b> — durante o dia, a exposição à luz fria e azul (inclusive a solar) é normal e até benéfica para o ritmo circadiano. Uma zona vermelha no meio do dia, olhando para uma tela comum e sem alterações, não significa um risco real — a mesma luz à noite já vale a pena limitar.',
  'doc.ch4.zones.p5.html': 'Os limiares das duas métricas são completamente independentes — mudar um não afeta o outro. Os limiares alterados ficam <b>guardados neste dispositivo e neste navegador</b> entre uma abertura e outra da aplicação (localmente; nada é enviado para lugar nenhum) — o botão “Start” não os redefine para os valores padrão.',

  /* --- rozdział 5 --- */

  'doc.ch5.devices.title': 'Por que a pré-visualização parece diferente em dispositivos diferentes',
  'doc.ch5.devices.p1.html': '<b>O navegador e a aplicação de câmera de fábrica.</b> Quando você abre a câmera que veio instalada no telefone, o fabricante (a Xiaomi, por exemplo) acrescenta à pré-visualização ao vivo os seus próprios algoritmos proprietários — HDR em tempo real, amplificação digital do brilho com pouca luz, suavização. Uma página web recebe pelo navegador um fluxo bem mais “cru” da câmera (a função <code>getUserMedia</code>), sem nenhuma dessas melhorias — por isso, por princípio, ela vai parecer mais chapada e mais escura que a câmera nativa, seja qual for o telefone.',
  'doc.ch5.devices.p2.html': '<b>Diferentes possibilidades de controlar a câmera.</b> Quanto controle sobre a exposição e o balanço de branco o navegador de fato recebe do sistema depende do telefone concreto, do driver da câmera e da versão do Chrome/WebView — alguns dispositivos (tipicamente computadores com câmera USB) informam apenas a automação completa, outros (parte dos telefones com Android) informam modos adicionais, mais avançados. Uma versão anterior desta aplicação tentava mudar para o modo de exposição manual onde o telefone permitia, sem definir um valor concreto — o que, em parte dos telefones, congelava a imagem numa exposição escura e aleatória do momento em que a câmera ligou. Foi um erro no código (já corrigido), não uma diferença de unidades — mas mostra bem como o comportamento consegue variar entre dispositivos, já que até a mesma linha de código só entra em ação em parte deles.',
  'doc.ch5.devices.p3.html': '<b>Sensores e processamento de imagem (ISP) diferentes.</b> Mesmo com um código idêntico e a mesma cena, modelos diferentes de telefone têm sensores de qualidades diferentes e a automação do fabricante ajustada de outro jeito — um acerta a exposição com pouca luz mais rápido e melhor que o outro. Isso, somado ao fato de os indicadores desta aplicação serem <b>relativos</b> (veja o capítulo 3), significa: compare os resultados (e a aparência da pré-visualização) no mesmo telefone ao longo do tempo, não entre modelos ou dispositivos diferentes.'
});
