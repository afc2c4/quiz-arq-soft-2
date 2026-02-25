
export type Topic = 
  | 'Design Patterns' 
  | 'DDD' 
  | 'Arquitetura Monolítica' 
  | 'Microsserviços' 
  | 'Padrão MVC' 
  | 'Frameworks' 
  | 'Arquitetura em Camadas' 
  | 'Refatoração';

export interface Question {
  id: string;
  topic: Topic;
  question: string;
  options: string[];
  correctAnswer: number; // Index of options array (0-4)
  explanation: string;
}

export interface QuizState {
  currentTopic: Topic | null;
  currentQuestionIndex: number;
  score: number;
  userAnswers: { [questionId: string]: number };
  isFinished: boolean;
}
