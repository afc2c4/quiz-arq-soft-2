import { Question } from '../../../types';

export const BACKEND_EXPRESS_QUESTIONS: Question[] = [
  {
    id: 'be-exp-01',
    topicId: 't-be-express',
    question: 'No framework Express.js, a arquitetura é fortemente baseada em Middlewares. Qual é o papel crucial da função next() passada como terceiro argumento para um middleware?',
    options: [
      'Finalizar imediatamente a requisição enviando uma resposta vazia com código HTTP 200.',
      'Passar o controle da execução para o próximo middleware ou manipulador de rota na pilha de middlewares.',
      'Reiniciar a conexão com o banco de dados caso ocorra uma falha de query SQL.',
      'Redirecionar a requisição HTTP automaticamente para a página de login da aplicação.',
      'Limpar os dados contidos em req.body para liberar memória do servidor.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: Chamar `next()` passa a execução para o próximo middleware na cadeia. Se `next()` não for chamado nem a resposta finalizada (`res.send/json`), a requisição fica travada (hanging). A, C, D, E: falsos.'
  },
  {
    id: 'be-exp-02',
    topicId: 't-be-express',
    question: 'Para permitir que uma aplicação Express.js interprete o corpo de requisições recebidas no formato JSON (Content-Type: application/json), qual middleware nativo deve ser registrado no app?',
    options: [
      'app.use(express.urlencoded({ extended: true }))',
      'app.use(express.json())',
      'app.use(express.raw())',
      'app.use(express.static("public"))',
      'app.use(express.text())'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: `express.json()` analisa o corpo da requisição enviada como JSON e popula o objeto `req.body`. `urlencoded` é para formulários HTML normais. `static` serve arquivos estáticos.'
  },
  {
    id: 'be-exp-03',
    topicId: 't-be-express',
    question: 'Considere a rota configurada como app.get("/produtos/:categoria", handler). Como o parâmetro categoria presente na URL deve ser extraído dentro da função handler?',
    options: [
      'req.query.categoria',
      'req.body.categoria',
      'req.params.categoria',
      'req.headers.categoria',
      'req.url.categoria'
    ],
    correctAnswer: 2,
    explanation: 'A correta é a C: Parâmetros de rota nomeados precedidos por dois pontos (`:categoria`) ficam acessíveis no objeto `req.params`. Parâmetros da query string (`?categoria=eletronicos`) ficam em `req.query`. Dados enviados no corpo da requisição ficam em `req.body`.'
  },
  {
    id: 'be-exp-04',
    topicId: 't-be-express',
    question: 'Para modularizar e organizar sub-rotas de um recurso (ex: /usuarios, /pedidos) em arquivos separados na aplicação Express, qual recurso nativo do framework deve ser utilizado?',
    options: [
      'express.Router()',
      'express.SubApp()',
      'express.Controller()',
      'express.Module()',
      'express.Dispatcher()'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: `express.Router()` cria manipuladores de rota modulares e montáveis. Uma instância do Router é um sistema de middleware e roteamento completo, montado no app principal via `app.use("/recurso", recursoRouter)`.'
  },
  {
    id: 'be-exp-05',
    topicId: 't-be-express',
    question: 'Qual é a assinatura de parâmetros que define um Middleware de Tratamento de Erro (Error-Handling Middleware) no Express.js para capturar exceções lançadas nas rotas?',
    options: [
      '(req, res, next)',
      '(err, req, res, next)',
      '(req, res, err)',
      '(err, req, res)',
      '(req, res)'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: Middlewares de tratamento de erro no Express devem aceitar exatamente QUATRO argumentos: `(err, req, res, next)`. O Express identifica que se trata de um middleware de erro pela quantidade de 4 parâmetros.'
  },
  {
    id: 'be-exp-06',
    topicId: 't-be-express',
    question: 'Em APIs RESTful, a validação de dados de entrada antes do processamento na camada de negócio garante a integridade da aplicação. Ao usar bibliotecas como Zod ou Joi em rotas Express, qual é o fluxo adequado ao detectar dados inválidos em req.body?',
    options: [
      'Interromper o servidor com process.exit(1) para evitar a persistência de dados incorretos.',
      'Retornar uma resposta HTTP 400 (Bad Request) acompanhada dos detalhes dos erros de validação sem prosseguir para o controller.',
      'Redirecionar o cliente para uma página com código HTTP 302 Found.',
      'Persistir os dados parcialmente no banco e retornar HTTP 202 Accepted.',
      'Ignorar os campos inválidos e definir seus valores como null no banco de dados.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: Quando os dados de entrada violam o schema de validação, a API deve responder imediatamente com um código do cliente `400 Bad Request` descrevendo quais campos falharam, sem executar a lógica do serviço ou banco de dados.'
  },
  {
    id: 'be-exp-07',
    topicId: 't-be-express',
    question: 'Qual das alternativas descreve corretamente o papel de um ORM (Object-Relational Mapping), como Prisma ou TypeORM, no ecossistema Node.js/Express?',
    options: [
      'Substituir o servidor web Express criando interfaces gráficas automáticas no navegador.',
      'Mapear tabelas de banco de dados relacional para classes ou objetos na aplicação, permitindo consultas via métodos orientados a objetos.',
      'Criptografar as senhas armazenadas na memória RAM do servidor.',
      'Executar testes de carga e simulação de concorrência em rotas de API.',
      'Servir de proxy reverso para balanceamento de carga entre múltiplos servidores.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: Um ORM mapeia entidades/tabelas relacionais do banco em objetos/tipos da linguagem, abstraindo a escrita direta de SQL puro e oferecendo tipagem e migrações. A, C, D, E: papéis não relacionados a ORM.'
  },
  {
    id: 'be-exp-08',
    topicId: 't-be-express',
    question: 'Em uma API RESTful bem arquitetada, qual código de status HTTP deve ser retornado após uma requisição POST que cria com sucesso um novo recurso no servidor?',
    options: [
      '200 OK',
      '201 Created',
      '204 No Content',
      '304 Not Modified',
      '202 Accepted'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: O status HTTP `201 Created` indica que a requisição foi bem-sucedida e levou à criação de um novo recurso. `200 OK` é genérico; `204 No Content` é para respostas sem corpo (ex: DELETE bem-sucedido).'
  },
  {
    id: 'be-exp-09',
    topicId: 't-be-express',
    question: 'Qual é a função do middleware helmet em uma aplicação Express.js?',
    options: [
      'Gerar tokens de autenticação JWT para usuários logados.',
      'Aumentar a segurança da aplicação configurando diversos cabeçalhos HTTP (HTTP Headers) protetores.',
      'Realizar o balanceamento de carga de requisições de entrada.',
      'Compactar as respostas HTTP utilizando o algoritmo Gzip.',
      'Conectar a aplicação Express a clusters de banco de dados Redis.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: O pacote `helmet` ajuda a proteger aplicações Express configurando vários cabeçalhos HTTP adequados (como Content-Security-Policy, X-Frame-Options, Strict-Transport-Security, etc.).'
  },
  {
    id: 'be-exp-10',
    topicId: 't-be-express',
    question: 'Ao expor uma API REST em um domínio diferente da aplicação front-end (ex: api.meusite.com vs meusite.com), o navegador bloqueia as requisições por padrão devido à política de mesma origem (SOP). Qual middleware deve ser configurado no Express para autorizar essa comunicação?',
    options: [
      'cors()',
      'morgan()',
      'cookie-parser()',
      'csurf()',
      'body-parser()'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: O middleware `cors` habilita o suporte a Cross-Origin Resource Sharing (CORS) no Express, definindo os cabeçalhos `Access-Control-Allow-Origin` adequados. `morgan` é para logging. `cookie-parser` é para interpretar cookies.'
  }
];
