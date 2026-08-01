
import { useState, useEffect } from 'react';
import { Question, Topic, Discipline } from '../types';
import { MIGRATED_DISCIPLINES, MIGRATED_TOPICS, MIGRATED_QUESTIONS } from '../dataMigration';

const QUESTIONS_KEY = 'mestre_digital_questions';
const TOPICS_KEY = 'mestre_digital_topics';
const DISCIPLINES_KEY = 'mestre_digital_disciplines';

export const useDatabase = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);

  useEffect(() => {
    const storedQuestions = localStorage.getItem(QUESTIONS_KEY);
    const storedTopics = localStorage.getItem(TOPICS_KEY);
    const storedDisciplines = localStorage.getItem(DISCIPLINES_KEY);

    if (storedQuestions && storedTopics && storedDisciplines) {
      const parsedQuestions = JSON.parse(storedQuestions);
      const parsedTopics = JSON.parse(storedTopics);
      const parsedDisciplines = JSON.parse(storedDisciplines);

      // Check if all new topics exist
      const hasGestaoTopic = parsedTopics.some((t: Topic) => t.id === 't-qt-gestao');
      const hasFundamentosTopic = parsedTopics.some((t: Topic) => t.id === 't-qt-fundamentos');
      const hasEstrategiaTopic = parsedTopics.some((t: Topic) => t.id === 't-qt-estrategia');
      const hasNiveisTiposTopic = parsedTopics.some((t: Topic) => t.id === 't-qt-niveis-tipos');
      const hasTecnicasTesteTopic = parsedTopics.some((t: Topic) => t.id === 't-qt-tecnicas-teste');
      const hasAmbienteAutomacaoTopic = parsedTopics.some((t: Topic) => t.id === 't-qt-ambiente-automacao');
      const hasFrameworksQaTopic = parsedTopics.some((t: Topic) => t.id === 't-qt-frameworks');
      const hasHtml5Topic = parsedTopics.some((t: Topic) => t.id === 't-fe-html5');
      const hasCss3Topic = parsedTopics.some((t: Topic) => t.id === 't-fe-css3');
      const hasBootstrapTopic = parsedTopics.some((t: Topic) => t.id === 't-fe-bootstrap');
      const hasJavascriptTopic = parsedTopics.some((t: Topic) => t.id === 't-fe-javascript');
      const hasFrontEndDiscipline = parsedDisciplines.some((d: Discipline) => d.id === 'd-fe');
      const hasBackEndDiscipline = parsedDisciplines.some((d: Discipline) => d.id === 'd-be');
      const hasBeDeployTopic = parsedTopics.some((t: Topic) => t.id === 't-be-deploy');
      
      if (!hasGestaoTopic || !hasFundamentosTopic || !hasEstrategiaTopic || !hasNiveisTiposTopic || !hasTecnicasTesteTopic || !hasAmbienteAutomacaoTopic || !hasFrameworksQaTopic || !hasHtml5Topic || !hasCss3Topic || !hasBootstrapTopic || !hasJavascriptTopic || !hasFrontEndDiscipline || !hasBackEndDiscipline || !hasBeDeployTopic) {
        // Merge with new migrated data if missing
        const updatedDisciplines = [...parsedDisciplines, ...MIGRATED_DISCIPLINES.filter(md => !parsedDisciplines.some((pd: Discipline) => pd.id === md.id))];
        const updatedTopics = [...parsedTopics, ...MIGRATED_TOPICS.filter(mt => !parsedTopics.some((pt: Topic) => pt.id === mt.id))];
        const updatedQuestions = [...parsedQuestions, ...MIGRATED_QUESTIONS.filter(mq => !parsedQuestions.some((pq: Question) => pq.id === mq.id))];
        
        setDisciplines(updatedDisciplines);
        setTopics(updatedTopics);
        setQuestions(updatedQuestions);
        
        localStorage.setItem(DISCIPLINES_KEY, JSON.stringify(updatedDisciplines));
        localStorage.setItem(TOPICS_KEY, JSON.stringify(updatedTopics));
        localStorage.setItem(QUESTIONS_KEY, JSON.stringify(updatedQuestions));
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

  const addTopic = (topic: Topic) => saveTopics([...topics, topic]);
  const updateTopic = (updatedTopic: Topic) => {
    saveTopics(topics.map(t => t.id === updatedTopic.id ? updatedTopic : t));
  };
  const deleteTopic = (id: string) => {
    saveTopics(topics.filter(t => t.id !== id));
    saveQuestions(questions.filter(q => q.topicId !== id));
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
  };

  return {
    questions,
    topics,
    disciplines,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    addTopic,
    updateTopic,
    deleteTopic,
    addDiscipline,
    updateDiscipline,
    deleteDiscipline
  };
};
