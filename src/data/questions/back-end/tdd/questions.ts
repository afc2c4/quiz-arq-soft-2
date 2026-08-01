import { Question } from '../../../types';

export const BACKEND_TDD_QUESTIONS: Question[] = [
  {
    id: 'be-tdd-01',
    topicId: 't-be-tdd',
    question: 'A metodologia TDD (Test-Driven Development) é pautada em um ciclo iterativo conhecido como Red-Green-Refactor. Qual é a ordem e o significado estrito das três etapas deste ciclo?',
    options: [
      'Red: escrever o código de produção; Green: escrever o teste que passa; Refactor: otimizar o banco de dados.',
      'Red: escrever um teste que falha antes de existir a implementação; Green: escrever o código mínimo necessário para fazer o teste passar; Refactor: refatorar o código mantendo o teste passando.',
      'Red: deletar os testes com erro; Green: compilar a aplicação para produção; Refactor: renomear as variáveis do arquivo.',
      'Red: simular um ataque de hackers; Green: criptografar o banco de dados; Refactor: publicar a aplicação na nuvem.',
      'Red: criar a documentação Swagger; Green: validar os esquemas JSON; Refactor: executar testes de carga.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: O ciclo TDD é: 1. RED (escrever um teste automatizado que falhe), 2. GREEN (escrever o código mínimo funcional para que o teste passe), 3. REFACTOR (melhorar o design e clareza do código sem alterar seu comportamento externo, garantindo que os testes continuem verdes).'
  },
  {
    id: 'be-tdd-02',
    topicId: 't-be-tdd',
    question: 'Qual é a diferença fundamental entre Testes Unitários e Testes de Integração em uma aplicação de back-end?',
    options: [
      'Testes unitários testam a aplicação inteira no navegador; testes de integração testam apenas funções matemáticas simples.',
      'Testes unitários isolam uma pequena unidade de código (ex: método ou função) simulando suas dependências externas; testes de integração verificam a interação entre múltiplos módulos, componentes ou serviços externos (como banco de dados e APIs).',
      'Testes unitários exigem a instalação do Docker; testes de integração rodam sem necessidade de código.',
      'Testes unitários são executados exclusivamente pelo cliente; testes de integração são executados apenas pelo servidor web.',
      'Não há diferença conceitual, sendo termos sinônimos para testes manuais executados pelo time de QA.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: Testes unitários (unit tests) isolam uma única unidade de lógica isolando dependências com Mocks. Testes de integração (integration tests) validam se diferentes partes do sistema (módulos, banco de dados, filas) funcionam corretamente juntas.'
  },
  {
    id: 'be-tdd-03',
    topicId: 't-be-tdd',
    question: 'No contexto de Dublês de Teste (Test Doubles), qual é a diferença entre um Stub e um Mock?',
    options: [
      'Stubs fornecem respostas pré-programadas para chamadas feitas durante o teste; Mocks são objetos pré-programados com expectativas sobre as chamadas que eles esperam receber e verificar.',
      'Stubs são usados apenas em linguagens compiladas como C++; Mocks são exclusivos para JavaScript e Node.js.',
      'Stubs acessam o banco de dados de produção real; Mocks simulam apenas erros de sintaxe de arquivo.',
      'Stubs são testes executados pelo navegador; Mocks são testes executados pelo Docker.',
      'Stubs substituem o servidor web Express; Mocks substituem o arquivo package.json.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: Stubs fornecem respostas estáticas pré-definidas para chamadas (state verification). Mocks verificam o comportamento (behavior verification), isto é, checam se determinado método foi chamado com parâmetros específicos e quantidade de vezes exata.'
  },
  {
    id: 'be-tdd-04',
    topicId: 't-be-tdd',
    question: 'No framework de testes Jest para Node.js, para que serve a função de ciclo de vida beforeEach()?',
    options: [
      'Para executar um bloco de código uma única vez antes de todos os testes do arquivo iniciarem.',
      'Para executar um bloco de código de preparação (setup) antes da execução de CADA teste individual contido no bloco de testes.',
      'Para interromper a execução da suíte de testes caso algum teste falhe.',
      'Para compilar os arquivos TypeScript em JavaScript antes de publicar a imagem Docker.',
      'Para limpar a memória RAM do servidor Node.js após a finalização da suíte de testes.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: `beforeEach()` executa a função informada antes de cada teste (`it`/`test`) individual no escopo atual. É ideal para resetar variáveis, instanciar objetos limpos e garantir o isolamento entre testes. `beforeAll()` executa uma única vez antes de todos.'
  },
  {
    id: 'be-tdd-05',
    topicId: 't-be-tdd',
    question: 'Ao realizar testes de integração de rotas e controllers de uma API Express com Jest, qual biblioteca é amplamente utilizada para simular requisições HTTP (GET, POST, PUT, DELETE) diretamente contra a instância do servidor sem precisar subir uma porta de rede real?',
    options: [
      'supertest',
      'axios',
      'node-fetch',
      'express-validator',
      'nodemon'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: O `supertest` é a biblioteca padrão para testar rotas HTTP em Express/Node.js. Ele se conecta à instância da aplicação (`app`) e dispara requisições HTTP simuladas na memória de forma extremamente rápida, sem ocupar portas de rede do sistema.'
  },
  {
    id: 'be-tdd-06',
    topicId: 't-be-tdd',
    question: 'Os princípios F.I.R.S.T. definem as características cruciais de um conjunto de testes unitários de alta qualidade. O que significa a letra I de F.I.R.S.T.?',
    options: [
      'Integrated (Integrado a sistemas externos de terceiros).',
      'Independent / Isolated (Independente/Isolado, os testes não devem depender da ordem de execução ou do resultado de outros testes).',
      'Immutable (Imutável, o código do teste nunca pode ser alterado após escrito).',
      'Instantaneous (Instantâneo, deve rodar obrigatoriamente em menos de 1 microsegundo).',
      'Internationalized (Internacionalizado, suporte a múltiplos idiomas).'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: F.I.R.S.T. = Fast (rápido), Independent/Isolated (independente), Repeatable (repetível em qualquer ambiente), Self-validating (auto-validável com resultado passa/falha), Timely (escrito no momento certo, antes do código funcional no TDD).'
  },
  {
    id: 'be-tdd-07',
    topicId: 't-be-tdd',
    question: 'Qual é a limitação e o perigo de se confiar unicamente na métrica de "Cobertura de Código" (Code Coverage) de 100% como indicador de qualidade do software?',
    options: [
      'A métrica de cobertura de código impede o deploy automatizado no Kubernetes.',
      '100% de cobertura indica apenas que as linhas de código foram executadas durante os testes, mas não garante que as asserções (assertions) testaram os cenários de borda e regras de negócio de forma efetiva.',
      'Cobertura de código acima de 80% causa lentidão irreversível na execução de queries SQL no banco de dados.',
      'A métrica de cobertura não consegue analisar arquivos escritos em TypeScript.',
      'Ferramentas de cobertura de código exigem pagamento de licença cara por linha de código analisada.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: Alta cobertura de código mede linhas transitadas (exercitadas) no teste, mas um teste fraco sem asserções relevantes (`expect`) pode cobrir 100% das linhas sem validar cenários de erro, valores nulos ou condições de borda reais.'
  },
  {
    id: 'be-tdd-08',
    topicId: 't-be-tdd',
    question: 'A Pirâmide de Testes é uma metáfora visual para a estruturação da estratégia de testes de uma aplicação. Como os testes devem estar distribuídos na pirâmide tradicional em termos de quantidade e custo?',
    options: [
      'Base maior composta por testes unitários (rápidos e baratos); meio composto por testes de integração; topo menor composto por testes Ponta a Ponta / E2E (lentos e caros).',
      'Base maior composta por testes manuais; meio por testes E2E; topo por testes unitários.',
      'Base maior composta por testes de carga; meio por testes unitários; topo por testes de segurança.',
      'Quantidade idêntica de testes unitários, de integração e E2E divididos em partes exatamente iguais de 33%.',
      'A pirâmide recomenda eliminar testes unitários e manter apenas testes E2E executados diretamente em produção.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: A Pirâmide de Testes preconiza uma base sólida com grande volume de testes unitários (rápidos, isolados e baratos), seguidos por uma camada intermediária de testes de integração, e um topo menor com testes E2E (UI/Ponta a Ponta), que são mais lentos e frágeis.'
  },
  {
    id: 'be-tdd-09',
    topicId: 't-be-tdd',
    question: 'O que são Testes de Mutação (Mutation Testing) e como eles ajudam a avaliar a eficácia de uma suíte de testes existente?',
    options: [
      'São testes que alteram o banco de dados de produção para verificar o comportamento da aplicação em caso de perda de dados.',
      'São ferramentas que introduzem pequenas alterações (mutações/mutantes) no código de produção e verificam se a suíte de testes é capaz de falhar e pegar as mutações.',
      'São testes que convertem automaticamente código JavaScript em código Python para rodar em servidores de inteligência artificial.',
      'São testes de estresse que aumentam o uso de CPU até o travamento do servidor.',
      'São verificações automáticas de ortografia na documentação do projeto.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: O teste de mutação altera propositalmente operadores no código (ex: troca `>` por `>=`, `+` por `-`) criando "mutantes". Se a suíte de testes continuar passando (o mutante sobrevive), significa que a suíte possui brechas de validação.'
  },
  {
    id: 'be-tdd-10',
    topicId: 't-be-tdd',
    question: 'Em uma pipeline de CI/CD (Integração Contínua), qual é o momento adequado para a execução automatizada da suíte de testes unitários e de integração?',
    options: [
      'Apenas uma vez por ano durante a auditoria fiscal da empresa.',
      'A cada Pull Request (PR) ou commit enviado para o repositório de código, bloqueando a mesclagem caso algum teste falhe.',
      'Após o deploy da aplicação ter sido finalizado em ambiente de produção para os clientes finais.',
      'Apenas quando o cliente reclama de um bug no ambiente de atendimento.',
      'A execução de testes automatizados é opcional e não deve fazer parte da esteira de CI/CD.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: A esteira de CI deve rodar os testes automatizados a cada commit ou Pull Request. Se qualquer teste falhar, o build é interrompido (broken build), impedindo que código quebrado seja mesclado no branch principal ou publicado em produção.'
  }
];
