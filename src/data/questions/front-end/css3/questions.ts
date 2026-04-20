import { Question } from '../../../types';

export const FRONTEND_CSS3_QUESTIONS: Question[] = [
  {
    id: 'fe-css1',
    topicId: 't-fe-css3',
    question: 'O que define corretamente o CSS3 e sua função primordial no desenvolvimento de páginas web?',
    options: [
      'É uma linguagem de programação lógica usada para processar dados no servidor.',
      'É uma linguagem de marcação utilizada para estruturar os elementos textuais de um site.',
      'É uma linguagem de estilos usada para definir a aparência e o layout de documentos HTML.',
      'É um banco de dados relacional que armazena as preferências de cores dos usuários.',
      'É um protocolo de transferência que garante a segurança das imagens em um servidor.'
    ],
    correctAnswer: 2,
    explanation: 'CSS é uma linguagem de estilos para definição de layout e aparência.'
  },
  {
    id: 'fe-css2',
    topicId: 't-fe-css3',
    question: 'Dentre as vantagens de utilizar o CSS no desenvolvimento web, qual alternativa destaca um benefício central para a manutenção de projetos?',
    options: [
      'Aumentar a complexidade do código HTML ao inserir estilos diretamente em cada tag.',
      'Permitir a separação entre o conteúdo (HTML) e a apresentação visual (CSS).',
      'Garantir que o site funcione apenas em navegadores antigos sem suporte a scripts.',
      'Substituir a necessidade de utilizar tags de estrutura como <section> e <article>.',
      'Reduzir o tempo de carregamento ao eliminar a necessidade de arquivos externos.'
    ],
    correctAnswer: 1,
    explanation: 'A principal vantagem é a separação de preocupações: conteúdo vs. apresentação.'
  },
  {
    id: 'fe-css3',
    topicId: 't-fe-css3',
    question: 'Sobre a sintaxe básica do CSS3, quais são os três componentes fundamentais que compõem uma regra de estilo?',
    options: [
      'Seletor, Propriedade e Valor.',
      'Variável, Atributo e Função.',
      'Tag, Link e Parâmetro.',
      'Classe, ID e Metadado.',
      'Objeto, Evento e Método.'
    ],
    correctAnswer: 0,
    explanation: 'Uma regra CSS consiste em um Seletor + { Propriedade: valor; }.'
  },
  {
    id: 'fe-css4',
    topicId: 't-fe-css3',
    question: 'Existem diferentes formas de inserção do CSS no HTML. Qual método é considerado a melhor prática para projetos de médio e grande porte visando a organização?',
    options: [
      'CSS Inline, aplicado diretamente no atributo style de cada tag.',
      'CSS Interno, escrito dentro da tag <style> no cabeçalho do documento.',
      'CSS Externo, onde os estilos são vinculados através de um arquivo separado .css.',
      'CSS Dinâmico, inserido exclusivamente através de scripts de banco de dados.',
      'CSS Importado, utilizando arquivos de texto .txt dentro do corpo da página.'
    ],
    correctAnswer: 2,
    explanation: 'CSS Externo é a melhor prática para organização e reuso de estilos.'
  },
  {
    id: 'fe-css5',
    topicId: 't-fe-css3',
    question: 'Para aplicar um estilo a vários elementos diferentes simultaneamente, utiliza-se o seletor de classe. Qual caractere deve preceder o nome da classe no código CSS?',
    options: [
      'O caractere sustenido (#).',
      'O caractere ponto final (.).',
      'O caractere arroba (@).',
      'O caractere exclamação (!).',
      'O caractere dois pontos (:).'
    ],
    correctAnswer: 1,
    explanation: 'Seletores de classe são precedidos por um ponto (.).'
  },
  {
    id: 'fe-css6',
    topicId: 't-fe-css3',
    question: 'O seletor de ID é utilizado para identificar um elemento único na página. Qual é o símbolo correto para declarar um ID no arquivo de estilos?',
    options: [
      'O símbolo de porcentagem (%).',
      'O símbolo de cifrão ($).',
      'O símbolo de sustenido (#).',
      'O símbolo de ponto e vírgula (;).',
      'O símbolo de asterisco (*).'
    ],
    correctAnswer: 2,
    explanation: 'Seletores de ID são precedidos por um sustenido/cerquilha (#).'
  },
  {
    id: 'fe-css7',
    topicId: 't-fe-css3',
    question: 'No contexto do design moderno, do que se trata a responsividade em um site?',
    options: [
      'Da capacidade do site responder a comandos de voz do usuário em tempo real.',
      'Da velocidade com que o servidor processa as requisições de imagens pesadas.',
      'Da adaptação automática do layout e conteúdo a diferentes tamanhos de tela e dispositivos.',
      'Da obrigatoriedade de o site possuir um chat de suporte para respostas rápidas.',
      'Da técnica de esconder todo o conteúdo textual em dispositivos móveis menores.'
    ],
    correctAnswer: 2,
    explanation: 'Responsividade é a adaptação do layout a diferentes telas.'
  },
  {
    id: 'fe-css8',
    topicId: 't-fe-css3',
    question: 'A técnica conhecida como CSS Reset tem como objetivo principal:',
    options: [
      'Apagar todo o código CSS escrito anteriormente para reiniciar o projeto do zero.',
      'Remover as estilizações padrões dos navegadores para garantir consistência visual entre eles.',
      'Aumentar o espaçamento padrão entre parágrafos para melhorar a leitura.',
      'Forçar o navegador a recarregar a página sempre que houver uma alteração de cor.',
      'Resetar a senha do desenvolvedor no servidor de hospedagem do site.'
    ],
    correctAnswer: 1,
    explanation: 'CSS Reset normaliza estilos padrão inconsistentes entre navegadores.'
  },
  {
    id: 'fe-css9',
    topicId: 't-fe-css3',
    question: 'Para alcançar a responsividade através de unidades relativas, quais medidas são preferíveis em vez de valores fixos como o pixel (px)?',
    options: [
      'Centímetros (cm) e Milímetros (mm).',
      'Porcentagem (%) e unidades como em ou rem.',
      'Polegadas (in) e Pontos (pt).',
      'Kilômetros (km) e Metros (m).',
      'Valores hexadecimais iniciados com #.'
    ],
    correctAnswer: 1,
    explanation: 'Porcentagem (%), rem e em são unidades relativas fundamentais para design responsivo.'
  },
  {
    id: 'fe-css10',
    topicId: 't-fe-css3',
    question: 'As Media Queries são essenciais para o CSS moderno porque permitem:',
    options: [
      'Consultar bancos de dados para exibir mídias como vídeos e áudios.',
      'Criar animações complexas que rodam apenas em placas de vídeo potentes.',
      'Aplicar estilos específicos baseados em condições como a largura da tela (viewport).',
      'Redimensionar imagens automaticamente sem perder a resolução original.',
      'Medir o tempo que o usuário passa visualizando cada seção da página.'
    ],
    correctAnswer: 2,
    explanation: 'Media Queries aplicam estilos condicionalmente com base nas propriedades do dispositivo.'
  },
  {
    id: 'fe-css11',
    topicId: 't-fe-css3',
    question: 'Sobre a Sintaxe do CSS3, assinale a alternativa correta que descreve a organização técnica de uma regra de estilo:',
    options: [
      'Uma regra é composta por um seletor, seguido de um bloco entre chaves contendo propriedade e valor.',
      'Uma regra é composta por uma tag HTML, um sinal de igual e o estilo desejado entre aspas.',
      'Uma regra deve obrigatoriamente começar com o símbolo # para ser reconhecida pelo navegador.',
      'Uma regra é composta por um seletor, uma variável de memória e um ponto final para encerrar.',
      'Uma regra utiliza parênteses para agrupar as propriedades e vírgulas para separar os valores.'
    ],
    correctAnswer: 0,
    explanation: 'A sintaxe padrão é: seletor { propriedade: valor; }'
  },
  {
    id: 'fe-css12',
    topicId: 't-fe-css3',
    question: 'No que diz respeito às Formas de Inserção do CSS no documento HTML, assinale a alternativa correta:',
    options: [
      'O CSS externo é inserido através da tag <script> dentro do corpo (<body>) do documento.',
      'O CSS inline é aplicado utilizando o atributo style diretamente dentro da tag de abertura do elemento.',
      'O CSS interno deve ser escrito dentro de um arquivo com extensão .js e vinculado ao cabeçalho.',
      'A única forma de inserir CSS3 é através de links externos hospedados em servidores de CDN.',
      'O CSS externo utiliza a tag <style> para referenciar um arquivo de texto com extensão .txt.'
    ],
    correctAnswer: 1,
    explanation: 'CSS Inline utiliza o atributo style diretamente na tag.'
  },
  {
    id: 'fe-css13',
    topicId: 't-fe-css3',
    question: 'Quanto ao uso de Seletores de Classe e ID, assinale a alternativa correta sobre sua aplicação e simbologia:',
    options: [
      'O seletor de classe é representado pelo símbolo # e deve ser único para um único elemento na página.',
      'O seletor de ID é representado pelo símbolo . e permite estilizar vários elementos simultaneamente.',
      'O seletor de classe utiliza o ponto . e é ideal para aplicar o mesmo estilo a diversos elementos.',
      'O seletor de ID utiliza o caractere $ e é ignorado por navegadores que não suportam responsividade.',
      'Ambos os seletores (classe e ID) utilizam o símbolo @ e possuem o mesmo peso de prioridade.'
    ],
    correctAnswer: 2,
    explanation: 'Classes usam ponto (.) e IDs usam sustenido (#).'
  },
  {
    id: 'fe-css14',
    topicId: 't-fe-css3',
    question: 'Sobre as Técnicas Modernas de CSS (Reset e Responsividade), assinale a alternativa correta:',
    options: [
      'O CSS Reset serve para aumentar a velocidade de processamento de scripts do lado do servidor.',
      'A responsividade baseada em unidades relativas permite que o layout seja fixo em 800px de largura.',
      'O CSS Reset busca neutralizar as inconsistências de estilos padrões aplicados por diferentes navegadores.',
      'Unidades relativas são medidas estáticas que não sofrem alteração independentemente do tamanho da tela.',
      'A responsividade moderna exige que o desenvolvedor crie um arquivo HTML diferente para cada dispositivo.'
    ],
    correctAnswer: 2,
    explanation: 'CSS Reset normaliza inconsistências de estilos entre navegadores.'
  },
  {
    id: 'fe-css15',
    topicId: 't-fe-css3',
    question: 'Em relação às Media Queries dentro do desenvolvimento web moderno, assinale a alternativa correta:',
    options: [
      'São utilizadas para realizar consultas em bancos de dados SQL diretamente pelo arquivo de estilo.',
      'Permitem aplicar estilos condicionais baseados em características do dispositivo, como a largura da tela.',
      'São comandos exclusivos para a inserção de mídias de vídeo e áudio em alta resolução no HTML5.',
      'Funcionam apenas em computadores desktop, sendo desabilitadas automaticamente em dispositivos móveis.',
      'Serve para medir o tempo de resposta do servidor (ping) antes de carregar as cores da página.'
    ],
    correctAnswer: 1,
    explanation: 'Media Queries aplicam estilos baseados nas características do dispositivo.'
  }
];
