import { Question } from '../../../types';

export const BACKEND_DEPLOY_QUESTIONS: Question[] = [
  {
    id: 'be-dep-01',
    topicId: 't-be-deploy',
    question: 'No processo de Deploy de aplicações em produção, a estratégia Blue-Green Deployment visa mitigar riscos e evitar tempo de inatividade (downtime). Em que consiste essa estratégia?',
    options: [
      'Em manter dois ambientes de produção idênticos (Blue e Green); o ambiente Blue roda a versão atual e o Green recebe a nova versão; após testes de validação, o roteador/load balancer redireciona instantaneamente o tráfego para o Green.',
      'Em publicar a aplicação primeiro apenas para usuários que utilizam navegadores de cor azul e depois para navegadores de cor verde.',
      'Em deletar o banco de dados antigo antes de instalar a nova versão do servidor.',
      'Em desligar o servidor por 24 horas para atualizar o sistema operacional de forma gradual.',
      'Em enviar o código da nova versão exclusivamente por e-mail para os clientes.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: No Blue-Green Deployment, há dois ambientes idênticos em paralelo. A versão atual (Blue) atende o público. A nova versão é publicada e validada no ambiente inativo (Green). A virada de chave no Load Balancer altera o tráfego instantaneamente com rollback rápido caso surjam problemas.'
  },
  {
    id: 'be-dep-02',
    topicId: 't-be-deploy',
    question: 'A estratégia de Deploy do tipo Canary (Canary Deployment) difere do Blue-Green Deployment por qual característica principal?',
    options: [
      'A estratégia Canary lança a nova versão gradualmente para uma pequena porcentagem da base de usuários (ex: 5%), monitorando erros antes de expandir para 100% do tráfego.',
      'A estratégia Canary é usada exclusivamente para aplicações mobile e proíbe o uso em servidores web back-end.',
      'A estratégia Canary exige que a aplicação seja escrita em código assembly sem uso do Node.js.',
      'A estratégia Canary substitui todas as instâncias da aplicação simultaneamente em um segundo.',
      'A estratégia Canary é uma técnica manual que desabilita os registros de logs de erros em produção.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: Inspirada nos canários usados em minas de carvão para detectar vazamentos de gás, o Canary Deployment libera a atualização para uma fração minoritária do público real. Se métricas e logs permanecerem estáveis, o tráfego é ampliado progressivamente até atingir 100%.'
  },
  {
    id: 'be-dep-03',
    topicId: 't-be-deploy',
    question: 'Ao depurar (debug) uma aplicação Node.js em ambiente de desenvolvimento, qual flag do executável node permite ativar o protocolo de inspeção para conectar depuradores como o VS Code ou Chrome DevTools?',
    options: [
      '--inspect (ou --inspect-brk)',
      '--debug-mode=true',
      '--enable-breakpoints',
      '--trace-all',
      '--dev-tools'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: A flag `node --inspect` inicia o Node.js escutando por um cliente de depuração via WebSocket. A variação `node --inspect-brk` pausa a execução do código logo no primeiro caractere da primeira linha até que o debugger seja anexado.'
  },
  {
    id: 'be-dep-04',
    topicId: 't-be-deploy',
    question: 'Quando desenvolvemos aplicações back-end em TypeScript, o código é transpilado para JavaScript antes da execução. Qual arquivo gerado durante o build garante que stack traces de erros e breakpoints no debugger apontem para as linhas originais do arquivo .ts em vez do código transpilado .js?',
    options: [
      'Source Maps (arquivos .map)',
      'TypeScript Declaration Files (.d.ts)',
      'Package-lock (.json)',
      'tsconfig.build.json',
      'Docker Build Layer'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: O Source Map (gerado ao habilitar `"sourceMap": true` no `tsconfig.json`) mapeia a correspondência exata entre o JavaScript gerado e os arquivos TypeScript originais, permitindo depurar e visualizar erros apontando direto para o arquivo `.ts`.'
  },
  {
    id: 'be-dep-05',
    topicId: 't-be-deploy',
    question: 'A Observabilidade em sistemas distribuídos de produção é sustentada por três pilares fundamentais. Quais são esses três pilares?',
    options: [
      'Logs, Métricas e Traces (Rastreamento Distribuído).',
      'HTML, CSS e JavaScript.',
      'Docker, Kubernetes e Helm.',
      'CPU, Memória RAM e Disco Rígido.',
      'GET, POST e DELETE.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: Os três pilares da observabilidade são: 1. Logs (registros de eventos pontuais), 2. Métricas (dados numéricos agregados ao longo do tempo, como CPU, RPS, latência), 3. Traces (rastreamento do ciclo de vida de uma requisição ao passar por múltiplos serviços).'
  },
  {
    id: 'be-dep-06',
    topicId: 't-be-deploy',
    question: 'Por que o uso de bibliotecas de Logging Estruturado (como Winston ou Pino) emitindo logs em formato JSON é considerado uma boa prática superior ao uso de console.log() simples em aplicações de produção?',
    options: [
      'Porque logs em formato JSON padronizado facilitam a ingestão, indexação, filtragem e análise automatizada por ferramentas centralizadas como ElasticSearch (ELK), Datadog ou Loki.',
      'Porque o console.log() funciona apenas em ambiente de desenvolvimento no navegador.',
      'Porque o Winston criptografa o arquivo package.json em tempo de execução.',
      'Porque o formato JSON reduz a zero o uso de memória RAM do servidor Express.',
      'Porque o console.log() proíbe a escrita de mensagens com mais de 10 caracteres.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: Logging estruturado em JSON fornece metadados pesquisáveis (nível do log, timestamp, ID da requisição, ID do usuário, contexto de erro). Ferramentas como ELK, Datadog ou Grafana Loki filtram e criam alertas agregando esses objetos JSON de forma extremamente eficiente.'
  },
  {
    id: 'be-dep-07',
    topicId: 't-be-deploy',
    question: 'O que é o Desligamento Gracioso (Graceful Shutdown) em um servidor Node.js/Express ao receber um sinal de encerramento do sistema operacional (como SIGTERM ou SIGINT no Docker/Kubernetes)?',
    options: [
      'Processo onde o servidor para de aceitar novas requisições, aguarda a finalização das requisições HTTP em andamento, fecha as conexões com o banco de dados e encerra o processo de forma limpa.',
      'Apagar imediatamente todas as imagens Docker salvas no servidor.',
      'Reiniciar a máquina física enviando um sinal de choque no hardware.',
      'Exportar o código-fonte da aplicação para uma pasta ZIP na área de trabalho.',
      'Desconectar a chave secreta de autenticação do JWT sem avisar os clientes.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: O Graceful Shutdown intercepta sinais de encerramento (`process.on("SIGTERM")`), interrompe o ouvinte de novas conexões HTTP (`server.close()`), dá tempo para as requisições em curso terminarem e encerra adequadamente pools de conexões com banco de dados/Redis antes do `process.exit(0)`.'
  },
  {
    id: 'be-dep-08',
    topicId: 't-be-deploy',
    question: 'Para coleta e monitoramento numérico de métricas de desempenho em tempo real de uma aplicação Node.js (como contagem de requisições por segundo, latência de rotas e uso de heap), qual padrão de ferramenta de métricas e exibição visual de dashboards é amplamente adotado na indústria?',
    options: [
      'Prometheus para coleta/raspagem de métricas e Grafana para visualização de dashboards.',
      'Swagger UI para coleta de dados e Postman para exibição gráfica.',
      'GitLab CI para raspagem de logs e NPM para exibição visual.',
      'Sublime Text para coleta de métricas e Docker Compose para painéis de gráficos.',
      'Babel para coleta de dados e ESLint para dashboards de CPU.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: A combinação Prometheus (servidor que raspa métricas em formato padronizado expostos em uma rota `/metrics` via bibliotecas como `prom-client`) e Grafana (ferramenta de criação de painéis visuais interativos) é a pilha aberta padrão da indústria.'
  },
  {
    id: 'be-dep-09',
    topicId: 't-be-deploy',
    question: 'Em arquiteturas de microsserviços, como o Rastreamento Distribuído (Distributed Tracing) via OpenTelemetry consegue correlacionar os logs e métricas de uma mesma requisição HTTP que transita por cinco microsserviços diferentes?',
    options: [
      'Injetando e propagando um identificador de rastreamento único (Trace ID / Span ID) nos cabeçalhos das requisições HTTP/gRPC enviadas entre os serviços.',
      'Exigindo que todos os microsserviços estejam rodando exatamente na mesma thread do mesmo processador.',
      'Substituindo o protocolo HTTP por disquetes físicos gravados sequencialmente.',
      'Forçando os cinco microsserviços a usarem a mesma senha de acesso ao banco de dados.',
      'Convertendo os logs de todos os serviços para arquivos de áudio em formato MP3.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: O OpenTelemetry/Jaeger injeta cabeçalhos de contexto (como `traceparent` no padrão W3C) nas chamadas HTTP externas. Cada microsserviço repassa esse `Trace ID` único nas suas próprias chamadas e logs, permitindo visualizar o mapa completo da jornada da requisição e o tempo gasto em cada serviço (spans).'
  },
  {
    id: 'be-dep-10',
    topicId: 't-be-deploy',
    question: 'O PM2 é um gerenciador de processos amplamente utilizado em servidores Node.js em máquinas virtuais de produção. Qual funcionalidade do PM2 permite aproveitar todos os núcleos de CPU da máquina criando múltiplas instâncias da aplicação sem alterar o código-fonte?',
    options: [
      'Cluster Mode (Modo Cluster)',
      'Fork Single Process',
      'Memory Eraser Mode',
      'Docker Emulation Engine',
      'TypeScript Transpiler'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: O PM2 em Cluster Mode utiliza o módulo nativo `cluster` do Node.js para redefinir a execução em múltiplos processos filhos (um para cada núcleo de CPU disponível), distribuindo as conexões de rede recebidas na mesma porta e multiplicando o rendimento da aplicação.'
  }
];
