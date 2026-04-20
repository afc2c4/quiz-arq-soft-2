import { Question } from '../../../types';

export const REFACTORING_QUESTIONS: Question[] = [
  {
    id: 'ref1',
    topicId: 't-ref',
    question: 'O que define o processo de "Refatoração" de código?',
    options: [
      'Adicionar novas funcionalidades ao sistema para atender pedidos do cliente.',
      'Alterar a estrutura interna do código sem modificar seu comportamento externo.',
      'Reescrever todo o sistema do zero usando uma tecnologia mais nova.',
      'Corrigir bugs críticos que estão causando quedas no servidor de produção.',
      'Remover todos os comentários para deixar o arquivo mais leve.'
    ],
    correctAnswer: 1,
    explanation: 'O objetivo é melhorar a legibilidade, reduzir complexidade e facilitar manutenção.'
  },
  {
    id: 'ref2',
    topicId: 't-ref',
    question: 'O termo "Code Smell" (Cheiro de Código) indica:',
    options: [
      'Um erro de sintaxe que impede a compilação do programa.',
      'Um sintoma na estrutura do código que possivelmente indica um problema mais profundo.',
      'A presença de vírus ou malwares detectados pelo antivírus no código-fonte.',
      'Um comentário mal escrito que utiliza termos ofensivos ou inadequados.',
      'O tempo que o código ficou parado sem receber atualizações no repositório.'
    ],
    correctAnswer: 1,
    explanation: 'Code smells não são bugs, mas são sinais de que o código precisa de refatoração (ex: métodos longos).'
  },
  {
    id: 'ref3',
    topicId: 't-ref',
    question: 'Qual o pré-requisito fundamental para uma refatoração segura?',
    options: [
      'Ter um computador com processador de última geração e muita RAM.',
      'Possuir uma suíte de testes automatizados confiável.',
      'Aprovação formal e assinada pelo CEO da empresa.',
      'Desligar o sistema para todos os usuários durante o processo.',
      'Converter todo o código para uma linguagem de tipagem forte.'
    ],
    correctAnswer: 1,
    explanation: 'Sem testes, você não tem garantia de que o comportamento externo permanece o mesmo.'
  },
  {
    id: 'ref4',
    topicId: 't-ref',
    question: 'O ciclo "Red-Green-Refactor" faz parte de qual metodologia?',
    options: [
      'Criação de paletas de cores para interfaces de usuário.',
      'Test-Driven Development (TDD).',
      'Gerenciamento de tráfego em redes de alta velocidade.',
      'Processo de deploy contínuo em ambientes de nuvem.',
      'Instalação de sistemas operacionais baseados em Linux.'
    ],
    correctAnswer: 1,
    explanation: 'Escreva um teste que falha (Red), faça-o passar (Green) e então melhore o código (Refactor).'
  },
  {
    id: 'ref5',
    topicId: 't-ref',
    question: 'A técnica "Extract Method" (Extrair Método) serve para:',
    options: [
      'Remover métodos que não são utilizados em nenhuma parte do sistema.',
      'Transformar um trecho de código complexo dentro de um método em um novo método.',
      'Copiar um método de uma classe para outra para duplicar funcionalidade.',
      'Exportar o código para um arquivo de texto externo para documentação.',
      'Criptografar o nome do método para dificultar a engenharia reversa.'
    ],
    correctAnswer: 1,
    explanation: 'Ajuda a diminuir o tamanho de métodos gigantes e melhora a clareza do código.'
  }
];
