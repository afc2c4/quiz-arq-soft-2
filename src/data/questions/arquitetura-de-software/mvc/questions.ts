import { Question } from '../../../types';

export const MVC_QUESTIONS: Question[] = [
  {
    id: 'mvc1',
    topicId: 't-mvc',
    question: 'No padrão MVC, qual a responsabilidade da camada "Model"?',
    options: [
      'Exibir os dados para o usuário e capturar cliques de botões.',
      'Gerenciar os dados, a lógica de negócio e as regras de domínio.',
      'Intermediar a comunicação entre o teclado e a tela do computador.',
      'Definir as rotas de URL que o servidor deve escutar.',
      'Estilizar a aplicação usando CSS e frameworks de design.'
    ],
    correctAnswer: 1,
    explanation: 'O Model é o "coração" da aplicação, onde residem os dados e como eles se comportam.'
  },
  {
    id: 'mvc2',
    topicId: 't-mvc',
    question: 'A camada "View" deve idealmente:',
    options: [
      'Conter toda a lógica de acesso ao banco de dados para ser mais rápida.',
      'Ser responsável apenas pela apresentação dos dados, sem lógica de negócio.',
      'Controlar as sessões dos usuários e as permissões de acesso.',
      'Substituir o uso de controladores em aplicações web modernas.',
      'Armazenar variáveis globais que afetam o comportamento do servidor.'
    ],
    correctAnswer: 1,
    explanation: 'A View deve ser o mais "burra" possível, apenas formatando o que o Model fornece.'
  },
  {
    id: 'mvc3',
    topicId: 't-mvc',
    question: 'Qual o papel do "Controller" no fluxo de execução?',
    options: [
      'Renderizar o código HTML final que será enviado ao navegador.',
      'Receber entradas, processá-las (via Model) e selecionar a View de saída.',
      'Definir a estrutura das tabelas no banco de dados relacional.',
      'Criptografar as comunicações via protocolo HTTPS.',
      'Monitorar a performance da CPU e da memória RAM do servidor.'
    ],
    correctAnswer: 1,
    explanation: 'O Controller age como um maestro, coordenando a interação entre o usuário, o modelo e a visão.'
  },
  {
    id: 'mvc4',
    topicId: 't-mvc',
    question: 'O principal benefício do desacoplamento gerado pelo MVC é:',
    options: [
      'Aumentar drasticamente a velocidade de execução do código em runtime.',
      'Permitir o desenvolvimento paralelo e a manutenção independente de cada camada.',
      'Eliminar a necessidade de escrever testes unitários para o sistema.',
      'Reduzir o tamanho final do executável da aplicação.',
      'Garantir que o sistema funcione sem conexão com a internet.'
    ],
    correctAnswer: 1,
    explanation: 'Separação de interesses (Separation of Concerns) facilita a evolução do software.'
  },
  {
    id: 'mvc5',
    topicId: 't-mvc',
    question: 'Em uma aplicação Web MVC, o que acontece quando um usuário clica em um link?',
    options: [
      'A View envia uma mensagem direta para o banco de dados.',
      'Uma requisição é enviada para um roteador que a encaminha para um Controller.',
      'O Model redesenha a página automaticamente usando JavaScript.',
      'O servidor reinicia para carregar a nova página solicitada.',
      'A URL é salva em um arquivo de log e a página permanece estática.'
    ],
    correctAnswer: 1,
    explanation: 'O fluxo típico começa no Controller, que decide o que fazer com a requisição do usuário.'
  }
];
