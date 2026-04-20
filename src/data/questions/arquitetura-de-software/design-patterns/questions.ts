import { Question } from '../../../types';

export const DESIGN_PATTERNS_QUESTIONS: Question[] = [
  {
    id: 'dp1',
    topicId: 't-dp',
    question: 'Qual a definição principal do padrão criacional "Singleton"?',
    options: [
      'Garante que uma classe tenha múltiplas instâncias distribuídas em cluster.',
      'Garante que uma classe tenha apenas uma instância e fornece um ponto global de acesso a ela.',
      'Permite a criação de objetos sem especificar a classe exata do objeto a ser criado.',
      'Define uma dependência um-para-muitos entre objetos para notificação de mudanças.',
      'Converte a interface de uma classe em outra interface esperada pelos clientes.'
    ],
    correctAnswer: 1,
    explanation: 'O Singleton restringe a instanciação de uma classe a um único objeto "eterno" durante o ciclo de vida da aplicação.'
  },
  {
    id: 'dp2',
    topicId: 't-dp',
    question: 'O padrão comportamental "Strategy" serve primordialmente para:',
    options: [
      'Encapsular uma solicitação como um objeto, permitindo parametrizar clientes.',
      'Definir uma família de algoritmos, encapsular cada um deles e torná-los intercambiáveis.',
      'Garantir que um objeto possa ser clonado sem depender de suas classes concretas.',
      'Prover um substituto ou marcador de lugar para outro objeto para controlar o acesso a ele.',
      'Separar a construção de um objeto complexo de sua representação.'
    ],
    correctAnswer: 1,
    explanation: 'O Strategy permite que o algoritmo varie independentemente dos clientes que o utilizam, através de composição.'
  },
  {
    id: 'dp3',
    topicId: 't-dp',
    question: 'Qual padrão é utilizado para permitir que interfaces incompatíveis trabalhem juntas?',
    options: ['Observer', 'Factory Method', 'Adapter', 'Facade', 'Mediator'],
    correctAnswer: 2,
    explanation: 'O Adapter atua como um tradutor entre duas interfaces que não poderiam se conectar diretamente.'
  },
  {
    id: 'dp4',
    topicId: 't-dp',
    question: 'O padrão "Observer" é comumente utilizado em quais cenários?',
    options: [
      'Criação de objetos complexos passo a passo.',
      'Sistemas orientados a eventos onde a mudança de estado de um objeto deve notificar outros.',
      'Onde é necessário reduzir o consumo de memória compartilhando objetos.',
      'Quando queremos evitar o acoplamento entre o remetente e o receptor de uma mensagem.',
      'Para restaurar o estado de um objeto ao seu estado anterior.'
    ],
    correctAnswer: 1,
    explanation: 'O Observer define uma dependência onde, quando um objeto muda de estado, seus dependentes são avisados.'
  },
  {
    id: 'dp5',
    topicId: 't-dp',
    question: 'Qual a característica do padrão "Factory Method"?',
    options: [
      'Ele utiliza herança para permitir que subclasses decidam qual classe instanciar.',
      'Ele obriga o uso de reflexão computacional para criar objetos em runtime.',
      'Ele garante que apenas objetos do tipo interface sejam retornados por métodos estáticos.',
      'Ele proíbe a criação de objetos fora de um contexto de banco de dados.',
      'Ele é um padrão arquitetural e não um padrão de design.'
    ],
    correctAnswer: 0,
    explanation: 'O Factory Method define uma interface para criar um objeto, mas deixa as subclasses decidirem qual classe instanciar.'
  }
];
