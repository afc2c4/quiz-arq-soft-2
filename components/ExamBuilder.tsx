import React, { useState, useMemo } from 'react';
import { Topic, Question, Discipline } from '../types';
import { shuffleArray } from '../App';
import { exportToGoogleDocs } from '../src/services/googleDocsService';

interface ExamBuilderProps {
  isDarkMode: boolean;
  selectedIds: string[];
  onToggleSelection: (id: string) => void;
  onSelectMultiple: (ids: string[]) => void;
  onClearSelection: () => void;
  questions: Question[];
  topics: Topic[];
  disciplines: Discipline[];
}

const ExamBuilder: React.FC<ExamBuilderProps> = ({ 
  isDarkMode, 
  selectedIds, 
  onToggleSelection, 
  onSelectMultiple,
  onClearSelection,
  questions,
  topics,
  disciplines
}) => {
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<string | 'Todas'>('Todas');
  const [filterTopicId, setFilterTopicId] = useState<string | 'Todos'>('Todos');
  const [showPreview, setShowPreview] = useState(false);
  
  // 3 versões de provas solicitadas: Avaliação, Segunda Chamada, Final
  const [activeExamTab, setActiveExamTab] = useState<'avaliacao' | 'segundaChamada' | 'final'>('avaliacao');
  const [examVersions, setExamVersions] = useState<{
    avaliacao: string;
    segundaChamada: string;
    final: string;
  }>({
    avaliacao: '',
    segundaChamada: '',
    final: ''
  });

  const [isExporting, setIsExporting] = useState(false);
  const [exportMessage, setExportMessage] = useState<{ url: string; title: string } | null>(null);

  // Tópicos filtrados pela disciplina selecionada
  const availableTopics = useMemo(() => {
    if (selectedDisciplineId === 'Todas') {
      return topics;
    }
    return topics.filter(t => t.disciplineId === selectedDisciplineId);
  }, [topics, selectedDisciplineId]);

  const handleSelectDiscipline = (discId: string | 'Todas') => {
    setSelectedDisciplineId(discId);
    setFilterTopicId('Todos');
  };

  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const topic = topics.find(t => t.id === q.topicId);
      if (!topic) return false;

      if (selectedDisciplineId !== 'Todas' && topic.disciplineId !== selectedDisciplineId) {
        return false;
      }

      if (filterTopicId !== 'Todos' && q.topicId !== filterTopicId) {
        return false;
      }

      return true;
    });
  }, [questions, topics, selectedDisciplineId, filterTopicId]);

  const selectAllFiltered = () => {
    const filteredIds = filteredQuestions.map(q => q.id);
    onSelectMultiple(filteredIds);
  };

  const buildExamTextHeaderAndBody = (title: string, selectedQuestionsList: Question[]) => {
    const shuffledQuestions = shuffleArray(selectedQuestionsList);
    const answerKey: string[] = [];

    const examBody = shuffledQuestions.map((q, index) => {
      const originalCorrectOption = q.options[q.correctAnswer];
      const newOptions = shuffleArray(q.options);
      const newCorrectIndex = newOptions.indexOf(originalCorrectOption);
      
      answerKey.push(`${index + 1}) ${String.fromCharCode(65 + newCorrectIndex)}`);
      
      const optionsText = newOptions.map((opt, i) => `${String.fromCharCode(65 + i)}) ${opt}`).join('\n');
      return `${index + 1}. ${q.question}\n${optionsText}\n`;
    }).join('\n');

    return `========================================\nINSTITUIÇÃO DE ENSINO - ${title.toUpperCase()}\n========================================\nAluno(a): __________________________________ Data: ____/____/________\n\n${examBody}\n\n--- GABARITO (${title}) ---\n${answerKey.join(' | ')}`;
  };

  const generateExamContent = () => {
    const selectedQuestions = questions.filter(q => selectedIds.includes(q.id));
    
    const avaliacaoText = buildExamTextHeaderAndBody('Avaliação Regular', selectedQuestions);
    const segundaChamadaText = buildExamTextHeaderAndBody('Segunda Chamada', selectedQuestions);
    const finalExamText = buildExamTextHeaderAndBody('Avaliação Final', selectedQuestions);

    setExamVersions({
      avaliacao: avaliacaoText,
      segundaChamada: segundaChamadaText,
      final: finalExamText
    });
    setActiveExamTab('avaliacao');
    setExportMessage(null);
    setShowPreview(true);
  };

  const handleVersionTextChange = (text: string) => {
    setExamVersions(prev => ({
      ...prev,
      [activeExamTab]: text
    }));
  };

  const copyActiveToClipboard = () => {
    const activeText = examVersions[activeExamTab];
    navigator.clipboard.writeText(activeText);
    alert('Versão atual copiada com sucesso! Pronta para colar no seu editor.');
  };

  const handleExportToGoogleDocs = async () => {
    try {
      setIsExporting(true);
      setExportMessage(null);
      const titleMap = {
        avaliacao: 'Avaliação Regular - Mestre Digital',
        segundaChamada: 'Segunda Chamada - Mestre Digital',
        final: 'Avaliação Final - Mestre Digital'
      };
      const docTitle = titleMap[activeExamTab] || 'Prova - Mestre Digital';
      const docUrl = await exportToGoogleDocs(docTitle, examVersions[activeExamTab]);
      setExportMessage({ url: docUrl, title: docTitle });
      window.open(docUrl, '_blank');
    } catch (err: any) {
      alert(`Erro ao exportar para o Google Docs: ${err.message || err}`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
        <div>
          <h2 className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Gerador de Provas & Google Docs
          </h2>
          <p className={`mt-2 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            Organize por disciplina, selecione 10 questões, edite e exporte diretamente para o Google Docs.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={onClearSelection}
            className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${isDarkMode ? 'border-red-900/30 hover:bg-red-900/20 text-red-400' : 'border-red-100 hover:bg-red-50 text-red-600'}`}
          >
            <i className="fas fa-trash-alt mr-2"></i>
            Limpar Seleções
          </button>
          <button 
            onClick={selectAllFiltered}
            className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${isDarkMode ? 'border-slate-700 hover:bg-slate-800 text-slate-300' : 'border-gray-200 hover:bg-gray-50 text-gray-600'}`}
          >
            Selecionar Visíveis
          </button>
          <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 font-bold ${isDarkMode ? 'bg-slate-800 border-slate-700 text-blue-400' : 'bg-white border-gray-200 text-blue-600 shadow-sm'}`}>
            <i className="fas fa-check-double"></i>
            <span>{selectedIds.length} selecionadas</span>
          </div>
          <button 
            disabled={selectedIds.length !== 10}
            onClick={generateExamContent}
            className={`px-6 py-2 rounded-xl font-bold transition-all transform active:scale-95 flex items-center gap-2
              ${selectedIds.length !== 10 ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30'}`}
          >
            <i className="fas fa-file-alt"></i> Gerar 3 Versões (10)
          </button>
        </div>
      </div>

      {selectedIds.length !== 10 && selectedIds.length > 0 && (
        <div className={`mb-6 p-4 rounded-2xl border flex items-center gap-3 ${isDarkMode ? 'bg-orange-900/20 border-orange-900/30 text-orange-400' : 'bg-orange-50 border-orange-100 text-orange-700'}`}>
          <i className="fas fa-exclamation-circle"></i>
          <span className="text-sm font-medium">
            Selecione exatamente 10 questões para habilitar o gerador de provas. (Faltam {10 - selectedIds.length > 0 ? 10 - selectedIds.length : selectedIds.length - 10})
          </span>
        </div>
      )}

      {/* 1. Seleção por Disciplina */}
      <div className="mb-6">
        <label className={`block text-xs font-bold uppercase tracking-wider mb-2.5 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
          1. Filtrar por Disciplina
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleSelectDiscipline('Todas')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2
              ${selectedDisciplineId === 'Todas'
                ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                : (isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50')
              }`}
          >
            <i className="fas fa-layer-group"></i>
            Todas as Disciplinas
          </button>
          {disciplines.map(d => (
            <button
              key={d.id}
              onClick={() => handleSelectDiscipline(d.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2
                ${selectedDisciplineId === d.id
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                  : (isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50')
                }`}
            >
              <i className="fas fa-book"></i>
              {d.name}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Seleção por Tópico (dentro da disciplina) */}
      <div className="mb-8">
        <label className={`block text-xs font-bold uppercase tracking-wider mb-2.5 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
          2. Filtrar por Tópico
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterTopicId('Todos')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border
              ${filterTopicId === 'Todos'
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                : (isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500' : 'bg-white border-gray-200 text-gray-500 hover:border-indigo-300 hover:text-indigo-600')
              }`}
          >
            Todos os Tópicos
          </button>
          {availableTopics.map(t => (
            <button
              key={t.id}
              onClick={() => setFilterTopicId(t.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border
                ${filterTopicId === t.id
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                  : (isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500' : 'bg-white border-gray-200 text-gray-500 hover:border-indigo-300 hover:text-indigo-600')
                }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Questões */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredQuestions.map(q => {
          const isSelected = selectedIds.includes(q.id);
          const topic = topics.find(t => t.id === q.topicId);
          const discipline = disciplines.find(d => d.id === topic?.disciplineId);
          return (
            <div 
              key={q.id}
              className={`p-5 rounded-2xl border-2 transition-all group relative cursor-pointer
                ${isSelected 
                  ? 'border-blue-500 bg-blue-500/10 shadow-md' 
                  : (isDarkMode ? 'border-slate-800 bg-slate-800/50 hover:border-slate-700' : 'border-gray-100 bg-white hover:border-blue-100 shadow-sm')
                }`}
              onClick={() => onToggleSelection(q.id)}
            >
              <div className="flex justify-between items-start gap-4 mb-3">
                <div className="flex flex-wrap gap-2 items-center">
                  {discipline && (
                    <span className={`text-[10px] uppercase tracking-widest font-black px-2 py-0.5 rounded-md
                      ${isDarkMode ? 'bg-blue-950 text-blue-300 border border-blue-900/50' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}>
                      {discipline.name}
                    </span>
                  )}
                  <span className={`text-[10px] uppercase tracking-widest font-black px-2 py-0.5 rounded-md
                    ${isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-700'}`}>
                    {topic?.name || 'Tópico Desconhecido'}
                  </span>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                  ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300'}`}>
                  {isSelected && <i className="fas fa-check text-[10px]"></i>}
                </div>
              </div>
              <p className={`font-bold leading-tight pr-8 ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
                {q.question}
              </p>
              <div className="mt-4 space-y-1">
                {q.options.map((opt, i) => (
                  <div key={i} className={`text-xs flex gap-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-900 font-medium'}`}>
                    <span className="font-bold">{String.fromCharCode(65 + i)})</span>
                    <span className="truncate">{opt}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {filteredQuestions.length === 0 && (
        <div className={`text-center py-16 rounded-2xl border ${isDarkMode ? 'bg-slate-900/40 border-slate-800 text-slate-400' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
          <i className="fas fa-search text-3xl mb-3 opacity-60"></i>
          <p className="font-bold">Nenhuma questão encontrada para os filtros selecionados.</p>
        </div>
      )}

      {/* Modal com 3 Abas, Edição Instantânea e Google Docs */}
      {showPreview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className={`w-full max-w-4xl rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden
            ${isDarkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white'}`}>
            
            {/* Header */}
            <div className={`p-6 border-b flex justify-between items-center ${isDarkMode ? 'border-slate-800' : 'border-gray-100'}`}>
              <div>
                <h3 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Editor Instantâneo & Exportação Google Docs
                </h3>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                  Edite a versão ativa e exporte diretamente como um novo documento no seu Google Docs.
                </p>
              </div>
              <button 
                onClick={() => setShowPreview(false)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-gray-100 text-gray-500'}`}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            {/* Abas de Navegação das 3 Provas */}
            <div className={`px-6 pt-4 flex gap-3 border-b ${isDarkMode ? 'border-slate-800 bg-slate-950/40' : 'border-gray-100 bg-gray-50/70'}`}>
              <button
                onClick={() => { setActiveExamTab('avaliacao'); setExportMessage(null); }}
                className={`px-5 py-3 rounded-t-2xl font-bold text-xs md:text-sm transition-all border-b-2 flex items-center gap-2
                  ${activeExamTab === 'avaliacao'
                    ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                    : (isDarkMode ? 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800/50' : 'border-transparent text-gray-600 hover:text-blue-600 hover:bg-gray-100')
                  }`}
              >
                <i className="fas fa-file-lines"></i> Avaliação Regular
              </button>
              <button
                onClick={() => { setActiveExamTab('segundaChamada'); setExportMessage(null); }}
                className={`px-5 py-3 rounded-t-2xl font-bold text-xs md:text-sm transition-all border-b-2 flex items-center gap-2
                  ${activeExamTab === 'segundaChamada'
                    ? 'border-amber-600 bg-amber-600 text-white shadow-sm'
                    : (isDarkMode ? 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800/50' : 'border-transparent text-gray-600 hover:text-amber-600 hover:bg-gray-100')
                  }`}
              >
                <i className="fas fa-redo"></i> Segunda Chamada
              </button>
              <button
                onClick={() => { setActiveExamTab('final'); setExportMessage(null); }}
                className={`px-5 py-3 rounded-t-2xl font-bold text-xs md:text-sm transition-all border-b-2 flex items-center gap-2
                  ${activeExamTab === 'final'
                    ? 'border-purple-600 bg-purple-600 text-white shadow-sm'
                    : (isDarkMode ? 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800/50' : 'border-transparent text-gray-600 hover:text-purple-600 hover:bg-gray-100')
                  }`}
              >
                <i className="fas fa-graduation-cap"></i> Avaliação Final
              </button>
            </div>

            {/* Editor de Texto Instantâneo */}
            <div className="p-6 overflow-y-auto flex-grow bg-slate-50 dark:bg-slate-950/50">
              <div className="mb-2 flex justify-between items-center">
                <span className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                  Editando Versão: <span className="text-blue-500">{activeExamTab.toUpperCase()}</span>
                </span>
                <span className={`text-xs font-mono ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>
                  Sincronizado em tempo real
                </span>
              </div>
              <textarea
                value={examVersions[activeExamTab]}
                onChange={(e) => handleVersionTextChange(e.target.value)}
                rows={12}
                className={`w-full p-5 rounded-2xl font-mono text-xs md:text-sm leading-relaxed border shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-y
                  ${isDarkMode 
                    ? 'bg-slate-900 border-slate-800 text-slate-200' 
                    : 'bg-white border-gray-300 text-slate-900'
                  }`}
              />

              {exportMessage && (
                <div className={`mt-4 p-4 rounded-2xl border flex items-center justify-between gap-3 animate-in fade-in duration-300
                  ${isDarkMode ? 'bg-green-950/30 border-green-800 text-green-300' : 'bg-green-50 border-green-200 text-green-800'}`}>
                  <div className="flex items-center gap-2 text-xs md:text-sm font-bold">
                    <i className="fas fa-check-circle text-green-500 text-lg"></i>
                    <span>Documento criado com sucesso no Google Docs!</span>
                  </div>
                  <a
                    href={exportMessage.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-all"
                  >
                    <span>Abrir no Google Docs</span>
                    <i className="fas fa-external-link-alt text-[10px]"></i>
                  </a>
                </div>
              )}
            </div>

            {/* Rodapé com Ações */}
            <div className={`p-6 border-t flex flex-col sm:flex-row gap-3 justify-between items-center ${isDarkMode ? 'border-slate-800' : 'border-gray-100'}`}>
              <button 
                onClick={copyActiveToClipboard}
                className={`px-6 py-3 rounded-2xl font-bold text-xs md:text-sm border transition-all flex items-center gap-2
                  ${isDarkMode ? 'border-slate-700 hover:bg-slate-800 text-slate-300' : 'border-gray-200 hover:bg-gray-100 text-gray-700'}`}
              >
                <i className="fas fa-copy"></i> Copiar Texto
              </button>

              <button 
                disabled={isExporting}
                onClick={handleExportToGoogleDocs}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg transition-all transform active:scale-95 flex items-center gap-2.5 disabled:opacity-50"
              >
                {isExporting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    <span>Exportando...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-file-word text-lg"></i>
                    <span>Exportar Versão para o Google Docs</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ExamBuilder;
