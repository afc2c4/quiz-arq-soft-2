import { Question } from '../../../types';

export const QUALITY_SCENARIOS_QUESTIONS: Question[] = [
  {
    id: 'qt1',
    topicId: 't-qt-cenarios',
    question: 'No contexto de garantia de qualidade de software, como se define corretamente um "Cenário de Teste"?',
    options: [
      'É uma instrução detalhada, passo a passo, que descreve as entradas e os resultados esperados para uma função específica.',
      'É uma descrição de alto nível de uma funcionalidade ou comportamento que pode ser testado no sistema.',
      'É a ferramenta automatizada utilizada para executar scripts de validação em ambientes de produção.',
      'É o conjunto de dados brutos inseridos no banco de dados para simular o comportamento de usuários reais.',
      'É o documento formal que autoriza o encerramento do ciclo de desenvolvimento de uma aplicação.'
    ],
    correctAnswer: 1,
    explanation: 'O cenário de teste é uma descrição macro, focada no objetivo do teste, sem o detalhamento passo a passo.'
  },
  {
    id: 'qt2',
    topicId: 't-qt-cenarios',
    question: 'Ao definir o "foco" de um cenário de teste, o analista deve priorizar qual dos seguintes aspectos?',
    options: [
      'A lógica interna do código-fonte e a cobertura de linhas de programação (Unit Testing).',
      'A documentação técnica da arquitetura do servidor onde a aplicação está hospedada.',
      'O "o quê" deve ser testado, validando se uma funcionalidade atende ao requisito de ponta a ponta.',
      'O tempo exato de resposta de cada consulta SQL realizada pela aplicação.',
      'A especificação detalhada de cada clique e movimento do cursor do mouse durante a navegação.'
    ],
    correctAnswer: 2,
    explanation: 'Enquanto casos de teste focam no "como", os cenários focam no "o quê" deve ser testado em termos de negócio.'
  },
  {
    id: 'qt3',
    topicId: 't-qt-cenarios',
    question: 'Qual é a principal diferença conceitual entre um "Cenário de Teste" e um "Caso de Teste"?',
    options: [
      'O cenário é focado nos dados de entrada, enquanto o caso de teste é focado na interface visual.',
      'O cenário descreve o processo de instalação, enquanto o caso de teste descreve o uso cotidiano.',
      'O cenário é uma visão generalista do que testar; o caso de teste é a especificação detalhada de como testar.',
      'O cenário de teste é obrigatório apenas em métodos ágeis, enquanto o caso de teste é exclusivo do modelo cascata.',
      'O cenário de teste foca no hardware, enquanto o caso de teste foca exclusivamente no software.'
    ],
    correctAnswer: 2,
    explanation: 'O cenário de teste serve como base para derivar múltiplos casos de teste mais granulares.'
  },
  {
    id: 'qt4',
    topicId: 't-qt-cenarios',
    question: 'Sobre o processo de criação de um cenário de teste, é correto afirmar que ele deve ser derivado primordialmente de:',
    options: [
      'Requisitos de negócio, histórias de usuário ou documentos de especificação funcional.',
      'Relatórios de erros gerados após a implantação do sistema em ambiente de teste.',
      'Sugestões informais fornecidas pela equipe de marketing durante o lançamento do produto.',
      'Código-fonte já finalizado, analisando as funções que foram efetivamente programadas.',
      'Manuais de instrução de ferramentas de automação de terceiros.'
    ],
    correctAnswer: 0,
    explanation: 'Testes baseados em requisitos garantem que o software entregue o valor esperado pelo cliente.'
  },
  {
    id: 'qt5',
    topicId: 't-qt-cenarios',
    question: 'Em uma hierarquia de testes, onde se situam o cenário e o caso de teste em termos de granularidade?',
    options: [
      'O cenário de teste é mais granular e específico do que o caso de teste.',
      'Ambos possuem o mesmo nível de detalhamento e podem ser usados como sinônimos sem distinção.',
      'O caso de teste é uma unidade ampla que engloba múltiplos cenários de teste em sua estrutura.',
      'Um único cenário de teste pode dar origem a diversos casos de teste detalhados.',
      'O cenário de teste foca na infraestrutura, enquanto o caso de teste foca no design de experiência.'
    ],
    correctAnswer: 3,
    explanation: 'Um único cenário de negócio abrangente pode exigir diversos casos de teste (sucesso, erro, limites) para ser validado.'
  },
  {
    id: 'qt6',
    topicId: 't-qt-cenarios',
    question: 'Considere a funcionalidade "Login de Usuário". Qual das opções abaixo representa um "Cenário de Teste" adequado?',
    options: [
      "Inserir o e-mail 'teste@email.com', senha '123456' e clicar no botão 'Entrar'.",
      'Verificar se o sistema permite o acesso de um usuário com credenciais válidas.',
      'Abrir o navegador Chrome na versão 120 e acessar a URL principal do sistema.',
      'Alterar a cor do botão de login de azul para verde no arquivo CSS global.',
      'Consultar a tabela \'Users\' no banco de dados para verificar se o campo \'active\' é booleano.'
    ],
    correctAnswer: 1,
    explanation: '"Verificar se o sistema permite o acesso" é um objetivo funcional (cenário), enquanto "Inserir e-mail" é um passo técnico (caso de teste).'
  },
  {
    id: 'qt7',
    topicId: 't-qt-cenarios',
    question: 'Por que o cenário de teste é considerado fundamental para garantir a cobertura dos requisitos?',
    options: [
      'Porque ele substitui a necessidade de documentar os requisitos de negócio no início do projeto.',
      'Porque garante que todos os fluxos possíveis de uma funcionalidade sejam identificados antes do detalhamento técnico.',
      'Porque ele define automaticamente quais ferramentas de automação serão compradas pela empresa.',
      'Porque impede que o desenvolvedor altere o código sem a autorização prévia do cliente final.',
      'Porque sua criação depende exclusivamente da performance do banco de dados em situações de estresse.'
    ],
    correctAnswer: 1,
    explanation: 'Mapear cenários permite identificar caminhos críticos e alternativos do domínio do negócio precocemente.'
  },
  {
    id: 'qt8',
    topicId: 't-qt-cenarios',
    question: 'Durante a criação de cenários de teste, qual atividade é essencial para assegurar que o cenário seja eficaz?',
    options: [
      'Escrever o código-fonte da aplicação antes de pensar no que deve ser validado.',
      'Analisar profundamente o documento de requisitos para identificar caminhos de sucesso e de exceção.',
      'Definir imediatamente as variáveis de ambiente e as strings de conexão com o banco.',
      'Escolher a linguagem de programação que será usada na automação dos scripts.',
      'Revisar o currículo dos testadores que executarão o plano de testes manual.'
    ],
    correctAnswer: 1,
    explanation: 'Uma boa estratégia de teste cobre tanto o uso esperado quanto as situações de erro (caminho feliz e infeliz).'
  },
  {
    id: 'qt9',
    topicId: 't-qt-cenarios',
    question: 'Qual das alternativas melhor explica a relação entre "o quê" e "como" no contexto abordado na aula?',
    options: [
      'O cenário de teste responde ao "como", enquanto o caso de teste responde ao "o quê".',
      'O foco do cenário de teste é o "o quê" testar; o caso de teste detalha o "como" executar esse teste.',
      'Tanto o cenário quanto o caso de teste respondem apenas ao "como", ignorando o propósito do negócio.',
      'O "o quê" refere-se à linguagem de programação e o "como" refere-se ao framework utilizado.',
      'O cenário de teste ignora o "o quê" para focar exclusivamente na performance do hardware.'
    ],
    correctAnswer: 1,
    explanation: 'Esta distinção é fundamental para organizar a documentação de testes e garantir que o propósito não se perca no detalhe técnico.'
  },
  {
    id: 'qt10',
    topicId: 't-qt-cenarios',
    question: 'Um analista de testes decide criar cenários antes de detalhar os casos de teste. Essa abordagem é benéfica porque:',
    options: [
      'Permite uma visão holística da aplicação, facilitando a identificação de lacunas nos requisitos.',
      'Elimina totalmente a necessidade de criar casos de teste ou scripts de automação futuramente.',
      'Garante que o software não terá nenhum bug, independentemente da complexidade do código.',
      'Reduz o custo do projeto ao permitir que desenvolvedores não precisem ler os requisitos.',
      'Foca exclusivamente na interface gráfica, ignorando as regras de negócio complexas.'
    ],
    correctAnswer: 0,
    explanation: 'Ao pensar nos cenários, o analista pode perceber que faltam requisitos ou que existem ambiguidades na especificação.'
  }
];
