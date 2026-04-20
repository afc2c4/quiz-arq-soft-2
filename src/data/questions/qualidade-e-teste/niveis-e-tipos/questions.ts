import { Question } from '../../../types';

export const QUALITY_NIVEIS_TIPOS_QUESTIONS: Question[] = [
  {
    id: 'qt-nt1',
    topicId: 't-qt-niveis-tipos',
    question: 'No ciclo de vida de desenvolvimento de software, a "Regra de Prevenção" é um princípio fundamental que orienta a equipe de QA. Qual das alternativas melhor descreve o conceito central dessa regra?',
    options: [
      'A execução de testes deve ser deixada para o final do projeto para prevenir o desgaste da equipe de desenvolvimento.',
      'O custo de corrigir um defeito aumenta exponencialmente conforme ele avança nas fases do projeto, por isso deve-se focar em evitar a introdução de erros.',
      'O conceito consiste em impedir que o usuário final acesse o sistema antes que todos os testes de aceitação sejam concluídos.',
      'Trata-se da regra que proíbe o desenvolvedor de realizar testes unitários para prevenir que ele se vicie no próprio código.',
      'É a estratégia de automatizar 100% dos testes de regressão para prevenir qualquer intervenção humana no processo.'
    ],
    correctAnswer: 1,
    explanation: 'A regra de prevenção foca em evitar erros no início, pois a correção é mais barata quanto mais cedo o defeito for detectado.'
  },
  {
    id: 'qt-nt2',
    topicId: 't-qt-niveis-tipos',
    question: 'Sobre o "Teste Unitário", quem detém a responsabilidade primordial por sua escrita e execução dentro de um fluxo de trabalho padrão?',
    options: [
      'O Analista de Negócios (Product Owner), que deve garantir que a regra de negócio foi traduzida corretamente.',
      'O time de QA (Quality Assurance), que deve validar a funcionalidade de forma isolada no ambiente de testes.',
      'O Desenvolvedor, que deve testar a menor unidade de código (função ou método) de maneira independente.',
      'O Cliente Final, que realiza a validação das unidades através de testes de regressão em ambiente de produção.',
      'O Gerente de Projetos, que supervisiona a integração dos testes de sistemas (E2E).'
    ],
    correctAnswer: 2,
    explanation: 'Testes unitários focam na unidade de código (função/método) e são de responsabilidade do desenvolvedor.'
  },
  {
    id: 'qt-nt3',
    topicId: 't-qt-niveis-tipos',
    question: 'O "Teste de Integração" possui um foco distinto dos testes unitários. Qual é o principal objetivo desse nível de teste?',
    options: [
      'Validar o comportamento isolado de uma única classe de objeto sem interferência externa.',
      'Verificar as interfaces e a comunicação entre diferentes módulos ou componentes do sistema.',
      'Realizar a validação final do software junto ao cliente para obter o termo de aceitação.',
      'Testar o sistema completo de ponta a ponta (E2E) para garantir a performance do banco de dados.',
      'Garantir que novos erros não foram introduzidos em funcionalidades antigas após uma refatoração.'
    ],
    correctAnswer: 1,
    explanation: 'Testes de integração focam na comunicação e interfaces entre componentes.'
  },
  {
    id: 'qt-nt4',
    topicId: 't-qt-niveis-tipos',
    question: 'Os testes de "Sistemas" são frequentemente associados à sigla E2E (End-to-End). O que caracteriza essa abordagem de teste?',
    options: [
      'O teste foca apenas na camada de infraestrutura e hardware, ignorando a interface do usuário.',
      'O teste foca em validar um pequeno trecho de código para prevenir falhas de sintaxe.',
      'O sistema é testado em sua totalidade, simulando a jornada completa do usuário final do início ao fim do processo.',
      'É uma técnica de teste estático que visa revisar documentos de requisitos antes da integração.',
      'Trata-se do processo de entrega contínua onde apenas os testes unitários são executados.'
    ],
    correctAnswer: 2,
    explanation: 'Testes de sistemas (E2E) validam a jornada completa do usuário no sistema em sua totalidade.'
  },
  {
    id: 'qt-nt5',
    topicId: 't-qt-niveis-tipos',
    question: 'Considerando a responsabilidade no "Teste de Integração", é correto afirmar que:',
    options: [
      'É uma atividade exclusiva do cliente, que deve integrar seus processos de negócio ao software.',
      'Cabe geralmente aos desenvolvedores e/ou analistas de teste, focando em como os componentes interagem entre si.',
      'A responsabilidade é do hardware, que deve prevenir falhas de conexão através de testes de regressão.',
      'É uma tarefa de responsabilidade do Product Owner, que valida o sistema E2E individualmente.',
      'Cabe apenas aos estagiários, pois envolve a repetição de casos de teste unitário já realizados.'
    ],
    correctAnswer: 1,
    explanation: 'O teste de integração é geralmente conduzido por desenvolvedores ou QA para validar a interação entre componentes.'
  },
  {
    id: 'qt-nt6',
    topicId: 't-qt-niveis-tipos',
    question: 'Qual é o objetivo principal do "Teste de Aceitação" dentro do Modelo V ou de metodologias ágeis?',
    options: [
      'Encontrar bugs de baixo nível no código-fonte através de testes unitários.',
      'Validar se o sistema atende aos requisitos de negócio e se está pronto para o uso pelo usuário final.',
      'Realizar a integração técnica entre o servidor de aplicação e o banco de dados.',
      'Garantir que a regra de prevenção foi aplicada através de testes de regressão automatizados.',
      'Testar a performance de cada microserviço isoladamente antes do teste de sistemas.'
    ],
    correctAnswer: 1,
    explanation: 'O teste de aceitação valida os requisitos de negócio e o pronto para uso pelo usuário final.'
  },
  {
    id: 'qt-nt7',
    topicId: 't-qt-niveis-tipos',
    question: 'O "Teste de Regressão" é uma atividade essencial para a manutenção da qualidade. Ele deve ser executado prioritariamente quando:',
    options: [
      'O projeto é iniciado e ainda não existe código-fonte para ser testado.',
      'O sistema passa por alterações, correções de bugs ou adição de novas funcionalidades para garantir que o que já funcionava não quebrou.',
      'O cliente decide cancelar o contrato e o time de QA precisa documentar os testes unitários.',
      'Não há tempo para realizar testes de sistemas (E2E) e a equipe opta por uma validação simplificada.',
      'A regra de prevenção indica que o teste de aceitação deve ser feito antes do teste de integração.'
    ],
    correctAnswer: 1,
    explanation: 'Teste de regressão garante que novas alterações não quebraram funcionalidades existentes.'
  },
  {
    id: 'qt-nt8',
    topicId: 't-qt-niveis-tipos',
    question: 'Diferente do teste de sistemas (E2E), o "Teste Unitário" foca na "Responsabilidade" de:',
    options: [
      'Validar o sistema completo em um ambiente que replica fielmente a produção.',
      'Garantir a integridade de uma pequena parte lógica do sistema (unidade) de forma isolada.',
      'Coordenar a comunicação entre múltiplos serviços externos e APIs de terceiros.',
      'Substituir o teste de aceitação quando o cliente não tem tempo para validar o software.',
      'Executar testes de regressão em toda a interface gráfica da aplicação.'
    ],
    correctAnswer: 1,
    explanation: 'Teste unitário foca na menor parte lógica isoladamente.'
  },
  {
    id: 'qt-nt9',
    topicId: 't-qt-niveis-tipos',
    question: 'Ao aplicar a "Regra de Prevenção" nos Níveis de Teste, qual sequência lógica de execução é mais eficiente para reduzir custos?',
    options: [
      'Teste de Aceitação -> Teste de Sistemas -> Teste Unitário.',
      'Teste de Regressão -> Teste E2E -> Teste de Integração.',
      'Teste Unitário -> Teste de Integração -> Teste de Sistemas -> Teste de Aceitação.',
      'Teste de Sistemas -> Teste Unitário -> Regra de Prevenção.',
      'Teste de Integração -> Teste de Aceitação -> Teste Unitário.'
    ],
    correctAnswer: 2,
    explanation: 'A sequência ideal (pirâmide de testes) vai do mais granular (unitário) para o menos granular (aceitação), facilitando a detecção precoce de erros.'
  },
  {
    id: 'qt-nt10',
    topicId: 't-qt-niveis-tipos',
    question: 'Um analista de testes está executando um fluxo completo de compra em um e-commerce, desde o login até a confirmação do pagamento. Esse cenário exemplifica qual tipo de teste?',
    options: [
      'Teste Unitário, pois está validando a responsabilidade do método de pagamento.',
      'Teste de Integração, pois foca apenas na conexão entre o login e o carrinho.',
      'Teste de Sistemas (E2E), pois valida o fluxo completo da aplicação sob a perspectiva do usuário.',
      'Teste de Regressão, pois está sendo feito apenas para prevenir erros de sintaxe no código.',
      'Teste Estático, pois a execução do software não é necessária para validar o fluxo de sistemas.'
    ],
    correctAnswer: 2,
    explanation: 'Fluxo completo do usuário do login ao pagamento é um teste de sistemas (E2E).'
  }
];
