import { Question } from '../../../types';

export const DDD_QUESTIONS: Question[] = [
  {
    id: 'ddd1',
    topicId: 't-ddd',
    question: 'O que representa o conceito de "Linguagem Ubíqua" (Ubiquitous Language) no DDD?',
    options: [
      'Uma linguagem de programação universal que funciona em qualquer sistema operacional.',
      'Um vocabulário comum compartilhado por desenvolvedores e especialistas de domínio.',
      'A tradução automática do código-fonte para múltiplos idiomas humanos.',
      'Um conjunto de termos técnicos que apenas arquitetos de software devem conhecer.',
      'A padronização de nomes de variáveis seguindo a convenção CamelCase.'
    ],
    correctAnswer: 1,
    explanation: 'A Linguagem Ubíqua visa eliminar falhas de comunicação entre o negócio e o desenvolvimento.'
  },
  {
    id: 'ddd2',
    topicId: 't-ddd',
    question: 'No DDD, qual a principal diferença entre uma "Entidade" (Entity) e um "Objeto de Valor" (Value Object)?',
    options: [
      'Entidades são salvas no banco de dados e Value Objects ficam apenas na memória.',
      'Entidades possuem identidade única e contínua; Value Objects são definidos apenas por seus atributos.',
      'Value Objects possuem ID autoincrementável e Entidades são imutáveis.',
      'Entidades são classes abstratas e Value Objects são interfaces concretas.',
      'Não há diferença técnica entre os dois conceitos no domínio.'
    ],
    correctAnswer: 1,
    explanation: 'Uma Entidade é reconhecida por sua identidade (ex: CPF), enquanto um VO é definido pelo valor (ex: Cor, Endereço).'
  },
  {
    id: 'ddd3',
    topicId: 't-ddd',
    question: 'O que define um "Bounded Context" (Contexto Delimitado)?',
    options: [
      'A limitação física de memória RAM que um microsserviço pode consumir.',
      'Uma fronteira lógica onde um modelo de domínio particular é definido e aplicado.',
      'O tempo máximo que uma transação de banco de dados pode durar.',
      'A separação entre o código de frontend e o código de backend.',
      'O limite de requisições por segundo que uma API pode processar.'
    ],
    correctAnswer: 1,
    explanation: 'Bounded Contexts ajudam a lidar com modelos grandes, dividindo-os em partes menores e independentes.'
  },
  {
    id: 'ddd4',
    topicId: 't-ddd',
    question: 'Qual a função de um "Agregado" (Aggregate) no DDD?',
    options: [
      'Realizar a soma de valores numéricos em uma coleção de objetos.',
      'Agrupar objetos de domínio que devem ser tratados como uma unidade para mudanças de dados.',
      'Conectar o sistema a múltiplos bancos de dados simultaneamente.',
      'Gerar relatórios estatísticos baseados em logs de erro da aplicação.',
      'Substituir o uso de frameworks de persistência como Hibernate ou Entity Framework.'
    ],
    correctAnswer: 1,
    explanation: 'O Agregado garante a consistência transacional dentro de sua fronteira, liderado por uma Aggregate Root.'
  },
  {
    id: 'ddd5',
    topicId: 't-ddd',
    question: 'O padrão "Repository" no DDD tem como objetivo:',
    options: [
      'Armazenar arquivos estáticos como imagens e CSS em um servidor CDN.',
      'Mediar entre as camadas de domínio e persistência, agindo como uma coleção em memória.',
      'Criar backups automáticos do código-fonte no GitHub ou GitLab.',
      'Controlar o versionamento de pacotes NuGet ou NPM no projeto.',
      'Definir a estrutura física das tabelas no banco de dados relacional.'
    ],
    correctAnswer: 1,
    explanation: 'Repositories permitem que o domínio ignore os detalhes de como os dados são salvos ou recuperados.'
  },
  {
    id: 'ddd6',
    topicId: 't-ddd',
    question: 'O que é um "Context Mapping" (Mapeamento de Contexto) no DDD?',
    options: [
      'Um diagrama que mostra a topologia física dos servidores de banco de dados.',
      'Uma ferramenta para visualizar as relações e fluxos de dados entre diferentes Bounded Contexts.',
      'O processo de mapear classes Java para tabelas SQL usando Hibernate.',
      'Um mapa térmico que indica quais partes do código são mais acessadas.',
      'A definição de rotas de navegação em uma aplicação Single Page (SPA).'
    ],
    correctAnswer: 1,
    explanation: 'O Context Mapping ajuda a entender como os diferentes modelos de domínio interagem e se integram.'
  },
  {
    id: 'ddd7',
    topicId: 't-ddd',
    question: 'Qual a função de um "Domain Event" (Evento de Domínio)?',
    options: [
      'Capturar um clique do mouse na interface do usuário.',
      'Notificar outras partes do sistema sobre algo relevante que aconteceu no domínio.',
      'Agendar tarefas em segundo plano no sistema operacional.',
      'Registrar o tempo de resposta de uma consulta SQL.',
      'Validar se um formulário foi preenchido corretamente no frontend.'
    ],
    correctAnswer: 1,
    explanation: 'Eventos de domínio permitem o desacoplamento entre differentes partes do sistema que precisam reagir a mudanças.'
  },
  {
    id: 'ddd8',
    topicId: 't-ddd',
    question: 'O que caracteriza um "Domain Service" (Serviço de Domínio)?',
    options: [
      'Uma operação que não pertence naturalmente a uma Entidade ou Objeto de Valor.',
      'Um serviço que lida exclusivamente com o envio de e-mails e SMS.',
      'Uma classe que gerencia a conexão direta com o driver do banco de dados.',
      'Um componente de interface que renderiza menus dinâmicos.',
      'Um script de automação para deploy em servidores de homologação.'
    ],
    correctAnswer: 0,
    explanation: 'Serviços de domínio são usados para lógicas que envolvem múltiplos objetos de domínio ou que não têm um "dono" claro.'
  },
  {
    id: 'ddd9',
    topicId: 't-ddd',
    question: 'No DDD, a "Camada de Aplicação" (Application Layer) deve:',
    options: [
      'Conter toda a lógica complexa de regras de negócio do domínio.',
      'Orquestrar as tarefas e delegar o trabalho para os objetos de domínio.',
      'Definir o layout visual e as cores da aplicação.',
      'Realizar consultas SQL complexas diretamente no banco de dados.',
      'Gerenciar o sistema de arquivos e permissões do servidor.'
    ],
    correctAnswer: 1,
    explanation: 'A camada de aplicação é fina e coordena as ações, enquanto a lógica de negócio reside na camada de domínio.'
  },
  {
    id: 'ddd10',
    topicId: 't-ddd',
    question: 'O que é um "Shared Kernel" (Núcleo Compartilhado)?',
    options: [
      'Um processador compartilhado entre múltiplos servidores virtuais.',
      'Uma parte do domínio que é compartilhada entre dois ou mais Bounded Contexts.',
      'Um banco de dados centralizado que armazena todas as tabelas do sistema.',
      'Um repositório Git onde todos os desenvolvedores têm permissão de escrita.',
      'Uma biblioteca de componentes visuais usada por diferentes times.'
    ],
    correctAnswer: 1,
    explanation: 'O Shared Kernel exige coordenação próxima entre os times, pois mudanças afetam todos os contextos que o utilizam.'
  },
  {
    id: 'ddd11',
    topicId: 't-ddd',
    question: 'Qual o propósito de uma "Anti-Corruption Layer" (Camada Anticorrupção)?',
    options: [
      'Evitar que hackers invadam o banco de dados da aplicação.',
      'Impedir que modelos externos ou legados poluam o modelo de domínio interno.',
      'Garantir que o código siga rigorosamente os padrões de indentação.',
      'Verificar a integridade física dos arquivos de log do sistema.',
      'Bloquear o uso de bibliotecas de terceiros que não tenham licença MIT.'
    ],
    correctAnswer: 1,
    explanation: 'Ela atua como um tradutor que isola o domínio interno de mudanças ou complexidades de sistemas externos.'
  },
  {
    id: 'ddd12',
    topicId: 't-ddd',
    question: 'O padrão "Factory" no contexto do DDD é utilizado para:',
    options: [
      'Criar instâncias de objetos complexos ou Agregados, garantindo sua validade inicial.',
      'Gerar relatórios em PDF baseados em templates HTML.',
      'Automatizar a criação de tabelas no banco de dados durante o startup.',
      'Produzir logs de auditoria para cada transação realizada pelo usuário.',
      'Instalar dependências do projeto de forma automática.'
    ],
    correctAnswer: 0,
    explanation: 'Factories encapsulam a lógica de criação, garantindo que o objeto nasça em um estado consistente.'
  },
  {
    id: 'ddd13',
    topicId: 't-ddd',
    question: 'O que define o "Strategic Design" (Design Estratégico) no DDD?',
    options: [
      'A escolha das cores e fontes que serão usadas no dashboard.',
      'A definição de Bounded Contexts, Linguagem Ubíqua e Context Maps.',
      'A seleção do provedor de nuvem (AWS, Azure ou Google Cloud).',
      'O planejamento financeiro do projeto de software.',
      'A definição de quais frameworks JavaScript serão usados no frontend.'
    ],
    correctAnswer: 1,
    explanation: 'O design estratégico foca na organização em larga escala e na integridade do modelo de domínio.'
  },
  {
    id: 'ddd14',
    topicId: 't-ddd',
    question: 'O que caracteriza o "Tactical Design" (Design Tático) no DDD?',
    options: [
      'A negociação de prazos com os stakeholders do projeto.',
      'O uso de padrões como Entidades, VOs, Agregados, Repositórios e Serviços.',
      'A configuração de firewalls e regras de segurança de rede.',
      'O treinamento de novos desenvolvedores na cultura da empresa.',
      'A escrita de manuais de usuário e documentação de ajuda.'
    ],
    correctAnswer: 1,
    explanation: 'O design tático fornece as ferramentas de modelagem para implementar os modelos de domínio dentro de um contexto.'
  },
  {
    id: 'ddd15',
    topicId: 't-ddd',
    question: 'Qual a importância da "Aggregate Root" (Raiz do Agregado)?',
    options: [
      'Ela é o único ponto de acesso para objetos fora do Agregado, garantindo consistência.',
      'Ela define a URL base de todas as APIs do sistema.',
      'Ela é a classe principal que contém o método "main" da aplicação.',
      'Ela armazena as configurações de conexão com o banco de dados.',
      'Ela é responsável por renderizar o componente principal da interface.'
    ],
    correctAnswer: 0,
    explanation: 'A Raiz do Agregado protege a integridade de todos os objetos dentro da fronteira do Agregado.'
  }
];
