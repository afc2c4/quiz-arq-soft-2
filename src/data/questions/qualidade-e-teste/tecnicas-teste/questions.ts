import { Question } from '../../../types';

export const QUALITY_TECNICAS_TESTE_QUESTIONS: Question[] = [
  {
    id: 'qt-tt1',
    topicId: 't-qt-tecnicas-teste',
    question: 'Qual é o objetivo primordial da aplicação de uma "Técnica de Teste" durante o processo de garantia de qualidade?',
    options: [
      'Definir o orçamento total do projeto e o cronograma de entrega das funcionalidades.',
      'Identificar condições de teste e derivar casos de teste de forma sistemática para garantir a cobertura.',
      'Escrever o código-fonte da aplicação utilizando padrões de arquitetura baseados em requisitos.',
      'Gerenciar a infraestrutura de servidores e o banco de dados onde o software será instalado.',
      'Substituir a necessidade de documentos de requisitos através da experiência subjetiva do desenvolvedor.'
    ],
    correctAnswer: 1,
    explanation: 'As técnicas de teste servem para identificar condições de teste e derivar casos de teste sistematicamente para garantir cobertura.'
  },
  {
    id: 'qt-tt2',
    topicId: 't-qt-tecnicas-teste',
    question: 'Sobre os "Testes Funcionais", qual alternativa descreve corretamente a sua definição e propósito principal?',
    options: [
      'Avaliam "como" o sistema se comporta sob carga de usuários e estresse de hardware.',
      'Focam na estrutura interna do código e na lógica das funções matemáticas implementadas.',
      'Avaliam "o que" o sistema faz, baseando-se nas funções e comportamentos descritos nos requisitos.',
      'Tratam exclusivamente da segurança da informação e da prevenção de ataques externos.',
      'Baseiam-se apenas na intuição do testador, sem utilizar documentos formais de especificação.'
    ],
    correctAnswer: 2,
    explanation: 'Testes funcionais validam "o que" o sistema faz conforme os requisitos funcionais.'
  },
  {
    id: 'qt-tt3',
    topicId: 't-qt-tecnicas-teste',
    question: 'Ao definir o "foco" de um teste funcional, o analista deve concentrar seus esforços em:',
    options: [
      'Validar se as regras de negócio e os requisitos funcionais foram devidamente atendidos.',
      'Medir o tempo de resposta das requisições e a escalabilidade da aplicação no servidor.',
      'Analisar a usabilidade da interface gráfica e a paleta de cores definida pelo marketing.',
      'Verificar a eficiência do algoritmo de compressão de dados utilizado no backend.',
      'Revisar a documentação de instalação física do software em ambientes locais.'
    ],
    correctAnswer: 0,
    explanation: 'O teste funcional foca em validar se as regras de negócio e requisitos funcionais foram atendidos.'
  },
  {
    id: 'qt-tt4',
    topicId: 't-qt-tecnicas-teste',
    question: 'Os "Testes Não Funcionais" possuem um foco distinto dos funcionais. O que eles buscam validar prioritariamente?',
    options: [
      'Se o sistema realiza o cálculo de impostos de acordo com a legislação vigente.',
      'Os atributos de qualidade, como desempenho, segurança, confiabilidade e usabilidade.',
      'O fluxo de interação entre o ator e o sistema descrito em um caso de uso.',
      'A correção sintática de cada linha de código escrita pelo desenvolvedor.',
      'A conformidade da funcionalidade com o "o quê" foi solicitado pelo cliente no requisito.'
    ],
    correctAnswer: 1,
    explanation: 'Testes não funcionais focam em atributos de qualidade do sistema (desempenho, segurança, etc).'
  },
  {
    id: 'qt-tt5',
    topicId: 't-qt-tecnicas-teste',
    question: 'No que diz respeito aos "Testes Baseados em Casos de Uso", qual é o foco principal dessa técnica?',
    options: [
      'Validar a lógica de ramificações (if/else) e os caminhos internos do código-fonte.',
      'Testar os limites numéricos de campos de entrada utilizando a análise de valor limite.',
      'Validar as interações entre os atores e o sistema, focando nos fluxos e cenários de negócio.',
      'Medir a latência da rede e a capacidade de processamento concorrente do servidor.',
      'Identificar bugs de memória através de técnicas baseadas exclusivamente na experiência.'
    ],
    correctAnswer: 2,
    explanation: 'Testes baseados em casos de uso focam em interações entre atores e sistema (fluxos de negócio).'
  },
  {
    id: 'qt-tt6',
    topicId: 't-qt-tecnicas-teste',
    question: 'As técnicas de teste "Baseadas em Requisitos" têm o seu foco direcionado para:',
    options: [
      'A intuição do testador sobre onde os defeitos costumam ocorrer em sistemas similares.',
      'A verificação direta da especificação funcional para garantir que o software faz o que foi pedido.',
      'O comportamento do sistema em situações de falha de energia ou desconexão de hardware.',
      'A análise da complexidade ciclomática das funções e métodos do código-fonte.',
      'O design visual e a experiência estética do usuário final ao interagir com a aplicação.'
    ],
    correctAnswer: 1,
    explanation: 'Testes baseados em requisitos verificam se o software cumpre as especificações funcionais definidas.'
  },
  {
    id: 'qt-tt7',
    topicId: 't-qt-tecnicas-teste',
    question: 'O que caracteriza as "Técnicas Baseadas na Experiência" no contexto de testes de software?',
    options: [
      'O uso rigoroso de modelos matemáticos para prever falhas de integração.',
      'A dependência do conhecimento e da habilidade do testador sobre o software e falhas comuns.',
      'O foco exclusivo na documentação de casos de uso e diagramas de sequência.',
      'A medição exata do consumo de CPU por cada funcionalidade do sistema.',
      'A validação de requisitos funcionais através de testes automatizados de caixa-branca.'
    ],
    correctAnswer: 1,
    explanation: 'Testes baseados na experiência dependem do conhecimento e habilidade do testador.'
  },
  {
    id: 'qt-tt8',
    topicId: 't-qt-tecnicas-teste',
    question: 'Um analista decide testar a segurança de um sistema de login contra ataques de força bruta. Este foco é característico de:',
    options: [
      'Um teste funcional baseado em casos de uso de sucesso.',
      'Uma técnica baseada em requisitos para validar o "o quê" do sistema.',
      'Um teste não funcional, focado em atributos de qualidade e proteção do software.',
      'Uma técnica de caixa-branca focada na lógica interna das senhas criptografadas.',
      'Um teste de experiência voltado apenas para o design da tela de login.'
    ],
    correctAnswer: 2,
    explanation: 'Segurança é um atributo de qualidade, portanto, um teste não funcional.'
  },
  {
    id: 'qt-tt9',
    topicId: 't-qt-tecnicas-teste',
    question: 'Qual a diferença de foco entre as técnicas baseadas em requisitos e as baseadas em casos de uso?',
    options: [
      'Requisitos focam no "como" o sistema funciona; Casos de Uso focam no hardware.',
      'Requisitos focam na especificação; Casos de Uso focam nas interações e fluxos de processos.',
      'Requisitos focam na experiência do testador; Casos de Uso focam nos atributos não funcionais.',
      'Requisitos focam em performance; Casos de Uso focam na lógica interna do código (caixa-branca).',
      'Não há diferença, pois ambos focam exclusivamente em métricas de segurança e confiabilidade.'
    ],
    correctAnswer: 1,
    explanation: 'Requisitos focam no que deve ser feito (especificação), enquanto casos de uso focam em interações e fluxos de processos.'
  },
  {
    id: 'qt-tt10',
    topicId: 't-qt-tecnicas-teste',
    question: 'Deseja-se verificar se uma aplicação web suporta 5.000 usuários simultâneos sem perda de performance. Qual técnica/tipo de teste aborda esse foco?',
    options: [
      'Teste Funcional, pois o acesso simultâneo é uma função básica do sistema.',
      'Teste Baseado em Experiência, pois depende do conhecimento prévio de redes do analista.',
      'Teste Não Funcional, pois foca na capacidade e desempenho (atributo de qualidade).',
      'Teste Baseado em Casos de Uso, pois cada usuário representa um ator no sistema.',
      'Técnica Baseada em Requisitos de Negócio, focando apenas no "o quê" o sistema faz.'
    ],
    correctAnswer: 2,
    explanation: 'Performance é um atributo não funcional.'
  }
];
