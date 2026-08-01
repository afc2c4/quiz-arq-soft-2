import { Question } from '../../../types';

export const BACKEND_MICROSERVICES_QUESTIONS: Question[] = [
  {
    id: 'be-ms-01',
    topicId: 't-be-microservices',
    question: 'Qual é o princípio fundamental que caracteriza uma Arquitetura de Microsserviços em comparação com uma Arquitetura Monolítica?',
    options: [
      'Todos os serviços compartilham obrigatoriamente a mesma base de dados relacional centralizada para garantir transações ACID síncronas.',
      'A aplicação é dividida em serviços pequenos, independentes e fracamente acoplados, onde cada serviço possui responsabilidade sobre um domínio de negócio específico.',
      'Os microsserviços devem ser escritos estritamente na mesma linguagem de programação e rodar na mesma máquina física.',
      'A comunicação entre os serviços deve ser feita exclusivamente através de leitura direta de arquivos de texto no disco rígido.',
      'Microsserviços eliminam completamente a necessidade de testes de integração e monitoramento de logs.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: Microsserviços são serviços autônomos, focados em um único domínio de negócio (Bounded Context), independentes para implantação e fracamente acoplados. A: fere o princípio de isolamento de dados. C: microsserviços são poliglotas. D e E: totalmente falsos.'
  },
  {
    id: 'be-ms-02',
    topicId: 't-be-microservices',
    question: 'Em relação ao gerenciamento de dados em microsserviços, qual é a regra de ouro recomendada para garantir a autonomia e o desacoplamento entre os serviços (Database-per-Service)?',
    options: [
      'Cada microsserviço deve possuir e gerenciar sua própria base de dados dedicada, proibindo o acesso direto de outros serviços à sua base.',
      'Todos os serviços devem acessar a mesma tabela de usuários usando credenciais de superusuário do PostgreSQL.',
      'Os dados devem ser armazenados em memória e descartados a cada nova requisição HTTP recebida.',
      'Apenas um microsserviço pode ter banco de dados, enquanto todos os outros devem salvar dados em arquivos .csv locais.',
      'O banco de dados deve ser compartilhado entre todos os serviços através de views e triggers globais.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: O padrão "Database-per-Service" garante que nenhum serviço acesse a base de dados de outro diretamente; qualquer interação com dados de outro domínio deve ocorrer exclusivamente via APIs ou eventos expostos. A, B, C, D, E: violações do padrão.'
  },
  {
    id: 'be-ms-03',
    topicId: 't-be-microservices',
    question: 'O padrão "Strangler Fig" (Padrão Estrangulador) é a estratégia mais recomendada para migrar uma aplicação Monolítica para Microsserviços. Em que consiste esse padrão?',
    options: [
      'Reescrever todo o sistema monolítico do zero e desligar o monolito antigo de uma só vez em um fim de semana.',
      'Substituir gradualmente funcionalidades do sistema monolítico por novos microsserviços, roteando o tráfego aos poucos até que o monolito seja completamente desativado.',
      'Deletar as tabelas legadas do banco de dados para forçar os desenvolvedores a criar novas APIs.',
      'Envolver o código do monolito em um contêiner Docker mantendo toda a arquitetura inalterada permanentemente.',
      'Duplicar o servidor do monolito em dez instâncias idênticas atrás de um load balancer.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: O padrão Strangler Fig (inspirado na figueira mata-pau) intercepta chamadas na borda e substitui partes do monolito por novos microsserviços incrementalmente, reduzindo drasticamente os riscos de uma migração "Big Bang" (A).'
  },
  {
    id: 'be-ms-04',
    topicId: 't-be-microservices',
    question: 'Ao planejar a ordem de decomposição de uma aplicação monolítica existente, quais módulos devem ser extraídos primeiro para microsserviços?',
    options: [
      'O núcleo mais complexo e altamente acoplado do sistema de faturamento principal.',
      'Módulos periféricos, simples e com baixo nível de acoplamento com o restante do monolito (ex: envio de notificações por e-mail ou geração de relatórios).',
      'As tabelas de autenticação de usuários que possuem relacionamentos com todas as tabelas do sistema.',
      'Apenas as rotas HTTP de leitura estática que não acessam banco de dados.',
      'O módulo que possui a maior quantidade de dependências cíclicas com outros módulos.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: A recomendação arquitetural é iniciar a migração extraindo módulos periféricos e desacoplados. Isso permite que a equipe adquira maturidade operacional com CI/CD, monitoramento e comunicação antes de abordar o domínio central ("core") mais complexo.'
  },
  {
    id: 'be-ms-05',
    topicId: 't-be-microservices',
    question: 'Qual é a responsabilidade do padrão API Gateway em uma arquitetura de microsserviços?',
    options: [
      'Servir como ponto único de entrada para os clientes externos, gerenciando roteamento, autenticação, limitação de taxa e agregação de respostas de múltiplos microsserviços.',
      'Executar as consultas SQL pesadas diretamente nos bancos de dados de todos os microsserviços.',
      'Substituir os contêineres Docker criando imagens virtuais dos serviços.',
      'Gerar relatórios de cobertura de testes unitários para o time de qualidade.',
      'Armazenar o código fonte de todos os microsserviços em um repositório Git único.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: O API Gateway atua como a fachada da aplicação para clientes externos (Web, Mobile), centralizando cross-cutting concerns (roteamento de requisições, CORS, autenticação, rate-limiting, SSL termination) e evitando expor a topologia interna dos microsserviços.'
  },
  {
    id: 'be-ms-06',
    topicId: 't-be-microservices',
    question: 'Para comunicação assíncrona entre microsserviços com alto grau de desacoplamento temporal, qual abordagem tecnológica deve ser utilizada?',
    options: [
      'Chamadas síncronas usando protocolo HTTP/REST com timeout configurado para 60 segundos.',
      'Mensageria orientada a eventos utilizando corretores de mensagens (Message Brokers) como RabbitMQ, Apache Kafka ou AWS SQS.',
      'Invocação remota de procedimentos via RPC síncrono bloqueante.',
      'Consultas diretas à tabela do banco de dados de outro microsserviço através de chamadas SQL.',
      'Polling constante via requisições HTTP GET a cada 100 milissegundos.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: O uso de Message Brokers (RabbitMQ, Kafka, SQS) implementa arquiteturas orientadas a eventos (Event-Driven Architecture), permitindo comunicação assíncrona, desacoplamento temporal e alta tolerância a picos de tráfego (backpressure).'
  },
  {
    id: 'be-ms-07',
    topicId: 't-be-microservices',
    question: 'Como se resolve o desafio de manter a consistência de dados entre múltiplos microsserviços em uma transação de negócio que abrange vários serviços, já que transações ACID distribuídas (2PC) não escalam bem?',
    options: [
      'Utilizando o Padrão Saga, que executa uma sequência de transações locais em cada serviço, aplicando transações compensatórias em caso de falha para desfazer as etapas anteriores.',
      'Forçando todos os microsserviços a utilizarem uma única transação global de banco de dados travando as tabelas envolvidas.',
      'Ignorando os erros de transação e permitindo que dados inconsistentes permaneçam indefinidamente.',
      'Reiniciando os contêineres dos serviços afetados para restaurar o estado da memória.',
      'Convertendo todos os bancos de dados relacionais em arquivos JSON sem validação.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: O Padrão Saga (Saga Pattern) substitui transações distribuídas bloqueantes por uma sequência de transações locais associadas a ações de compensação (compensating transactions) que revertem alterações em caso de erro no fluxo, garantindo consistência eventual.'
  },
  {
    id: 'be-ms-08',
    topicId: 't-be-microservices',
    question: 'O padrão Circuit Breaker (Disjuntor) é essencial para a resiliência de microsserviços. Qual é a função do estado "Aberto" (Open) de um Circuit Breaker?',
    options: [
      'Permitir que todas as requisições passem normalmente para o serviço de destino sem qualquer verificação.',
      'Interromper imediatamente as chamadas para o serviço de destino com falha rápida (fail-fast), sem tentar enviar a requisição, evitando sobrecarregar o serviço degradado.',
      'Aumentar o número de retentativas para 1000 vezes por segundo até o serviço responder.',
      'Desligar o banco de dados do serviço para economizar energia.',
      'Redirecionar todo o tráfego da aplicação para a página inicial da empresa.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: No estado Open (Aberto), o Circuit Breaker detectou que o serviço a jusante está falhando e falha imediatamente (fail-fast) sem fazer chamadas de rede, dando tempo para o serviço se recuperar e protegendo o sistema contra efeito dominó (cascading failures).'
  },
  {
    id: 'be-ms-09',
    topicId: 't-be-microservices',
    question: 'O que é o componente de Service Discovery (Descoberta de Serviços) em um ambiente dinâmico de microsserviços em nuvem?',
    options: [
      'Um mecanismo que permite que as instâncias dos microsserviços registrem dinamicamente seus endereços IP e portas, e localizem outros serviços disponíveis na rede.',
      'Um motor de busca para que os clientes finais encontrem os produtos no site da empresa.',
      'Um scanner de código fonte para encontrar vulnerabilidades de segurança no GitHub.',
      'Um compilador de TypeScript que descobre tipos de variáveis automaticamente.',
      'Um plugin de navegador para inspecionar chamadas AJAX no console.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: Em nuvens e contêineres, IPs mudam constantemente à medida que instâncias sobem e descem. O Service Discovery (ex: Consul, Eureka, K8s DNS) atua como um diretório dinâmico onde serviços se registram e descobrem os IPs atuais dos seus pares.'
  },
  {
    id: 'be-ms-10',
    topicId: 't-be-microservices',
    question: 'Apesar de suas vantagens de escalabilidade e autonomia, qual é um dos principais custos e desafios trazidos pela adoção de Arquitetura de Microsserviços?',
    options: [
      'Aumento da complexidade operacional, necessidade de observabilidade avançada (tracing distribuído, logs centralizados) e gerenciamento de latência de rede.',
      'Impossibilidade de utilizar bancos de dados relacionais como PostgreSQL.',
      'Obrigação de pagar licenças proprietárias caras para cada linha de código escrita.',
      'Incompatibilidade total com ferramentas de Integração Contínua (CI/CD).',
      'Proibição do uso de contêineres Docker e orquestradores de nuvem.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: Microsserviços trazem complexidade distribuída: rastrear requisições que passam por múltiplos serviços (Distributed Tracing/Jaeger/Zipkin), tratar falhas parciais de rede, consistência eventual e gerenciar infraestrutura muito mais robusta.'
  }
];
