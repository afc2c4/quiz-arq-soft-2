import { Question } from '../../../types';

export const MICROSERVICES_QUESTIONS: Question[] = [
  {
    id: 'ms1',
    topicId: 't-ms',
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
    topicId: 't-ms',
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
    topicId: 't-ms',
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
    topicId: 't-ms',
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
    topicId: 't-ms',
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
    topicId: 't-ms',
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
    topicId: 't-ms',
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
    topicId: 't-ms',
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
    topicId: 't-ms',
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
    topicId: 't-ms',
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
    topicId: 't-ms',
    question: 'O que é um "Service Mesh" (Malha de Serviço)?',
    options: [
      'Uma rede física de cabos de fibra ótica que conecta os servidores.',
      'Uma camada de infraestrutura para gerenciar a comunicação entre serviços.',
      'Um framework para criar interfaces de usuário baseadas em grids.',
      'Um conjunto de regras de negócio que define como os serviços devem operar.',
      'Uma ferramenta de comppressão de dados para transferências via rede.'
    ],
    correctAnswer: 1,
    explanation: 'Service Meshes (como Istio) lidam com tráfego, segurança e observabilidade de forma transparente.'
  },
  {
    id: 'ms12',
    topicId: 't-ms',
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
    topicId: 't-ms',
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
    topicId: 't-ms',
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
    topicId: 't-ms',
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
  }
];
