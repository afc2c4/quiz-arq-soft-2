
export interface Discipline {
  id: string;
  name: string;
}

export interface Topic {
  id: string;
  name: string;
  disciplineId: string;
}

export interface Question {
  id: string;
  topicId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizState {
  currentTopicId: string | null;
  currentQuestionIndex: number;
  score: number;
  userAnswers: { [questionId: string]: number };
  isFinished: boolean;
}
