import type { Discipline, Topic, Question, StudyMaterial } from '../../types';
import { SessionExpiredError } from './geminiClient';
import { getAuthHeaders, clearClientSessionToken } from './authService';

const LEGACY_KEYS = {
  questions: 'mestre_digital_questions',
  topics: 'mestre_digital_topics',
  disciplines: 'mestre_digital_disciplines',
  studyMaterials: 'mestre_digital_study_materials',
  clearedFlag: 'mestre_digital_materials_cleared_all_v1',
  migrationFlag: 'mestre_digital_migrated_v3',
} as const;

export interface LegacyLocalStorageSnapshot {
  disciplines: Discipline[];
  topics: Topic[];
  questions: Question[];
  apostilas: Record<string, StudyMaterial>;
  totalItems: number;
}

export interface MigrationResultSummary {
  disciplines: number;
  topics: number;
  questions: number;
  apostilas: number;
}

async function apiRequest<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
      ...(options?.headers || {}),
    },
  });

  const data = (await res.json().catch(() => ({}))) as T & { error?: string };

  if (res.status === 401) {
    clearClientSessionToken();
    throw new SessionExpiredError(data.error || 'Sessão expirada. Faça login novamente como professor.');
  }

  if (!res.ok) {
    throw new Error(data.error || `Erro na comunicação com o servidor (HTTP ${res.status}).`);
  }

  return data;
}

// --- Disciplinas ---

export async function fetchDisciplines(): Promise<Discipline[]> {
  const data = await apiRequest<{ disciplines: Discipline[] }>('/api/disciplines', { method: 'GET' });
  return Array.isArray(data.disciplines) ? data.disciplines : [];
}

export async function createDisciplineApi(discipline: Discipline): Promise<Discipline> {
  const data = await apiRequest<{ discipline: Discipline }>('/api/disciplines', {
    method: 'POST',
    body: JSON.stringify(discipline),
  });
  return data.discipline;
}

export async function updateDisciplineApi(discipline: Discipline): Promise<Discipline> {
  const data = await apiRequest<{ discipline: Discipline }>(`/api/disciplines/${encodeURIComponent(discipline.id)}`, {
    method: 'PUT',
    body: JSON.stringify({ name: discipline.name }),
  });
  return data.discipline;
}

export async function deleteDisciplineApi(disciplineId: string): Promise<void> {
  await apiRequest<{ deleted: boolean }>(`/api/disciplines/${encodeURIComponent(disciplineId)}`, {
    method: 'DELETE',
  });
}

// --- Topicos ---

export async function fetchAllTopics(): Promise<Topic[]> {
  const data = await apiRequest<{ topics: Topic[] }>('/api/topics', { method: 'GET' });
  return Array.isArray(data.topics) ? data.topics : [];
}

export async function fetchTopicsByDiscipline(disciplineId: string): Promise<Topic[]> {
  const data = await apiRequest<{ topics: Topic[] }>(
    `/api/disciplines/${encodeURIComponent(disciplineId)}/topics`,
    { method: 'GET' }
  );
  return Array.isArray(data.topics) ? data.topics : [];
}

export async function createTopicApi(topic: Topic): Promise<Topic> {
  const data = await apiRequest<{ topic: Topic }>(
    `/api/disciplines/${encodeURIComponent(topic.disciplineId)}/topics`,
    {
      method: 'POST',
      body: JSON.stringify(topic),
    }
  );
  return data.topic;
}

export async function updateTopicApi(topic: Topic): Promise<Topic> {
  const data = await apiRequest<{ topic: Topic }>(`/api/topics/${encodeURIComponent(topic.id)}`, {
    method: 'PUT',
    body: JSON.stringify({ name: topic.name, disciplineId: topic.disciplineId }),
  });
  return data.topic;
}

export async function deleteTopicApi(topicId: string): Promise<void> {
  await apiRequest<{ deleted: boolean }>(`/api/topics/${encodeURIComponent(topicId)}`, {
    method: 'DELETE',
  });
}

// --- Questoes ---

export async function fetchAllQuestions(): Promise<Question[]> {
  const data = await apiRequest<{ questions: Question[] }>('/api/questions', { method: 'GET' });
  return Array.isArray(data.questions) ? data.questions : [];
}

export async function fetchQuestionsByTopic(topicId: string): Promise<Question[]> {
  const data = await apiRequest<{ questions: Question[] }>(
    `/api/topics/${encodeURIComponent(topicId)}/questions`,
    { method: 'GET' }
  );
  return Array.isArray(data.questions) ? data.questions : [];
}

export async function saveQuestionsForTopicApi(topicId: string, questions: Question[]): Promise<Question[]> {
  const data = await apiRequest<{ questions: Question[] }>(
    `/api/topics/${encodeURIComponent(topicId)}/questions`,
    {
      method: 'POST',
      body: JSON.stringify({ questions }),
    }
  );
  return Array.isArray(data.questions) ? data.questions : [];
}

export async function updateQuestionApi(question: Question): Promise<Question> {
  const data = await apiRequest<{ question: Question }>(`/api/questions/${encodeURIComponent(question.id)}`, {
    method: 'PUT',
    body: JSON.stringify(question),
  });
  return data.question;
}

export async function deleteQuestionApi(questionId: string): Promise<void> {
  await apiRequest<{ deleted: boolean }>(`/api/questions/${encodeURIComponent(questionId)}`, {
    method: 'DELETE',
  });
}

// --- Apostilas (Materiais Didaticos) ---

export async function fetchAllApostilas(): Promise<Record<string, StudyMaterial>> {
  const data = await apiRequest<{ apostilas: Record<string, StudyMaterial> }>('/api/apostilas', {
    method: 'GET',
  });
  return data.apostilas && typeof data.apostilas === 'object' ? data.apostilas : {};
}

export async function fetchApostilaApi(topicId: string): Promise<StudyMaterial | null> {
  const data = await apiRequest<{ apostila: StudyMaterial | null }>(
    `/api/topics/${encodeURIComponent(topicId)}/apostila`,
    { method: 'GET' }
  );
  return data.apostila || null;
}

export async function saveApostilaApi(topicId: string, material: StudyMaterial): Promise<StudyMaterial> {
  const data = await apiRequest<{ apostila: StudyMaterial }>(
    `/api/topics/${encodeURIComponent(topicId)}/apostila`,
    {
      method: 'PUT',
      body: JSON.stringify({ apostila: material }),
    }
  );
  return data.apostila;
}

export async function deleteApostilaApi(topicId: string): Promise<void> {
  await apiRequest<{ deleted: boolean }>(`/api/topics/${encodeURIComponent(topicId)}/apostila`, {
    method: 'DELETE',
  });
}

export async function clearAllApostilasApi(): Promise<void> {
  await apiRequest<{ cleared: boolean }>('/api/apostilas', {
    method: 'DELETE',
  });
}

// --- Migracao localStorage -> Firestore ---

export function readLegacyLocalStorageData(): LegacyLocalStorageSnapshot {
  if (typeof window === 'undefined' || !window.localStorage) {
    return { disciplines: [], topics: [], questions: [], apostilas: {}, totalItems: 0 };
  }

  const safeParse = <T>(raw: string | null, fallback: T): T => {
    if (!raw) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  };

  const disciplines = safeParse<Discipline[]>(window.localStorage.getItem(LEGACY_KEYS.disciplines), []);
  const topics = safeParse<Topic[]>(window.localStorage.getItem(LEGACY_KEYS.topics), []);
  const questions = safeParse<Question[]>(window.localStorage.getItem(LEGACY_KEYS.questions), []);
  const apostilas = safeParse<Record<string, StudyMaterial>>(
    window.localStorage.getItem(LEGACY_KEYS.studyMaterials),
    {}
  );

  const safeDisciplines = Array.isArray(disciplines) ? disciplines : [];
  const safeTopics = Array.isArray(topics) ? topics : [];
  const safeQuestions = Array.isArray(questions) ? questions : [];
  const safeApostilas = apostilas && typeof apostilas === 'object' && !Array.isArray(apostilas) ? apostilas : {};

  return {
    disciplines: safeDisciplines,
    topics: safeTopics,
    questions: safeQuestions,
    apostilas: safeApostilas,
    totalItems:
      safeDisciplines.length +
      safeTopics.length +
      safeQuestions.length +
      Object.keys(safeApostilas).length,
  };
}

export function clearLegacyLocalStorageData(): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  window.localStorage.removeItem(LEGACY_KEYS.disciplines);
  window.localStorage.removeItem(LEGACY_KEYS.topics);
  window.localStorage.removeItem(LEGACY_KEYS.questions);
  window.localStorage.removeItem(LEGACY_KEYS.studyMaterials);
  window.localStorage.removeItem(LEGACY_KEYS.clearedFlag);
  window.localStorage.removeItem(LEGACY_KEYS.migrationFlag);
}

export async function migrateToFirestoreApi(payload: {
  disciplines: Discipline[];
  topics: Topic[];
  questions: Question[];
  apostilas: Record<string, StudyMaterial>;
}): Promise<MigrationResultSummary> {
  const data = await apiRequest<{ ok: boolean; migrated: MigrationResultSummary }>('/api/migrate', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return data.migrated;
}
