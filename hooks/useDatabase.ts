import { useState, useEffect, useCallback } from 'react';
import type { Question, Topic, Discipline, StudyMaterial } from '../types';
import { getStudyMaterialByTopic, createEmptyStudyMaterial } from '../src/data/studyMaterials';
import { SessionExpiredError } from '../src/services/geminiClient';
import {
  fetchDisciplines,
  createDisciplineApi,
  updateDisciplineApi,
  deleteDisciplineApi,
  fetchAllTopics,
  createTopicApi,
  updateTopicApi,
  deleteTopicApi,
  fetchAllQuestions,
  saveQuestionsForTopicApi,
  updateQuestionApi,
  deleteQuestionApi,
  fetchAllApostilas,
  saveApostilaApi,
  deleteApostilaApi,
  clearAllApostilasApi,
  migrateToFirestoreApi,
  type MigrationResultSummary,
} from '../src/services/databaseApi';

export const useDatabase = (onSessionExpired?: () => void) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [customMaterials, setCustomMaterials] = useState<Record<string, StudyMaterial>>({});

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleApiError = useCallback(
    (err: unknown, fallbackMessage: string): string => {
      if (err instanceof SessionExpiredError) {
        setError(null);
        onSessionExpired?.();
        return err.message;
      }
      const message = err instanceof Error && err.message ? err.message : fallbackMessage;
      setError(message);
      return message;
    },
    [onSessionExpired]
  );

  const reloadDatabase = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [loadedDisciplines, loadedTopics, loadedQuestions, loadedApostilas] = await Promise.all([
        fetchDisciplines(),
        fetchAllTopics(),
        fetchAllQuestions(),
        fetchAllApostilas(),
      ]);

      setDisciplines(loadedDisciplines);
      setTopics(loadedTopics);
      setQuestions(loadedQuestions);
      setCustomMaterials(loadedApostilas);
    } catch (err) {
      handleApiError(err, 'Erro ao carregar os dados do Firestore.');
    } finally {
      setIsLoading(false);
    }
  }, [handleApiError]);

  useEffect(() => {
    void reloadDatabase();
  }, [reloadDatabase]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // --- Questoes ---

  const addQuestion = async (question: Question): Promise<boolean> => {
    setIsSaving(true);
    setError(null);
    try {
      const [saved] = await saveQuestionsForTopicApi(question.topicId, [question]);
      if (saved) {
        setQuestions((prev) => [...prev.filter((q) => q.id !== saved.id), saved]);
      }
      return true;
    } catch (err) {
      handleApiError(err, 'Erro ao salvar questão no Firestore.');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const updateQuestion = async (updatedQuestion: Question): Promise<boolean> => {
    setIsSaving(true);
    setError(null);
    try {
      const saved = await updateQuestionApi(updatedQuestion);
      setQuestions((prev) => prev.map((q) => (q.id === saved.id ? saved : q)));
      return true;
    } catch (err) {
      handleApiError(err, 'Erro ao atualizar questão no Firestore.');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const deleteQuestion = async (id: string): Promise<boolean> => {
    setIsSaving(true);
    setError(null);
    try {
      await deleteQuestionApi(id);
      setQuestions((prev) => prev.filter((q) => q.id !== id));
      return true;
    } catch (err) {
      handleApiError(err, 'Erro ao excluir questão no Firestore.');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const importQuestions = async (newQuestions: Question[]): Promise<boolean> => {
    if (!newQuestions.length) return true;
    setIsSaving(true);
    setError(null);
    try {
      const byTopic = new Map<string, Question[]>();
      for (const q of newQuestions) {
        const list = byTopic.get(q.topicId) || [];
        list.push(q);
        byTopic.set(q.topicId, list);
      }

      const savedAll: Question[] = [];
      for (const [topicId, list] of byTopic.entries()) {
        const saved = await saveQuestionsForTopicApi(topicId, list);
        savedAll.push(...saved);
      }

      setQuestions((prev) => {
        const map = new Map<string, Question>(prev.map((q) => [q.id, q]));
        savedAll.forEach((q) => map.set(q.id, q));
        return Array.from(map.values());
      });
      return true;
    } catch (err) {
      handleApiError(err, 'Erro ao importar questões para o Firestore.');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // --- Topicos ---

  const addTopic = async (topic: Topic): Promise<boolean> => {
    setIsSaving(true);
    setError(null);
    try {
      const savedTopic = await createTopicApi(topic);
      const emptyMaterial = createEmptyStudyMaterial(savedTopic);
      const savedMaterial = await saveApostilaApi(savedTopic.id, emptyMaterial);

      setTopics((prev) => [...prev.filter((t) => t.id !== savedTopic.id), savedTopic]);
      setCustomMaterials((prev) => ({ ...prev, [savedTopic.id]: savedMaterial }));
      return true;
    } catch (err) {
      handleApiError(err, 'Erro ao criar tópico no Firestore.');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const updateTopic = async (updatedTopic: Topic): Promise<boolean> => {
    setIsSaving(true);
    setError(null);
    try {
      const saved = await updateTopicApi(updatedTopic);
      setTopics((prev) => prev.map((t) => (t.id === saved.id ? saved : t)));
      return true;
    } catch (err) {
      handleApiError(err, 'Erro ao atualizar tópico no Firestore.');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const deleteTopic = async (id: string): Promise<boolean> => {
    setIsSaving(true);
    setError(null);
    try {
      await deleteTopicApi(id);
      setTopics((prev) => prev.filter((t) => t.id !== id));
      setQuestions((prev) => prev.filter((q) => q.topicId !== id));
      setCustomMaterials((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      return true;
    } catch (err) {
      handleApiError(err, 'Erro ao excluir tópico no Firestore.');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // --- Disciplinas ---

  const addDiscipline = async (discipline: Discipline): Promise<boolean> => {
    setIsSaving(true);
    setError(null);
    try {
      const saved = await createDisciplineApi(discipline);
      setDisciplines((prev) => [...prev.filter((d) => d.id !== saved.id), saved]);
      return true;
    } catch (err) {
      handleApiError(err, 'Erro ao criar disciplina no Firestore.');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const updateDiscipline = async (updatedDiscipline: Discipline): Promise<boolean> => {
    setIsSaving(true);
    setError(null);
    try {
      const saved = await updateDisciplineApi(updatedDiscipline);
      setDisciplines((prev) => prev.map((d) => (d.id === saved.id ? saved : d)));
      return true;
    } catch (err) {
      handleApiError(err, 'Erro ao atualizar disciplina no Firestore.');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const deleteDiscipline = async (id: string): Promise<boolean> => {
    setIsSaving(true);
    setError(null);
    try {
      await deleteDisciplineApi(id);
      const removedTopicIds = topics.filter((t) => t.disciplineId === id).map((t) => t.id);
      setDisciplines((prev) => prev.filter((d) => d.id !== id));
      setTopics((prev) => prev.filter((t) => t.disciplineId !== id));
      setQuestions((prev) => prev.filter((q) => !removedTopicIds.includes(q.topicId)));
      setCustomMaterials((prev) => {
        const next = { ...prev };
        removedTopicIds.forEach((tId) => delete next[tId]);
        return next;
      });
      return true;
    } catch (err) {
      handleApiError(err, 'Erro ao excluir disciplina no Firestore.');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // --- Apostilas (Conteudos Didaticos) ---

  const updateStudyMaterial = async (material: StudyMaterial): Promise<boolean> => {
    setIsSaving(true);
    setError(null);
    try {
      const saved = await saveApostilaApi(material.topicId, material);
      setCustomMaterials((prev) => ({
        ...prev,
        [saved.topicId]: saved,
      }));
      return true;
    } catch (err) {
      handleApiError(err, 'Erro ao salvar apostila no Firestore.');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const importStudyMaterials = async (materials: Record<string, StudyMaterial>): Promise<boolean> => {
    const entries = Object.entries(materials);
    if (!entries.length) return true;
    setIsSaving(true);
    setError(null);
    try {
      const savedEntries = await Promise.all(
        entries.map(async ([topicId, mat]) => {
          const saved = await saveApostilaApi(topicId, { ...mat, topicId });
          return [topicId, saved] as const;
        })
      );
      setCustomMaterials((prev) => {
        const next = { ...prev };
        savedEntries.forEach(([topicId, saved]) => {
          next[topicId] = saved;
        });
        return next;
      });
      return true;
    } catch (err) {
      handleApiError(err, 'Erro ao importar apostilas para o Firestore.');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const resetStudyMaterial = async (topicId: string): Promise<boolean> => {
    setIsSaving(true);
    setError(null);
    try {
      await deleteApostilaApi(topicId);
      setCustomMaterials((prev) => {
        const next = { ...prev };
        delete next[topicId];
        return next;
      });
      return true;
    } catch (err) {
      handleApiError(err, 'Erro ao restaurar apostila no Firestore.');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const clearAllStudyMaterials = async (): Promise<boolean> => {
    setIsSaving(true);
    setError(null);
    try {
      await clearAllApostilasApi();
      setCustomMaterials({});
      return true;
    } catch (err) {
      handleApiError(err, 'Erro ao limpar conteúdos didáticos no Firestore.');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const getStudyMaterial = (topic: Topic): StudyMaterial => {
    if (customMaterials[topic.id]) {
      return customMaterials[topic.id];
    }
    return getStudyMaterialByTopic(topic);
  };

  const hasCustomStudyMaterial = (topicId: string): boolean => {
    return Boolean(customMaterials[topicId]);
  };

  // --- Migracao ---

  const migrateToFirestore = async (payload: {
    disciplines: Discipline[];
    topics: Topic[];
    questions: Question[];
    apostilas: Record<string, StudyMaterial>;
  }): Promise<{ ok: boolean; migrated?: MigrationResultSummary; error?: string }> => {
    setIsSaving(true);
    setError(null);
    try {
      const migrated = await migrateToFirestoreApi(payload);
      await reloadDatabase();
      return { ok: true, migrated };
    } catch (err) {
      const msg = handleApiError(err, 'Erro ao migrar dados para o Firestore.');
      return { ok: false, error: msg };
    } finally {
      setIsSaving(false);
    }
  };

  return {
    questions,
    topics,
    disciplines,
    customMaterials,
    isLoading,
    isSaving,
    error,
    clearError,
    reloadDatabase,
    migrateToFirestore,
    getStudyMaterial,
    updateStudyMaterial,
    resetStudyMaterial,
    clearAllStudyMaterials,
    hasCustomStudyMaterial,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    addTopic,
    updateTopic,
    deleteTopic,
    addDiscipline,
    updateDiscipline,
    deleteDiscipline,
    importQuestions,
    importStudyMaterials,
  };
};
