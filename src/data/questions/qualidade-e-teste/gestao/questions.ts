import { Question } from '../../../types';

export const QUALITY_GESTION_QUESTIONS: Question[] = [
  {
    id: 'qt-g1',
    topicId: 't-qt-gestao',
    question: 'De acordo com o glossário padrão de testes, como se define a ação humana que produz um resultado incorreto no software?',
    options: [
      'Defeito, pois é a imperfeição física encontrada no código-fonte ou documento.',
      'Falha, visto que o sistema deixou de realizar sua função pretendida durante o uso.',
      'Erro, caracterizado por um equívoco cometido por um desenvolvedor ou analista.',
      'Anomalia, pois representa qualquer comportamento que fuja do esperado pelo usuário.',
      'Severidade, uma vez que o impacto humano no código é sempre considerado crítico.'
    ],
    correctAnswer: 2,
    explanation: 'Erro = Ação humana que produz um resultado incorreto no software.'
  },
  {
    id: 'qt-g2',
    topicId: 't-qt-gestao',
    question: 'Quando um erro cometido por um profissional é introduzido no código-fonte e permanece lá sem ser executado, ele é tecnicamente chamado de:',
    options: [
      'Falha, pois o sistema já está comprometido e não funcionará corretamente.',
      'Defeito (ou Bug), que é a manifestação física do erro dentro do artefato de software.',
      'Prioridade, pois deve ser corrigido antes mesmo de o sistema ser testado.',
      'Teste Dinâmico, pois a presença do bug exige a execução imediata do código.',
      'Anomalia externa, visto que o erro ainda não causou um impacto visível ao usuário final.'
    ],
    correctAnswer: 1,
    explanation: 'Defeito = Presença física no artefato/código.'
  },
  {
    id: 'qt-g3',
    topicId: 't-qt-gestao',
    question: 'O termo "Falha" é corretamente empregado em qual das seguintes situações de teste?',
    options: [
      'Quando um analista de testes encontra uma divergência em um documento de requisitos.',
      'Quando o sistema, durante sua execução, apresenta um comportamento diferente do esperado.',
      'No momento em que o programador percebe que esqueceu de fechar uma chave no código.',
      'Sempre que um relatório de defeitos é aberto com baixa prioridade de correção.',
      'Durante a revisão de código em um teste estático, antes da compilação do programa.'
    ],
    correctAnswer: 1,
    explanation: 'Falha = Desvio observado durante a execução do sistema.'
  },
  {
    id: 'qt-g4',
    topicId: 't-qt-gestao',
    question: 'A afirmação "nem toda anomalia é um bug" sugere que um comportamento inesperado no sistema pode ser causado por fatores externos. Qual exemplo abaixo melhor ilustra essa frase?',
    options: [
      'Um erro de digitação no código que gera um cálculo matemático errado.',
      'Uma falha de hardware ou queda de conexão que impede o sistema de responder.',
      'Um defeito no banco de dados que apaga registros de forma intermitente.',
      'Uma falha na lógica de programação que trava a aplicação ao clicar em um botão.',
      'Um erro humano na fase de especificação que foi transposto para o código final.'
    ],
    correctAnswer: 1,
    explanation: 'Falhas de hardware, rede ou fatores externos não são bugs do software em si.'
  },
  {
    id: 'qt-g5',
    topicId: 't-qt-gestao',
    question: 'Qual é a principal característica que define a execução de um "Teste Estático"?',
    options: [
      'A necessidade obrigatória de rodar o programa em um ambiente de homologação.',
      'A análise de requisitos, modelos e código sem que o software seja efetivamente executado.',
      'A medição do tempo de resposta do sistema sob uma carga constante de usuários.',
      'O foco exclusivo na severidade dos erros encontrados durante a fase de produção.',
      'A verificação da prioridade de correção dos defeitos encontrados pelos usuários finais.'
    ],
    correctAnswer: 1,
    explanation: 'Teste Estático é realizado sem a execução do software.'
  },
  {
    id: 'qt-g6',
    topicId: 't-qt-gestao',
    question: 'Diferente do teste estático, o "Teste Dinâmico" exige que:',
    options: [
      'O código seja apenas revisado visualmente por um par de desenvolvedores (Peer Review).',
      'O software seja executado para validar se os resultados obtidos condizem com o esperado.',
      'Os defeitos sejam classificados apenas por prioridade, ignorando a severidade técnica.',
      'O fluxo de negócio seja analisado estritamente através de diagramas e fluxogramas.',
      'O erro humano seja identificado antes mesmo da criação do primeiro protótipo.'
    ],
    correctAnswer: 1,
    explanation: 'Teste Dinâmico exige a execução do software.'
  },
  {
    id: 'qt-g7',
    topicId: 't-qt-gestao',
    question: 'Em um relatório de defeitos, a "Severidade" é uma métrica que avalia:',
    options: [
      'O prazo limite que a equipe de desenvolvimento possui para corrigir o problema.',
      'O impacto técnico que o defeito causa nas funções do sistema ou na integridade dos dados.',
      'A ordem de importância definida pelo cliente para o lançamento de uma nova versão.',
      'Se o defeito foi causado por um erro humano ou por uma falha de hardware externa.',
      'A quantidade total de testes estáticos realizados antes da descoberta da anomalia.'
    ],
    correctAnswer: 1,
    explanation: 'Severidade = Avaliação do impacto técnico do defeito.'
  },
  {
    id: 'qt-g8',
    topicId: 't-qt-gestao',
    question: 'No gerenciamento de defeitos, o conceito de "Prioridade" está diretamente ligado a:',
    options: [
      'Complexidade técnica para encontrar a causa raiz de uma falha específica.',
      'Urgência de correção do ponto de vista do negócio ou do cronograma do projeto.',
      'Capacidade do teste dinâmico em encontrar erros ocultos na interface do usuário.',
      'Diferença entre um erro cometido no requisito e um defeito no código-fonte.',
      'Gravidade do impacto que o bug causa no banco de dados do servidor principal.'
    ],
    correctAnswer: 1,
    explanation: 'Prioridade = Urgência de correção baseada no negócio ou cronograma.'
  },
  {
    id: 'qt-g9',
    topicId: 't-qt-gestao',
    question: 'É possível que um defeito tenha "Baixa Severidade" e "Alta Prioridade" simultaneamente. Qual cenário representa essa situação?',
    options: [
      'Um erro de ortografia no logotipo da empresa na tela principal do sistema.',
      'O sistema apaga todo o banco de dados ao realizar uma busca simples.',
      'Uma falha intermitente que impede 50% dos usuários de realizarem o login.',
      'Um erro de lógica em um cálculo fiscal que gera prejuízo financeiro imediato.',
      'Um teste estático que identifica um erro de arquitetura grave no projeto.'
    ],
    correctAnswer: 0,
    explanation: 'Erro visual: tecnicamente simples (baixa severidade), mas impacta a imagem da marca (alta prioridade).'
  },
  {
    id: 'qt-g10',
    topicId: 't-qt-gestao',
    question: 'Ao comparar Teste Estático e Teste Dinâmico, qual conclusão está correta com base no conteúdo estudado?',
    options: [
      'O teste dinâmico foca em erros humanos, enquanto o estático foca em falhas de execução.',
      'O teste estático encontra defeitos (bugs), enquanto o teste dinâmico revela falhas.',
      'Ambos exigem a execução do software para determinar a prioridade dos defeitos.',
      'A severidade só pode ser medida em testes estáticos, pois não há falhas visíveis.',
      'O teste dinâmico é focado em anomalias externas, enquanto o estático foca em bugs de hardware.'
    ],
    correctAnswer: 1,
    explanation: 'O estático analisa o código/doc para achar defeitos; o dinâmico roda o sistema para revelar falhas.'
  }
];
