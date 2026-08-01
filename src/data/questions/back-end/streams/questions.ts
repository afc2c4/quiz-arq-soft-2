import { Question } from '../../../types';

export const BACKEND_STREAMS_QUESTIONS: Question[] = [
  {
    id: 'be-str-01',
    topicId: 't-be-streams',
    question: 'No Node.js, qual é a principal vantagem de processar arquivos grandes (como logs de múltiplos gigabytes ou arquivos de vídeo) utilizando Streams em vez de carregá-los completamente com métodos como fs.readFile()?',
    options: [
      'Streams convertem automaticamente o arquivo em código HTML5 executável no cliente.',
      'Streams processam os dados em pequenas fatias contínuas (chunks) sob demanda, mantendo o consumo de memória RAM baixo e constante, independentemente do tamanho total do arquivo.',
      'Streams aumentam a velocidade do processador da máquina multiplicando a frequência do clock de CPU.',
      'Streams desabilitam a necessidade de tratamento de erros e exceções na aplicação.',
      'Streams criptografam os dados utilizando automaticamente chaves quânticas no disco rígido.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: Streams leem e processam dados em pedaços (chunks) sequenciais sem alocar todo o conteúdo do arquivo na memória RAM de uma só vez, evitando estourar o limite de memória do Node.js (Out of Memory) em arquivos gigantes. A, C, D, E: falsos.'
  },
  {
    id: 'be-str-02',
    topicId: 't-be-streams',
    question: 'Quais são os quatro tipos fundamentais de Streams disponíveis nativamente no módulo stream do Node.js?',
    options: [
      'Readable (leitura), Writable (escrita), Duplex (leitura e escrita independentes) e Transform (leitura e escrita onde o dado é modificado).',
      'Input, Output, Binary e Textual.',
      'Static, Dynamic, Buffered e Unbuffered.',
      'HttpStream, FileStream, MemoryStream e NetworkStream.',
      'Synchronous, Asynchronous, Parallel e Sequential.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: No Node.js os 4 tipos nativos são: 1. Readable (ex: fs.createReadStream), 2. Writable (ex: fs.createWriteStream), 3. Duplex (leitura e escrita simultâneas como WebSockets/Sockets TCP), 4. Transform (Duplex que altera/transforma os dados transitados, como zlib.createGzip).'
  },
  {
    id: 'be-str-03',
    topicId: 't-be-streams',
    question: 'Para conectar o fluxo de saída de uma Readable Stream diretamente na entrada de uma Writable Stream no Node.js clássico, qual método encadeável é utilizado?',
    options: [
      '.pipe()',
      '.connect()',
      '.send()',
      '.attach()',
      '.forward()'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: O método `.pipe()` redireciona a fonte de dados lida de um Readable Stream para um Writable Stream destino (ex: `readStream.pipe(writeStream)`), gerenciando automaticamente o fluxo de dados.'
  },
  {
    id: 'be-str-04',
    topicId: 't-be-streams',
    question: 'No contexto de processamento de Streams, o que é o fenômeno de "Backpressure" (Contrapressão) e como o Node.js lida com ele ao utilizar métodos como .pipe() ou pipeline()?',
    options: [
      'É o aumento do uso de CPU causado pela desconexão do cabo de rede do servidor.',
      'Ocorre quando a fonte de leitura (Readable) produz dados em uma velocidade maior do que o destino de escrita (Writable) consegue processar; o Node.js pausa temporariamente a leitura para não acumular chunks em memória.',
      'É um erro de compilação que impede o uso de funções async/await com streams.',
      'É o vazamento de memória causado pela falta da palavra-chave const no código.',
      'É a tentativa de gravar dados em um arquivo somente leitura no sistema de arquivos.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: Backpressure ocorre quando a gravação (Writable) é mais lenta do que a leitura (Readable). O mecanismo interno do `.pipe()` trata isso automaticamente pausando o Readable (emitindo `drain`) até que o buffer do Writable esvazie, protegendo a RAM.'
  },
  {
    id: 'be-str-05',
    topicId: 't-be-streams',
    question: 'A classe nativa EventEmitter do módulo events do Node.js implementa o padrão de projeto Observer. Quais são os métodos principais para registrar um ouvinte de evento e para disparar um evento, respectivamente?',
    options: [
      'Método .on() para registrar o ouvinte e método .emit() para disparar o evento.',
      'Método .listen() para registrar o ouvinte e método .dispatch() para disparar o evento.',
      'Método .subscribe() para registrar o ouvinte e método .publish() para disparar o evento.',
      'Método .watch() para registrar o ouvinte e método .trigger() para disparar o evento.',
      'Método .catch() para registrar o ouvinte e método .throw() para disparar o evento.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: Na classe `EventEmitter` do Node.js, registra-se um callback escutando um evento nomeado com `.on("nomeEvento", callback)` (ou `.once()`) e dispara-se esse evento com `.emit("nomeEvento", dados)`.'
  },
  {
    id: 'be-str-06',
    topicId: 't-be-streams',
    question: 'Qual é a diferença funcional entre agendar uma execução assíncrona utilizando process.nextTick() versus setImmediate() no Event Loop do Node.js?',
    options: [
      'process.nextTick() executa o callback imediatamente após a operação atual ser concluída (no final da fase atual do microtask queue), antes que o Event Loop avance para a próxima fase; setImmediate() executa o callback na fase "Check" do próximo giro do Event Loop.',
      'setImmediate() executa antes de qualquer código síncrono; process.nextTick() executa apenas quando o computador é reiniciado.',
      'process.nextTick() funciona apenas no navegador web; setImmediate() funciona apenas no Docker.',
      'Ambos os métodos são sinônimos perfeitos e executam no mesmo milissegundo sem distinção técnica.',
      'setImmediate() interrompe a execução do thread do sistema operacional congelando o servidor.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: `process.nextTick()` coloca a função no topo do próximo microtask queue (executado antes das demais fases do Event Loop). `setImmediate()` coloca o callback no queue da fase Check (executado no ciclo seguinte do loop de eventos).'
  },
  {
    id: 'be-str-07',
    topicId: 't-be-streams',
    question: 'Qual função utilitária moderna trazida do módulo stream/promises é a maneira mais segura de encadear múltiplas streams com suporte nativo a async/await e tratamento centralizado de erros e limpeza automática de recursos?',
    options: [
      'pipeline()',
      'streamAll()',
      'chainStreams()',
      'asyncPipe()',
      'executeStream()'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: O método `pipeline` da biblioteca `node:stream/promises` aceita múltiplas streams e retorna uma Promise. Se qualquer stream no meio do fluxo emitir erro ou for destruída, o `pipeline` trata o erro de forma assíncrona e fecha todas as streams abertas adequadamente.'
  },
  {
    id: 'be-str-08',
    topicId: 't-be-streams',
    question: 'Em uma API Express.js que serve um arquivo de áudio ou vídeo para reprodução contínua no navegador do cliente, como uma Readable Stream deve ser conectada à resposta HTTP?',
    options: [
      'O stream de leitura do arquivo deve ser redirecionado para a resposta HTTP res (ex: fileStream.pipe(res)), permitindo o envio progressivo de dados.',
      'A resposta deve converter o vídeo inteiro em uma string Base64 dentro do req.body.',
      'A API deve salvar o arquivo na memória RAM e enviá-lo como um objeto JSON gigante.',
      'A API deve reiniciar o servidor Express a cada frame enviado.',
      'O arquivo de vídeo deve ser enviado via requisição HTTP POST em lotes criptografados.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: Como o objeto de resposta do Express (`res`) herda de uma Writable Stream, conecta-se a Readable Stream do arquivo diretamente nele (`fileStream.pipe(res)`). Isso inicia a transferência do vídeo instantaneamente sem precisar ler o arquivo inteiro na memória do servidor.'
  },
  {
    id: 'be-str-09',
    topicId: 't-be-streams',
    question: 'No Node.js, o que é um Buffer e qual a sua relação com o processamento de Streams de dados brutos?',
    options: [
      'Uma região fixa de alocação de memória fora do V8 heap usada para manipular dados binários brutos (como bytes de arquivos, imagens e pacotes de rede).',
      'Uma função para atrasar a execução de uma rota por 5 segundos.',
      'Um arquivo de texto usado para armazenar o histórico de erros do git.',
      'Um plugin de CSS para criar botões com efeito de transparência.',
      'Um comando do terminal do Linux para apagar diretórios temporários.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: A classe `Buffer` no Node.js representa sequências de bytes binários brutos alocados em memória fora do heap gerenciado pelo motor V8. Os "chunks" transmitidos por Streams são entregues nativamente na forma de instâncias de `Buffer`.'
  },
  {
    id: 'be-str-10',
    topicId: 't-be-streams',
    question: 'O que ocorre se um erro de leitura ou gravação for emitido dentro de uma Stream conectada com .pipe() tradicional se não houver um ouvinte do evento .on("error", ...)?',
    options: [
      'A exceção não tratada fará a aplicação Node.js sofrer um crash e ser encerrada abruptamente.',
      'O Node.js ignora o erro e substitui os dados corrompidos por espaços em branco.',
      'A stream reinicia o processo a partir da primeira linha de código.',
      'O arquivo é automaticamente enviado para a lixeira do sistema operacional.',
      'O erro é exibido em uma caixa de diálogo do Windows na máquina do cliente.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: Streams estendem `EventEmitter`. Eventos de erro não escutados (`stream.on("error")`) lançam exceções globais não capturadas (`uncaughtException`), levando a aplicação Node.js ao término do processo (crash). Daí a recomendação do uso de `pipeline()`.'
  }
];
