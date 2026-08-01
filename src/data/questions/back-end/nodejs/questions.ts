import { Question } from '../../../types';

export const BACKEND_NODEJS_QUESTIONS: Question[] = [
  {
    id: 'be-node-01',
    topicId: 't-be-node',
    question: 'O Node.js é reconhecido por sua arquitetura orientada a eventos e I/O não-bloqueante. Qual componente interno é o responsável principal por gerenciar a fila de eventos e as operações de I/O assíncronas no Node.js?',
    options: [
      'A biblioteca libuv, que implementa o Event Loop e abstrai a camada de I/O assíncrona do sistema operacional.',
      'O motor V8, responsável por converter diretamente chamadas de arquivos em chamadas de threads do sistema operacional.',
      'O utilitário npm, que gerencia o fluxo de execução das threads do servidor em tempo de execução.',
      'O módulo express.js, que fornece a pilha de threads nativa para processamento de rotas paralelas.',
      'O compilador Babel, que traduz o código assíncrono para operações de bloqueio síncrono no kernel.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: A biblioteca `libuv` (escrita em C) gerencia o Event Loop, thread pool e operações assíncronas de I/O no Node.js. O motor V8 (B) compila e executa o código JS. NPM (C) é o gerenciador de pacotes. Express (D) é um framework web. Babel (E) é um transpilador JS.'
  },
  {
    id: 'be-node-02',
    topicId: 't-be-node',
    question: 'No arquivo manifesto package.json de um projeto Node.js, qual é a diferença crucial entre as seções dependencies e devDependencies?',
    options: [
      'dependencies contêm os módulos executados no cliente, enquanto devDependencies armazenam os módulos executados no servidor de banco de dados.',
      'dependencies registram bibliotecas necessárias para a execução da aplicação em ambiente de produção, enquanto devDependencies registram pacotes usados apenas durante o desenvolvimento e testes.',
      'devDependencies são instaladas obrigatoriamente pelo servidor no ambiente de produção usando o comando npm install --production.',
      'dependencies aceitam apenas pacotes nativos do Node.js, enquanto devDependencies aceitam bibliotecas de terceiros baixadas do NPM.',
      'Não há diferença funcional entre as duas seções, sendo apenas uma separação visual para organização de código.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: `dependencies` são necessárias em tempo de execução (produção). `devDependencies` (como linters, ferramentas de build e frameworks de teste) são apenas para tempo de desenvolvimento. A, C, D, E: contêm premissas incorretas.'
  },
  {
    id: 'be-node-03',
    topicId: 't-be-node',
    question: 'Durante o processo de Integração Contínua (CI) em servidores de produção, qual comando do NPM é o mais recomendado para garantir instalações rápidas e estritamente fiéis ao arquivo package-lock.json?',
    options: [
      'npm install --force',
      'npm ci',
      'npm update --all',
      'npx install-lock',
      'npm audit fix'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: `npm ci` (Clean Install) instala dependências diretamente com base no `package-lock.json`, garantindo reproduzibilidade exata e removendo a pasta node_modules existente. `npm install` pode modificar o lockfile. `npm audit fix` corrige vulnerabilidades.'
  },
  {
    id: 'be-node-04',
    topicId: 't-be-node',
    question: 'Sem utilizar frameworks externos, como Express ou Fastify, qual módulo nativo do Node.js é utilizado para criar um servidor HTTP funcional?',
    options: [
      'módulo net',
      'módulo http',
      'módulo url',
      'módulo stream',
      'módulo process'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: O módulo nativo `http` (ou `https`) fornece o método `http.createServer((req, res) => ...)` para criar servidores web sem dependências de terceiros. `net` é para conexões TCP brutas. `url` é para parsing de URLs. `stream` é para fluxos de dados.'
  },
  {
    id: 'be-node-05',
    topicId: 't-be-node',
    question: 'Historicamente o Node.js utilizou o sistema de módulos CommonJS (CJS), mas atualmente suporta também os ECMAScript Modules (ESM). Como se diferencia a sintaxe de importação e exportação entre CommonJS e ESM?',
    options: [
      'CommonJS utiliza require() e module.exports; ESM utiliza as instruções import e export.',
      'CommonJS utiliza import e export; ESM utiliza require() e exports.default.',
      'CommonJS exige o uso de compilação em tempo de execução com TypeScript; ESM é interpretado nativamente sem arquivo package.json.',
      'CommonJS funciona apenas de forma assíncrona; ESM funciona de forma estritamente síncrona bloqueante.',
      'O sistema ESM proíbe a exportação de múltiplas funções a partir de um mesmo arquivo de módulo.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: CommonJS usa `const mod = require(\'mod\')` e `module.exports = ...`. ECMAScript Modules (ESM) usam `import mod from \'mod\'` e `export default ...` ou `export { ... }`. B: inverteu as sintaxes. C, D, E: incorretos.'
  },
  {
    id: 'be-node-06',
    topicId: 't-be-node',
    question: 'Apesar do Node.js executar o código JavaScript principal em uma única thread (Single Thread), como ele consegue processar tarefas pesadas de I/O ou computação sem bloquear a thread principal?',
    options: [
      'Através do reencaminhamento automático das chamadas pesadas para a GPU do servidor.',
      'Delegando operações de I/O e tarefas do sistema operacional para a thread pool interna gerenciada pela biblioteca libuv.',
      'Criando dinamicamente um novo processo filho do sistema operacional para cada requisição HTTP recebida.',
      'Pausando a execução de todas as requisições ativas até que a tarefa pesada seja finalizada.',
      'Convertendo automaticamente o código JavaScript pesado para código assembly compilado em tempo real.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: A `libuv` possui um pool de threads do sistema (Worker Threads) que executa tarefas como operações de sistema de arquivos, criptografia e DNS assincronamente sem travar o Event Loop principal. A, C, D, E: falsos.'
  },
  {
    id: 'be-node-07',
    topicId: 't-be-node',
    question: 'Qual é o impacto de uma exceção não capturada (uncaught exception) em uma aplicação Node.js que não possui tratamento de erro adequado?',
    options: [
      'O Node.js ignora o erro e continua a execução normalmente na próxima linha de código.',
      'O Event Loop captura o erro automaticamente e limpa a pilha de chamadas sem afetar as requisições atuais.',
      'A exceção causa a interrupção abrupta do processo da aplicação (crash), encerrando o servidor.',
      'O módulo de banco de dados reverte automaticamente todas as transações dos últimos cinco minutos.',
      'O Node.js converte o erro em uma mensagem de log e reinicia apenas a rota onde o erro ocorreu.'
    ],
    correctAnswer: 2,
    explanation: 'A correta é a C: Erros não capturados levam o processo do Node.js ao encerramento (crash). Por isso, costuma-se usar gerenciadores de processos (como PM2, Docker ou K8s) para reiniciar o processo em caso de falha catastrófica. A, B, D, E: incorretos.'
  },
  {
    id: 'be-node-08',
    topicId: 't-be-node',
    question: 'Para acessar variáveis de ambiente configuradas no sistema operacional ou em arquivos .env na aplicação Node.js, qual objeto global deve ser acessado?',
    options: [
      'global.environment',
      'process.env',
      'System.getEnv()',
      'Node.config.env',
      'window.process.env'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: `process.env` é o objeto no Node.js que contém todas as variáveis de ambiente do processo. `window` não existe no Node.js (apenas em navegadores).'
  },
  {
    id: 'be-node-09',
    topicId: 't-be-node',
    question: 'O módulo nativo fs do Node.js oferece métodos síncronos e assíncronos. Por que o uso de métodos síncronos como fs.readFileSync() deve ser evitado em rotas de servidores HTTP em produção?',
    options: [
      'Porque métodos síncronos bloqueiam a thread principal do Event Loop, impedindo o processamento de outras requisições concorrentes.',
      'Porque métodos síncronos corrompem o arquivo caso duas pessoas o acessem simultaneamente.',
      'Porque métodos síncronos funcionam apenas quando a aplicação está rodando no modo de desenvolvimento.',
      'Porque métodos síncronos exigem a instalação obrigatória do pacote express-async-errors.',
      'Porque o Node.js removeu o suporte a métodos síncronos na versão 18 do runtime.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: Chamadas síncronas de I/O bloqueiam a única thread principal do Node.js, travando todas as demais requisições que estiverem aguardando resposta do servidor. A, B, C, D, E: falsas.'
  },
  {
    id: 'be-node-10',
    topicId: 't-be-node',
    question: 'O executável npx é distribuído juntamente com o NPM a partir da versão 5.2. Qual é a utilidade primordial da ferramenta npx?',
    options: [
      'Executar pacotes e binários de módulos Node.js sem a necessidade de instalá-los globalmente no sistema.',
      'Compilar código TypeScript para JavaScript minificado para produção.',
      'Substituir o arquivo package.json por uma versão em formato YAML de alta velocidade.',
      'Criar backups automáticos do banco de dados PostgreSQL associado à aplicação.',
      'Gerenciar a versão do Node.js instalado no sistema operacional do servidor.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: `npx` permite executar comandos e CLI de pacotes NPM (como `npx create-react-app` ou `npx prisma`) baixando temporariamente o binário ou executando pacotes locais de `node_modules/.bin` sem requerer instalação global (`npm install -g`).'
  }
];
