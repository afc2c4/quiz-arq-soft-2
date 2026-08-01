import { StudyMaterial, Topic } from '../../types';

export const STUDY_MATERIALS: Record<string, StudyMaterial> = {
  // --- ARQUITETURA DE SOFTWARE ---

  // 1. Design Patterns
  't-dp': {
    topicId: 't-dp',
    topicName: 'Design Patterns',
    introduction: [
      'No desenvolvimento de software corporativo, equipes frequentemente enfrentam desafios recorrentes na estruturação do código, tais como alto acoplamento, dificuldades em estender funcionalidades e complexidade na instanciação de objetos. O uso de soluções ad-hoc leva a código frágil, difícil de testar e com alto custo de manutenção.',
      'Os Padrões de Projeto (Design Patterns) fornecem um vocabulário padronizado e soluções refinadas, comprovadas pela indústria, para resolver esses problemas arquiteturais. Eles se dividem nas categorias Criacionais (foco em instanciação), Estruturais (composição de classes) e Comportamentais (comunicação entre objetos), posicionando-se na camada de design e domínio da aplicação.'
    ],
    theoreticalFoundation: {
      description: 'Design Patterns apoiam-se fortemente em princípios de Orientação a Objetos e no SOLID, em especial no Princípio Aberto/Fechado (OCP) e na Inversão de Dependência (DIP). O padrão Strategy, por exemplo, encapsula algoritmos em famílias intercambiáveis, permitindo alterar o comportamento do sistema sem modificar o cliente.',
      asciiDiagram: `[ Cliente ] ──> [ Interface Strategy ]
                       ▲           ▲
                       │           │
            [ Concrete Strategy A ]  [ Concrete Strategy B ]`
    },
    codeSnippet: {
      title: 'Padrão Strategy com Inversão de Dependência',
      language: 'typescript',
      code: `interface PaymentStrategy {
  process(amount: number): Promise<boolean>;
}

class PixPayment implements PaymentStrategy {
  async process(amount: number): Promise<boolean> {
    return amount > 0;
  }
}

class PaymentProcessor {
  constructor(private strategy: PaymentStrategy) {}

  async execute(amount: number) {
    return await this.strategy.process(amount);
  }
}`
    },
    syntaxDeconstruction: [
      {
        lineOrKeyword: 'interface PaymentStrategy',
        spokenReasoning: 'Definimos o contrato abstrato que todos os métodos de pagamento concretos devem obrigatoriamente implementar.',
        sideEffect: 'Gera uma barreira de acoplamento em tempo de compilação; o cliente dependerá apenas da abstração.'
      },
      {
        lineOrKeyword: 'implements PaymentStrategy',
        spokenReasoning: 'Garantimos que a classe PixPayment possui a assinatura exata exigida para processar pagamentos via PIX.',
        sideEffect: 'O compilador TypeScript valida a concordância de tipos e métodos da interface em tempo de compilação.'
      },
      {
        lineOrKeyword: 'constructor(private strategy: PaymentStrategy)',
        spokenReasoning: 'Aplicamos injeção de dependência via construtor, recebendo a estratégia selecionada externamente.',
        sideEffect: 'Armazena a referência no campo privado da instância sem acoplar a classe a uma implementação concreta.'
      },
      {
        lineOrKeyword: 'await this.strategy.process(amount)',
        spokenReasoning: 'Delegamos a execução real da regra de pagamento para o objeto concreto encapsulado.',
        sideEffect: 'Invocação polimórfica dinamica de método em tempo de execução sem condicionais (if/else ou switch).'
      }
    ],
    bestPracticesAndPitfalls: [
      'Evite aplicar Design Patterns prematuramente antes de entender a real necessidade de flexibilidade (Over-engineering).',
      'Cuidado para não transformar o Singleton em um antipadrão de estado global difícil de mockar em testes unitários.',
      'Sempre prefira composição sobre herança para estender funcionalidades dinamicamente.'
    ]
  },

  // 2. Domain-Driven Design (DDD)
  't-ddd': {
    topicId: 't-ddd',
    topicName: 'Domain-Driven Design (DDD)',
    summary: 'Modelagem orientada ao domínio do negócio com Linguagem Ubíqua e Bounded Contexts.',
    introduction: [
      'Sistemas corporativos falham frequentemente não por problemas técnicos, mas devido a uma desconexão profunda entre as regras de negócio dos especialistas de domínio e a implementação do código pelos desenvolvedores. Termos ambíguos e regras dispersas criam o chamado Modelo Anêmico.',
      'O Domain-Driven Design (DDD) resolve esse desalinhamento estabelecendo uma Linguagem Ubíqua (vocabulário comum) e delimitando fronteiras explícitas através de Contextos Delimitados (Bounded Contexts). Ele se posiciona no coração da arquitetura de software, isolando as regras de negócio puras da infraestrutura técnica.'
    ],
    theoreticalFoundation: {
      description: 'O DDD divide o sistema em Camada de Domínio (Entidades, Value Objects, Agregados), Aplicação (Casos de uso) e Infraestrutura. Agregados garantem consistência transacional, enquanto Value Objects são objetos imutáveis validados por atribuição e sem identidade própria.',
      asciiDiagram: `[ UI / Controller ]
        │
[ Application Service ] ──> [ Aggregate Root ]
                                 │
                         [ Value Object ]`
    },
    codeSnippet: {
      title: 'Value Object Imutável de CPF no Domínio',
      language: 'typescript',
      code: `export class CPF {
  private readonly value: string;

  constructor(rawCpf: string) {
    const cleaned = rawCpf.replace(/\\D/g, '');
    if (cleaned.length !== 11) {
      throw new Error('CPF deve possuir 11 dígitos');
    }
    this.value = cleaned;
  }

  public getValue(): string {
    return this.value;
  }
}`
    },
    syntaxDeconstruction: [
      {
        lineOrKeyword: 'export class CPF',
        spokenReasoning: 'Criamos um Value Object para encapsular tanto o dado do CPF quanto sua regra intrínseca de validação.',
        sideEffect: 'Garante que nenhum CPF inválido seja instanciado em qualquer parte do sistema.'
      },
      {
        lineOrKeyword: 'private readonly value: string',
        spokenReasoning: 'Declaramos a propriedade como privada e readonly para assegurar a imutabilidade absoluta do Value Object.',
        sideEffect: 'Impede modificações colaterais no estado do objeto após sua construção na memória Heap.'
      },
      {
        lineOrKeyword: 'throw new Error(...)',
        spokenReasoning: 'Lançamos uma exceção imediatamente caso o valor fornecido viole a invariante do negócio.',
        sideEffect: 'Interrompe o fluxo de execução e impede a criação de instâncias com estado inconsistente.'
      },
      {
        lineOrKeyword: 'public getValue(): string',
        spokenReasoning: 'Fornecemos um método de leitura limpo sem expor setters para alteração de dados.',
        sideEffect: 'Permite acesso seguro ao dado interno sanitizado.'
      }
    ],
    bestPracticesAndPitfalls: [
      'Evite Modelos Anêmicos onde as Entidades possuem apenas getters e setters sem nenhuma lógica de negócio.',
      'Não misture anotações de frameworks de ORM/Banco de Dados diretamente dentro das classes de Domínio puro.',
      'Garanta que a validação de formato ocorra dentro do próprio Value Object no momento da criação.'
    ]
  },

  // 3. Arquitetura Monolítica
  't-mono': {
    topicId: 't-mono',
    topicName: 'Arquitetura Monolítica',
    topicId_ref: 't-mono',
    introduction: [
      'Ao iniciar um novo projeto de software ou produto, a sobrecarga operacional de gerenciar múltiplos serviços distribuídos pode atrasar o lançamento e introduzir latência de rede desnecessária. A necessidade imediata é validar hipóteses com rapidez e baixo custo.',
      'A Arquitetura Monolítica consolida todas as funções do sistema (interface, regras de negócio e persistência) em um único código-fonte e artefato de implantação. Ela se posiciona como uma escolha arquitetural eficiente para o início do ciclo de vida do produto.'
    ],
    theoreticalFoundation: {
      description: 'Em um monólito, os módulos do sistema comunicam-se diretamente em memória por meio de chamadas de funções e métodos locais, eliminando a serialização HTTP/gRPC. Um "Monólito Modular" mantém limites de pacotes bem definidos.',
      asciiDiagram: `┌─────────────────────────────────────────┐
│              MONÓLITO                   │
│ [ Módulo Usuários ] ──> [ Módulo Pedidos]│
│                     │                   │
│                     ▼                   │
│             [ Banco de Dados ]          │
└─────────────────────────────────────────┘`
    },
    codeSnippet: {
      title: 'Comunicação Direta em Memória em Monólito Modular',
      language: 'typescript',
      code: `class OrderService {
  constructor(private userService: UserService) {}

  async createOrder(userId: string, items: string[]) {
    const user = await this.userService.findUserById(userId);
    if (!user.isActive) throw new Error('Usuário inativo');
    return { id: 'ORD-101', status: 'PAID' };
  }
}`
    },
    syntaxDeconstruction: [
      {
        lineOrKeyword: 'constructor(private userService: UserService)',
        spokenReasoning: 'Injetamos diretamente a instância do serviço de outro módulo da mesma aplicação.',
        sideEffect: 'Associa a dependência em memória sem custo de chamada I/O ou transporte via rede.'
      },
      {
        lineOrKeyword: 'await this.userService.findUserById(...)',
        spokenReasoning: 'Executamos uma chamada assíncrona local para consultar dados do usuário.',
        sideEffect: 'Executa a busca dentro da mesma thread do processo Node.js com latência em microssegundos.'
      },
      {
        lineOrKeyword: 'if (!user.isActive) throw new Error(...)',
        spokenReasoning: 'Validamos a regra de negócio localmente com base na resposta do objeto em memória.',
        sideEffect: 'Aborta a transação no código sem necessidade de chamadas de rollback distribuídas (Saga).'
      }
    ],
    bestPracticesAndPitfalls: [
      'Evite o "Grande Novelo de Lama" (Big Ball of Mud) organizando o código em módulos isolados por pasta e contexto.',
      'Não acesse tabelas de bancos de dados de outros módulos sem passar pela camada de serviço responsável.',
      'Lembre-se de que monólitos bem projetados são extremamente fáceis de testar e implantar.'
    ]
  },

  // 4. Microsserviços
  't-ms': {
    topicId: 't-ms',
    topicName: 'Microsserviços',
    introduction: [
      'À medida que organizações e equipes de engenharia crescem, bases de código monolíticas grandes podem gerar gargalos de implantação, conflitos de mesclagem constantes e limitações na escalabilidade individual de componentes críticos.',
      'A arquitetura de Microsserviços decompõe o aplicativo em um conjunto de serviços autônomos, pequenos e fracamente acoplados, implantados de forma independente. Cada serviço possui seu próprio domínio e banco de dados isolado.'
    ],
    theoreticalFoundation: {
      description: 'Microsserviços exigem o padrão "Database per Service" para impedir acoplamento no nível de dados. A comunicação assíncrona orientada a eventos (Event-Driven) garante resiliência e alta disponibilidade.',
      asciiDiagram: `[ API Gateway ]
   ├──> [ Serviço Pedidos ]  ──> ( DB Pedidos )
   │           │ (Evento)
   │           ▼
   └──> [ Serviço Pagamentos ] ──> ( DB Pagamentos )`
    },
    codeSnippet: {
      title: 'Emissão de Evento Assíncrono Desacoplado',
      language: 'typescript',
      code: `import { EventEmitter } from 'events';

const eventBus = new EventEmitter();

// Emissão de evento de domínio
eventBus.emit('ORDER_CREATED', {
  orderId: 'ORD-99',
  amount: 250.00
});

// Escuta assíncrona por outro serviço
eventBus.on('ORDER_CREATED', async (data) => {
  console.log(\`Processando cobrança do pedido \${data.orderId}\`);
});`
    },
    syntaxDeconstruction: [
      {
        lineOrKeyword: 'eventBus.emit(\'ORDER_CREATED\', ...)',
        spokenReasoning: 'Publicamos um evento informando que um pedido foi criado sem esperar a resposta dos consumidores.',
        sideEffect: 'Dispara uma notificação para o barramento de eventos sem bloquear a thread do serviço produtor.'
      },
      {
        lineOrKeyword: 'eventBus.on(\'ORDER_CREATED\', async (data) => ...)',
        spokenReasoning: 'O consumidor de pagamentos registra um ouvinte para reagir assincronamente ao evento.',
        sideEffect: 'Executa o callback na Fila de Microtasks assim que a mensagem é desempilhada do Event Loop.'
      }
    ],
    bestPracticesAndPitfalls: [
      'Nunca compartilhe o mesmo banco de dados relacional entre múltiplos microsserviços.',
      'Cuidado para não criar um "Monólito Distribuído", onde falhas em um serviço derrubam em cascata os demais.',
      'Implemente rastreamento distribuído (Distributed Tracing) e Circuit Breaker para garantir resiliência.'
    ]
  },

  // 5. Padrão MVC
  't-mvc': {
    topicId: 't-mvc',
    topicName: 'Padrão MVC',
    introduction: [
      'A mistura de lógica de banco de dados, regras de negócio e formatação de interface gráfica dentro do mesmo arquivo gera um código confuso e impossível de manter. Alterações visuais acabam quebrando a persistência de dados.',
      'O padrão Model-View-Controller (MVC) resolve essa confusão dividindo as responsabilidades em três camadas bem definidas: Model (dados e regras), View (apresentação) e Controller (intermediação de requisições e controle de fluxo).'
    ],
    theoreticalFoundation: {
      description: 'O fluxo MVC segue um ciclo claro: o usuário interage com a View, enviando uma requisição ao Controller. O Controller processa os dados de entrada, aciona as regras no Model e seleciona a View correspondente para renderizar a resposta.',
      asciiDiagram: `[ Usuário ] ──> [ Controller ] ──> [ Model ]
                      │                  │
                      ▼                  ▼
                   [ View ] <────── (Atualiza)`
    },
    codeSnippet: {
      title: 'Controller Magro em Express/MVC',
      language: 'typescript',
      code: `import { Request, Response } from 'express';

export class UserController {
  static async getProfile(req: Request, res: Response) {
    try {
      const user = await UserModel.findById(req.params.id);
      return res.render('profile-view', { user });
    } catch (error) {
      return res.status(500).render('error-view');
    }
  }
}`
    },
    syntaxDeconstruction: [
      {
        lineOrKeyword: 'static async getProfile(req: Request, res: Response)',
        spokenReasoning: 'Definimos um método manipulador de rota que recebe os objetos de requisição e resposta do Express.',
        sideEffect: 'Atua como ponto de entrada para a requisição HTTP tratada pelo middleware do servidor.'
      },
      {
        lineOrKeyword: 'await UserModel.findById(req.params.id)',
        spokenReasoning: 'Delegamos a busca do usuário inteiramente para a camada do Model.',
        sideEffect: 'Executa a consulta de dados de forma assíncrona sem expor SQL ou detalhes da camada de persistência.'
      },
      {
        lineOrKeyword: 'return res.render(\'profile-view\', { user })',
        spokenReasoning: 'Invocamos o motor de visualização passando os dados do modelo para renderizar o HTML final.',
        sideEffect: 'Compila a View com o contexto fornecido e envia a resposta com o Content-Type text/html.'
      }
    ],
    bestPracticesAndPitfalls: [
      'Adote a regra "Fat Model, Thin Controller": mantenha os controllers enxutos e a lógica de negócio no Model/Services.',
      'Impeça que a View consulte diretamente fontes de dados ou execute instruções SQL.',
      'Sempre trate exceções e retorne páginas de erro amigáveis ao usuário.'
    ]
  },

  // --- FRONTEND DEVELOPMENT ---

  // 6. HTML5
  't-fe-html5': {
    topicId: 't-fe-html5',
    topicName: 'HTML5',
    introduction: [
      'Nas versões antigas da web, o layout era estruturado utilizando apenas elementos genéricos `<div>` com classes arbitrárias, o que dificultava o trabalho dos motores de busca (SEO) e inviabilizava a navegação por leitores de tela para pessoas com deficiência.',
      'O HTML5 introduziu a semântica nativa e APIs estruturais, permitindo descrever o exato significado do conteúdo da página. Ele se posiciona como o esqueleto fundamental e a camada de significado do ecossistema Web.'
    ],
    theoreticalFoundation: {
      description: 'O HTML5 constrói a Árvore do DOM (Document Object Model) com tags semânticas como `<header>`, `<nav>`, `<main>`, `<article>`, `<section>` e `<footer>`, fornecendo papéis acessíveis nativos (ARIA) sem dependência de scripts.',
      asciiDiagram: `<html>
  └── <body>
       ├── <header> [ Logotipo / Navegação ]
       ├── <main>   [ Conteúdo Principal ]
       └── <footer> [ Rodapé e Direitos ]`
    },
    codeSnippet: {
      title: 'Estrutura Semântica e Acessível em HTML5',
      language: 'html',
      code: `<main>
  <article>
    <header>
      <h1>Acessibilidade e Semântica no HTML5</h1>
      <time datetime="2026-08-01">01 de Agosto de 2026</time>
    </header>
    <p>Tags semânticas melhoram a indexação SEO e a leitura por leitores de tela.</p>
  </article>
</main>`
    },
    syntaxDeconstruction: [
      {
        lineOrKeyword: '<main>',
        spokenReasoning: 'Informamos ao navegador e assistentes de voz onde começa o conteúdo único e principal da página.',
        sideEffect: 'Cria um marco semântico de referência (landmark) na árvore de acessibilidade do sistema operacional.'
      },
      {
        lineOrKeyword: '<article>',
        spokenReasoning: 'Encapsulamos um conteúdo autocontido que faz sentido e pode ser distribuído independentemente.',
        sideEffect: 'Define um escopo isolado de publicação para leitores e robôs de busca.'
      },
      {
        lineOrKeyword: '<time datetime="2026-08-01">',
        spokenReasoning: 'Formatamos uma data de maneira legível tanto para humanos quanto para algoritmos de computadores.',
        sideEffect: 'Permite que navegadores e crawlers interpretem a data exata em formato ISO padronizado.'
      }
    ],
    bestPracticesAndPitfalls: [
      'Evite a "Divsitis": não substitua tags semânticas como `<button>` ou `<nav>` por `<div>` com manipuladores de clique.',
      'Sempre forneça o atributo `alt` em imagens para garantir acessibilidade a deficientes visuais.',
      'Mantenha uma hierarquia estrita de títulos de `<h1>` até `<h6>` sem pular níveis.'
    ]
  },

  // 7. Javascript
  't-fe-javascript': {
    topicId: 't-fe-javascript',
    topicName: 'Javascript',
    introduction: [
      'A web estática criada com HTML e CSS não permite interatividade dinâmica em tempo real nem comunicação assíncrona com servidores. O processamento de dados e regras de validação no navegador exigem uma linguagem dinâmica.',
      'O JavaScript é uma linguagem multiparadigma, interpretada, baseada em protótipos e de thread única, responsável por adicionar comportamento ativo, manipulando o DOM e gerenciando requisições assíncronas no navegador e no servidor.'
    ],
    theoreticalFoundation: {
      description: 'O motor JavaScript (ex: V8) utiliza o Event Loop para gerenciar o assincronismo de forma não bloqueante. Ele coordena a Call Stack, Web APIs, Microtask Queue (Promises) e Macrotask Queue (setTimeout/events).',
      asciiDiagram: `[ Call Stack ] ──> [ Web APIs (Fetch, Timer) ]
      ▲                               │
      │                               ▼
[ Event Loop ] <─── [ Microtask Queue (Promises) ]`
    },
    codeSnippet: {
      title: 'Requisição Assíncrona com Async/Await e Tratamento',
      language: 'javascript',
      code: `async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    if (!response.ok) throw new Error('Falha na resposta HTTP');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error.message);
  }
}`
    },
    syntaxDeconstruction: [
      {
        lineOrKeyword: 'async function fetchUserData',
        spokenReasoning: 'Marcamos a função como assíncrona, fazendo com que ela sempre retorne implicitamente uma Promise.',
        sideEffect: 'Permite o uso da palavra-chave await dentro do seu escopo, sem bloquear a thread principal.'
      },
      {
        lineOrKeyword: 'const response = await fetch(...)',
        spokenReasoning: 'Pausamos a execução interna desta função até que a Promise da requisição HTTP seja resolvida.',
        sideEffect: 'Delega a operação de rede para a Web API do navegador, liberando a Call Stack para outros eventos.'
      },
      {
        lineOrKeyword: 'if (!response.ok) throw new Error(...)',
        spokenReasoning: 'Verificamos se o status HTTP da resposta está fora da faixa de sucesso (200-299).',
        sideEffect: 'Lança um erro manualmente redirecionando o fluxo diretamente para o bloco catch.'
      },
      {
        lineOrKeyword: 'const data = await response.json()',
        spokenReasoning: 'Aguardamos a desserialização assíncrona do corpo da resposta em formato JSON.',
        sideEffect: 'Converte a string de texto recebida via stream de dados em um objeto JavaScript nativo.'
      }
    ],
    bestPracticesAndPitfalls: [
      'Sempre utilize comparação estrita (`===` e `!==`) para evitar erros decorrentes de coerção implícita de tipos.',
      'Nunca declare variáveis globais com `var`; utilize `const` por padrão e `let` quando houver reatribuição.',
      'Cuidado com mutações acidentais em arrays nativos usando métodos como `.sort()` ou `.splice()`.'
    ]
  },

  // --- BACKEND DEVELOPMENT ---

  // 8. Node.js & NPM
  't-be-node': {
    topicId: 't-be-node',
    topicName: 'Node.js & NPM',
    introduction: [
      'Historicamente, o desenvolvimento backend exigia linguagens baseadas em múltiplas threads onde cada requisição bloqueava recursos de memória do servidor. Isso gerava limitações drásticas de concorrência em sistemas de alta E/S (I/O Bound).',
      'O Node.js trouxe o JavaScript para o lado do servidor, utilizando um modelo orientado a eventos e I/O não bloqueante construído sobre o motor V8 e a biblioteca `libuv`. Ele permite gerenciar milhares de conexões simultâneas com baixo consumo de recursos.'
    ],
    theoreticalFoundation: {
      description: 'A thread principal do Node.js executa o código JavaScript de forma single-threaded. Operações pesadas de arquivos, rede e criptografia são delegadas para o Worker Thread Pool da libuv, disparando um callback no Event Loop ao finalizar.',
      asciiDiagram: `[ JS Single Thread ] ── I/O Assíncrono ──> [ libuv Thread Pool ]
        ▲                                                │
        └────── [ Callback / Event Queue ] <─────────────┘`
    },
    codeSnippet: {
      title: 'Servidor HTTP Nativo com Tracing em Node.js',
      language: 'javascript',
      code: `const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ONLINE', uptime: process.uptime() }));
});

server.listen(3000, () => {
  console.log('Servidor executando na porta 3000');
});`
    },
    syntaxDeconstruction: [
      {
        lineOrKeyword: 'const http = require(\'http\')',
        spokenReasoning: 'Importamos o módulo nativo do Node.js para criação de servidores de rede via CommonJS.',
        sideEffect: 'Carrega o módulo nativo na memória sem necessidade de instalar dependências externas.'
      },
      {
        lineOrKeyword: 'http.createServer((req, res) => ...)',
        spokenReasoning: 'Registramos a função de callback que será chamada a cada nova requisição TCP recebida.',
        sideEffect: 'Aloca um ouvinte de eventos no socket TCP do sistema operacional.'
      },
      {
        lineOrKeyword: 'res.writeHead(200, ...)',
        spokenReasoning: 'Enviamos os cabeçalhos de resposta HTTP para o cliente indicando status OK e formato JSON.',
        sideEffect: 'Ecreve os bytes iniciais do protocolo HTTP diretamente no buffer do socket de rede.'
      },
      {
        lineOrKeyword: 'server.listen(3000, ...)',
        spokenReasoning: 'Associamos nosso processo Node à porta TCP 3000 da interface de rede.',
        sideEffect: 'O processo permanece ativo aguardando conexões e escutando eventos no Event Loop.'
      }
    ],
    bestPracticesAndPitfalls: [
      'Nunca bloqueie a thread principal com tarefas de CPU intensivas de forma síncrona (ex: `fs.readFileSync`).',
      'Sempre trate eventos de `unhandledRejection` para evitar a queda inesperada do processo do servidor.',
      'Mantenha o arquivo `package-lock.json` versionado para garantir builds reproduzíveis em produção.'
    ]
  },

  // 9. Express.js & APIs
  't-be-express': {
    topicId: 't-be-express',
    topicName: 'Express.js & APIs',
    introduction: [
      'Escrever servidores web utilizando apenas módulos nativos exige manipular URLs, verbos HTTP e buffers de dados manualmente, gerando código repetitivo e difícil de organizar em rotas complexas.',
      'O Express.js é o framework web mais popular para Node.js. Ele fornece uma camada minimalista de abstração baseada em Middlewares e Roteamento para construir APIs RESTful rápidas e escaláveis.'
    ],
    theoreticalFoundation: {
      description: 'O Express organiza as requisições em uma pilha de Middlewares. Cada middleware é uma função com acesso a `(req, res, next)`. Ele pode modificar os objetos, responder à requisição ou passar o controle para o próximo middleware chamando `next()`.',
      asciiDiagram: `[ Requisição HTTP ] ──> [ Middleware Auth ] ──> [ Middleware Validation ] ──> [ Controller ]`
    },
    codeSnippet: {
      title: 'API RESTful com Middleware de Autenticação em Express',
      language: 'typescript',
      code: `import express, { Request, Response, NextFunction } from 'express';
const app = express();
app.use(express.json());

const authGuard = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'Não autorizado' });
  return next();
};

app.get('/api/v1/user', authGuard, (req: Request, res: Response) => {
  res.json({ id: 'U-100', name: 'Dev Sênior' });
});`
    },
    syntaxDeconstruction: [
      {
        lineOrKeyword: 'app.use(express.json())',
        spokenReasoning: 'Adicionamos um middleware global que intercepta requisições com corpo em JSON e realiza o parse automático.',
        sideEffect: 'Preenche a propriedade req.body com os dados desserializados em objetos JavaScript.'
      },
      {
        lineOrKeyword: 'const authGuard = (req, res, next) => ...',
        spokenReasoning: 'Definimos um middleware personalizado para validar os cabeçalhos de autorização da requisição.',
        sideEffect: 'Atua como uma barreira de segurança interceptando a rota antes da execução da lógica principal.'
      },
      {
        lineOrKeyword: 'return next()',
        spokenReasoning: 'Chamamos a função next para liberar a requisição para o próximo handler registrado na pilha.',
        sideEffect: 'Transfere o controle do fluxo para a função seguinte sem encerrar a conexão HTTP.'
      }
    ],
    bestPracticesAndPitfalls: [
      'Esquecer de chamar `next()` dentro de um middleware deixará a requisição do cliente travada (hanging) até o timeout.',
      'Sempre utilize o status HTTP correto (200, 201, 400, 401, 403, 404, 500) em respostas RESTful.',
      'Adicione middlewares de segurança essenciais como `helmet` e ajuste as políticas de `CORS`.'
    ]
  },

  // 10. Docker
  't-be-docker': {
    topicId: 't-be-docker',
    topicName: 'Docker',
    introduction: [
      'O clássico problema "na minha máquina funciona, mas em produção falha" ocorre devido a divergências entre sistemas operacionais, versões de bibliotecas e variáveis de ambiente no ecossistema de desenvolvimento.',
      'O Docker resolve esse problema ao empacotar a aplicação e suas dependências dentro de um Container leve e isolado. Ele garante que a aplicação execute exatamente da mesma forma em qualquer infraestrutura.'
    ],
    theoreticalFoundation: {
      description: 'Diferente das máquinas virtuais tradicionais que virtualizam todo o hardware, os Containers Docker compartilham o mesmo Kernel do sistema operacional hospedeiro, tornando a inicialização quase instantânea.',
      asciiDiagram: `[ Aplicação A ]   [ Aplicação B ]
┌──────────────┐ ┌──────────────┐
│  Container   │ │  Container   │
└──────────────┴─┴──────────────┴─
       [ Docker Engine ]
  [ Kernel do SO Hospedeiro ]`
    },
    codeSnippet: {
      title: 'Dockerfile Otimizado Multi-stage para Node.js',
      language: 'dockerfile',
      code: `FROM node:18-alpine WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 3000
USER node
CMD ["node", "dist/server.js"]`
    },
    syntaxDeconstruction: [
      {
        lineOrKeyword: 'FROM node:18-alpine',
        spokenReasoning: 'Definimos a imagem base oficial do Node.js sobre uma distribuição Alpine Linux ultra-leve.',
        sideEffect: 'Baixa uma imagem minimalista reduzindo o tamanho final do container para menos de 100MB.'
      },
      {
        lineOrKeyword: 'COPY package*.json ./',
        spokenReasoning: 'Copiamos apenas os arquivos de manifestos de pacotes antes de copiar todo o código do projeto.',
        sideEffect: 'Aproveita o sistema de camadas de cache do Docker, evitando reexecutar o npm install caso o package.json não mude.'
      },
      {
        lineOrKeyword: 'USER node',
        spokenReasoning: 'Alteramos o usuário de execução dentro do container do usuário root para o usuário comum node.',
        sideEffect: 'Aplica o princípio de privilégio mínimo protegendo a aplicação contra exploração de privilégios.'
      },
      {
        lineOrKeyword: 'CMD ["node", "dist/server.js"]',
        spokenReasoning: 'Especificamos o comando padrão que será executado no momento da inicialização do container.',
        sideEffect: 'Inicia o processo principal (PID 1) dentro do escopo do container.'
      }
    ],
    bestPracticesAndPitfalls: [
      'Não confunda `RUN` (executado durante a construção da imagem) com `CMD` (executado ao rodar o container).',
      'Utilize arquivos `.dockerignore` para evitar copiar `node_modules` locais ou arquivos sensíveis para a imagem.',
      'Nunca grave senhas ou chaves em texto plano dentro do Dockerfile; injete via Variáveis de Ambiente.'
    ]
  },

  // --- QUALIDADE E TESTES DE SOFTWARE ---

  // 11. Fundamentos e Modelo V
  't-qt-fundamentos': {
    topicId: 't-qt-fundamentos',
    topicName: 'Fundamentos e Modelo V',
    introduction: [
      'Identificar defeitos de software apenas na fase final de produção gera custos astronômicos de correção, retrabalho e risco de imagem para a empresa. Testes atrasados ou inexistentes comprometem a confiabilidade do sistema.',
      'Os Fundamentos de Teste e o Modelo V estruturam o ciclo de vida do desenvolvimento estabelecendo um relacionamento direto entre cada fase da engenharia de requisitos/design e seu nível correspondente de testes e verificação.'
    ],
    theoreticalFoundation: {
      description: 'O Modelo V diferencia Verificação ("estamos construindo o produto corretamente segundo a especificação?") de Validação ("estamos construindo o produto correto para o usuário?"). Cada nível valida uma etapa do projeto.',
      asciiDiagram: `[ Requisitos ] ─────────────> [ Testes de Aceite ]
  └─> [ Design ] ───────────> [ Testes de Sistema ]
        └─> [ Código ] ─────> [ Testes de Unidade ]`
    },
    codeSnippet: {
      title: 'Teste de Unidade Validando Regra de Negócio com Jest',
      language: 'typescript',
      code: `export function isEligibleForDiscount(age: number): boolean {
  if (age < 0) throw new Error('Idade inválida');
  return age >= 60;
}

// Teste de Verificação de Requisito
test('Deve conceder desconto apenas para maiores de 60 anos', () => {
  expect(isEligibleForDiscount(65)).toBe(true);
  expect(isEligibleForDiscount(30)).toBe(false);
});`
    },
    syntaxDeconstruction: [
      {
        lineOrKeyword: 'export function isEligibleForDiscount',
        spokenReasoning: 'Exportamos a função pura que contém a regra de negócio a ser testada de forma isolada.',
        sideEffect: 'Permite a importação estática do módulo dentro do ambiente da suíte de testes.'
      },
      {
        lineOrKeyword: 'if (age < 0) throw new Error(...)',
        spokenReasoning: 'Implementamos a validação de limite/fronteira para tratar entradas inválidas.',
        sideEffect: 'Garante resiliência impedindo o processamento com estados anatomicamente inconsistentes.'
      },
      {
        lineOrKeyword: 'expect(isEligibleForDiscount(65)).toBe(true)',
        spokenReasoning: 'Assertiva que compara o resultado retornado pela função com o valor esperado pela especificação.',
        sideEffect: 'O executor de testes (Runner) compara a equivalência exata dos valores retornados na memória.'
      }
    ],
    bestPracticesAndPitfalls: [
      'Lembre-se do princípio do ISTQB: "Os testes mostram a presença de defeitos, e não a sua ausência".',
      'Inicie o planejamento dos testes desde a fase inicial de levantamento de requisitos (Early Testing).',
      'Evite tentar realizar "testes exaustivos", focando a cobertura nos cenários mais críticos e limites do sistema.'
    ]
  }
};

// Fallback generator for dynamic topics or custom topics added by the user
export function getStudyMaterialByTopic(topic: Topic): StudyMaterial {
  if (STUDY_MATERIALS[topic.id]) {
    return STUDY_MATERIALS[topic.id];
  }

  // Check by matching topic name
  const existingKey = Object.keys(STUDY_MATERIALS).find(
    k => STUDY_MATERIALS[k].topicName?.toLowerCase() === topic.name.toLowerCase()
  );
  if (existingKey) {
    return STUDY_MATERIALS[existingKey];
  }

  // Generic rich default material for newly added topics
  return {
    topicId: topic.id,
    topicName: topic.name,
    introduction: [
      `No ecossistema de desenvolvimento de software moderno, o tópico ${topic.name} desempenha um papel crucial no projeto de arquiteturas robustas, mantendo o código organizado, escalável e de fácil manutenção.`,
      `O domínio conceitual e prático de ${topic.name} permite resolver desafios recorrentes de engenharia de software, garantindo alta coesão, baixo acoplamento e previsibilidade na execução das aplicações.`
    ],
    theoreticalFoundation: {
      description: `A fundamentação teórica de ${topic.name} envolve a compreensão clara do ciclo de vida dos componentes, fluxo de dados e mecanismos de execução sob o capô do sistema.`,
      asciiDiagram: `[ Entrada de Dados ] ──> [ Processamento: ${topic.name} ] ──> [ Saída / Estado ]`
    },
    codeSnippet: {
      title: `Demonstração Prática de ${topic.name}`,
      language: 'typescript',
      code: `export function processTopicLogic(input: string): { success: boolean, data: string } {
  if (!input) {
    throw new Error('Parâmetro de entrada inválido');
  }
  return {
    success: true,
    data: \`Execução concluída para \${input}\`
  };
}`
    },
    syntaxDeconstruction: [
      {
        lineOrKeyword: 'export function processTopicLogic',
        spokenReasoning: 'Definimos a função principal responsável por executar a regra técnica do tópico.',
        sideEffect: 'Expõe uma interface pública e isolada para o invocador.'
      },
      {
        lineOrKeyword: 'if (!input) throw new Error(...)',
        spokenReasoning: 'Validamos a pré-condição dos parâmetros antes de iniciar o processamento principal.',
        sideEffect: 'Interrompe a execução precocemente salvaguardando a integridade dos dados.'
      }
    ],
    bestPracticesAndPitfalls: [
      `Mantenha o código relacionado a ${topic.name} testável, modular e isolado de acoplamentos desnecessários.`,
      'Evite negligenciar o tratamento de erros e casos de borda durante a implementação.',
      'Siga os padrões consagrados da indústria e documente decisões técnicas relevantes.'
    ]
  };
}
