
import { useState, useEffect } from 'react';
import { Question, Topic } from '../types';
import { QUIZ_DATABASE } from '../constants';

const DB_KEY = 'mestre_digital_db';
const TOPICS_KEY = 'mestre_digital_topics';

export const useDatabase = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    const storedQuestions = localStorage.getItem(DB_KEY);
    const storedTopics = localStorage.getItem(TOPICS_KEY);

    if (!storedQuestions) {
      localStorage.setItem(DB_KEY, JSON.stringify(QUIZ_DATABASE));
      setQuestions(QUIZ_DATABASE);
    } else {
      setQuestions(JSON.parse(storedQuestions));
    }

    if (!storedTopics) {
      const initialTopics = Array.from(new Set(QUIZ_DATABASE.map(q => q.topic)));
      localStorage.setItem(TOPICS_KEY, JSON.stringify(initialTopics));
      setTopics(initialTopics);
    } else {
      setTopics(JSON.parse(storedTopics));
    }
  }, []);

  const saveQuestions = (newQuestions: Question[]) => {
    localStorage.setItem(DB_KEY, JSON.stringify(newQuestions));
    setQuestions(newQuestions);
  };

  const saveTopics = (newTopics: Topic[]) => {
    localStorage.setItem(TOPICS_KEY, JSON.stringify(newTopics));
    setTopics(newTopics);
  };

  const addQuestion = (question: Question) => {
    const newQuestions = [...questions, question];
    saveQuestions(newQuestions);
  };

  const updateQuestion = (updatedQuestion: Question) => {
    const newQuestions = questions.map(q => q.id === updatedQuestion.id ? updatedQuestion : q);
    saveQuestions(newQuestions);
  };

  const deleteQuestion = (id: string) => {
    const newQuestions = questions.filter(q => q.id !== id);
    saveQuestions(newQuestions);
  };

  const addTopic = (topic: Topic) => {
    if (!topics.includes(topic)) {
      const newTopics = [...topics, topic];
      saveTopics(newTopics);
    }
  };

  const updateTopic = (oldTopic: Topic, newTopic: Topic) => {
    const newTopics = topics.map(t => t === oldTopic ? newTopic : t);
    saveTopics(newTopics);
    
    // Update all questions that had the old topic
    const newQuestions = questions.map(q => q.topic === oldTopic ? { ...q, topic: newTopic } : q);
    saveQuestions(newQuestions);
  };

  const deleteTopic = (topic: Topic) => {
    const newTopics = topics.filter(t => t !== topic);
    saveTopics(newTopics);
    
    // Delete all questions associated with this topic
    const newQuestions = questions.filter(q => q.topic !== topic);
    saveQuestions(newQuestions);
  };

  return {
    questions,
    topics,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    addTopic,
    updateTopic,
    deleteTopic
  };
};
