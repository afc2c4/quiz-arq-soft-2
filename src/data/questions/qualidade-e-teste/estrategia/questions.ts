import { Question } from '../../../types';

export const QUALITY_ESTRATEGIA_QUESTIONS: Question[] = [
  {
    id: 'qt-e1',
    topicId: 't-qt-estrategia',
    question: 'Dentro da gestão de qualidade, qual é a principal finalidade da "Estratégia de Testes"?',
    options: [
      'Definir o cronograma detalhado, com nomes de responsáveis e datas exatas para cada execução de teste.',
      'Estabelecer a abordagem geral e os níveis de teste que serão aplicados de forma padronizada na organização ou projeto.',
      'Descrever o passo a passo técnico de como um desenvolvedor deve realizar o debug de uma função específica.',
      'Listar exclusivamente os defeitos encontrados durante a fase de aceitação para reportar ao cliente final.',
      'Substituir a necessidade de um plano de testes, focando apenas na escolha das ferramentas de automação.'
    ],
    correctAnswer: 1,
    explanation: 'A estratégia de testes define a abordagem geral e os níveis de teste aplicados.'
  },
  {
    id: 'qt-e2',
    topicId: 't-qt-estrategia',
    question: 'Ao comparar os artefatos de teste, qual é a diferença fundamental entre "Estratégia de Testes" e "Plano de Testes"?',
    options: [
      'A estratégia é um documento de baixo nível, enquanto o plano de testes define as diretrizes globais da empresa.',
      'O plano de testes foca na abordagem técnica de longo prazo; a estratégia foca no dia a dia do testador.',
      'A estratégia define a visão geral e métodos; o plano de testes detalha o escopo, recursos e cronograma de um projeto específico.',
      'O plano de testes é voltado para testes de caixa branca, enquanto a estratégia é exclusiva para testes de caixa preta.',
      'Não existe diferença prática, sendo termos sinônimos utilizados para descrever a alocação de hardware para testes.'
    ],
    correctAnswer: 2,
    explanation: 'A estratégia define a visão/métodos; o plano detalha o escopo, recursos e cronograma específicos.'
  },
  {
    id: 'qt-e3',
    topicId: 't-qt-estrategia',
    question: 'A técnica de "Teste de Caixa Preta" fundamenta-se primordialmente em qual aspecto do software?',
    options: [
      'Na análise detalhada da estrutura interna do código e dos caminhos lógicos criados pelo programador.',
      'Na verificação das entradas e saídas do sistema, baseando-se nos requisitos e especificações funcionais.',
      'No monitoramento do consumo de memória RAM e processamento de CPU durante a execução dos scripts.',
      'Na leitura direta do banco de dados para validar a sintaxe das queries SQL utilizadas na aplicação.',
      'Na revisão estática do código-fonte antes que o sistema seja compilado ou interpretado.'
    ],
    correctAnswer: 1,
    explanation: 'O teste de caixa preta foca nas entradas e saídas segundo requisitos.'
  },
  {
    id: 'qt-e4',
    topicId: 't-qt-estrategia',
    question: 'Sobre o "Teste de Caixa Branca", é correto afirmar que o analista de testes precisa:',
    options: [
      'Ignorar completamente o código-fonte e focar apenas na experiência de navegação do usuário final.',
      'Ter conhecimento da estrutura interna, utilizando o código para derivar casos de teste que cubram fluxos e caminhos.',
      'Validar apenas se os requisitos de negócio foram atendidos, sem se preocupar com a lógica de programação.',
      'Aplicar a técnica de análise do valor limite apenas em campos de entrada da interface gráfica.',
      'Executar o software em um ambiente onde o código-fonte esteja oculto para simular o comportamento do cliente.'
    ],
    correctAnswer: 1,
    explanation: 'O teste de caixa branca utiliza o conhecimento da estrutura interna (código) para derivar testes.'
  },
  {
    id: 'qt-e5',
    topicId: 't-qt-estrategia',
    question: 'Qual o objetivo principal ao aplicar a técnica de "Particionamento de Equivalência"?',
    options: [
      'Aumentar o número de casos de teste para garantir que cada valor possível de entrada seja testado individualmente.',
      'Dividir os dados de entrada em classes onde se espera que o sistema se comporte da mesma forma, reduzindo o número de testes.',
      'Identificar erros de sintaxe no código-fonte através da execução de múltiplos caminhos lógicos simultâneos.',
      'Testar apenas os valores mínimos e máximos permitidos por um campo, ignorando os valores intermediários.',
      'Garantir que o plano de testes contenha apenas cenários de caixa branca focados na infraestrutura do servidor.'
    ],
    correctAnswer: 1,
    explanation: 'Particionamento reduz o número de testes ao agrupar dados com comportamento similar.'
  },
  {
    id: 'qt-e6',
    topicId: 't-qt-estrategia',
    question: 'A técnica "Análise do Valor Limite (BVA)" é frequentemente utilizada em conjunto com o particionamento de equivalência porque:',
    options: [
      'Ela foca nos comportamentos do sistema nas bordas das classes de equivalência, onde há maior probabilidade de erros.',
      'Ela permite testar todos os valores dentro de uma classe de equivalência de forma automatizada e exaustiva.',
      'É a única técnica capaz de validar a estrutura interna do código em testes de caixa branca de alto desempenho.',
      'Substitui a necessidade de definir uma estratégia de testes ao focar apenas em entradas numéricas inteiras.',
      'Garante que a prioridade de um defeito seja sempre alta quando o erro ocorre no meio de uma partição.'
    ],
    correctAnswer: 0,
    explanation: 'A BVA foca nas fronteiras das classes de equivalência, locais comuns de erro.'
  },
  {
    id: 'qt-e7',
    topicId: 't-qt-estrategia',
    question: 'Em um campo que aceita valores de 1 a 100, quais seriam os valores ideais para aplicar a "Análise do Valor Limite" considerando as fronteiras?',
    options: [
      '10, 20, 30, 40, 50, 60, 70, 80, 90 e 100.',
      '0, 1, 100 e 101.',
      'Qualquer valor aleatório entre 1 e 100, como 45 e 72.',
      'Apenas o valor 50, por representar o centro exato da partição de equivalência.',
      '1, 50 e 100, focando apenas no sucesso da operação dentro da regra de negócio.'
    ],
    correctAnswer: 1,
    explanation: 'Valores limites para [1, 100] incluem os limites (1, 100) e os vizinhos (0, 101).'
  },
  {
    id: 'qt-e8',
    topicId: 't-qt-estrategia',
    question: 'Qual técnica de teste é mais adequada para verificar se todas as ramificações de uma estrutura condicional (if/else) foram exercitadas?',
    options: [
      'Particionamento de Equivalência, pois foca nas classes de dados de entrada da interface.',
      'Teste de Caixa Preta, uma vez que avalia o comportamento externo baseado nos requisitos.',
      'Análise do Valor Limite, pois foca exclusivamente na transição entre estados de erro.',
      'Teste de Caixa Branca, pois permite visualizar e testar a lógica interna e os caminhos do código.',
      'Estratégia de Testes, já que define quais ferramentas serão usadas para medir a cobertura de código.'
    ],
    correctAnswer: 3,
    explanation: 'Teste de caixa branca avalia a lógica interna (ifs/elses).'
  },
  {
    id: 'qt-e9',
    topicId: 't-qt-estrategia',
    question: 'Considere um sistema de login que aceita senhas de 6 a 12 caracteres. Se um testador cria grupos de "senhas curtas", "senhas válidas" e "senhas longas", ele está aplicando:',
    options: [
      'Teste de Caixa Branca focado em cobertura de caminhos.',
      'Análise do Valor Limite para identificar erros de estouro de pilha.',
      'Particionamento de Equivalência para agrupar entradas com comportamentos esperados similares.',
      'Estratégia de Testes de aceitação baseada em feedback do usuário final.',
      'Plano de Testes dinâmico para validar a performance do banco de dados.'
    ],
    correctAnswer: 2,
    explanation: 'Agrupar senhas por válidas/curtas/longas é particionamento de equivalência.'
  },
  {
    id: 'qt-e10',
    topicId: 't-qt-estrategia',
    question: 'Sobre a aplicação das técnicas vistas na Aula 04, qual conclusão está correta?',
    options: [
      'O teste de caixa preta é mais eficiente que o de caixa branca para encontrar erros de lógica interna no código.',
      'O particionamento de equivalência e a análise do valor limite são técnicas típicas de teste de caixa preta.',
      'A estratégia de testes deve ser criada após a execução dos testes de caixa branca para documentar o que foi feito.',
      'A análise do valor limite só pode ser aplicada se o testador tiver acesso total ao código-fonte do sistema.',
      'O plano de testes define os níveis de teste, enquanto a estratégia de testes define o cronograma de cada sprint.'
    ],
    correctAnswer: 1,
    explanation: 'Particionamento de equivalência e análise de valor limite são baseadas em requisitos (caixa preta).'
  }
];
