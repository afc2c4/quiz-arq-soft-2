import { Question } from '../../../types';

export const QUALITY_FUNDAMENTALS_QUESTIONS: Question[] = [
  {
    id: 'qt-f1',
    topicId: 't-qt-fundamentos',
    question: 'Considerando a definição fundamental de Teste de Software, qual das alternativas abaixo melhor descreve o seu propósito dentro de um ciclo de desenvolvimento?',
    options: [
      'É o processo exclusivo de correção de erros encontrados pelos desenvolvedores durante a fase de codificação.',
      'Consiste em um conjunto de atividades que visam avaliar a qualidade de um produto e reduzir o risco de falhas em operação.',
      'Trata-se da etapa final do projeto onde o cliente decide se aceita ou não o software baseado na interface gráfica.',
      'É a atividade de transformar requisitos de negócio em código-fonte funcional sem a necessidade de documentação.',
      'Define-se como o uso de ferramentas automáticas para garantir que o sistema nunca apresente comportamentos anômalos.'
    ],
    correctAnswer: 1,
    explanation: 'O teste é um conjunto de atividades para avaliar a qualidade e reduzir riscos de falhas.'
  },
  {
    id: 'qt-f2',
    topicId: 't-qt-fundamentos',
    question: 'No contexto de qualidade de software, o conceito de "Validação" está corretamente associado a qual das seguintes perguntas?',
    options: [
      'Estamos construindo o produto da maneira correta, seguindo as normas técnicas?',
      'O código-fonte está compilando sem erros de sintaxe ou avisos do compilador?',
      'Estamos construindo o produto certo, que atende às necessidades reais do usuário?',
      'A documentação de arquitetura foi revisada pelos engenheiros de infraestrutura?',
      'O sistema possui uma cobertura de testes de unidade superior a 80% do código?'
    ],
    correctAnswer: 2,
    explanation: 'Validação pergunta se estamos construindo o produto certo, o que atende às necessidades do usuário.'
  },
  {
    id: 'qt-f3',
    topicId: 't-qt-fundamentos',
    question: 'Sobre o teste de "Aceitação", qual característica o distingue das demais fases de teste, como unidade ou integração?',
    options: [
      'O foco principal é a busca por bugs lógicos complexos dentro das funções internas do sistema.',
      'É realizado estritamente pelos desenvolvedores para validar se os componentes se comunicam entre si.',
      'Visa demonstrar que o software está pronto para o uso e atende aos critérios definidos pelo cliente ou usuários finais.',
      'Trata-se de uma técnica de teste estático aplicada diretamente sobre o código-fonte antes da execução.',
      'Serve exclusivamente para medir o tempo de resposta do banco de dados em condições de estresse.'
    ],
    correctAnswer: 2,
    explanation: 'O teste de aceitação demonstra que o software está pronto para o uso final e atende aos critérios do cliente.'
  },
  {
    id: 'qt-f4',
    topicId: 't-qt-fundamentos',
    question: 'Os "objetivos do teste" podem variar conforme o contexto do projeto. No entanto, um objetivo comum e essencial a qualquer processo de teste é:',
    options: [
      'Garantir a ausência total de defeitos em todas as funcionalidades do software entregue.',
      'Fornecer informações suficientes sobre o nível de qualidade para a tomada de decisão das partes interessadas.',
      'Substituir a fase de levantamento de requisitos através da execução direta de protótipos.',
      'Maximizar o tempo de desenvolvimento para que todas as falhas humanas sejam eliminadas.',
      'Focar apenas na interface do usuário, ignorando as regras de negócio processadas no servidor.'
    ],
    correctAnswer: 1,
    explanation: 'Um objetivo essencial é fornecer informações para a tomada de decisão sobre a qualidade do produto.'
  },
  {
    id: 'qt-f5',
    topicId: 't-qt-fundamentos',
    question: 'O "Modelo V" é uma representação clássica que demonstra a relação entre as fases de desenvolvimento e teste. Qual a premissa fundamental deste modelo?',
    options: [
      'O teste só deve ser iniciado após o encerramento completo de todas as fases de codificação e integração.',
      'As atividades de teste devem ser planejadas em paralelo com as fases correspondentes de desenvolvimento.',
      'Os testes de aceitação devem ser realizados imediatamente após a definição dos requisitos, antes do design.',
      'A codificação é o centro do modelo, e os testes servem apenas como um suporte para a refatoração do código.',
      'O modelo elimina a necessidade de testes dinâmicos, focando exclusivamente na verificação estática.'
    ],
    correctAnswer: 1,
    explanation: 'O Modelo V preconiza o planejamento de testes em paralelo com as fases de desenvolvimento.'
  },
  {
    id: 'qt-f6',
    topicId: 't-qt-fundamentos',
    question: 'No que diz respeito à gestão da qualidade, para que servem primordialmente os "Documentos de Teste" em um projeto?',
    options: [
      'Para aumentar o tempo de entrega e garantir que o projeto cumpra todas as burocracias legais.',
      'Para servir como um guia de programação para os desenvolvedores que não leram os requisitos.',
      'Para registrar o planejamento, a execução e os resultados, garantindo rastreabilidade e comunicação entre a equipe.',
      'Para substituir o código-fonte como o principal artefato de entrega para o cliente final.',
      'Para definir quais membros da equipe devem ser responsabilizados individualmente por cada erro encontrado.'
    ],
    correctAnswer: 2,
    explanation: 'Documentos servem para registrar planejamento, resultados e garantir rastreabilidade.'
  },
  {
    id: 'qt-f7',
    topicId: 't-qt-fundamentos',
    question: 'As "Técnicas Manuais de Teste Estático" são aplicadas sem a execução do software. Qual das opções abaixo representa um exemplo clássico dessa técnica?',
    options: [
      'Execução de scripts de automação em um ambiente de integração contínua.',
      'Revisões de documentos, inspeções de código e walkthroughs realizados pela equipe.',
      'Testes de carga e estresse para verificar a estabilidade do servidor sob pressão.',
      'Verificação manual de cada funcionalidade diretamente no navegador de internet.',
      'Comparação de resultados obtidos no banco de dados após o processamento de uma venda.'
    ],
    correctAnswer: 1,
    explanation: 'Teste estático envolve revisões e inspeções sem rodar o código.'
  },
  {
    id: 'qt-f8',
    topicId: 't-qt-fundamentos',
    question: 'Qual é uma vantagem significativa de se aplicar "Técnicas de Teste Estático" precocemente no ciclo de vida de desenvolvimento?',
    options: [
      'Permite que o software seja entregue ao cliente sem a necessidade de realizar testes de aceitação.',
      'Identifica defeitos em requisitos e design antes que eles sejam propagados para o código, reduzindo custos.',
      'Garante que a performance do sistema seja validada antes mesmo da criação da interface gráfica.',
      'Elimina a necessidade de utilizar o Modelo V, pois os erros são encontrados apenas visualmente.',
      'Substitui a necessidade de desenvolvedores sêniores, pois o teste estático corrige o código automaticamente.'
    ],
    correctAnswer: 1,
    explanation: 'Aplicar testes estáticos cedo reduz custo ao achar defeitos nos requisitos/design antes da codificação.'
  },
  {
    id: 'qt-f9',
    topicId: 't-qt-fundamentos',
    question: 'No Modelo V, a fase de "Teste de Sistema" geralmente está vinculada a qual etapa do lado do desenvolvimento?',
    options: [
      'Codificação e Testes de Unidade.',
      'Design Detalhado dos Componentes.',
      'Especificação de Requisitos Funcionais.',
      'Arquitetura do Sistema ou Design de Alto Nível.',
      'Manutenção Corretiva e Evolutiva.'
    ],
    correctAnswer: 2,
    explanation: 'Teste de Sistema se vincula à especificação de requisitos funcionais.'
  },
  {
    id: 'qt-f10',
    topicId: 't-qt-fundamentos',
    question: 'Diferentes técnicas de teste estático podem ter níveis variados de formalidade. Qual das alternativas abaixo descreve uma técnica comum de teste estático?',
    options: [
      'Teste de Caixa-Preta baseado em transição de estados com o sistema em execução.',
      'Inspeção técnica, onde um moderador guia uma análise formal de um documento em busca de anomalias.',
      'Teste de Usabilidade realizado com usuários reais interagindo com um protótipo navegável.',
      'Depuração (Debugging) realizada pelo programador para identificar a causa de uma falha em tempo de execução.',
      'Teste de Regressão aplicado após a correção de um bug para garantir que nada foi quebrado.'
    ],
    correctAnswer: 1,
    explanation: 'Inspeção técnica é uma técnica formal de teste estático.'
  }
];
