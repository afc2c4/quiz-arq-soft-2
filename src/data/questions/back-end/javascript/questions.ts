import { Question } from '../../../types';

export const BACKEND_JAVASCRIPT_QUESTIONS: Question[] = [
  {
    id: 'be-js-01',
    topicId: 't-be-js',
    question: 'No JavaScript moderno (ES6+), o gerenciamento de escopo de variáveis foi aprimorado com as palavras-chave let e const. Qual é a diferença fundamental de comportamento entre var, let e const em relação ao hoisting e ao escopo?',
    options: [
      'var possui escopo de função e sofre hoisting inicializado como undefined, enquanto let e const possuem escopo de bloco e entram em Temporal Dead Zone até sua declaração.',
      'let e const possuem escopo de função e não sofrem hoisting, enquanto var possui escopo global e é inicializado como null.',
      'const permite reatribuição de novos valores mas impede a mutação de objetos, enquanto let impede qualquer modificação no valor.',
      'var e let possuem exatamente o mesmo escopo de bloco, diferenciando-se apenas pelo fato de que var não aceita atribuições de tipos primitivos.',
      'let sofre hoisting com valor padrão definido como objeto vazio, enquanto const gera um erro de compilação se declarado dentro de blocos condicionais.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: var tem escopo de função e sofre hoisting sendo elevado como undefined. let e const possuem escopo de bloco e ficam na Temporal Dead Zone (TDZ) até a linha de declaração. As demais erram ao alterar as regras de escopo, mutabilidade e hoisting.'
  },
  {
    id: 'be-js-02',
    topicId: 't-be-js',
    question: 'As Arrow Functions introduziram uma sintaxe concisa para funções em JavaScript. Qual é a principal característica semântica das Arrow Functions em relação ao contexto da palavra-chave this?',
    options: [
      'As Arrow Functions criam um novo contexto de this dinâmico baseado no objeto que executa a função no momento da chamada.',
      'As Arrow Functions não possuem seu próprio binding de this, vinculando o this de forma léxica ao escopo onde foram definidas.',
      'As Arrow Functions vinculam o this sempre ao objeto global window ou global, ignorando o escopo pai onde foram criadas.',
      'As Arrow Functions permitem redefinir o this utilizando obrigatoriamente os métodos .bind(), .call() ou .apply().',
      'As Arrow Functions só podem utilizar o this quando declaradas dentro de métodos construtores de classes.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: Arrow functions não possuem seu próprio `this`, elas herdam o `this` do escopo léxico circundante no momento da criação. A: descreve funções tradicionais. C: incorreto pois dependem do escopo pai. D: .bind/.call/.apply não alteram o `this` de arrow functions. E: podem ser usadas em qualquer lugar.'
  },
  {
    id: 'fe-js-03-be',
    topicId: 't-be-js',
    question: 'O método Array.prototype.map() é amplamente utilizado em programação funcional no Node.js. Qual é o comportamento correto deste método ao ser executado sobre um array?',
    options: [
      'Modifica o array original diretamente adicionando os elementos retornados pela função de callback.',
      'Itera sobre o array executando efeitos colaterais sem retornar nenhum valor (retorna sempre undefined).',
      'Cria e retorna um novo array contendo os resultados da aplicação da função de callback em cada elemento do array original.',
      'Filtra os elementos do array original retornando apenas aqueles em que a função de callback retorna verdadeiro.',
      'Reduz todos os elementos do array a um único valor primitivo acumulado com base no índice inicial.'
    ],
    correctAnswer: 2,
    explanation: 'A correta é a C: .map() gera um novo array transformado de mesmo tamanho sem alterar o original. A: descreve mutação direta (incorreto). B: descreve o .forEach(). D: descreve o .filter(). E: descreve o .reduce().'
  },
  {
    id: 'be-js-04',
    topicId: 't-be-js',
    question: 'Ao percorrer coleções de dados em JavaScript, é comum o uso das estruturas de repetição for...in e for...of. Qual é a diferença crucial entre a utilização de for...in e for...of?',
    options: [
      'for...in itera sobre os valores dos elementos de um objeto iterável, enquanto for...of itera sobre as chaves enumeráveis do objeto.',
      'for...in itera sobre as propriedades enumeráveis (chaves/índices) de um objeto, enquanto for...of itera sobre os valores de objetos iteráveis.',
      'for...in é exclusivo para arrays multidimensionais, enquanto for...of pode ser aplicado apenas em mapas e conjuntos (Map e Set).',
      'for...in funciona de forma assíncrona aguardando Promises, enquanto for...of executa apenas iterações síncronas bloqueantes.',
      'for...of lança uma exceção se utilizado em arrays, pois foi projetado exclusivamente para iteração sobre literais de objeto.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: for...in percorre as chaves/propriedades enumeráveis de um objeto. for...of percorre os valores de estruturas iteráveis (Array, Map, Set, String). A: inverteu os conceitos. C, D, E: contêm afirmações falsas sobre limitações e assincronismo.'
  },
  {
    id: 'be-js-05',
    topicId: 't-be-js',
    question: 'No ecossistema JavaScript, o conceito de Closure é fundamental para o encapsulamento de estado. Como se define tecnicamente uma Closure?',
    options: [
      'A capacidade de um método estático acessar atributos privados de instâncias de classes externas.',
      'Uma função combinada com o ambiente léxico no qual essa função foi declarada, permitindo acessar variáveis do escopo externo mesmo após o término da execução da função pai.',
      'Um mecanismo do motor V8 para liberar memória de variáveis que não são mais referenciadas no escopo global.',
      'Um padrão de projeto que converte funções assíncronas em chamadas síncronas usando geradores e iteradores.',
      'Uma estrutura de dados que impede a modificação de propriedades de objetos através do congelamento de memória (Object.freeze).'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: Closure é a combinação de uma função com a referência ao seu escopo léxico circundante, permitindo que a função interna acesse variáveis da função externa mesmo depois que esta retornou. A, C, D, E: misturam outros conceitos de OOP, garbage collection e padrões de projeto.'
  },
  {
    id: 'be-js-06',
    topicId: 't-be-js',
    question: 'A sintaxe async/await simplifica a escrita de código assíncrono baseado em Promises. Qual é o comportamento adequado para o tratamento de exceções ao utilizar await em uma função assíncrona?',
    options: [
      'Exceções ocorridas em instruções await são silenciosamente ignoradas caso não haja um evento unhandledRejection configurado.',
      'Deve-se envolver o código com chamadas await dentro de um bloco try...catch para capturar rejeições de Promises.',
      'O operador await retorna um tupla [error, data] automaticamente, dispensando o tratamento de erros estruturado.',
      'Promessas rejeitadas dentro de funções async automaticamente reiniciam a execução da função a partir da primeira linha.',
      'O tratamento de erros em funções async só é possível encadeando obrigatoriamente um método .catch() diretamente no bloco da função.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: Quando uma Promise rejeita dentro de um `await`, ela lança uma exceção que pode ser capturada por um bloco `try...catch`. A: rejeições não tratadas encerram o processo com erro. C: padrão Go/Lua, não nativo do JS. D e E: falsos.'
  },
  {
    id: 'be-js-07',
    topicId: 't-be-js',
    question: 'Em relação à orientação a objetos no JavaScript (ES6+), como funciona a Herança baseada em classes declaradas com a palavra-chave class?',
    options: [
      'Classes em JavaScript são uma camada sintática (syntactic sugar) sobre a herança prototípica tradicional (prototypal inheritance) da linguagem.',
      'JavaScript passou a ser uma linguagem com compilação estática e herança clássica pura idêntica a Java e C++.',
      'Ao estender uma classe com extends, o construtor da classe filha pode acessar this antes de invocar o método super().',
      'Métodos declarados em uma class são copiados individualmente para a memória de cada nova instância criada.',
      'A palavra-chave extends permite herança múltipla de diversas classes simultaneamente separadas por vírgula.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: As classes no JS ES6 são um "syntactic sugar" para o sistema de protótipos (prototype chain). B: JS continua dinâmico e prototípico. C: `super()` DEVE ser chamado antes de usar `this`. D: métodos ficam no protótipo compartilhado. E: JS não suporta herança múltipla nativa de classes.'
  },
  {
    id: 'be-js-08',
    topicId: 't-be-js',
    question: 'O método de array Array.prototype.reduce() é uma ferramenta poderosa para transformação e agregação de dados. Qual é o papel do argumento valorInicial (initialValue) na chamada do reduce?',
    options: [
      'Se fornecido, define a quantidade máxima de iterações que o reduce executará antes de interromper o loop.',
      'Se fornecido, é usado como primeiro argumento (acumulador) na primeira chamada da função de callback; caso contrário, o primeiro elemento do array é usado como acumulador.',
      'É um parâmetro obrigatório que determina o tipo de retorno da função, restringindo o resultado apenas a números ou strings.',
      'Define o índice a partir do qual a iteração do array será iniciada em ordem reversa.',
      'Substitui o primeiro elemento do array original antes da execução da função de redução.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: O `initialValue` inicializa o acumulador na primeira iteração. Se omitido, o primeiro elemento do array é utilizado como acumulador e a iteração começa do segundo elemento. A, C, D, E: falsos.'
  },
  {
    id: 'be-js-09',
    topicId: 't-be-js',
    question: 'A atribuição via desestruturação (Destructuring Assignment) permite extrair dados de arrays ou objetos em variáveis distintas. Qual das opções demonstra corretamente a renomeação de uma propriedade durante a desestruturação de um objeto?',
    options: [
      'const { nome as nomeUsuario } = usuario;',
      'const { nome: nomeUsuario } = usuario;',
      'const { nome -> nomeUsuario } = usuario;',
      'const { nome = nomeUsuario } = usuario;',
      'const [ nome: nomeUsuario ] = usuario;'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: Em desestruturação de objetos, a sintaxe `{ propriedadeOriginal: novoNome }` renomeia a variável extraída. A: `as` é usado em imports/TypeScript. C: sintaxe inválida. D: `=` define valor padrão, não renomeia. E: colchetes são para arrays.'
  },
  {
    id: 'be-js-10',
    topicId: 't-be-js',
    question: 'No processamento assíncrono paralelo com Promises, qual é a diferença fundamental entre Promise.all() e Promise.allSettled()?',
    options: [
      'Promise.all() aguarda todas as promessas terminarem independente do resultado, enquanto Promise.allSettled() falha imediatamente na primeira rejeição.',
      'Promise.all() falha imediatamente (short-circuits) se qualquer promessa for rejeitada, enquanto Promise.allSettled() aguarda todas cumprirem ou rejeitarem, retornando um array de objetos com o estado de cada uma.',
      'Promise.all() aceita apenas funções síncronas, enquanto Promise.allSettled() aceita exclusivamente requisições HTTP do tipo GET.',
      'Promise.all() executa as promessas em sequência ordenada, enquanto Promise.allSettled() executa as promessas em threads paralelas distintas.',
      'Promise.allSettled() retorna o resultado da promessa que resolver mais rápido, descartando o resultado das demais.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: `Promise.all()` rejeita no primeiro erro (fail-fast). `Promise.allSettled()` sempre espera que todas as promessas finalizem (seja com sucesso ou rejeição) e devolve o status e valor/razão de cada uma. A: inverteu os conceitos. C, D, E: afirmações incorretas.'
  }
];
