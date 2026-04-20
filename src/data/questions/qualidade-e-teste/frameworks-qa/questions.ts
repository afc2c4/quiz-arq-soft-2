import { Question } from '../../../types';

export const QUALITY_FRAMEWORKS_QA_QUESTIONS: Question[] = [
  {
    id: 'qt-fw1',
    topicId: 't-qt-frameworks',
    question: 'No desenvolvimento de software, como se define corretamente o papel de um "Framework de Teste Unitário e de Integração"?',
    options: [
      'É uma biblioteca voltada exclusivamente para a simulação de hardware e redes de baixa latência.',
      'É uma ferramenta que fornece a estrutura necessária para escrever, organizar e executar testes em pequenos blocos de código ou componentes integrados.',
      'Trata-se de um sistema operacional específico para a execução de scripts de teste de aceitação final.',
      'É o código-fonte principal da aplicação que contém as regras de negócio sem qualquer tipo de validação externa.',
      'É uma ferramenta de design visual utilizada por designers para validar a paleta de cores da interface do usuário.'
    ],
    correctAnswer: 1,
    explanation: 'Frameworks fornecem a estrutura organizada para escrever e executar testes.'
  },
  {
    id: 'qt-fw2',
    topicId: 't-qt-frameworks',
    question: 'Considere a necessidade de validar o comportamento de funções isoladas e a interação entre módulos. Qual das opções abaixo apresenta exemplos típicos desses frameworks?',
    options: [
      'Selenium, Cypress e Playwright, focados na lógica interna de métodos privados.',
      'JUnit, PyTest e Jest, utilizados para estruturar testes de unidade e verificar a integração entre componentes.',
      'Docker e Kubernetes, que atuam como bibliotecas auxiliares de assertion para bancos de dados.',
      'Mocks e Assertions, que são os frameworks principais para a execução de testes de ponta a ponta (E2E).',
      'HTML e CSS, que funcionam como os motores de execução de testes unitários em aplicações modernas.'
    ],
    correctAnswer: 1,
    explanation: 'JUnit, PyTest e Jest são frameworks comuns para testes de unidade e integração.'
  },
  {
    id: 'qt-fw3',
    topicId: 't-qt-frameworks',
    question: 'Dentro das bibliotecas auxiliares, para que serve especificamente o recurso de "Assertions"?',
    options: [
      'Para criar objetos falsos que substituem dependências externas, como bancos de dados ou APIs.',
      'Para definir o cronograma de execução dos testes de integração no ambiente de produção.',
      'Para verificar se o resultado obtido na execução de um teste condiz com o resultado esperado, validando a correção do código.',
      'Para automatizar o processo de escrita do código-fonte a partir de documentos de requisitos em PDF.',
      'Para monitorar o consumo de memória RAM durante a execução de ferramentas End-to-End.'
    ],
    correctAnswer: 2,
    explanation: 'Assertions verificam se o resultado obtido é o esperado.'
  },
  {
    id: 'qt-fw4',
    topicId: 't-qt-frameworks',
    question: 'O uso de "Mocks" é uma técnica comum em testes unitários. Qual é a finalidade primordial dessa biblioteca auxiliar?',
    options: [
      'Comparar valores reais com valores esperados para gerar um relatório de erro ou sucesso.',
      'Simular o comportamento de componentes externos ou objetos complexos para isolar a unidade de código que está sendo testada.',
      'Garantir que o sistema completo seja testado de ponta a ponta sem a necessidade de frameworks de unidade.',
      'Criar uma interface gráfica temporária para que o usuário final valide o requisito de negócio.',
      'Substituir os frameworks de integração por scripts manuais de verificação de hardware.'
    ],
    correctAnswer: 1,
    explanation: 'Mocks simulam dependências para isolar a unidade testada.'
  },
  {
    id: 'qt-fw5',
    topicId: 't-qt-frameworks',
    question: 'Sobre as "Ferramentas de Teste End-to-End (E2E)", qual é o seu principal campo de atuação no ciclo de testes?',
    options: [
      'Validar métodos e classes de forma isolada no código-fonte, sem interagir com a interface.',
      'Substituir as bibliotecas de mocks para garantir que o banco de dados não seja acessado durante o teste.',
      'Automatizar o fluxo completo do usuário no sistema, simulando a navegação real na aplicação do início ao fim.',
      'Realizar a análise estática do código para encontrar erros de sintaxe antes da compilação.',
      'Gerenciar apenas as assertions de baixo nível em testes unitários de performance.'
    ],
    correctAnswer: 2,
    explanation: 'E2E simula a navegação real do usuário, validando o fluxo completo.'
  },
  {
    id: 'qt-fw6',
    topicId: 't-qt-frameworks',
    question: 'Qual a relação correta entre Frameworks de Teste e Bibliotecas Auxiliares (como Mocks e Assertions)?',
    options: [
      'As bibliotecas auxiliares são frameworks E2E que não permitem o uso de assertions em seus scripts.',
      'O framework fornece o motor de execução e organização, enquanto as bibliotecas auxiliares fornecem ferramentas específicas para validação e simulação.',
      'Não existe relação, pois assertions só podem ser usadas em testes manuais e mocks apenas em testes de sistemas.',
      'Os frameworks substituem totalmente a necessidade de bibliotecas auxiliares ao automatizar a criação de mocks de hardware.',
      'As bibliotecas auxiliares são os ambientes de produção onde os frameworks de teste unitário são instalados.'
    ],
    correctAnswer: 1,
    explanation: 'O framework organiza/executa, bibliotecas auxiliares validam/simulam.'
  },
  {
    id: 'qt-fw7',
    topicId: 't-qt-frameworks',
    question: 'Um desenvolvedor precisa testar um serviço de envio de e-mail, mas não quer enviar mensagens reais durante o teste. Qual ferramenta ele deve utilizar?',
    options: [
      'Uma assertion, para validar se o e-mail foi enviado fisicamente para o servidor de produção.',
      'Uma ferramenta End-to-End (E2E), para abrir o navegador e verificar a caixa de entrada do cliente.',
      'Um Mock, para simular o serviço de e-mail e verificar se a função de envio foi chamada corretamente.',
      'Um framework de teste unitário focado exclusivamente em testes não funcionais de segurança.',
      'Um arquivo de texto simples para substituir a necessidade de bibliotecas auxiliares de simulação.'
    ],
    correctAnswer: 2,
    explanation: 'Mocks são ideais para simular serviços externos como e-mail.'
  },
  {
    id: 'qt-fw8',
    topicId: 't-qt-frameworks',
    question: 'Qual das alternativas abaixo diferencia corretamente uma ferramenta de teste E2E de um framework de teste unitário?',
    options: [
      'E2E foca no fluxo de negócio completo; o unitário foca na menor parte testável do código de forma isolada.',
      'E2E utiliza mocks para simular a interface; o unitário utiliza assertions para validar o navegador.',
      'O unitário exige um ambiente de produção idêntico ao real; o E2E funciona apenas no código-fonte offline.',
      'Frameworks unitários são ferramentas auxiliares, enquanto E2E são os frameworks base para assertions.',
      'Não há diferença, pois ambos utilizam mocks para validar a integração entre o hardware e o software.'
    ],
    correctAnswer: 0,
    explanation: 'E2E = fluxo completo; Unitário = menor parte isolada.'
  },
  {
    id: 'qt-fw9',
    topicId: 't-qt-frameworks',
    question: 'Considere o uso de ferramentas como Cypress ou Playwright. Elas são classificadas prioritariamente como:',
    options: [
      'Bibliotecas auxiliares de Assertion para testes unitários de lógica matemática.',
      'Frameworks de simulação de objetos (Mocks) para isolamento de componentes de backend.',
      'Ferramentas de teste End-to-End (E2E) para validação de fluxos em aplicações web.',
      'Sistemas de gestão de requisitos focados na criação de casos de teste manuais.',
      'Frameworks de integração de hardware para testes estáticos de arquitetura.'
    ],
    correctAnswer: 2,
    explanation: 'Cypress e Playwright são ferramentas populares para E2E.'
  },
  {
    id: 'qt-fw10',
    topicId: 't-qt-frameworks',
    question: 'Durante a execução de um teste, o comando `expect(resultado).toBe(10)` é um exemplo clássico de uso de qual recurso?',
    options: [
      'Ferramenta de teste End-to-End, focada na jornada do usuário.',
      'Biblioteca auxiliar de Mock, utilizada para simular o valor 10.',
      'Biblioteca auxiliar de Assertion, utilizada para validar se o resultado é o esperado.',
      'Framework de teste de integração, responsável por conectar o banco de dados.',
      'Técnica de caixa-preta baseada na experiência subjetiva do desenvolvedor.'
    ],
    correctAnswer: 2,
    explanation: 'Expect/toBe é uma syntax comum de bibliotecas de Assertion.'
  }
];
