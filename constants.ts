
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
