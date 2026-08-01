
export interface CodeSnippet {
  title: string;
  language: string;
  code: string;
  explanation?: string;
}

export interface SyntaxDeconstruction {
  lineOrKeyword: string;
  spokenReasoning: string;
  sideEffect: string;
}

export interface StudyMaterial {
  topicId: string;
  topicName?: string;
  summary?: string;
  // 1. Introdução e Contextualização do Tema (2 parágrafos em texto corrido)
  introduction: string[];
  // 2. Fundamentação Teórica e Mecanismos Internos (Under the Hood)
  theoreticalFoundation: {
    description: string;
    asciiDiagram?: string;
  };
  // 3. Demonstração Prática de Código (6-12 linhas)
  codeSnippet: {
    title: string;
    language: string;
    code: string;
  };
  // 4. Desconstrução da Sintaxe (O que falar ENQUANTO digita)
  syntaxDeconstruction: SyntaxDeconstruction[];
  // 5. Boas Práticas, Anti-Patterns e Armadilhas Frequentes
  bestPracticesAndPitfalls: string[];
  
  // Backward compatibility fields
  keyPoints?: string[];
  bestPractices?: string[];
  codeSnippets?: CodeSnippet[];
  commonPitfalls?: string[];
}

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

