/* docs/shared/i18n/pt.js — słownik WSPÓLNY, portugalski.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, gdy aktywnym językiem jest portugalski.
 *
 * SKĄD TE ZDANIA: przekład z polskiego (pl.js jest redakcją pierwotną), przy
 * czym terminologia siedmiu wielkości i rejestr zdań idą za en.js. Wariant
 * ogólny 'pt': dobierano słownictwo zrozumiałe po obu stronach Atlantyku,
 * a tam, gdzie trzeba było wybrać, przeważa użycie brazylijskie — CLDR pod
 * kodem 'pt' trzyma właśnie je. Wyjątkiem jest legal.mdr: to zdanie idzie za
 * urzędowym portugalskim tekstem rozporządzenia (UE) 2017/745 („dispositivo
 * médico”, „na aceção de”, „monitorizar”), bo cytuje jego definicję.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js i en.js — i tak ma zostać
 * w każdym z trzydziestu języków (patrz docs/shared/README.md, rozdział
 * „Warstwa językowa”). Klucza, którego nie ma w angielskim, nie wolno tu
 * dopisać: angielski jest wartością zapasową, więc to on wyznacza zestaw.
 *
 * LICZEBNIKI: portugalski ma trzy kategorie CLDR — one, many i other. Forma
 * 'many' nie jest „dużą liczbą” w potocznym sensie: sięga po nią
 * Intl.PluralRules przy milionach i zapisie wykładniczym, gdzie portugalski
 * wymaga przyimka („um milhão DE leituras”). Dlatego stoi w niej „de”.
 */
window.I18nData = window.I18nData || {};
window.I18nData['pt'] = Object.assign(window.I18nData['pt'] || {}, {

  /* Nazwa własna — wchodzi jako wstawka w zdanie o rozporządzeniu
     (UE) 2017/745, gdzie stoi na początku zdania, bez rodzajnika. */
  'app.name': 'Monitor de Luz',

  /* ---- wybór języka ---- */

  'language.label': 'Idioma',
  'language.help': 'O idioma de toda a aplicação. Todos os idiomas já estão neste dispositivo — nada é transferido e nada é enviado para lugar nenhum.',
  'language.auto': 'Seguir o dispositivo',
  'language.autoHint': 'Segue o idioma definido no telefone ou no navegador.',

  /* ---- siedem wielkości: Metrics.CATALOGUE ---- */

  'metric.share.name': 'Proporção de azul',
  'metric.share.unit': '%',
  'metric.share.unitSpoken': 'por cento',
  'metric.share.short': 'Quanto da luz vista corresponde ao canal azul.',
  'metric.share.help': 'Separa a cor do brilho — é este o valor que muda ao ativar o modo noturno.',

  'metric.brightness.name': 'Brilho da cena',
  'metric.brightness.unit': '%',
  'metric.brightness.unitSpoken': 'por cento',
  'metric.brightness.short': 'O brilho médio da imagem da câmera.',
  'metric.brightness.help': 'Um valor relativo, não lux — por baixo, a exposição automática da câmera desloca-o.',

  'metric.kelvin.name': 'Temperatura de cor',
  'metric.kelvin.unit': 'K',
  'metric.kelvin.unitSpoken': 'kelvin',
  'metric.kelvin.short': 'Se a luz é quente ou fria.',
  'metric.kelvin.help': 'Abaixo de 3000 K a luz é quente e mais suave à noite. 6500 K é o branco padrão da maioria das telas.',

  'metric.melanopic.name': 'Impacto circadiano',
  'metric.melanopic.unit': '×',
  'metric.melanopic.unitSpoken': 'vezes',
  'metric.melanopic.short': 'Com que força esta luz age sobre o relógio biológico.',
  'metric.melanopic.help': 'Uma aproximação do fator melanópico. 1,00 é o branco neutro da luz do dia; à noite vale a pena ficar abaixo de 0,50.',

  'metric.flicker.name': 'Cintilação',
  'metric.flicker.unit': '%',
  'metric.flicker.unitSpoken': 'por cento',
  'metric.flicker.short': 'Pulsação invisível da fonte de luz.',
  'metric.flicker.help': 'Reguladores de intensidade e luzes de fundo baratos pulsam. O olho não vê, mas isso costuma ser causa de cansaço e dor de cabeça.',

  'metric.uniformity.name': 'Uniformidade',
  'metric.uniformity.unit': '%',
  'metric.uniformity.unitSpoken': 'por cento',
  'metric.uniformity.short': 'Se a luz se distribui de modo uniforme no enquadramento.',
  'metric.uniformity.help': 'Um valor baixo numa tela significa vazamento da luz de fundo ou um reflexo; numa mesa de trabalho, uma luminária mal posicionada.',

  'metric.comfort.name': 'Conforto visual',
  'metric.comfort.unit': 'pts',
  'metric.comfort.unitSpoken': 'pontos',
  'metric.comfort.short': 'Uma avaliação em vez de seis números.',
  'metric.comfort.help': 'Reúne as outras medições num resultado de 0–100 e mostra o que mais o reduz. Os pesos são a nossa avaliação editorial, não uma norma.',

  'comfort.penalty.melanopic': 'Impacto circadiano',
  'comfort.penalty.kelvin': 'Cor fria da luz',
  'comfort.penalty.flicker': 'Cintilação',
  'comfort.penalty.uniformity': 'Iluminação irregular',

  /* ---- kamera: napisy silnika pomiaru (docs/shared/engine.js) ----
     Zasłona podglądu i komunikaty o nieudanym starcie kamery. Silnik sięga po
     nie przez window.I18n dopiero w chwili wyświetlenia, a bez warstwy
     językowej pokazuje wpisany u siebie zapas ANGIELSKI. */

  'engine.idle': 'Pressione “Start” para ligar a câmera.',
  'engine.starting': 'Ligando a câmera…',

  'engine.error.permission': 'Sem permissão para usar a câmera. Permita a câmera nas configurações do navegador e pressione “Start” novamente.',
  'engine.error.notFound': 'Câmera não encontrada. Verifique se o dispositivo tem câmera e se ela não está desligada no sistema.',
  'engine.error.busy': 'A câmera está ocupada por outra aplicação. Feche-a e tente novamente.',
  'engine.error.unknown': 'Não foi possível ligar a câmera.',
  'engine.error.unsupported': 'Este navegador não dá a esta página acesso à câmera. Abra a aplicação por HTTPS ou use outro navegador.',

  /* ---- strefy ---- */

  'zone.good': 'Dentro do normal',
  'zone.warning': 'Atenção',
  'zone.critical': 'Crítico',
  'zone.none': 'Sem dados',
  'zone.settling': 'Estabilizando',

  'zone.spoken.good': 'dentro do normal',
  'zone.spoken.warning': 'atenção',
  'zone.spoken.critical': 'crítico',
  'zone.spoken.none': 'sem dados',

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

  'verdict.good': 'Esta luz está bem — nada ultrapassa os limites definidos.',
  'verdict.noValue': 'Esta grandeza não pode ser medida agora. Verifique se nada cobre a lente.',
  'verdict.warmup': 'Calculando a avaliação — segure o telefone parado mais um momento.',

  'verdict.warning.share': 'Boa parte desta luz corresponde ao canal azul. À noite vale a pena reduzi-la.',
  'verdict.warning.brightness': 'A cena está clara — a câmera trabalha perto do limite superior da medição.',
  'verdict.warning.kelvin': 'A luz é bastante fria. À noite, uma lâmpada de cerca de 2700 K é mais suave.',
  'verdict.warning.melanopic': 'Esta luz age com bastante força sobre o relógio biológico.',
  'verdict.warning.flicker': 'A fonte de luz pulsa visivelmente.',
  'verdict.warning.uniformity': 'A luz distribui-se de modo irregular no enquadramento.',
  'verdict.warning.comfort': 'O conforto visual está reduzido — várias coisas se somaram.',

  'verdict.critical.share': 'Muito azul. À noite, ative o modo noturno ou troque a fonte de luz.',
  'verdict.critical.brightness': 'A cena está muito clara. Não meça apontando diretamente para a fonte de luz.',
  'verdict.critical.kelvin': 'A luz é fria. À noite é o que mais cansa os olhos — uma lâmpada mais quente ou o modo noturno ajudam.',
  'verdict.critical.melanopic': 'Esta luz age com força sobre o relógio biológico. À noite vale a pena ficar abaixo de 0,50.',
  'verdict.critical.flicker': 'A fonte de luz pulsa com força. Isso costuma ser causa de cansaço visual e dor de cabeça.',
  'verdict.critical.uniformity': 'A luz distribui-se de modo muito irregular. Verifique a posição da luminária ou os reflexos na tela.',
  /* v3 i v4 kierują tu do „modułu 01”. Numer modułu to układ konkretnej wersji,
     więc w warstwie wspólnej stoi zdanie bez numeru — wersja nadpisze ten jeden
     klucz u siebie, jeśli chce odesłać do swojego ekranu. */
  'verdict.critical.comfort': 'O conforto visual está baixo. Veja a composição da avaliação para saber o que a reduz.',

  /* ---- granice metody ---- */

  'note.limitsTitle': 'O que este número não diz',
  'note.warningTitle': 'Atenção',
  'note.dashTitle': 'O que esta medição não é',
  'note.dashText': 'A câmera de um telefone tem três canais de cor largos e balanço de branco automático — não mede o espectro. A temperatura de cor e o impacto circadiano são aproximações calculadas a partir das cores sRGB. A aplicação mostra bem as diferenças e as mudanças ao longo do tempo, não substitui um medidor e não estabelece nenhum diagnóstico.',
  'note.approxLegend': '≈ valor aproximado — calculado a partir das cores sRGB, não de uma medição do espectro.',
  'note.kelvinOutOfRange': 'Fora do alcance do método — nesta cor, a fórmula da temperatura de cor deixa de ser confiável.',
  'note.flickerOutOfRange': 'Fora do alcance do método — a amostragem a {rate} Hz só vê pulsações abaixo de {limit} Hz. Os 100 Hz da rede elétrica estão fora do alcance e a aplicação nunca os apresentará como resultado.',
  'note.helpTitle': 'O que este número não diz',
  'note.helpText': 'A câmera de um telefone tem três canais largos e não mede o espectro. Este valor é um indicador comparativo — mostra bem as diferenças entre luzes e as mudanças ao longo do tempo, e não é uma medição de laboratório nem uma informação médica.',
  'note.calibration': 'Medição sem calibração — trate os valores como comparativos.',

  'note.howToTitle': 'Como medir com sentido',
  'note.howTo.hold.title': 'Segure o telefone parado',
  'note.howTo.hold.text': 'A exposição automática precisa de 2–3 segundos para estabilizar.',
  'note.howTo.aim.title': 'Aponte para uma superfície iluminada',
  'note.howTo.aim.text': 'Uma folha de papel branca ou uma parede clara. Não meça olhando diretamente para a fonte de luz.',
  'note.howTo.compare.title': 'Compare, não julgue em termos absolutos',
  'note.howTo.compare.text': 'A mesma cena antes e depois de uma mudança de iluminação diz mais do que um único número.',

  /* ---- zastrzeżenie medyczne ----
     legal.mdr idzie za urzędowym portugalskim brzmieniem rozporządzenia
     (UE) 2017/745. To sformułowanie, przy którym rozporządzenie uznaje
     przeznaczenie medyczne za wykluczone — nie skraca się go dla stylu. */

  'legal.noDiagnosis': 'Nenhum resultado é um diagnóstico nem um conselho de saúde.',
  'legal.mdr': '{app} não é um dispositivo médico na aceção do Regulamento (UE) 2017/745, não se destina a diagnosticar, prevenir, monitorizar nem tratar nenhuma condição médica e não substitui um exame por um médico ou por um optometrista.',

  /* ---- prywatność ---- */

  'privacy.title': 'O que sai deste dispositivo',
  'privacy.short': 'Nada nesta aplicação envia o que quer que seja para a rede. Todos os números são produzidos neste dispositivo e ficam aqui.',
  'privacy.onDevice': 'A câmera só liga depois de pressionar o botão, e a imagem nunca sai deste dispositivo.',
  'privacy.external': 'Este é o único lugar em toda a aplicação onde alguma coisa sai deste dispositivo: o botão abre uma página externa numa nova aba, e só depois de ser pressionado. As medições, o histórico e as configurações ficam aqui.',
  'privacy.externalPending': 'Quando o endereço existir, o botão abrirá uma página externa numa nova aba. Esse será o único momento em que alguma coisa sai deste dispositivo. As medições, o histórico e as configurações ficam aqui.',
  'privacy.storageBlocked': 'Este navegador não permite guardar nada (modo privado ou dados de sites bloqueados). A medição funciona, mas o histórico desaparece ao fechar a aba.',

  /* ---- liczebniki ----
     Portugalski ma trzy kategorie CLDR: one (0–1), many (miliony i zapis
     wykładniczy — stąd „de”) oraz other. Formę wybiera Intl.PluralRules('pt'),
     nie nasza reguła. */

  'count.readings': { one: '{n} leitura', many: '{n} de leituras', other: '{n} leituras' },
  'count.sessions': { one: '{n} medição', many: '{n} de medições', other: '{n} medições' },
  'count.seconds': { one: '{n} segundo', many: '{n} de segundos', other: '{n} segundos' },
  'count.minutes': { one: '{n} minuto', many: '{n} de minutos', other: '{n} minutos' },
  'count.hours': { one: '{n} hora', many: '{n} de horas', other: '{n} horas' },
  'count.days': { one: '{n} dia', many: '{n} de dias', other: '{n} dias' }
});
