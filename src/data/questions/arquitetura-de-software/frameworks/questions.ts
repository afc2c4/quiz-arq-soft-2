import { Question } from '../../../types';

export const FRAMEWORKS_QUESTIONS: Question[] = [
  {
    id: 'fw1',
    topicId: 't-fw',
    question: 'Qual a definição técnica fundamental de um "Framework"?',
    options: [
      'Uma coleção de ícones e fontes para uso em interfaces gráficas.',
      'Uma estrutura que fornece funcionalidades genéricas que podem ser estendidas.',
      'Um compilador que transforma código Java em código JavaScript.',
      'Um conjunto de regras de estilo para escrita de documentação técnica.',
      'Uma ferramenta de chat para comunicação entre programadores.'
    ],
    correctAnswer: 1,
    explanation: 'Diferente de uma biblioteca, o framework dita o fluxo da aplicação (Inversion of Control).'
  },
  {
    id: 'fw2',
    topicId: 't-fw',
    question: 'O conceito de "Inversão de Controle" (IoC) em frameworks significa que:',
    options: [
      'O desenvolvedor perde o controle sobre o teclado durante a codificação.',
      'O framework chama o código do desenvolvedor, e não o contrário.',
      'O sistema operacional assume o controle total da aplicação em tempo real.',
      'O usuário final pode modificar o código-fonte através da interface.',
      'As variáveis são lidas de baixo para cima dentro dos métodos.'
    ],
    correctAnswer: 1,
    explanation: 'Em bibliotecas, você chama as funções. Em frameworks, ele define os "ganchos" onde seu código roda.'
  },
  {
    id: 'fw3',
    topicId: 't-fw',
    question: 'Uma desvantagem potencial de utilizar frameworks robustos é:',
    options: [
      'A impossibilidade de conectar o sistema a bancos de dados externos.',
      'O "overhead" de performance e a curva de aprendizado específica.',
      'O aumento da segurança contra ataques de injeção de SQL.',
      'A padronização do código que facilita a entrada de novos membros no time.',
      'A redução da quantidade de código manual que precisa ser escrito.'
    ],
    correctAnswer: 1,
    explanation: 'Frameworks trazem muita "mágica" e arquivos extras que podem pesar no início.'
  },
  {
    id: 'fw4',
    topicId: 't-fw',
    question: 'O termo "Opinionated Framework" (Framework Opinativo) refere-se a:',
    options: [
      'Um software que pede a opinião do usuário antes de realizar cada ação.',
      'Um framework que impõe uma forma específica (melhor prática) de fazer as coisas.',
      'Uma ferramenta que gera críticas automáticas ao código escrito pelo desenvolvedor.',
      'Um sistema que permite apenas o uso de software livre em sua construção.',
      'Um framework que não possui documentação oficial, baseando-se em fóruns.'
    ],
    correctAnswer: 1,
    explanation: 'Ex: Ruby on Rails ou Angular, que definem estruturas rígidas para aumentar a produtividade.'
  },
  {
    id: 'fw5',
    topicId: 't-fw',
    question: 'A principal diferença entre uma "Biblioteca" e um "Framework" é:',
    options: [
      'Bibliotecas são pagas e Frameworks são sempre gratuitos.',
      'Quem detém o controle do fluxo da aplicação (IoC).',
      'Bibliotecas funcionam apenas no Windows e Frameworks no Linux.',
      'Frameworks não permitem o uso de linguagens de programação modernas.',
      'Bibliotecas são usadas apenas para design e Frameworks para cálculos.'
    ],
    correctAnswer: 1,
    explanation: 'Você usa uma biblioteca; você trabalha dentro de um framework.'
  }
];
