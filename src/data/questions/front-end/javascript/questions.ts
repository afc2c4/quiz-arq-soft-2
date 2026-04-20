import { Question } from '../../../types';

export const FRONTEND_JAVASCRIPT_QUESTIONS: Question[] = [
  // Lote 1: DOM, Node, etc.
  {
    id: 'fe-js1',
    topicId: 't-fe-javascript',
    question: 'No contexto do desenvolvimento web, assinale a alternativa correta que define o que é o DOM (Document Object Model):',
    options: [
      'É uma linguagem de programação de baixo nível que substitui o JavaScript na criação de sites.',
      'É um protocolo de segurança que impede o navegador de carregar scripts de fontes desconhecidas.',
      'É uma interface de programação que representa o documento HTML como uma estrutura de árvore, permitindo sua manipulação.',
      'É um banco de dados interno do navegador usado para armazenar as senhas e históricos do usuário.',
      'É um componente de hardware do computador responsável por acelerar a renderização de imagens 3D.'
    ],
    correctAnswer: 2,
    explanation: 'O DOM representa o documento HTML como uma estrutura de árvore para manipulação.'
  },
  {
    id: 'fe-js2',
    topicId: 't-fe-javascript',
    question: 'Assinale a alternativa correta que explica por que o DOM é importante para o JavaScript no navegador:',
    options: [
      'Ele permite que o JavaScript acesse e altere dinamicamente o conteúdo, a estrutura e o estilo da página.',
      'Ele serve exclusivamente para converter o código JavaScript em linguagem binária para o processador.',
      'Ele é o único responsável por garantir que o site seja traduzido para diferentes idiomas automaticamente.',
      'Ele impede que o código JavaScript seja visualizado pelo usuário através do console do desenvolvedor.',
      'Ele funciona como um antivírus que bloqueia a execução de qualquer função que utilize unidades relativas.'
    ],
    correctAnswer: 0,
    explanation: 'O DOM é fundamental para manipular o conteúdo, estrutura e estilo da página.'
  },
  {
    id: 'fe-js3',
    topicId: 't-fe-javascript',
    question: 'Existem diversas formas de acessar elementos do HTML através do DOM. Assinale a alternativa que apresenta métodos tecnicamente corretos:',
    options: [
      'getElementByName() e accessStyle().',
      'getElementById() e querySelector().',
      'fetchElement() e selectTag().',
      'searchHtml() e findId().',
      'pickElement() e targetClass().'
    ],
    correctAnswer: 1,
    explanation: 'getElementById e querySelector são métodos padrão do DOM.'
  },
  {
    id: 'fe-js4',
    topicId: 't-fe-javascript',
    question: 'Assinale a alternativa correta sobre o significado de rodar o código JavaScript no lado do cliente:',
    options: [
      'Significa que o processamento do script ocorre nos servidores da empresa que hospeda o site.',
      'Significa que o código é executado diretamente no navegador do usuário final.',
      'Significa que o código só funciona se o usuário baixar um software de execução separado.',
      'Significa que o script é executado apenas quando o computador do cliente está desligado da internet.',
      'Significa que o JavaScript é convertido em uma imagem estática antes de ser enviado ao navegador.'
    ],
    correctAnswer: 1,
    explanation: 'Lado do cliente (client-side) significa execução no navegador.'
  },
  {
    id: 'fe-js5',
    topicId: 't-fe-javascript',
    question: 'Sobre os riscos ao usar JavaScript no lado do cliente, assinale a alternativa correta:',
    options: [
      'O principal risco é que o JavaScript pode danificar fisicamente a memória RAM do computador do usuário.',
      'O risco está na visibilidade do código, que pode ser inspecionado e manipulado por usuários mal-intencionados.',
      'O risco é que o JavaScript impede que o navegador consiga ler as tags de cabeçalho do HTML5.',
      'O risco é o aumento obrigatório do custo da hospedagem do site sempre que um script é executado.',
      'O risco principal é a exclusão automática de todos os arquivos de estilo CSS3 do computador do cliente.'
    ],
    correctAnswer: 1,
    explanation: 'Código no cliente é visível e pode ser inspecionado/manipulado.'
  },
  {
    id: 'fe-js6',
    topicId: 't-fe-javascript',
    question: 'Assinale a alternativa correta que descreve uma das principais funções do JavaScript no navegador:',
    options: [
      'Gerenciar o sistema de arquivos do sistema operacional Windows ou Linux do usuário.',
      'Controlar a interatividade da página, como reagir a cliques de botões e eventos de teclado.',
      'Substituir o protocolo HTTP por uma conexão direta de rádio entre o cliente e o servidor.',
      'Realizar a formatação física de discos rígidos através de comandos inseridos no HTML.',
      'Criar novas tags de marcação que alteram a estrutura do kernel do navegador de forma permanente.'
    ],
    correctAnswer: 1,
    explanation: 'JavaScript lida com a interatividade da página (eventos).'
  },
  {
    id: 'fe-js7',
    topicId: 't-fe-javascript',
    question: 'No ecossistema JavaScript, assinale a alternativa correta que define o que é uma biblioteca (library):',
    options: [
      'É um conjunto de códigos pré-escritos que o desenvolvedor pode chamar para realizar tarefas específicas.',
      'É um manual físico de instruções que deve ser enviado junto com o código para o cliente.',
      'É um sistema operacional completo baseado em JavaScript que roda dentro do navegador.',
      'É uma ferramenta que impede o uso de variáveis do tipo const e let no projeto.',
      'É um servidor de alta performance usado exclusivamente para armazenar imagens de alta resolução.'
    ],
    correctAnswer: 0,
    explanation: 'Bibliotecas oferecem conjuntos de códigos pré-escritos para reutilização.'
  },
  {
    id: 'fe-js8',
    topicId: 't-fe-javascript',
    question: 'Sobre o conceito de framework no JavaScript, assinale a alternativa correta:',
    options: [
      'É uma coleção de imagens e ícones que o desenvolvedor usa para decorar o rodapé do site.',
      'É uma estrutura completa que dita como o desenvolvedor deve organizar e construir a aplicação.',
      'É um comando simples usado apenas para mudar a cor de fundo de uma única tag <div>.',
      'É um tipo de variável de tipagem forte que não permite a mudança de valores numéricos.',
      'É um plugin de navegador que desabilita a execução de qualquer código JavaScript externo.'
    ],
    correctAnswer: 1,
    explanation: 'Frameworks ditam a estrutura e organização da aplicação.'
  },
  {
    id: 'fe-js9',
    topicId: 't-fe-javascript',
    question: 'Assinale a alternativa que apresenta a principal diferença conceitual entre uma biblioteca e um framework:',
    options: [
      'Bibliotecas são pagas, enquanto frameworks são sempre ferramentas gratuitas de código aberto.',
      'No framework, o fluxo de controle é ditado pela ferramenta; na biblioteca, o desenvolvedor decide quando usá-la.',
      'Bibliotecas só funcionam no Node.js, enquanto frameworks rodam apenas no navegador do cliente.',
      'Frameworks são usados para CSS, enquanto bibliotecas são exclusivas para a linguagem HTML.',
      'Não existe diferença técnica, sendo apenas nomes diferentes para o uso de variáveis globais.'
    ],
    correctAnswer: 1,
    explanation: 'A diferença chave está no fluxo de controle: "Inversion of Control" nos frameworks.'
  },
  {
    id: 'fe-js10',
    topicId: 't-fe-javascript',
    question: 'Assinale a alternativa correta que define o que é o Node.js:',
    options: [
      'É uma biblioteca de estilos CSS usada para criar botões com efeitos de sombra e gradiente.',
      'É um framework front-end utilizado para substituir o Bootstrap em projetos de responsividade.',
      'É um ambiente de execução que permite rodar JavaScript no lado do servidor, fora do navegador.',
      'É um editor de código-fonte que identifica erros de sintaxe automaticamente em tempo real.',
      'É um navegador de internet ultrarrápido criado especificamente para rodar scripts de tipagem fraca.'
    ],
    correctAnswer: 2,
    explanation: 'Node.js é um runtime para rodar JS no lado do servidor.'
  },
  {
    id: 'fe-js11',
    topicId: 't-fe-javascript',
    question: 'Sobre a importância do DOM, assinale a alternativa correta em relação à acessibilidade e interação:',
    options: [
      'O DOM impede que leitores de tela consigam interpretar o conteúdo textual da página.',
      'O DOM permite que tecnologias assistivas e scripts interajam com os elementos da página de forma estruturada.',
      'O DOM serve para esconder os elementos sensíveis do formulário para que o JavaScript não os encontre.',
      'O DOM substitui a necessidade de usar seletores de ID e Classe no arquivo de estilos CSS3.',
      'O DOM garante que o site funcione apenas em dispositivos que possuem mouse e teclado físicos.'
    ],
    correctAnswer: 1,
    explanation: 'O DOM estruturado permite acessibilidade.'
  },
  {
    id: 'fe-js12',
    topicId: 't-fe-javascript',
    question: 'Em relação ao Node.js, assinale a alternativa correta sobre sua arquitetura e uso:',
    options: [
      'Ele depende obrigatoriamente do navegador Google Chrome para conseguir processar qualquer código.',
      'Ele permite a criação de servidores web, APIs e ferramentas de linha de comando usando JavaScript.',
      'Ele é um compilador que transforma código JavaScript em arquivos de imagem do tipo .png.',
      'Ele é utilizado apenas para criar animações complexas que rodam no lado do cliente (browser).',
      'Ele desabilita a capacidade do JavaScript de trabalhar com variáveis do tipo var e const.'
    ],
    correctAnswer: 1,
    explanation: 'Node.js capacita servidores web e ferramentas de linha de comando.'
  },
  {
    id: 'fe-js13',
    topicId: 't-fe-javascript',
    question: 'Assinale a alternativa correta sobre a forma de acessar elementos via JavaScript no navegador:',
    options: [
      'O acesso aos elementos é feito sempre através do servidor, exigindo um refresh na página.',
      'Através do objeto document, é possível localizar elementos pelo nome da tag, classe ou ID.',
      'O acesso aos elementos HTML só é possível se o arquivo JavaScript estiver inserido dentro do <footer>.',
      'Para acessar um elemento, o desenvolvedor deve primeiro converter o HTML em um arquivo Node.js.',
      'O JavaScript acessa os elementos através de ondas de rádio emitidas pelo processador do cliente.'
    ],
    correctAnswer: 1,
    explanation: 'O objeto "document" é a porta de entrada para buscar elementos.'
  },
  {
    id: 'fe-js14',
    topicId: 't-fe-javascript',
    question: 'Sobre as possibilidades do JavaScript no Navegador, assinale a alternativa correta sobre a manipulação de estilos:',
    options: [
      'O JavaScript é incapaz de alterar cores ou fontes, tarefa exclusiva do arquivo CSS externo.',
      'O JavaScript pode alterar qualquer propriedade CSS de um elemento em resposta a uma ação do usuário.',
      'A manipulação de estilos via script invalida permanentemente a responsividade do site.',
      'O JavaScript só consegue alterar estilos se a página for reiniciada após cada clique.',
      'O uso de scripts para alterar estilos exige que o usuário tenha privilégios de administrador no PC.'
    ],
    correctAnswer: 1,
    explanation: 'A propriedade .style permite manipulação CSS via JS.'
  },
  {
    id: 'fe-js15',
    topicId: 't-fe-javascript',
    question: 'Assinale a alternativa correta sobre a execução de código no navegador do usuário:',
    options: [
      'Todo código JavaScript executado no navegador é processado no servidor antes de mostrar o resultado.',
      'A execução local permite uma resposta imediata na interface, sem necessidade de nova requisição ao servidor.',
      'O navegador proíbe a execução de qualquer script que tente acessar o DOM do documento atual.',
      'A execução no lado do cliente garante que o código nunca poderá ser visto ou copiado pelo usuário.',
      'O código executado no navegador é o responsável por gerenciar o banco de dados SQL principal da empresa.'
    ],
    correctAnswer: 1,
    explanation: 'Scripts no cliente rodam imediatamente sem novas requisições necessárias.'
  },
  // Lote 2: JS Basics, Variables, Rules
  {
    id: 'fe-js16',
    topicId: 't-fe-javascript',
    question: 'Sobre a forma de inserir o JavaScript no HTML, assinale a alternativa correta que identifica a tag utilizada para essa finalidade:',
    options: [
      'Utiliza-se a tag <js> para códigos internos e <javascript> para arquivos externos.',
      'Utiliza-se a tag <scripting> para definir funções lógicas dentro do corpo do documento.',
      'Utiliza-se a tag <script> tanto para códigos escritos diretamente no HTML quanto para arquivos externos.',
      'Utiliza-se a tag <code> acompanhada do atributo language="javascript" no cabeçalho.',
      'Utiliza-se a tag <link> com o atributo rel="javascript" para importar scripts de outros diretórios.'
    ],
    correctAnswer: 2,
    explanation: '<script> é a tag padrão para JS.'
  },
  {
    id: 'fe-js17',
    topicId: 't-fe-javascript',
    question: 'Ao realizar a inserção de um arquivo externo de JavaScript, assinale a alternativa correta sobre o atributo que deve ser utilizado na tag <script>:',
    options: [
      'Deve-se utilizar o atributo href seguido do caminho do arquivo com extensão .js.',
      'Deve-se utilizar o atributo src para indicar a localização do arquivo de script externo.',
      'Deve-se utilizar o atributo link para conectar o arquivo JavaScript ao arquivo HTML.',
      'Deve-se utilizar o atributo source seguido do nome da função principal do arquivo.',
      'Deve-se utilizar o atributo rel para definir que o arquivo externo é do tipo script.'
    ],
    correctAnswer: 1,
    explanation: 'O atributo "src" aponta para a origem do arquivo JS.'
  },
  {
    id: 'fe-js18',
    topicId: 't-fe-javascript',
    question: 'Assinale a alternativa correta sobre o local de inserção da tag de script dentro do documento HTML:',
    options: [
      'O JavaScript deve ser inserido obrigatoriamente apenas dentro da tag <head> para funcionar.',
      'O JavaScript só pode ser inserido após o fechamento da tag </html> para não travar o site.',
      'O JavaScript pode ser inserido tanto na tag <head> quanto no final da tag <body>.',
      'O JavaScript deve ser inserido dentro de uma tag <meta> para garantir a segurança dos dados.',
      'O JavaScript deve ser inserido exclusivamente dentro de tags de seção como <section> ou <article>.'
    ],
    correctAnswer: 2,
    explanation: 'Script pode ir no <head> ou no final do <body>.'
  },
  {
    id: 'fe-js19',
    topicId: 't-fe-javascript',
    question: 'Dentre as possibilidades ao usar JavaScript no desenvolvimento web, assinale a alternativa correta que descreve sua função principal:',
    options: [
      'O JavaScript é utilizado para definir a estrutura semântica e o conteúdo textual da página.',
      'O JavaScript é utilizado para criar estilos visuais, cores e layouts complexos de forma estática.',
      'O JavaScript é utilizado para adicionar interatividade, manipular o comportamento e processar dados no cliente.',
      'O JavaScript serve apenas para conectar o site a impressoras locais e dispositivos de hardware.',
      'O JavaScript substitui completamente a necessidade de usar HTML e CSS na criação de sites simples.'
    ],
    correctAnswer: 2,
    explanation: 'JS é para comportamento e interatividade.'
  },
  {
    id: 'fe-js20',
    topicId: 't-fe-javascript',
    question: 'Sobre as funcionalidades e possibilidades do JavaScript, assinale a alternativa correta:',
    options: [
      'Ele permite a criação de alertas, validação de formulários e atualizações dinâmicas de conteúdo.',
      'Ele impede que o usuário consiga visualizar o código-fonte do site através do navegador.',
      'Ele é utilizado exclusivamente para hospedar o domínio do site em servidores de alta velocidade.',
      'Ele serve apenas para traduzir o texto da página automaticamente para outros idiomas.',
      'Ele permite que o navegador ignore os erros de sintaxe do HTML5 sem prejudicar a página.'
    ],
    correctAnswer: 0,
    explanation: 'JS habilita alertas, validação e manipulação dinâmica.'
  },
  {
    id: 'fe-js21',
    topicId: 't-fe-javascript',
    question: 'No JavaScript, o conceito de tipagem fraca refere-se a qual característica? Assinale a alternativa correta:',
    options: [
      'Significa que a linguagem é incapaz de realizar operações matemáticas com números grandes.',
      'Significa que as variáveis não possuem um tipo de dado definido e não podem armazenar textos.',
      'Significa que o desenvolvedor não precisa declarar explicitamente o tipo da variável e ela pode mudar de tipo.',
      'Significa que o código JavaScript quebra facilmente se houver qualquer erro de digitação no nome.',
      'Significa que a linguagem exige que cada variável seja declarada com um tipo fixo como int ou string.'
    ],
    correctAnswer: 2,
    explanation: 'Tipagem fraca não exige declaração explícita de tipos e permite mudança de tipos.'
  },
  {
    id: 'fe-js22',
    topicId: 't-fe-javascript',
    question: 'Assinale a alternativa correta que exemplifica o comportamento de uma linguagem de tipagem fraca como o JavaScript:',
    options: [
      'Uma variável declarada com um número não pode, em hipótese alguma, receber um texto posteriormente.',
      'O navegador exige que o usuário confirme o tipo de dado de cada variável através de um pop-up.',
      'A mesma variável pode começar armazenando um número e depois receber uma string (texto) sem erro.',
      'O sistema impede a soma de dois números se eles não forem declarados como constantes globais.',
      'Todas as variáveis devem ser convertidas manualmente para o tipo "fraco" antes de serem exibidas.'
    ],
    correctAnswer: 2,
    explanation: 'Variáveis JS podem reatribuir tipos diferentes.'
  },
  {
    id: 'fe-js23',
    topicId: 't-fe-javascript',
    question: 'Sobre a tipagem fraca e a conversão de dados, assinale a alternativa correta:',
    options: [
      'O JavaScript realiza conversões automáticas entre tipos de dados diferentes durante operações.',
      'O JavaScript proíbe qualquer tipo de operação entre variáveis que contenham números e textos.',
      'O JavaScript exige o uso de um compilador externo para definir se a tipagem será fraca ou forte.',
      'A tipagem fraca garante que todas as variáveis sejam lidas como números, independente do valor.',
      'O termo "fraca" indica que a linguagem é menos segura que linguagens de marcação como o HTML.'
    ],
    correctAnswer: 0,
    explanation: 'O JS faz coerção de tipos automaticamente.'
  },
  {
    id: 'fe-js24',
    topicId: 't-fe-javascript',
    question: 'Assinale a alternativa correta sobre as palavras-chave utilizadas para declarar variáveis no JavaScript moderno:',
    options: [
      'Utilizam-se obrigatoriamente as palavras-chave define, set e constant.',
      'Utilizam-se as palavras-chave var, let e const para criar variáveis ou constantes.',
      'Utilizam-se as palavras-chave dim, integer e string conforme o tipo de dado.',
      'Utiliza-se apenas a palavra variable seguida do nome e do símbolo de porcentagem.',
      'Utilizam-se as palavras new, public e private para todas as declarações simples.'
    ],
    correctAnswer: 1,
    explanation: 'var, let e const são as formas de declaração JS.'
  },
  {
    id: 'fe-js25',
    topicId: 't-fe-javascript',
    question: 'Sobre o processo de como declarar variáveis, assinale a alternativa correta quanto à sintaxe de atribuição:',
    options: [
      'Para declarar e atribuir valor, utiliza-se o nome da variável seguido de dois pontos e o valor.',
      'Para declarar e atribuir valor, utiliza-se uma palavra-chave, o nome da variável e o sinal de igual (=).',
      'Para declarar uma variável, deve-se usar o símbolo # antes do nome para que ela receba um valor.',
      'O valor deve ser colocado sempre entre parênteses logo após a palavra-chave var ou let.',
      'A atribuição de valores em JavaScript só é permitida após a variável ser usada em um comando de saída.'
    ],
    correctAnswer: 1,
    explanation: 'Sintaxe: keyword nome = valor;'
  },
  {
    id: 'fe-js26',
    topicId: 't-fe-javascript',
    question: 'Assinale a alternativa correta sobre o uso da palavra-chave const na declaração de variáveis:',
    options: [
      'Ela serve para declarar variáveis cujo valor pode ser alterado a qualquer momento no código.',
      'Ela serve para declarar variáveis que funcionam apenas quando o site está em modo offline.',
      'Ela serve para declarar valores constantes que não podem ser reatribuídos após a definição inicial.',
      'Ela é utilizada para declarar variáveis que armazenam apenas números inteiros e positivos.',
      'Ela é uma palavra opcional que deve ser usada apenas quando a variável tiver mais de 10 caracteres.'
    ],
    correctAnswer: 2,
    explanation: 'const cria constantes imutáveis.'
  },
  {
    id: 'fe-js27',
    topicId: 't-fe-javascript',
    question: 'Existem regras para nomes de variáveis no JavaScript. Assinale a alternativa correta sobre o que NÃO é permitido:',
    options: [
      'Iniciar o nome da variável com letras minúsculas ou maiúsculas.',
      'Iniciar o nome da variável com o símbolo de cifrão ($) ou sublinhado (_).',
      'Iniciar o nome da variável com um número (ex: 1variavel).',
      'Criar nomes de variáveis que contenham números após a primeira letra.',
      'Utilizar nomes longos e descritivos para facilitar a leitura do código.'
    ],
    correctAnswer: 2,
    explanation: 'Variáveis não podem começar com números.'
  },
  {
    id: 'fe-js28',
    topicId: 't-fe-javascript',
    question: 'Sobre a regra de Case Sensitivity (sensibilidade a maiúsculas e minúsculas) nos nomes de variáveis, assinale a alternativa correta:',
    options: [
      'O JavaScript ignora a diferença entre maiúsculas e minúsculas, tratando Nome e nome como iguais.',
      'O JavaScript diferencia maiúsculas de minúsculas, portanto minhaVariavel e minhavariavel são distintas.',
      'O JavaScript exige que todos os nomes de variáveis sejam escritos apenas em letras maiúsculas.',
      'O JavaScript converte automaticamente todas as letras para minúsculas durante a execução do script.',
      'O uso de letras maiúsculas é permitido apenas para variáveis declaradas com a palavra var.'
    ],
    correctAnswer: 1,
    explanation: 'JS é case-sensitive.'
  },
  {
    id: 'fe-js29',
    topicId: 't-fe-javascript',
    question: 'Assinale a alternativa correta sobre os caracteres permitidos na criação de nomes de variáveis em JavaScript:',
    options: [
      'É permitido o uso de espaços em branco e acentos em todas as variáveis.',
      'É permitido o uso de hifens (-) para separar palavras no nome de uma variável.',
      'É permitido o uso de letras, números (desde que não no início), cifrão ($) e sublinhado (_).',
      'É permitido o uso de caracteres especiais como @, !, * e % no meio do nome.',
      'É permitido utilizar apenas letras do alfabeto inglês, sendo proibido o uso de qualquer símbolo.'
    ],
    correctAnswer: 2,
    explanation: 'Permitido: letras, dígitos, $ e _.'
  },
  {
    id: 'fe-js30',
    topicId: 't-fe-javascript',
    question: 'No que diz respeito às regras para nomes, assinale a alternativa correta sobre o uso de "palavras reservadas":',
    options: [
      'Palavras reservadas (como if, while, function) podem ser usadas livremente como nomes de variáveis.',
      'Palavras reservadas não podem ser usadas como nomes de variáveis, pois possuem funções específicas na linguagem.',
      'Qualquer palavra do dicionário pode ser usada como variável, desde que escrita entre aspas simples.',
      'Palavras reservadas só podem ser usadas como variáveis se forem acompanhadas de um número no final.',
      'O JavaScript não possui palavras reservadas, permitindo total liberdade na escolha dos nomes.'
    ],
    correctAnswer: 1,
    explanation: 'Palavras reservadas têm significados especiais e são proibidas como nomes.'
  }
];
