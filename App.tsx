
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import QuizCard from './components/QuizCard';
import ExamBuilder from './components/ExamBuilder';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import StudyMaterialView from './components/StudyMaterialView';
import { useDatabase } from './hooks/useDatabase';
import { Topic, QuizState, Question } from './types';
import { getStudyMaterialByTopic } from './src/data/studyMaterials';

export const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const DEFAULT_DISCIPLINE_MAPPING: Record<string, { topics: string[], icon: string, description: string, color: string }> = {
  'Arquitetura de Software': {
    topics: [
      'Design Patterns', 
      'DDD', 
      'Arquitetura Monolítica', 
      'Microsserviços', 
      'Padrão MVC', 
      'Frameworks', 
      'Arquitetura em Camadas', 
      'Refatoração'
    ],
    icon: 'fas fa-sitemap',
    description: 'Um guia completo sobre padrões de projeto, estilos arquiteturais, DDD e as melhores práticas de engenharia de software.',
    color: 'bg-blue-100 text-blue-600'
  },
  'Qualidade e Teste de Software': {
    topics: ['Cenários e Casos de Teste', 'Aula 02 - Gestão', 'Fundamentos e Modelo V', 'Aula 04 - Estratégia e Táticas', 'Aula 05 — Níveis & Tipos de Testes de Software', 'Aula 06: Técnicas de Teste de Software', 'Aula 07: Ambiente de Testes e Automação', 'Aula 08: Frameworks'],
    icon: 'fas fa-vial',
    description: 'Aprenda sobre garantia de qualidade, elaboração de cenários e casos de teste para sistemas robustos.',
    color: 'bg-green-100 text-green-600'
  },
  'Desenvolvimento Front End': {
    topics: ['HTML5', 'CSS3', 'Bootstrap', 'Javascript'],
    icon: 'fas fa-code',
    description: 'Aprenda sobre tecnologias web, frameworks de interface, CSS e boas práticas de desenvolvimento front-end.',
    color: 'bg-indigo-100 text-indigo-600'
  },
  'Programação Back End': {
    topics: [
      'JavaScript Back-End',
      'Node.js & NPM',
      'Express.js & APIs',
      'Autenticação & Segurança',
      'Microsserviços',
      'TDD & Testes',
      'Docker',
      'Kubernetes',
      'Streams & Eventos',
      'Deploy & Debugging'
    ],
    icon: 'fas fa-server',
    description: 'Aprenda sobre Node.js, Express, bancos de dados, microsserviços, conteinerização, segurança e deploy.',
    color: 'bg-purple-100 text-purple-600'
  }
};

const App: React.FC = () => {
  const { 
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
  } = useDatabase();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [view, setView] = useState<'quiz' | 'exam-builder' | 'admin' | 'login'>('quiz');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<string | null>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [state, setState] = useState<QuizState>({
    currentTopicId: null,
    currentQuestionIndex: 0,
    score: 0,
    userAnswers: {},
    isFinished: false,
  });

  const [selectedForExam, setSelectedForExam] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [activeStudyTopic, setActiveStudyTopic] = useState<Topic | null>(null);
  const [showQuizStudyMaterial, setShowQuizStudyMaterial] = useState(false);

  // Question timer settings
  const [isTimerEnabled, setIsTimerEnabled] = useState(false);
  const [timeLimit, setTimeLimit] = useState(30);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const currentQuestion = shuffledQuestions[state.currentQuestionIndex];

  const handleTimeout = () => {
    if (showExplanation) return;
    setState(prev => ({
      ...prev,
      userAnswers: { ...prev.userAnswers, [currentQuestion.id]: -1 }
    }));
    setShowExplanation(true);
  };

  const handleStartQuiz = (topicId: string) => {
    const topicQuestions = questions.filter(q => q.topicId === topicId);
    if (topicQuestions.length === 0) {
      alert('Este tópico ainda não possui questões.');
      return;
    }

    const processedQuestions = shuffleArray(topicQuestions).map(q => {
      const originalCorrectOption = q.options[q.correctAnswer];
      const newOptions = shuffleArray(q.options);
      const newCorrectIndex = newOptions.indexOf(originalCorrectOption);
      return {
        ...q,
        options: newOptions,
        correctAnswer: newCorrectIndex
      };
    });

    setShuffledQuestions(processedQuestions);
    setState({
      currentTopicId: topicId,
      currentQuestionIndex: 0,
      score: 0,
      userAnswers: {},
      isFinished: false,
    });
    setShowExplanation(false);
  };

  const handleSelectOption = (index: number) => {
    if (showExplanation) return;
    const isCorrect = index === currentQuestion.correctAnswer;
    setState(prev => ({
      ...prev,
      userAnswers: { ...prev.userAnswers, [currentQuestion.id]: index },
      score: isCorrect ? prev.score + 1 : prev.score
    }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (state.currentQuestionIndex < shuffledQuestions.length - 1) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
      setShowExplanation(false);
    } else {
      setState(prev => ({
        ...prev,
        isFinished: true
      }));
    }
  };

  const handleReset = () => {
    setState({
      currentTopicId: null,
      currentQuestionIndex: 0,
      score: 0,
      userAnswers: {},
      isFinished: false,
    });
    setShuffledQuestions([]);
    setSelectedDisciplineId(null);
  };

  const handleBackToTopics = () => {
    setState({
      currentTopicId: null,
      currentQuestionIndex: 0,
      score: 0,
      userAnswers: {},
      isFinished: false,
    });
    setShuffledQuestions([]);
  };

  const toggleSelectForExam = (id: string) => {
    setSelectedForExam(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectMultiple = (ids: string[]) => {
    setSelectedForExam(prev => {
      const newIds = ids.filter(id => !prev.includes(id));
      return [...prev, ...newIds];
    });
  };

  const handleClearSelection = () => {
    setSelectedForExam([]);
  };

  const handleLogin = (password: string) => {
    if (password === 'senha123') {
      setIsLoggedIn(true);
      setView('admin');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setView('quiz');
  };

  const renderTopicSelection = () => {
    if (!selectedDisciplineId) {
      return (
        <div className="max-w-5xl mx-auto px-4 py-12 text-center animate-in fade-in duration-700">
          <h2 className={`text-3xl md:text-4xl font-extrabold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Mestre Digital
          </h2>
          <p className={`mb-12 max-w-2xl mx-auto ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
            Escolha uma disciplina para começar sua jornada de aprendizado.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {disciplines.map(d => (
              <button
                key={d.id}
                onClick={() => setSelectedDisciplineId(d.id)}
                className={`p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-b-4 border-transparent hover:border-blue-500 text-left group
                  ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-gray-800'}`}
              >
                <h3 className="text-2xl font-bold mb-3">{d.name}</h3>
                <div className="flex items-center text-blue-500 font-semibold group-hover:translate-x-1 transition-transform">
                  Ver Tópicos <i className="fas fa-arrow-right ml-2 text-xs"></i>
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    const discipline = disciplines.find(d => d.id === selectedDisciplineId);
    const disciplineTopics = topics.filter(t => t.disciplineId === selectedDisciplineId);

    if (activeStudyTopic) {
      const material = getStudyMaterialByTopic(activeStudyTopic);
      return (
        <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-300">
          <div className="mb-6">
            <button
              onClick={() => setActiveStudyTopic(null)}
              className={`flex items-center gap-2 font-bold transition-colors ${
                isDarkMode ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <i className="fas fa-arrow-left"></i> Voltar para Lista de Tópicos
            </button>
          </div>
          <StudyMaterialView
            material={material}
            isDarkMode={isDarkMode}
            onStartQuiz={() => {
              const topicToStart = activeStudyTopic;
              setActiveStudyTopic(null);
              handleStartQuiz(topicToStart.id);
            }}
            onClose={() => setActiveStudyTopic(null)}
          />
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto px-4 py-12 animate-in slide-in-from-right duration-500">
        <div className="flex items-center mb-8">
          <button
            onClick={() => setSelectedDisciplineId(null)}
            className={`flex items-center gap-2 font-bold transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
          >
            <i className="fas fa-arrow-left"></i> Voltar para Disciplinas
          </button>
        </div>

        <div className="text-center mb-8">
          <h2 className={`text-3xl font-extrabold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {discipline?.name}
          </h2>
          <p className={`${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            Acesse o Material de Estudo Teórico ou inicie diretamente o Simulado de Questões.
          </p>
        </div>

        {/* Global Timer Settings Banner */}
        <div className={`mb-8 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 border transition-all ${
          isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              isTimerEnabled ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400' : 'bg-gray-100 text-gray-400 dark:bg-slate-700'
            }`}>
              <i className={`fas fa-stopwatch text-lg ${isTimerEnabled ? 'animate-pulse text-blue-500' : ''}`}></i>
            </div>
            <div>
              <h4 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Cronômetro por Questão
              </h4>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                {isTimerEnabled ? `Tempo limite de ${timeLimit}s por questão` : 'Sem limite de tempo por questão'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isTimerEnabled && (
              <select
                value={timeLimit}
                onChange={(e) => setTimeLimit(Number(e.target.value))}
                aria-label="Selecionar tempo limite por questão"
                className={`text-xs font-bold px-3 py-2 rounded-xl border outline-none cursor-pointer transition-colors ${
                  isDarkMode ? 'bg-slate-700 text-slate-200 border-slate-600' : 'bg-gray-50 text-gray-700 border-gray-200'
                }`}
              >
                <option value={15}>15s por questão</option>
                <option value={30}>30s por questão</option>
                <option value={45}>45s por questão</option>
                <option value={60}>60s por questão</option>
              </select>
            )}

            <button
              onClick={() => setIsTimerEnabled(!isTimerEnabled)}
              type="button"
              className={`px-4 py-2 rounded-xl font-bold text-xs transition-all shadow-sm flex items-center gap-2 ${
                isTimerEnabled
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : isDarkMode
                  ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <i className={`fas ${isTimerEnabled ? 'fa-check-circle' : 'fa-clock'}`}></i>
              {isTimerEnabled ? 'Ativado' : 'Ativar Cronômetro'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {disciplineTopics.map(topic => {
            const topicQuestions = questions.filter(q => q.topicId === topic.id);
            return (
              <div
                key={topic.id}
                className={`p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-100 text-gray-800'
                } flex flex-col justify-between gap-4`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                      isDarkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-50 text-blue-700'
                    }`}>
                      {topicQuestions.length} {topicQuestions.length === 1 ? 'questão' : 'questões'}
                    </span>
                    <h3 className="text-lg font-bold mt-2">{topic.name}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-gray-100 dark:border-slate-700">
                  <button
                    onClick={() => setActiveStudyTopic(topic)}
                    type="button"
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      isDarkMode
                        ? 'bg-slate-700/80 text-blue-300 hover:bg-slate-700 hover:text-blue-200 border border-slate-600'
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/60'
                    }`}
                  >
                    <i className="fas fa-book-open"></i> Material de Estudo
                  </button>

                  <button
                    onClick={() => handleStartQuiz(topic.id)}
                    type="button"
                    className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-play"></i> Iniciar Simulado
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderQuiz = () => {
    const progress = ((state.currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
    const currentTopicObj = topics.find(t => t.id === state.currentTopicId);

    return (
      <div className="max-w-3xl mx-auto px-4 py-12 relative">
        <div className="mb-8">
          <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
            <button
              onClick={handleBackToTopics}
              className={`text-sm font-bold flex items-center gap-2 ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <i className="fas fa-times"></i> Sair do Quiz
            </button>

            {currentTopicObj && (
              <button
                onClick={() => setShowQuizStudyMaterial(true)}
                type="button"
                className={`text-xs font-bold px-3 py-1.5 rounded-xl border flex items-center gap-2 transition-all ${
                  isDarkMode 
                    ? 'bg-slate-800 text-blue-300 border-slate-700 hover:bg-slate-700' 
                    : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                }`}
              >
                <i className="fas fa-book-open"></i>
                <span>Guia Teórico do Tópico</span>
              </button>
            )}

            <div className="flex items-center gap-3">
              <span className={`text-sm font-semibold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                Questão {state.currentQuestionIndex + 1} de {shuffledQuestions.length}
              </span>
              <span className="text-sm font-bold text-blue-500">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
          <div className={`w-full rounded-full h-3 overflow-hidden shadow-inner ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
            <div className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out shadow-sm" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Modal Overlay for Study Material inside Quiz */}
        {showQuizStudyMaterial && currentTopicObj && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
            <div className="w-full max-w-4xl my-8">
              <StudyMaterialView
                material={getStudyMaterialByTopic(currentTopicObj)}
                isDarkMode={isDarkMode}
                onClose={() => setShowQuizStudyMaterial(false)}
              />
            </div>
          </div>
        )}

        {currentQuestion && (
          <QuizCard 
            question={currentQuestion}
            selectedOption={state.userAnswers[currentQuestion.id] ?? null}
            onSelect={handleSelectOption}
            showCorrect={showExplanation}
            isDarkMode={isDarkMode}
            isTimerEnabled={isTimerEnabled}
            timeLimit={timeLimit}
            onTimeout={handleTimeout}
            onToggleTimer={() => setIsTimerEnabled(!isTimerEnabled)}
            onChangeTimeLimit={(limit) => setTimeLimit(limit)}
          />
        )}
        <div className="mt-8 flex justify-end">
          {showExplanation && (
            <button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold shadow-lg transition-all transform active:scale-95 flex items-center"
            >
              {state.currentQuestionIndex < shuffledQuestions.length - 1 ? 'Próxima Questão' : 'Ver Resultados'}
              <i className="fas fa-arrow-right ml-3"></i>
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const total = shuffledQuestions.length;
    const percentage = Math.round((state.score / total) * 100);
    
    let message = "";
    let icon = "";
    let iconColor = "";

    if (percentage === 100) {
      message = "Arquiteto Sênior! Você domina completamente estes conceitos.";
      icon = "fa-trophy";
      iconColor = "text-yellow-500";
    } else if (percentage >= 70) {
      message = "Excelente nível técnico! Você está no caminho certo.";
      icon = "fa-medal";
      iconColor = "text-blue-500";
    } else if (percentage >= 50) {
      message = "Bom conhecimento base. Continue estudando para atingir a senioridade.";
      icon = "fa-check-double";
      iconColor = "text-green-500";
    } else {
      message = "A base é fundamental. Revise os conceitos teóricos e tente novamente.";
      icon = "fa-book-reader";
      iconColor = "text-orange-500";
    }

    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center animate-in fade-in zoom-in duration-500">
        <div className={`mb-8 p-12 rounded-3xl shadow-2xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
          <div className={`text-6xl mb-6 ${iconColor}`}>
            <i className={`fas ${icon}`}></i>
          </div>
          <h2 className={`text-4xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {percentage}%
          </h2>
          <p className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
            Você acertou {state.score} de {total} questões
          </p>
          <p className={`text-lg leading-relaxed mb-8 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            {message}
          </p>
          
          <button
            onClick={handleBackToTopics}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-3"
          >
            <i className="fas fa-redo"></i> Voltar para Tópicos
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'} pb-12`}>
      <Header 
        onHome={handleReset} 
        isDarkMode={isDarkMode} 
        onToggleDarkMode={toggleDarkMode} 
        currentView={view}
        onSetView={setView}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      
      <main className="flex-grow flex flex-col">
        {view === 'quiz' && (
          <>
            {!state.currentTopicId && renderTopicSelection()}
            {state.currentTopicId && !state.isFinished && renderQuiz()}
            {state.isFinished && renderResults()}
          </>
        )}
        
        {view === 'login' && (
          <Login onLogin={handleLogin} isDarkMode={isDarkMode} />
        )}

        {view === 'exam-builder' && (
          isLoggedIn ? (
            <ExamBuilder 
              isDarkMode={isDarkMode} 
              selectedIds={selectedForExam}
              onToggleSelection={toggleSelectForExam}
              onSelectMultiple={handleSelectMultiple}
              onClearSelection={handleClearSelection}
              questions={questions}
              topics={topics}
            />
          ) : (
            <Login onLogin={handleLogin} isDarkMode={isDarkMode} />
          )
        )}

        {view === 'admin' && (
          isLoggedIn ? (
            <AdminDashboard
              isDarkMode={isDarkMode}
              questions={questions}
              topics={topics}
              disciplines={disciplines}
              onAddQuestion={addQuestion}
              onUpdateQuestion={updateQuestion}
              onDeleteQuestion={deleteQuestion}
              onAddTopic={addTopic}
              onUpdateTopic={updateTopic}
              onDeleteTopic={deleteTopic}
              onAddDiscipline={addDiscipline}
              onUpdateDiscipline={updateDiscipline}
              onDeleteDiscipline={deleteDiscipline}
            />
          ) : (
            <Login onLogin={handleLogin} isDarkMode={isDarkMode} />
          )
        )}
      </main>

      <footer className={`mt-auto py-8 text-center text-sm ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>
        <p>© 2024 Arquiteto Sênior: Guia Teórico de Software</p>
      </footer>
    </div>
  );
};

export default App;
