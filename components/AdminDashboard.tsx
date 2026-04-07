
import React, { useState, useMemo } from 'react';
import { Question, Topic } from '../types';

interface AdminDashboardProps {
  isDarkMode: boolean;
  questions: Question[];
  topics: Topic[];
  onAddQuestion: (q: Question) => void;
  onUpdateQuestion: (q: Question) => void;
  onDeleteQuestion: (id: string) => void;
  onAddTopic: (t: Topic) => void;
  onUpdateTopic: (oldT: Topic, newT: Topic) => void;
  onDeleteTopic: (t: Topic) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isDarkMode,
  questions,
  topics,
  onAddQuestion,
  onUpdateQuestion,
  onDeleteQuestion,
  onAddTopic,
  onUpdateTopic,
  onDeleteTopic
}) => {
  const [activeTab, setActiveTab] = useState<'topics' | 'questions'>('topics');
  const [editingTopic, setEditingTopic] = useState<{ old: Topic, new: Topic } | null>(null);
  const [newTopicName, setNewTopicName] = useState('');
  
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [questionForm, setQuestionForm] = useState<Partial<Question>>({
    topic: topics[0] || '',
    question: '',
    options: ['', '', '', '', ''],
    correctAnswer: 0,
    explanation: ''
  });

  const handleTopicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicName.trim()) return;
    
    if (editingTopic) {
      onUpdateTopic(editingTopic.old, newTopicName.trim());
      setEditingTopic(null);
    } else {
      onAddTopic(newTopicName.trim());
    }
    setNewTopicName('');
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionForm.question || !questionForm.topic || questionForm.options?.some(o => !o)) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const questionData: Question = {
      id: editingQuestion?.id || `q-${Date.now()}`,
      topic: questionForm.topic as Topic,
      question: questionForm.question!,
      options: questionForm.options as string[],
      correctAnswer: questionForm.correctAnswer!,
      explanation: questionForm.explanation!
    };

    if (editingQuestion) {
      onUpdateQuestion(questionData);
      setEditingQuestion(null);
    } else {
      onAddQuestion(questionData);
    }

    setQuestionForm({
      topic: topics[0] || '',
      question: '',
      options: ['', '', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    });
  };

  const startEditQuestion = (q: Question) => {
    setEditingQuestion(q);
    setQuestionForm(q);
    setActiveTab('questions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h2 className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Painel do Professor
          </h2>
          <p className={`mt-2 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            Gerencie disciplinas e questões do banco de dados.
          </p>
        </div>

        <div className={`flex p-1 rounded-2xl ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'}`}>
          <button
            onClick={() => setActiveTab('topics')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'topics' ? 'bg-blue-600 text-white shadow-lg' : (isDarkMode ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-900')}`}
          >
            <i className="fas fa-layer-group mr-2"></i> Disciplinas
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'questions' ? 'bg-blue-600 text-white shadow-lg' : (isDarkMode ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-900')}`}
          >
            <i className="fas fa-question-circle mr-2"></i> Questões
          </button>
        </div>
      </div>

      {activeTab === 'topics' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form Disciplina */}
          <div className={`lg:col-span-1 p-8 rounded-3xl shadow-xl h-fit ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {editingTopic ? 'Editar Disciplina' : 'Nova Disciplina'}
            </h3>
            <form onSubmit={handleTopicSubmit} className="space-y-6">
              <div>
                <label className={`block text-sm font-bold mb-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                  Nome da Disciplina
                </label>
                <input
                  type="text"
                  value={newTopicName}
                  onChange={(e) => setNewTopicName(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none ${
                    isDarkMode 
                      ? 'bg-slate-700 border-slate-600 text-white focus:border-blue-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
                  }`}
                  placeholder="Ex: Engenharia de Software"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-grow bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all"
                >
                  {editingTopic ? 'Salvar' : 'Adicionar'}
                </button>
                {editingTopic && (
                  <button
                    type="button"
                    onClick={() => { setEditingTopic(null); setNewTopicName(''); }}
                    className={`px-4 py-3 rounded-xl font-bold transition-all ${isDarkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Lista Disciplinas */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Disciplinas Cadastradas ({topics.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topics.map(topic => (
                <div 
                  key={topic}
                  className={`p-6 rounded-2xl shadow-md flex items-center justify-between group transition-all ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}
                >
                  <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{topic}</span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => { setEditingTopic({ old: topic, new: topic }); setNewTopicName(topic); }}
                      className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center"
                      title="Editar"
                    >
                      <i className="fas fa-edit text-xs"></i>
                    </button>
                    <button
                      onClick={() => { if(confirm(`Excluir "${topic}" e todas as suas questões?`)) onDeleteTopic(topic); }}
                      className="w-8 h-8 rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center"
                      title="Excluir"
                    >
                      <i className="fas fa-trash text-xs"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Questão */}
          <div className={`lg:col-span-5 p-8 rounded-3xl shadow-xl h-fit sticky top-24 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {editingQuestion ? 'Editar Questão' : 'Nova Questão'}
            </h3>
            <form onSubmit={handleQuestionSubmit} className="space-y-6">
              <div>
                <label className={`block text-sm font-bold mb-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                  Disciplina
                </label>
                <select
                  value={questionForm.topic}
                  onChange={(e) => setQuestionForm({ ...questionForm, topic: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none ${
                    isDarkMode 
                      ? 'bg-slate-700 border-slate-600 text-white focus:border-blue-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
                  }`}
                >
                  {topics.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-bold mb-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                  Enunciado
                </label>
                <textarea
                  value={questionForm.question}
                  onChange={(e) => setQuestionForm({ ...questionForm, question: e.target.value })}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none resize-none ${
                    isDarkMode 
                      ? 'bg-slate-700 border-slate-600 text-white focus:border-blue-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
                  }`}
                  placeholder="Digite a pergunta..."
                />
              </div>

              <div className="space-y-4">
                <label className={`block text-sm font-bold ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                  Alternativas (Marque a correta)
                </label>
                {questionForm.options?.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="correctAnswer"
                      checked={questionForm.correctAnswer === idx}
                      onChange={() => setQuestionForm({ ...questionForm, correctAnswer: idx })}
                      className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => {
                        const newOpts = [...(questionForm.options || [])];
                        newOpts[idx] = e.target.value;
                        setQuestionForm({ ...questionForm, options: newOpts });
                      }}
                      className={`flex-grow px-4 py-2 rounded-xl border-2 transition-all outline-none ${
                        isDarkMode 
                          ? 'bg-slate-700 border-slate-600 text-white focus:border-blue-500' 
                          : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
                      }`}
                      placeholder={`Alternativa ${idx + 1}`}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className={`block text-sm font-bold mb-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                  Explicação
                </label>
                <textarea
                  value={questionForm.explanation}
                  onChange={(e) => setQuestionForm({ ...questionForm, explanation: e.target.value })}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none resize-none ${
                    isDarkMode 
                      ? 'bg-slate-700 border-slate-600 text-white focus:border-blue-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
                  }`}
                  placeholder="Por que esta é a resposta correta?"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-grow bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all"
                >
                  {editingQuestion ? 'Salvar Alterações' : 'Criar Questão'}
                </button>
                {editingQuestion && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingQuestion(null);
                      setQuestionForm({
                        topic: topics[0] || '',
                        question: '',
                        options: ['', '', '', '', ''],
                        correctAnswer: 0,
                        explanation: ''
                      });
                    }}
                    className={`px-6 py-4 rounded-xl font-bold transition-all ${isDarkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Lista Questões */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Banco de Questões ({questions.length})
            </h3>
            <div className="space-y-4">
              {questions.slice().reverse().map(q => (
                <div 
                  key={q.id}
                  className={`p-6 rounded-3xl shadow-md border-l-4 border-blue-500 transition-all ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-black uppercase tracking-wider">
                      {q.topic}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditQuestion(q)}
                        className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center"
                      >
                        <i className="fas fa-edit text-xs"></i>
                      </button>
                      <button
                        onClick={() => { if(confirm('Excluir esta questão?')) onDeleteQuestion(q.id); }}
                        className="w-8 h-8 rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center"
                      >
                        <i className="fas fa-trash text-xs"></i>
                      </button>
                    </div>
                  </div>
                  <h4 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {q.question}
                  </h4>
                  <div className="space-y-2">
                    {q.options.map((opt, i) => (
                      <div key={i} className={`text-sm p-2 rounded-lg ${i === q.correctAnswer ? 'bg-green-100 text-green-700 font-bold' : (isDarkMode ? 'text-slate-400' : 'text-gray-500')}`}>
                        {i === q.correctAnswer && <i className="fas fa-check mr-2"></i>}
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
