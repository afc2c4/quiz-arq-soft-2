import { Question } from '../../../types';

export const LAYERED_QUESTIONS: Question[] = [
  {
    id: 'layer1',
    topicId: 't-layer',
    question: 'Qual o objetivo primordial da arquitetura em camadas (Layered Architecture)?',
    options: [
      'Aumentar o número de arquivos no projeto para impressionar o cliente.',
      'Organizar o sistema em níveis de abstração com responsabilidades distintas.',
      'Impedir que o sistema seja traduzido para outros idiomas.',
      'Garantir que a interface de usuário carregue em menos de 100ms.',
      'Permitir que o código rode em processadores de múltiplos núcleos.'
    ],
    correctAnswer: 1,
    explanation: 'A separação facilita a substituição de componentes (ex: trocar o banco de dados sem afetar a UI).'
  },
  {
    id: 'layer2',
    topicId: 't-layer',
    question: 'Em uma arquitetura de 3 camadas típica, quais são elas?',
    options: [
      'Entrada, Processamento e Saída.',
      'Apresentação (UI), Lógica de Negócio (BLL) e Acesso a Dados (DAL).',
      'Frontend, Backend e Fullstack.',
      'HTML, CSS e JavaScript.',
      'Hardware, Firmware e Software.'
    ],
    correctAnswer: 1,
    explanation: 'Essa é a divisão clássica que separa a tela, as regras e a persistência.'
  },
  {
    id: 'layer3',
    topicId: 't-layer',
    question: 'A regra fundamental de dependência em camadas estabelece que:',
    options: [
      'Camadas inferiores podem chamar livremente funções de camadas superiores.',
      'Uma camada deve depender apenas da camada imediatamente abaixo dela.',
      'Todas as camadas devem depender simultaneamente da camada de interface.',
      'Não deve haver dependência entre as camadas para garantir o isolamento.',
      'As camadas devem ser lidas da direita para a esquerda pelo compilador.'
    ],
    correctAnswer: 1,
    explanation: 'O fluxo de dependência deve ser top-down para evitar acoplamento circular.'
  },
  {
    id: 'layer4',
    topicId: 't-layer',
    question: 'Uma "Camada de Persistência" é responsável por:',
    options: [
      'Garantir que o usuário não desista de usar o sistema (UX).',
      'Gerenciar o armazenamento e recuperação de dados em meios permanentes.',
      'Manter a conexão de internet ativa durante todo o uso da aplicação.',
      'Salvar as preferências estéticas do usuário como cores e temas.',
      'Recuperar senhas esquecidas através de perguntas de segurança.'
    ],
    correctAnswer: 1,
    explanation: 'Ela abstrai o SQL ou o NoSQL para o restante do sistema.'
  },
  {
    id: 'layer5',
    topicId: 't-layer',
    question: 'Qual a vantagem da "Interoperabilidade" em arquiteturas em camadas?',
    options: [
      'Poder trocar a implementação de uma camada sem alterar as outras.',
      'Obrigação de usar a mesma linguagem em todas as camadas do projeto.',
      'Redução da segurança, pois os dados passam por muitos níveis.',
      'Aumento do tempo de resposta devido à passagem de dados entre camadas.',
      'Facilidade de criar vírus que infectam todas as camadas simultaneamente.'
    ],
    correctAnswer: 0,
    explanation: 'Você pode trocar o banco SQL por MongoDB apenas mexendo na camada de dados.'
  }
];
