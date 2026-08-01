import React, { useState, useEffect } from 'react';
import { Question } from '../types';

interface QuizCardProps {
  question: Question;
  selectedOption: number | null;
  onSelect: (index: number) => void;
  showCorrect: boolean;
  isDarkMode: boolean;
  isTimerEnabled?: boolean;
  timeLimit?: number;
  onTimeout?: () => void;
  onToggleTimer?: () => void;
  onChangeTimeLimit?: (limit: number) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ 
  question, 
  selectedOption, 
  onSelect, 
  showCorrect,
  isDarkMode,
  isTimerEnabled = false,
  timeLimit = 30,
  onTimeout,
  onToggleTimer,
  onChangeTimeLimit
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(timeLimit);

  // Reset timer when question or timeLimit changes
  useEffect(() => {
    setTimeLeft(timeLimit);
  }, [question.id, timeLimit]);

  // Countdown timer logic
  useEffect(() => {
    if (!isTimerEnabled || showCorrect) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          if (onTimeout) onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerEnabled, showCorrect, question.id, timeLimit, onTimeout]);

  const progressPercentage = Math.max(0, (timeLeft / timeLimit) * 100);

  return (
    <div className={`rounded-2xl shadow-xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 transition-colors relative overflow-hidden
      ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'}`}>
      
      {/* Top bar with Topic and Timer settings */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-slate-700">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider
          ${isDarkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
          {question.topic}
        </span>

        {/* Timer Control Bar */}
        <div className="flex items-center gap-2">
          {onToggleTimer && (
            <button
              onClick={onToggleTimer}
              type="button"
              title={isTimerEnabled ? "Desativar cronômetro" : "Ativar cronômetro por questão"}
              className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-xl transition-all border ${
                isTimerEnabled
                  ? isDarkMode 
                    ? 'bg-blue-900/40 text-blue-300 border-blue-500/50 shadow-sm' 
                    : 'bg-blue-50 text-blue-800 border-blue-300 shadow-sm'
                  : isDarkMode 
                    ? 'bg-slate-700/60 text-slate-400 border-slate-600 hover:text-slate-200' 
                    : 'bg-gray-100 text-gray-500 border-gray-200 hover:text-gray-800'
              }`}
            >
              <i className={`fas ${isTimerEnabled ? 'fa-stopwatch text-blue-500 animate-pulse' : 'fa-clock'}`}></i>
              <span>{isTimerEnabled ? 'Cronômetro Ativo' : 'Sem Cronômetro'}</span>
            </button>
          )}

          {isTimerEnabled && onChangeTimeLimit && (
            <div className="flex items-center gap-1.5">
              <select
                value={timeLimit}
                onChange={(e) => onChangeTimeLimit(Number(e.target.value))}
                disabled={showCorrect}
                aria-label="Tempo limite por questão"
                className={`text-xs font-bold px-2 py-1.5 rounded-xl border outline-none cursor-pointer transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-700 text-slate-200 border-slate-600 focus:border-blue-500' 
                    : 'bg-white text-gray-700 border-gray-200 focus:border-blue-500'
                }`}
              >
                <option value={15}>15s</option>
                <option value={30}>30s</option>
                <option value={45}>45s</option>
                <option value={60}>60s</option>
              </select>

              {/* Countdown badge */}
              {!showCorrect && (
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  timeLeft <= 5
                    ? 'bg-red-500 text-white animate-bounce shadow-md'
                    : timeLeft <= 10
                    ? 'bg-amber-500 text-white'
                    : isDarkMode ? 'bg-slate-700 text-blue-400' : 'bg-blue-50 text-blue-600'
                }`}>
                  <i className="fas fa-hourglass-half"></i>
                  <span>{timeLeft}s</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Visual Timer Progress Bar */}
      {isTimerEnabled && !showCorrect && (
        <div className="w-full bg-gray-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden mb-6 -mt-2">
          <div
            className={`h-full transition-all duration-1000 ease-linear rounded-full ${
              timeLeft <= 5
                ? 'bg-red-500 shadow-sm shadow-red-500'
                : timeLeft <= 10
                ? 'bg-amber-500'
                : 'bg-blue-600'
            }`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      )}

      {/* Question Header */}
      <div className="mb-6">
        <h2 className={`text-xl md:text-2xl font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          {question.question}
        </h2>
      </div>

      {/* Options List */}
      <div className="space-y-3">
        {question.options.map((option, index) => {
          let optionStyles = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center group ";
          
          if (showCorrect) {
            if (index === question.correctAnswer) {
              optionStyles += isDarkMode 
                ? "border-green-600 bg-green-900/20 text-green-400 font-semibold" 
                : "border-green-500 bg-green-50 text-green-900 font-semibold";
            } else if (index === selectedOption) {
              optionStyles += isDarkMode
                ? "border-red-600 bg-red-900/20 text-red-400"
                : "border-red-500 bg-red-50 text-red-900";
            } else {
              optionStyles += isDarkMode
                ? "border-slate-700 opacity-40"
                : "border-gray-100 opacity-50";
            }
          } else {
            if (selectedOption === index) {
              optionStyles += isDarkMode
                ? "border-blue-500 bg-blue-900/30 text-blue-200 shadow-md"
                : "border-blue-500 bg-blue-50 text-blue-900 shadow-md";
            } else {
              optionStyles += isDarkMode
                ? "border-slate-700 hover:border-blue-500/50 hover:bg-slate-700/50"
                : "border-gray-100 hover:border-blue-200 hover:bg-gray-50";
            }
          }

          return (
            <button
              key={index}
              disabled={showCorrect}
              onClick={() => onSelect(index)}
              className={optionStyles}
            >
              <span className={`w-8 h-8 flex items-center justify-center rounded-full mr-4 font-bold text-sm transition-colors
                ${selectedOption === index ? 'bg-blue-600 text-white' : 
                  isDarkMode ? 'bg-slate-700 text-slate-400 group-hover:bg-slate-600 group-hover:text-blue-300' : 'bg-gray-200 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'}`}>
                {String.fromCharCode(65 + index)}
              </span>
              <span className="flex-1">{option}</span>
              {showCorrect && index === question.correctAnswer && (
                <i className="fas fa-check-circle text-green-500 ml-2 text-lg"></i>
              )}
              {showCorrect && index === selectedOption && index !== question.correctAnswer && (
                <i className="fas fa-times-circle text-red-500 ml-2 text-lg"></i>
              )}
            </button>
          );
        })}
      </div>

      {/* Timeout Alert Banner */}
      {showCorrect && selectedOption === -1 && (
        <div className={`mt-6 p-4 rounded-xl border flex items-center gap-3 animate-in fade-in duration-300
          ${isDarkMode ? 'bg-red-900/20 border-red-800/50 text-red-300' : 'bg-red-50 border-red-200 text-red-800'}`}>
          <i className="fas fa-exclamation-circle text-xl text-red-500 animate-pulse"></i>
          <div>
            <h4 className="font-bold text-sm md:text-base">Tempo Esgotado!</h4>
            <p className="text-xs md:text-sm">Você não respondeu dentro do tempo limite de {timeLimit} segundos.</p>
          </div>
        </div>
      )}

      {/* Explanation Box */}
      {showCorrect && (
        <div className={`mt-6 p-4 rounded-xl border animate-in zoom-in duration-300
          ${isDarkMode ? 'bg-blue-900/20 border-blue-900/50' : 'bg-blue-50 border-blue-100'}`}>
          <h4 className={`font-bold flex items-center mb-1 ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>
            <i className="fas fa-info-circle mr-2"></i> Explicação:
          </h4>
          <p className={`text-sm md:text-base leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-blue-700'}`}>
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizCard;
