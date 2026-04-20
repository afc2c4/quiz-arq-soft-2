import { Question } from '../../../types';

export const QUALITY_AMBIENTE_AUTOMACAO_QUESTIONS: Question[] = [
  {
    id: 'qt-aa1',
    topicId: 't-qt-ambiente-automacao',
    question: 'Ao estruturar um projeto de QA, é fundamental distinguir os conceitos de infraestrutura e execução. Qual das alternativas define corretamente a diferença entre "Ambiente de Teste" e "Automação de Testes"?',
    options: [
      'O ambiente de teste é o conjunto de scripts de execução, enquanto a automação é o hardware onde o sistema é instalado.',
      'O ambiente de teste trata do ecossistema (hardware/software) onde o teste ocorre; a automação trata do uso de ferramentas para executar testes sem intervenção humana.',
      'Não há diferença técnica, pois ambos os termos referem-se exclusivamente ao processo de codificação de testes unitários.',
      'A automação de testes foca na paridade com o ambiente de produção, enquanto o ambiente de teste foca nas vantagens financeiras.',
      'O ambiente de teste é focado no que não deve ser automatizado, enquanto a automação foca apenas no ambiente de produção.'
    ],
    correctAnswer: 1,
    explanation: 'Ambiente de teste é o ecossistema (infra), automação é a prática de usar ferramentas para testar sem intervenção humana.'
  },
  {
    id: 'qt-aa2',
    topicId: 't-qt-ambiente-automacao',
    question: 'O conceito de "Paridade do Ambiente" é um dos pilares para garantir a confiabilidade dos resultados. O que esse termo busca descrever?',
    options: [
      'A necessidade de o ambiente de teste ser o mais idêntico possível ao ambiente de produção em termos de configuração e dados.',
      'A obrigação de automatizar 50% dos testes manuais para equilibrar a balança de custos do projeto.',
      'O uso de ferramentas de automação que funcionem tanto em sistemas Windows quanto em sistemas Linux simultaneamente.',
      'A igualdade entre o número de desenvolvedores e o número de analistas de teste dentro de uma mesma squad.',
      'A estratégia de realizar testes apenas no ambiente de produção para garantir que as vantagens superem as desvantagens.'
    ],
    correctAnswer: 0,
    explanation: 'Paridade do ambiente busca espelhar ao máximo o ambiente de produção para garantir que testes reflitam a realidade.'
  },
  {
    id: 'qt-aa3',
    topicId: 't-qt-ambiente-automacao',
    question: 'Sobre o "Ambiente de Produção", qual é a definição correta considerando o fluxo de entrega de software?',
    options: [
      'É o local onde os scripts de automação são escritos e validados pelos desenvolvedores antes do commit.',
      'É o ecossistema final onde o software é efetivamente utilizado pelos usuários reais com dados reais.',
      'É um ambiente espelhado utilizado exclusivamente para testar o que não deve ser automatizado.',
      'Trata-se da ferramenta de automação que converte testes manuais em código executável de forma binária.',
      'É a fase do projeto onde se definem as desvantagens de manter um ambiente de teste com alta paridade.'
    ],
    correctAnswer: 1,
    explanation: 'Ambiente de produção é onde o software roda para usuários reais.'
  },
  {
    id: 'qt-aa4',
    topicId: 't-qt-ambiente-automacao',
    question: 'A decisão de "o que deve ser automatizado" é estratégica. Qual tipo de teste é o candidato ideal para a automação, segundo as boas práticas?',
    options: [
      'Testes de usabilidade que dependem da percepção visual subjetiva de um ser humano.',
      'Testes que são executados uma única vez ao longo de todo o ciclo de vida do projeto.',
      'Testes repetitivos, cansativos, de regressão ou que envolvem grandes volumes de cálculos e dados.',
      'Testes de funcionalidades que ainda estão em constante mudança de requisito e interface.',
      'Apenas os testes realizados diretamente no ambiente de produção sem qualquer paridade.'
    ],
    correctAnswer: 2,
    explanation: 'Testes repetitivos e de regressão são os melhores candidatos para automação devido à eficiência e precisão.'
  },
  {
    id: 'qt-aa5',
    topicId: 't-qt-ambiente-automacao',
    question: 'Existem cenários onde a intervenção humana é insubstituível. O que "não deve ser automatizado" em um processo de teste?',
    options: [
      'Fluxos de regressão que precisam ser validados a cada nova versão do sistema.',
      'Casos de teste que envolvem lógica de negócio estável e execução frequente.',
      'Testes ad-hoc, exploratórios, de usabilidade ou funcionalidades com alta instabilidade de requisitos.',
      'Cálculos matemáticos complexos que exigem precisão absoluta em um ambiente de teste.',
      'Processos que apresentam vantagens claras de velocidade quando executados por máquinas.'
    ],
    correctAnswer: 2,
    explanation: 'Testes exploratórios e de usabilidade dependem de julgamento humano e não são bons candidatos para automação.'
  },
  {
    id: 'qt-aa6',
    topicId: 't-qt-ambiente-automacao',
    question: 'A adoção da automação de testes traz benefícios claros para a equipe. Qual das opções abaixo representa uma "Vantagem" direta dessa prática?',
    options: [
      'A eliminação total da necessidade de um ambiente de teste com paridade de produção.',
      'O aumento da velocidade de execução, repetibilidade dos testes e redução do erro humano em tarefas exaustivas.',
      'A garantia de que o ambiente de produção nunca apresentará falhas de hardware externas.',
      'A possibilidade de automatizar tudo o que não deve ser automatizado sem custos adicionais.',
      'O fim da necessidade de analistas de teste, já que a automação substitui o raciocínio humano.'
    ],
    correctAnswer: 1,
    explanation: 'Automação aumenta velocidade, repetibilidade e reduz erros humanos em tarefas exaustivas.'
  },
  {
    id: 'qt-aa7',
    topicId: 't-qt-ambiente-automacao',
    question: 'Apesar dos benefícios, a automação possui obstáculos. Qual alternativa apresenta uma "Desvantagem" real da automação de testes?',
    options: [
      'A redução do tempo de execução dos testes de regressão após a implementação inicial.',
      'O alto investimento inicial (ferramentas/tempo) e o custo de manutenção dos scripts quando o software muda.',
      'A melhoria da paridade entre o ambiente de teste e o ambiente de produção.',
      'A precisão dos resultados obtidos através da execução de cálculos em larga escala.',
      'A capacidade de executar testes de forma idêntica em diferentes ciclos de desenvolvimento.'
    ],
    correctAnswer: 1,
    explanation: 'Alto custo inicial e manutenção são as principais desvantagens.'
  },
  {
    id: 'qt-aa8',
    topicId: 't-qt-ambiente-automacao',
    question: 'Um analista de testes percebe que um bug ocorre em produção, mas não no ambiente de teste. Esse problema está provavelmente relacionado a uma falha de:',
    options: [
      'Automação de testes, pois os scripts não foram escritos para detectar o que não deve ser automatizado.',
      'Paridade do ambiente, indicando que o ambiente de teste não reflete as configurações do ambiente de produção.',
      'Vantagens do projeto, uma vez que o erro em produção é uma desvantagem financeira planejada.',
      'Seleção de ferramentas, visto que a automação deveria ser feita apenas em ambiente de produção.',
      'Raciocínio lógico, pois ambientes de teste e produção devem ser propositalmente diferentes.'
    ],
    correctAnswer: 1,
    explanation: 'Bugs que ocorrem em produção mas não em testes geralmente indicam falta de paridade entre os ambientes.'
  },
  {
    id: 'qt-aa9',
    topicId: 't-qt-ambiente-automacao',
    question: 'Considere a frase: "Automatizar esse teste trará um custo de manutenção superior ao benefício da execução". Esta análise foca em qual tópico da aula?',
    options: [
      'Na paridade absoluta entre o ambiente de teste e os scripts de produção.',
      'Na definição estrita de ambiente de teste como uma ferramenta de hardware.',
      'No equilíbrio entre as vantagens e desvantagens para decidir o que deve ou não ser automatizado.',
      'Na obrigatoriedade de automatizar testes exploratórios para garantir a paridade.',
      'Na eliminação do ambiente de produção para focar apenas na automação de testes manuais.'
    ],
    correctAnswer: 2,
    explanation: 'Análise de viabilidade (custo vs. benefício) é central para decidir o que automatizar.'
  },
  {
    id: 'qt-aa10',
    topicId: 't-qt-ambiente-automacao',
    question: 'Ao planejar a infraestrutura para um novo projeto, a equipe decide que o servidor de testes terá a mesma memória e versão de banco de dados que o servidor final. Esta equipe está priorizando:',
    options: [
      'A automação de testes do que não deve ser automatizado.',
      'A paridade do ambiente para reduzir comportamentos divergentes entre teste e produção.',
      'As desvantagens da automação em relação aos testes manuais repetitivos.',
      'O ambiente de produção como local principal de execução de scripts instáveis.',
      'A diferenciação total entre o ambiente de teste e o ecossistema de uso real.'
    ],
    correctAnswer: 1,
    explanation: 'Manter a mesma configuração reduz comportamentos inesperados entre ambientes (prioridade de paridade).'
  }
];
