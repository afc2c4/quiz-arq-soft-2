import { getAuthHeaders, clearClientSessionToken } from './authService';

export interface GeneratedQuestionDTO {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export class SessionExpiredError extends Error {
  constructor(message = 'Sessão expirada. Faça login novamente.') {
    super(message);
    this.name = 'SessionExpiredError';
  }
}

export const generateQuestionsViaApi = async (params: {
  disciplineName: string;
  topicName: string;
  count: number;
  focus?: string;
}): Promise<GeneratedQuestionDTO[]> => {
  const res = await fetch('/api/gemini/generate-questions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    credentials: 'include',
    body: JSON.stringify(params),
  });

  const data = (await res.json().catch(() => ({}))) as {
    questions?: GeneratedQuestionDTO[];
    error?: string;
  };

  if (res.status === 401) {
    clearClientSessionToken();
    throw new SessionExpiredError(data.error);
  }

  if (!res.ok || !Array.isArray(data.questions)) {
    throw new Error(data.error || 'Erro ao gerar questões via servidor.');
  }

  return data.questions;
};

export const generateStudyMaterialViaApi = async (params: {
  disciplineName: string;
  topicName: string;
  guidelines?: string;
}): Promise<string> => {
  const res = await fetch('/api/gemini/generate-material', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    credentials: 'include',
    body: JSON.stringify(params),
  });

  const data = (await res.json().catch(() => ({}))) as {
    markdownContent?: string;
    error?: string;
  };

  if (res.status === 401) {
    clearClientSessionToken();
    throw new SessionExpiredError(data.error);
  }

  if (!res.ok || typeof data.markdownContent !== 'string') {
    throw new Error(data.error || 'Erro ao gerar apostila didática via servidor.');
  }

  return data.markdownContent;
};
