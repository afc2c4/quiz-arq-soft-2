
import { useState, useEffect } from 'react';
import { Question, Topic, Discipline, StudyMaterial } from '../types';
import { MIGRATED_DISCIPLINES, MIGRATED_TOPICS, MIGRATED_QUESTIONS } from '../dataMigration';
import { getStudyMaterialByTopic, createEmptyStudyMaterial } from '../src/data/studyMaterials';

const QUESTIONS_KEY = 'mestre_digital_questions';
const TOPICS_KEY = 'mestre_digital_topics';
const DISCIPLINES_KEY = 'mestre_digital_disciplines';
const STUDY_MATERIALS_KEY = 'mestre_digital_study_materials';
const MIGRATION_DONE_KEY = 'mestre_digital_migrated_v3';

export const useDatabase = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [customMaterials, setCustomMaterials] = useState<Record<string, StudyMaterial>>({});

  useEffect(() => {
    const storedQuestions = localStorage.getItem(QUESTIONS_KEY);
    const storedTopics = localStorage.getItem(TOPICS_KEY);
    const storedDisciplines = localStorage.getItem(DISCIPLINES_KEY);
    const storedMaterials = localStorage.getItem(STUDY_MATERIALS_KEY);

    if (storedMaterials) {
      try {
        const parsed = JSON.parse(storedMaterials);
        // Limpa materiais que tenham sido gerados com o mock genérico antigo (processTopicLogic)
        let changed = false;
        Object.keys(parsed).forEach(k => {
          if (parsed[k]?.codeSnippet?.code?.includes('processTopicLogic')) {
            parsed[k] = createEmptyStudyMaterial({ id: k, name: parsed[k].topicName || 'Tópico', disciplineId: '' });
            changed = true;
          }
        });
        if (changed) {
          localStorage.setItem(STUDY_MATERIALS_KEY, JSON.stringify(parsed));
        }
        setCustomMaterials(parsed);
      } catch (e) {
        console.error('Erro ao ler materiais customizados do localStorage:', e);
      }
    }

    if (storedQuestions && storedTopics && storedDisciplines) {
      const parsedQuestions = JSON.parse(storedQuestions);
      const parsedTopics = JSON.parse(storedTopics);
      const parsedDisciplines = JSON.parse(storedDisciplines);

      const hasRunMigration = localStorage.getItem(MIGRATION_DONE_KEY);
      
      if (!hasRunMigration) {
        // Merge with new migrated data once
        const updatedDisciplines = [...parsedDisciplines, ...MIGRATED_DISCIPLINES.filter(md => !parsedDisciplines.some((pd: Discipline) => pd.id === md.id))];
        const updatedTopics = [...parsedTopics, ...MIGRATED_TOPICS.filter(mt => !parsedTopics.some((pt: Topic) => pt.id === mt.id))];
        const updatedQuestions = [...parsedQuestions, ...MIGRATED_QUESTIONS.filter(mq => !parsedQuestions.some((pq: Question) => pq.id === mq.id))];
        
        setDisciplines(updatedDisciplines);
        setTopics(updatedTopics);
        setQuestions(updatedQuestions);
        
        localStorage.setItem(DISCIPLINES_KEY, JSON.stringify(updatedDisciplines));
        localStorage.setItem(TOPICS_KEY, JSON.stringify(updatedTopics));
        localStorage.setItem(QUESTIONS_KEY, JSON.stringify(updatedQuestions));
        localStorage.setItem(MIGRATION_DONE_KEY, 'true');
      } else {
        setQuestions(parsedQuestions);
        setTopics(parsedTopics);
        setDisciplines(parsedDisciplines);
      }
    } else {
      // Seed with migrated data
      setDisciplines(MIGRATED_DISCIPLINES);
      setTopics(MIGRATED_TOPICS);
      setQuestions(MIGRATED_QUESTIONS);
      
      localStorage.setItem(DISCIPLINES_KEY, JSON.stringify(MIGRATED_DISCIPLINES));
      localStorage.setItem(TOPICS_KEY, JSON.stringify(MIGRATED_TOPICS));
      localStorage.setItem(QUESTIONS_KEY, JSON.stringify(MIGRATED_QUESTIONS));
      localStorage.setItem(MIGRATION_DONE_KEY, 'true');
    }
  }, []);

  const saveQuestions = (newQuestions: Question[]) => {
    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(newQuestions));
    setQuestions(newQuestions);
  };

  const saveTopics = (newTopics: Topic[]) => {
    localStorage.setItem(TOPICS_KEY, JSON.stringify(newTopics));
    setTopics(newTopics);
  };

  const saveDisciplines = (newDisciplines: Discipline[]) => {
    localStorage.setItem(DISCIPLINES_KEY, JSON.stringify(newDisciplines));
    setDisciplines(newDisciplines);
  };

  const addQuestion = (question: Question) => saveQuestions([...questions, question]);
  const updateQuestion = (updatedQuestion: Question) => saveQuestions(questions.map(q => q.id === updatedQuestion.id ? updatedQuestion : q));
  const deleteQuestion = (id: string) => saveQuestions(questions.filter(q => q.id !== id));

  const addTopic = (topic: Topic) => {
    saveTopics([...topics, topic]);
    // Inicializa explicitamente o novo tópico com uma apostila vazia pronta para edição em Markdown
    const emptyMaterial = createEmptyStudyMaterial(topic);
    const updated = {
      ...customMaterials,
      [topic.id]: emptyMaterial
    };
    saveCustomMaterials(updated);
  };
  const updateTopic = (updatedTopic: Topic) => {
    saveTopics(topics.map(t => t.id === updatedTopic.id ? updatedTopic : t));
  };
  const deleteTopic = (id: string) => {
    saveTopics(topics.filter(t => t.id !== id));
    saveQuestions(questions.filter(q => q.topicId !== id));
    resetStudyMaterial(id);
  };

  const addDiscipline = (discipline: Discipline) => saveDisciplines([...disciplines, discipline]);
  const updateDiscipline = (updatedDiscipline: Discipline) => {
    saveDisciplines(disciplines.map(d => d.id === updatedDiscipline.id ? updatedDiscipline : d));
  };
  const deleteDiscipline = (id: string) => {
    saveDisciplines(disciplines.filter(d => d.id !== id));
    const topicsToDelete = topics.filter(t => t.disciplineId === id);
    saveTopics(topics.filter(t => t.disciplineId !== id));
    const topicIdsToDelete = topicsToDelete.map(t => t.id);
    saveQuestions(questions.filter(q => !topicIdsToDelete.includes(q.topicId)));
    
    // Clean up study materials for deleted topics
    const updatedMaterials = { ...customMaterials };
    let hasChanges = false;
    topicIdsToDelete.forEach(tId => {
      if (updatedMaterials[tId]) {
        delete updatedMaterials[tId];
        hasChanges = true;
      }
    });
    if (hasChanges) {
      saveCustomMaterials(updatedMaterials);
    }
  };

  const importQuestions = (newQuestions: Question[]) => {
    // Merge or replace by question ID
    const currentMap = new Map(questions.map(q => [q.id, q]));
    newQuestions.forEach(q => {
      currentMap.set(q.id, q);
    });
    saveQuestions(Array.from(currentMap.values()));
  };

  const importStudyMaterials = (materials: Record<string, StudyMaterial>) => {
    const updated = {
      ...customMaterials,
      ...materials
    };
    saveCustomMaterials(updated);
  };

  const saveCustomMaterials = (updated: Record<string, StudyMaterial>) => {
    localStorage.setItem(STUDY_MATERIALS_KEY, JSON.stringify(updated));
    setCustomMaterials(updated);
  };

  const updateStudyMaterial = (material: StudyMaterial) => {
    const updated = {
      ...customMaterials,
      [material.topicId]: material
    };
    saveCustomMaterials(updated);
  };

  const resetStudyMaterial = (topicId: string) => {
    const updated = { ...customMaterials };
    delete updated[topicId];
    saveCustomMaterials(updated);
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

  return {
    questions,
    topics,
    disciplines,
    customMaterials,
    getStudyMaterial,
    updateStudyMaterial,
    resetStudyMaterial,
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
    importStudyMaterials
  };
};
