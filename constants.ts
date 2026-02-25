
import { Question } from './types';

export const QUIZ_DATABASE: Question[] = [
  // --- DESIGN PATTERNS (5 Questões) ---
  {
    id: 'dp1',
    topic: 'Design Patterns',
    question: 'Qual a definição principal do padrão criacional "Singleton"?',
    options: [
      'Garante que uma classe tenha múltiplas instâncias distribuídas em cluster.',
      'Garante que uma classe tenha apenas uma instância e fornece um ponto global de acesso a ela.',
      'Permite a criação de objetos sem especificar a classe exata do objeto a ser criado.',
      'Define uma dependência um-para-muitos entre objetos para notificação de mudanças.',
      'Converte a interface de uma classe em outra interface esperada pelos clientes.'
    ],
    correctAnswer: 1,
    explanation: 'O Singleton restringe a instanciação de uma classe a um único objeto "eterno" durante o ciclo de vida da aplicação.'
  },
  {
    id: 'dp2',
    topic: 'Design Patterns',
    question: 'O padrão comportamental "Strategy" serve primordialmente para:',
    options: [
      'Encapsular uma solicitação como um objeto, permitindo parametrizar clientes.',
      'Definir uma família de algoritmos, encapsular cada um deles e torná-los intercambiáveis.',
      'Garantir que um objeto possa ser clonado sem depender de suas classes concretas.',
      'Prover um substituto ou marcador de lugar para outro objeto para controlar o acesso a ele.',
      'Separar a construção de um objeto complexo de sua representação.'
    ],
    correctAnswer: 1,
    explanation: 'O Strategy permite que o algoritmo varie independentemente dos clientes que o utilizam, através de composição.'
  },
  {
    id: 'dp3',
    topic: 'Design Patterns',
    question: 'Qual padrão é utilizado para permitir que interfaces incompatíveis trabalhem juntas?',
    options: [
      'Observer',
      'Factory Method',
      'Adapter',
      'Facade',
      'Mediator'
    ],
    correctAnswer: 2,
    explanation: 'O Adapter atua como um tradutor entre duas interfaces que não poderiam se conectar diretamente.'
  },
  {
    id: 'dp4',
    topic: 'Design Patterns',
    question: 'O padrão "Observer" é comumente utilizado em quais cenários?',
    options: [
      'Criação de objetos complexos passo a passo.',
      'Sistemas orientados a eventos onde a mudança de estado de um objeto deve notificar outros.',
      'Onde é necessário reduzir o consumo de memória compartilhando objetos.',
      'Quando queremos evitar o acoplamento entre o remetente e o receptor de uma mensagem.',
      'Para restaurar o estado de um objeto ao seu estado anterior.'
    ],
    correctAnswer: 1,
    explanation: 'O Observer define uma dependência onde, quando um objeto muda de estado, seus dependentes são avisados.'
  },
  {
    id: 'dp5',
    topic: 'Design Patterns',
    question: 'Qual a característica do padrão "Factory Method"?',
    options: [
      'Ele utiliza herança para permitir que subclasses decidam qual classe instanciar.',
      'Ele obriga o uso de reflexão computacional para criar objetos em runtime.',
      'Ele garante que apenas objetos do tipo interface sejam retornados por métodos estáticos.',
      'Ele proíbe a criação de objetos fora de um contexto de banco de dados.',
      'Ele é um padrão arquitetural e não um padrão de design.'
    ],
    correctAnswer: 0,
    explanation: 'O Factory Method define uma interface para criar um objeto, mas deixa as subclasses decidirem qual classe instanciar.'
  },

  // --- DDD (5 Questões) ---
  {
    id: 'ddd1',
    topic: 'DDD',
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
    topic: 'DDD',
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
    topic: 'DDD',
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
    topic: 'DDD',
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
    topic: 'DDD',
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
    topic: 'DDD',
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
    topic: 'DDD',
    question: 'Qual a função de um "Domain Event" (Evento de Domínio)?',
    options: [
      'Capturar um clique do mouse na interface do usuário.',
      'Notificar outras partes do sistema sobre algo relevante que aconteceu no domínio.',
      'Agendar tarefas em segundo plano no sistema operacional.',
      'Registrar o tempo de resposta de uma consulta SQL.',
      'Validar se um formulário foi preenchido corretamente no frontend.'
    ],
    correctAnswer: 1,
    explanation: 'Eventos de domínio permitem o desacoplamento entre diferentes partes do sistema que precisam reagir a mudanças.'
  },
  {
    id: 'ddd8',
    topic: 'DDD',
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
    topic: 'DDD',
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
    topic: 'DDD',
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
    topic: 'DDD',
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
    topic: 'DDD',
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
    topic: 'DDD',
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
    topic: 'DDD',
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
    topic: 'DDD',
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
  },

  // --- ARQUITETURA MONOLÍTICA (5 Questões) ---
  {
    id: 'mono1',
    topic: 'Arquitetura Monolítica',
    question: 'Qual a principal característica de uma arquitetura Monolítica?',
    options: [
      'O sistema é dividido em pequenos serviços independentes que se comunicam via rede.',
      'A aplicação é construída como uma única unidade lógica e indivisível.',
      'Cada funcionalidade do sistema possui seu próprio banco de dados isolado.',
      'O código é obrigatoriamente escrito em uma linguagem funcional.',
      'O sistema não possui interface de usuário, operando apenas via linha de comando.'
    ],
    correctAnswer: 1,
    explanation: 'No monólito, todas as funções (UI, lógica de negócio, acesso a dados) compartilham o mesmo processo e base de código.'
  },
  {
    id: 'mono2',
    topic: 'Arquitetura Monolítica',
    question: 'Uma vantagem comum de sistemas monolíticos no início de um projeto é:',
    options: [
      'A extrema facilidade de escalar partes específicas do sistema de forma independente.',
      'Menor complexidade operacional e facilidade de testes integrados iniciais.',
      'A capacidade de usar centenas de tecnologias diferentes em cada módulo.',
      'O isolamento total de falhas entre as diferentes funcionalidades.',
      'A redução drástica do tempo de compilação em grandes bases de código.'
    ],
    correctAnswer: 1,
    explanation: 'Monólitos são simples de desenvolver, testar e fazer deploy quando o sistema ainda é pequeno.'
  },
  {
    id: 'mono3',
    topic: 'Arquitetura Monolítica',
    question: 'Qual o principal desafio de escalabilidade em um monólito?',
    options: [
      'Não é possível escalar o sistema horizontalmente em nenhum cenário.',
      'É necessário escalar toda a aplicação, mesmo que apenas uma função precise de mais recursos.',
      'O banco de dados de um monólito não pode ser replicado entre servidores.',
      'A rede interna do monólito fica sobrecarregada com chamadas RPC.',
      'A interface de usuário impede o balanceamento de carga (Load Balancing).'
    ],
    correctAnswer: 1,
    explanation: 'Se uma funcionalidade pesada exige mais memória, você deve replicar o monólito inteiro, desperdiçando recursos.'
  },
  {
    id: 'mono4',
    topic: 'Arquitetura Monolítica',
    question: 'O termo "Big Ball of Mud" (Grande Bola de Lama) refere-se a:',
    options: [
      'Uma técnica de compressão de dados utilizada em bancos legados.',
      'Um monólito que perdeu sua estrutura interna e tornou-se um emaranhado de dependências.',
      'Um padrão de design focado na criação de objetos dinâmicos.',
      'A arquitetura ideal recomendada para sistemas de alta performance.',
      'O processo de limpeza de código durante o refactoring.'
    ],
    correctAnswer: 1,
    explanation: 'Refere-se a sistemas sem arquitetura perceptível, onde qualquer mudança gera efeitos colaterais imprevisíveis.'
  },
  {
    id: 'mono5',
    topic: 'Arquitetura Monolítica',
    question: 'Como ocorre o deploy de uma aplicação monolítica típica?',
    options: [
      'Cada classe do sistema é enviada individualmente para o servidor.',
      'Todo o código é empacotado em um único artefato (ex: .jar, .war, .exe) e implantado.',
      'O deploy é feito via streaming de código diretamente para o navegador do usuário.',
      'Apenas as funções modificadas são enviadas para o servidor de produção.',
      'Não existe processo de deploy, pois o monólito roda apenas localmente.'
    ],
    correctAnswer: 1,
    explanation: 'A unidade de implantação única é o que define fisicamente o monólito.'
  },
  {
    id: 'mono6',
    topic: 'Arquitetura Monolítica',
    question: 'Qual o impacto de um bug crítico em um módulo de um sistema Monolítico?',
    options: [
      'Apenas o módulo afetado para de funcionar, mantendo o resto do sistema ativo.',
      'O bug pode derrubar a aplicação inteira, pois todos os módulos compartilham o mesmo processo.',
      'O sistema isola o bug automaticamente e continua operando normalmente.',
      'O bug é transferido para o banco de dados e resolvido via trigger.',
      'O compilador remove o código defeituoso em tempo de execução.'
    ],
    correctAnswer: 1,
    explanation: 'A falta de isolamento de falhas é uma das principais desvantagens de monólitos grandes.'
  },
  {
    id: 'mono7',
    topic: 'Arquitetura Monolítica',
    question: 'O que é um "Modular Monolith" (Monólito Modular)?',
    options: [
      'Um sistema de microsserviços que foi unido em um único banco de dados.',
      'Um monólito com separação lógica clara entre módulos, mas implantado como uma unidade.',
      'Um conjunto de aplicações independentes que não se comunicam.',
      'Um framework que permite criar plugins para navegadores web.',
      'Uma técnica de hardware para empilhar servidores em racks.'
    ],
    correctAnswer: 1,
    explanation: 'O monólito modular busca os benefícios de organização dos microsserviços sem a complexidade de rede.'
  },
  {
    id: 'mono8',
    topic: 'Arquitetura Monolítica',
    question: 'Por que o tempo de build tende a aumentar em monólitos grandes?',
    options: [
      'Porque o compilador precisa processar toda a base de código a cada mudança.',
      'Porque a internet fica mais lenta conforme o arquivo de código cresce.',
      'Porque o banco de dados exige uma reindexação total a cada compilação.',
      'Porque o sistema operacional limita o número de arquivos que podem ser lidos.',
      'Porque os desenvolvedores escrevem mais comentários em sistemas grandes.'
    ],
    correctAnswer: 0,
    explanation: 'Em grandes monólitos, mesmo uma mudança pequena pode exigir um ciclo completo de build e deploy.'
  },
  {
    id: 'mono9',
    topic: 'Arquitetura Monolítica',
    question: 'Qual o desafio de adotar novas tecnologias em um projeto Monolítico existente?',
    options: [
      'Não há desafios, pois monólitos aceitam qualquer tecnologia simultaneamente.',
      'É difícil adotar novas linguagens ou frameworks, pois o sistema está preso à stack inicial.',
      'O custo de licença de novas tecnologias é maior em sistemas monolíticos.',
      'As novas tecnologias não funcionam em servidores que rodam monólitos.',
      'A interface de usuário impede a atualização de bibliotecas de backend.'
    ],
    correctAnswer: 1,
    explanation: 'O "Technology Lock-in" é forte em monólitos; mudar a stack muitas vezes exige reescrever tudo.'
  },
  {
    id: 'mono10',
    topic: 'Arquitetura Monolítica',
    question: 'Como a escalabilidade horizontal funciona em um monólito?',
    options: [
      'Não é possível escalar horizontalmente, apenas verticalmente (mais CPU/RAM).',
      'Através da replicação de instâncias completas da aplicação atrás de um Load Balancer.',
      'Dividindo o código em arquivos menores e espalhando-os por vários servidores.',
      'Movendo apenas a camada de dados para um cluster de servidores.',
      'O monólito escala automaticamente usando inteligência artificial.'
    ],
    correctAnswer: 1,
    explanation: 'Você escala o monólito replicando a unidade inteira, o que pode ser ineficiente em termos de recursos.'
  },
  {
    id: 'mono11',
    topic: 'Arquitetura Monolítica',
    question: 'O que caracteriza o acoplamento em um monólito?',
    options: [
      'As chamadas entre módulos são feitas via rede (HTTP/gRPC).',
      'As chamadas entre módulos são feitas em memória, através de referências de código direto.',
      'Não existe acoplamento, pois os módulos são totalmente independentes.',
      'O acoplamento é definido apenas pelas chaves estrangeiras no banco de dados.',
      'O acoplamento ocorre apenas entre o frontend e o backend.'
    ],
    correctAnswer: 1,
    explanation: 'O acoplamento em memória é rápido, mas facilita a criação de dependências ocultas e complexas.'
  },
  {
    id: 'mono12',
    topic: 'Arquitetura Monolítica',
    question: 'Qual a principal dificuldade de testes de integração em grandes monólitos?',
    options: [
      'A falta de ferramentas de teste para linguagens usadas em monólitos.',
      'A necessidade de subir todo o sistema e suas dependências para validar um fluxo.',
      'O fato de que monólitos não permitem o uso de mocks ou stubs.',
      'A velocidade excessiva dos testes que impede a análise dos resultados.',
      'A interface gráfica que bloqueia a execução de testes automatizados.'
    ],
    correctAnswer: 1,
    explanation: 'Subir um monólito gigante para testes pode ser demorado e consumir muitos recursos de infraestrutura.'
  },
  {
    id: 'mono13',
    topic: 'Arquitetura Monolítica',
    question: 'O termo "Strangler Fig Pattern" (Padrão Figo Estrangulador) é usado para:',
    options: [
      'Aumentar a performance de consultas SQL em bancos legados.',
      'Migrar gradualmente funcionalidades de um monólito para microsserviços.',
      'Bloquear o acesso de usuários não autorizados ao sistema.',
      'Comprimir o tamanho do artefato final da aplicação.',
      'Remover código morto que não é mais utilizado no monólito.'
    ],
    correctAnswer: 1,
    explanation: 'Ele consiste em criar novos serviços em volta do monólito até que ele seja totalmente substituído.'
  },
  {
    id: 'mono14',
    topic: 'Arquitetura Monolítica',
    question: 'Em termos de transações, o monólito oferece a vantagem de:',
    options: [
      'Não precisar de transações, pois o código é síncrono.',
      'Facilidade em manter transações ACID (Atômicas, Consistentes, Isoladas e Duráveis).',
      'Substituir o banco de dados por arquivos de texto simples.',
      'Garantir que as transações nunca falhem, independente de erros de código.',
      'Permitir transações distribuídas sem o uso de protocolos complexos.'
    ],
    correctAnswer: 1,
    explanation: 'Como os dados costumam estar em um único banco, gerenciar transações é muito mais simples que em sistemas distribuídos.'
  },
  {
    id: 'mono15',
    topic: 'Arquitetura Monolítica',
    question: 'Qual o impacto do crescimento do time de desenvolvimento em um monólito?',
    options: [
      'A produtividade aumenta linearmente com o número de desenvolvedores.',
      'Conflitos de merge e coordenação tornam-se mais frequentes e complexos.',
      'O sistema divide o código automaticamente entre os novos membros.',
      'Não há impacto, pois cada desenvolvedor trabalha em sua própria cópia do sistema.',
      'O tempo de deploy diminui, pois há mais pessoas para realizar o processo.'
    ],
    correctAnswer: 1,
    explanation: 'Muitas pessoas mexendo na mesma base de código exige processos rigorosos de integração.'
  },

  // --- MICROSSERVIÇOS (5 Questões) ---
  {
    id: 'ms1',
    topic: 'Microsserviços',
    question: 'Qual o princípio fundamental da arquitetura de Microsserviços?',
    options: [
      'Centralizar todo o processamento em um único servidor potente.',
      'Dividir o sistema em serviços pequenos, autônomos e focados em um domínio.',
      'Obrigar o uso de comunicação síncrona via protocolos proprietários.',
      'Compartilhar o mesmo esquema de banco de dados entre todos os serviços.',
      'Eliminar a camada de rede para aumentar a performance das chamadas.'
    ],
    correctAnswer: 1,
    explanation: 'Serviços independentes permitem deploys separados, tecnologias distintas e escalabilidade granular.'
  },
  {
    id: 'ms2',
    topic: 'Microsserviços',
    question: 'O que significa o padrão "Database per Service"?',
    options: [
      'Cada usuário do sistema possui seu próprio banco de dados privado.',
      'Cada microsserviço gerencia seus próprios dados, sem acesso direto de outros serviços.',
      'O sistema utiliza apenas bancos de dados relacionais para garantir consistência.',
      'Todos os serviços devem ser salvos em um único arquivo de banco de dados SQL.',
      'A base de dados é deletada e recriada a cada novo deploy do serviço.'
    ],
    correctAnswer: 1,
    explanation: 'Isso garante o baixo acoplamento; um serviço não pode quebrar outro alterando tabelas.'
  },
  {
    id: 'ms3',
    topic: 'Microsserviços',
    question: 'Qual a função de um "API Gateway" nesta arquitetura?',
    options: [
      'Substituir o banco de dados central por um sistema de arquivos distribuído.',
      'Atuar como ponto único de entrada para encaminhar requisições aos serviços internos.',
      'Realizar a compilação do código-fonte em tempo real na nuvem.',
      'Bloquear o acesso de desenvolvedores ao ambiente de produção.',
      'Criptografar as senhas dos usuários antes de salvá-las no disco.'
    ],
    correctAnswer: 1,
    explanation: 'O Gateway simplifica a vida do cliente, oferecendo uma interface única para múltiplos serviços.'
  },
  {
    id: 'ms4',
    topic: 'Microsserviços',
    question: 'O que é a "Eventual Consistency" (Consistência Eventual)?',
    options: [
      'Um erro de sistema onde os dados nunca chegam a ficar consistentes.',
      'Um modelo onde os dados estarão consistentes em algum momento futuro, após a propagação.',
      'A garantia de que todas as transações de rede ocorrem em menos de 1 milisegundo.',
      'A prática de salvar dados apenas quando ocorre um evento de erro grave.',
      'O uso de backup físico para restaurar a consistência do HD.'
    ],
    correctAnswer: 1,
    explanation: 'Comum em sistemas distribuídos que usam eventos para comunicar mudanças entre serviços.'
  },
  {
    id: 'ms5',
    topic: 'Microsserviços',
    question: 'A arquitetura de microsserviços aumenta significativamente:',
    options: [
      'A facilidade de depuração (debugging) manual entre processos.',
      'A complexidade operacional e a necessidade de automação (DevOps).',
      'A velocidade de chamadas de função locais dentro do código.',
      'A simplicidade de manter transações ACID globais entre serviços.',
      'A dependência de uma única linguagem de programação para todo o sistema.'
    ],
    correctAnswer: 1,
    explanation: 'Gerenciar múltiplos serviços exige monitoramento, orquestração e CI/CD robustos.'
  },
  {
    id: 'ms6',
    topic: 'Microsserviços',
    question: 'O que é o padrão "Circuit Breaker" (Disjuntor)?',
    options: [
      'Um componente de hardware que desliga o servidor em caso de curto-circuito.',
      'Um padrão que impede que falhas em um serviço se propaguem para outros.',
      'Uma ferramenta de segurança que bloqueia ataques de força bruta.',
      'Um algoritmo que reduz o consumo de energia da CPU.',
      'Um sistema de backup que entra em ação quando o disco falha.'
    ],
    correctAnswer: 1,
    explanation: 'O Circuit Breaker "abre" quando detecta falhas repetidas, evitando sobrecarregar um serviço instável.'
  },
  {
    id: 'ms7',
    topic: 'Microsserviços',
    question: 'Qual a função do "Service Discovery" (Descoberta de Serviço)?',
    options: [
      'Encontrar desenvolvedores qualificados para trabalhar no projeto.',
      'Permitir que os serviços localizem uns aos outros dinamicamente na rede.',
      'Identificar quais serviços estão consumindo mais memória RAM.',
      'Gerar documentação automática para as APIs do sistema.',
      'Descobrir vulnerabilidades de segurança no código-fonte.'
    ],
    correctAnswer: 1,
    explanation: 'Em ambientes dinâmicos (nuvem), os endereços IP mudam constantemente; o Service Discovery resolve isso.'
  },
  {
    id: 'ms8',
    topic: 'Microsserviços',
    question: 'O que é "Distributed Tracing" (Rastreamento Distribuído)?',
    options: [
      'O acompanhamento físico de servidores em diferentes data centers.',
      'A capacidade de acompanhar o fluxo de uma requisição através de múltiplos serviços.',
      'Um sistema de GPS para rastrear dispositivos móveis dos usuários.',
      'O registro de todas as alterações feitas no banco de dados por um usuário.',
      'A visualização do tráfego de rede em tempo real no dashboard.'
    ],
    correctAnswer: 1,
    explanation: 'Ferramentas como Jaeger ou Zipkin ajudam a identificar gargalos e erros em fluxos complexos.'
  },
  {
    id: 'ms9',
    topic: 'Microsserviços',
    question: 'O padrão "Saga" é utilizado para resolver qual problema?',
    options: [
      'A lentidão no carregamento de imagens pesadas no frontend.',
      'A gestão de transações distribuídas entre múltiplos microsserviços.',
      'O versionamento de APIs que possuem mudanças que quebram a compatibilidade.',
      'A autenticação de usuários em sistemas que usam redes sociais.',
      'O armazenamento de grandes volumes de dados não estruturados.'
    ],
    correctAnswer: 1,
    explanation: 'Sagas coordenam sequências de transações locais para garantir a consistência global sem bloqueios longos.'
  },
  {
    id: 'ms10',
    topic: 'Microsserviços',
    question: 'O que caracteriza o padrão "Sidecar"?',
    options: [
      'Um serviço secundário que roda ao lado do serviço principal para fornecer recursos extras.',
      'Uma técnica de design para criar menus laterais em aplicações web.',
      'Um servidor de backup que armazena cópias dos logs de erro.',
      'Um dispositivo de hardware conectado via USB ao servidor.',
      'Um desenvolvedor assistente que revisa o código em tempo real.'
    ],
    correctAnswer: 0,
    explanation: 'Comum em Kubernetes, o Sidecar lida com tarefas como logging, monitoramento ou segurança de rede.'
  },
  {
    id: 'ms11',
    topic: 'Microsserviços',
    question: 'O que é um "Service Mesh" (Malha de Serviço)?',
    options: [
      'Uma rede física de cabos de fibra ótica que conecta os servidores.',
      'Uma camada de infraestrutura para gerenciar a comunicação entre serviços.',
      'Um framework para criar interfaces de usuário baseadas em grids.',
      'Um conjunto de regras de negócio que define como os serviços devem operar.',
      'Uma ferramenta de compressão de dados para transferências via rede.'
    ],
    correctAnswer: 1,
    explanation: 'Service Meshes (como Istio) lidam com tráfego, segurança e observabilidade de forma transparente.'
  },
  {
    id: 'ms12',
    topic: 'Microsserviços',
    question: 'Qual a importância de "Health Checks" (Verificações de Saúde)?',
    options: [
      'Garantir que os desenvolvedores façam pausas para descanso.',
      'Permitir que o orquestrador saiba se um serviço está pronto para receber tráfego.',
      'Verificar se a licença do sistema operacional ainda é válida.',
      'Monitorar a temperatura física dos processadores no data center.',
      'Validar se o usuário possui um plano de saúde ativo no sistema.'
    ],
    correctAnswer: 1,
    explanation: 'Health checks permitem a autorrecuperação (self-healing) ao reiniciar serviços travados.'
  },
  {
    id: 'ms13',
    topic: 'Microsserviços',
    question: 'O que é "Log Aggregation" (Agregação de Logs)?',
    options: [
      'A prática de deletar logs antigos para economizar espaço em disco.',
      'A centralização de logs de múltiplos serviços em um único local para análise.',
      'O uso de algoritmos de compressão para diminuir o tamanho dos arquivos de log.',
      'A tradução automática de mensagens de erro para o idioma local.',
      'A criação de logs manuais em cadernos de papel pelos operadores.'
    ],
    correctAnswer: 1,
    explanation: 'Centralizar logs (ex: ELK Stack) é vital para depurar problemas em sistemas distribuídos.'
  },
  {
    id: 'ms14',
    topic: 'Microsserviços',
    question: 'O que define um "Blue-Green Deployment"?',
    options: [
      'Uma técnica de design que usa apenas as cores azul e verde na interface.',
      'A manutenção de dois ambientes idênticos para reduzir o downtime e riscos.',
      'O processo de atualizar o sistema apenas durante o dia (Blue) e não à noite (Green).',
      'A separação entre o código de produção (Blue) e o código de teste (Green).',
      'O uso de energia solar (Green) para alimentar os servidores (Blue).'
    ],
    correctAnswer: 1,
    explanation: 'Permite virar a chave para a nova versão instantaneamente e voltar atrás se algo falhar.'
  },
  {
    id: 'ms15',
    topic: 'Microsserviços',
    question: 'Qual o objetivo de um "Canary Release"?',
    options: [
      'Testar a resistência do hardware a altas temperaturas.',
      'Liberar uma nova versão para um pequeno grupo de usuários antes do rollout total.',
      'Verificar se o sistema funciona em navegadores muito antigos.',
      'Detectar a presença de gases tóxicos no ambiente do data center.',
      'Garantir que a aplicação não consuma mais de 10% da CPU.'
    ],
    correctAnswer: 1,
    explanation: 'Ajuda a detectar problemas em produção com impacto mínimo antes de afetar todos os usuários.'
  },

  // --- PADRÃO MVC (5 Questões) ---
  {
    id: 'mvc1',
    topic: 'Padrão MVC',
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
    topic: 'Padrão MVC',
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
    topic: 'Padrão MVC',
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
    topic: 'Padrão MVC',
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
    topic: 'Padrão MVC',
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
  },

  // --- FRAMEWORKS (5 Questões) ---
  {
    id: 'fw1',
    topic: 'Frameworks',
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
    topic: 'Frameworks',
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
    topic: 'Frameworks',
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
    topic: 'Frameworks',
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
    topic: 'Frameworks',
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
  },

  // --- ARQUITETURA EM CAMADAS (5 Questões) ---
  {
    id: 'layer1',
    topic: 'Arquitetura em Camadas',
    question: 'Qual o objetivo primordial da arquitetura em camadas (Layered Architecture)?',
    options: [
      'Aumentar o número de arquivos no projeto para impressionar o cliente.',
      'Organizar o sistema em níveis de abstração com responsabilidades distintas.',
      'Impedir que o sistema seja traduzido para outros idiomas.',
      'Garantir que a interface de usuário carregue em menos de 100ms.',
      'Permitir que o código rode em processadores de múltiplos núcleos.'
    ],
    correctAnswer: 1,
    explanation: 'A separação facilita a substituição de componentes (ex: trocar o banco de dados sem afetar a UI).'
  },
  {
    id: 'layer2',
    topic: 'Arquitetura em Camadas',
    question: 'Em uma arquitetura de 3 camadas típica, quais são elas?',
    options: [
      'Entrada, Processamento e Saída.',
      'Apresentação (UI), Lógica de Negócio (BLL) e Acesso a Dados (DAL).',
      'Frontend, Backend e Fullstack.',
      'HTML, CSS e JavaScript.',
      'Hardware, Firmware e Software.'
    ],
    correctAnswer: 1,
    explanation: 'Essa é a divisão clássica que separa a tela, as regras e a persistência.'
  },
  {
    id: 'layer3',
    topic: 'Arquitetura em Camadas',
    question: 'A regra fundamental de dependência em camadas estabelece que:',
    options: [
      'Camadas inferiores podem chamar livremente funções de camadas superiores.',
      'Uma camada deve depender apenas da camada imediatamente abaixo dela.',
      'Todas as camadas devem depender simultaneamente da camada de interface.',
      'Não deve haver dependência entre as camadas para garantir o isolamento.',
      'As camadas devem ser lidas da direita para a esquerda pelo compilador.'
    ],
    correctAnswer: 1,
    explanation: 'O fluxo de dependência deve ser top-down para evitar acoplamento circular.'
  },
  {
    id: 'layer4',
    topic: 'Arquitetura em Camadas',
    question: 'Uma "Camada de Persistência" é responsável por:',
    options: [
      'Garantir que o usuário não desista de usar o sistema (UX).',
      'Gerenciar o armazenamento e recuperação de dados em meios permanentes.',
      'Manter a conexão de internet ativa durante todo o uso da aplicação.',
      'Salvar as preferências estéticas do usuário como cores e temas.',
      'Recuperar senhas esquecidas através de perguntas de segurança.'
    ],
    correctAnswer: 1,
    explanation: 'Ela abstrai o SQL ou o NoSQL para o restante do sistema.'
  },
  {
    id: 'layer5',
    topic: 'Arquitetura em Camadas',
    question: 'Qual a vantagem da "Interoperabilidade" em arquiteturas em camadas?',
    options: [
      'Poder trocar a implementação de uma camada sem alterar as outras.',
      'Obrigação de usar a mesma linguagem em todas as camadas do projeto.',
      'Redução da segurança, pois os dados passam por muitos níveis.',
      'Aumento do tempo de resposta devido à passagem de dados entre camadas.',
      'Facilidade de criar vírus que infectam todas as camadas simultaneamente.'
    ],
    correctAnswer: 0,
    explanation: 'Você pode trocar o banco SQL por MongoDB apenas mexendo na camada de dados.'
  },

  // --- REFATORAÇÃO (5 Questões) ---
  {
    id: 'ref1',
    topic: 'Refatoração',
    question: 'O que define o processo de "Refatoração" de código?',
    options: [
      'Adicionar novas funcionalidades ao sistema para atender pedidos do cliente.',
      'Alterar a estrutura interna do código sem modificar seu comportamento externo.',
      'Reescrever todo o sistema do zero usando uma tecnologia mais nova.',
      'Corrigir bugs críticos que estão causando quedas no servidor de produção.',
      'Remover todos os comentários para deixar o arquivo mais leve.'
    ],
    correctAnswer: 1,
    explanation: 'O objetivo é melhorar a legibilidade, reduzir complexidade e facilitar manutenção.'
  },
  {
    id: 'ref2',
    topic: 'Refatoração',
    question: 'O termo "Code Smell" (Cheiro de Código) indica:',
    options: [
      'Um erro de sintaxe que impede a compilação do programa.',
      'Um sintoma na estrutura do código que possivelmente indica um problema mais profundo.',
      'A presença de vírus ou malwares detectados pelo antivírus no código-fonte.',
      'Um comentário mal escrito que utiliza termos ofensivos ou inadequados.',
      'O tempo que o código ficou parado sem receber atualizações no repositório.'
    ],
    correctAnswer: 1,
    explanation: 'Code smells não são bugs, mas são sinais de que o código precisa de refatoração (ex: métodos longos).'
  },
  {
    id: 'ref3',
    topic: 'Refatoração',
    question: 'Qual o pré-requisito fundamental para uma refatoração segura?',
    options: [
      'Ter um computador com processador de última geração e muita RAM.',
      'Possuir uma suíte de testes automatizados confiável.',
      'Aprovação formal e assinada pelo CEO da empresa.',
      'Desligar o sistema para todos os usuários durante o processo.',
      'Converter todo o código para uma linguagem de tipagem forte.'
    ],
    correctAnswer: 1,
    explanation: 'Sem testes, você não tem garantia de que o comportamento externo permanece o mesmo.'
  },
  {
    id: 'ref4',
    topic: 'Refatoração',
    question: 'O ciclo "Red-Green-Refactor" faz parte de qual metodologia?',
    options: [
      'Criação de paletas de cores para interfaces de usuário.',
      'Test-Driven Development (TDD).',
      'Gerenciamento de tráfego em redes de alta velocidade.',
      'Processo de deploy contínuo em ambientes de nuvem.',
      'Instalação de sistemas operacionais baseados em Linux.'
    ],
    correctAnswer: 1,
    explanation: 'Escreva um teste que falha (Red), faça-o passar (Green) e então melhore o código (Refactor).'
  },
  {
    id: 'ref5',
    topic: 'Refatoração',
    question: 'A técnica "Extract Method" (Extrair Método) serve para:',
    options: [
      'Remover métodos que não são utilizados em nenhuma parte do sistema.',
      'Transformar um trecho de código complexo dentro de um método em um novo método.',
      'Copiar um método de uma classe para outra para duplicar funcionalidade.',
      'Exportar o código para um arquivo de texto externo para documentação.',
      'Criptografar o nome do método para dificultar a engenharia reversa.'
    ],
    correctAnswer: 1,
    explanation: 'Ajuda a diminuir o tamanho de métodos gigantes e melhora a clareza do código.'
  }
];
