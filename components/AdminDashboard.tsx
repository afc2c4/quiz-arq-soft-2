import React, { useState, useRef } from 'react';
import { Question, Topic, Discipline, StudyMaterial } from '../types';
import { StudyMaterialEditor } from './StudyMaterialEditor';
import { StudyMaterialContent } from './StudyMaterialView';

interface AdminDashboardProps {
  isDarkMode: boolean;
  questions: Question[];
  topics: Topic[];
  disciplines: Discipline[];
  onAddQuestion: (q: Question) => void;
  onUpdateQuestion: (q: Question) => void;
  onDeleteQuestion: (id: string) => void;
  onImportQuestions?: (qs: Question[]) => void;
  onAddTopic: (t: Topic) => void;
  onUpdateTopic: (t: Topic) => void;
  onDeleteTopic: (id: string) => void;
  onAddDiscipline: (d: Discipline) => void;
  onUpdateDiscipline: (d: Discipline) => void;
  onDeleteDiscipline: (id: string) => void;
  getStudyMaterial?: (topic: Topic) => StudyMaterial;
  onUpdateStudyMaterial?: (material: StudyMaterial) => void;
  onResetStudyMaterial?: (topicId: string) => void;
  onImportStudyMaterials?: (materials: Record<string, StudyMaterial>) => void;
  hasCustomStudyMaterial?: (topicId: string) => boolean;
  customMaterials?: Record<string, StudyMaterial>;
}

interface ConfirmModalState {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  isDanger?: boolean;
  onConfirm: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isDarkMode,
  questions,
  topics,
  disciplines,
  onAddQuestion,
  onUpdateQuestion,
  onDeleteQuestion,
  onImportQuestions,
  onAddTopic,
  onUpdateTopic,
  onDeleteTopic,
  onAddDiscipline,
  onUpdateDiscipline,
  onDeleteDiscipline,
  getStudyMaterial,
  onUpdateStudyMaterial,
  onResetStudyMaterial,
  onImportStudyMaterials,
  hasCustomStudyMaterial,
  customMaterials = {}
}) => {
  // Navegação: Nível 1 (null) -> Nível 2 (selectedDisciplineId) -> Nível 3 (selectedTopicId)
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<string | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [topicSubView, setTopicSubView] = useState<'content' | 'questions'>('content');
  const [editingMaterialTopicId, setEditingMaterialTopicId] = useState<string | null>(null);

  // Modal Customizado de Confirmação (Elimina o uso de confirm() bloqueado no iframe)
  const [confirmModal, setConfirmModal] = useState<ConfirmModalState | null>(null);

  // Toast de Notificação
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Estados de CRUD de Disciplinas
  const [editingDiscipline, setEditingDiscipline] = useState<Discipline | null>(null);
  const [newDisciplineName, setNewDisciplineName] = useState('');
  const [showNewDisciplineForm, setShowNewDisciplineForm] = useState(false);

  // Estados de CRUD de Tópicos
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [newTopicName, setNewTopicName] = useState('');
  const [showNewTopicForm, setShowNewTopicForm] = useState(false);

  // Estados de CRUD de Questões
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [questionSearch, setQuestionSearch] = useState('');
  const [questionForm, setQuestionForm] = useState<Partial<Question>>({
    question: '',
    options: ['', '', '', '', ''],
    correctAnswer: 0,
    explanation: ''
  });

  // Referências para inputs de arquivos JSON
  const materialFileInputRef = useRef<HTMLInputElement>(null);
  const questionsFileInputRef = useRef<HTMLInputElement>(null);
  const disciplineBackupInputRef = useRef<HTMLInputElement>(null);

  // Helpers para Download e Upload de JSON
  const downloadJSON = (data: any, filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // --- Handlers de Disciplina ---
  const handleDisciplineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDisciplineName.trim()) return;

    if (editingDiscipline) {
      onUpdateDiscipline({ ...editingDiscipline, name: newDisciplineName.trim() });
      showToast(`Disciplina renomeada para "${newDisciplineName.trim()}".`);
      setEditingDiscipline(null);
    } else {
      const newId = `d-${Date.now()}`;
      onAddDiscipline({ id: newId, name: newDisciplineName.trim() });
      setSelectedDisciplineId(newId);
      showToast(`Disciplina "${newDisciplineName.trim()}" criada com sucesso.`);
    }
    setNewDisciplineName('');
    setShowNewDisciplineForm(false);
  };

  const handleStartEditDiscipline = (d: Discipline, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setEditingDiscipline(d);
    setNewDisciplineName(d.name);
    setShowNewDisciplineForm(true);
  };

  const handleDeleteDiscipline = (d: Discipline, e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    const dTopics = topics.filter(t => t.disciplineId === d.id);
    const dTopicIds = dTopics.map(t => t.id);
    const qCount = questions.filter(q => dTopicIds.includes(q.topicId)).length;

    setConfirmModal({
      isOpen: true,
      title: `Excluir Disciplina "${d.name}"?`,
      message: `Esta ação apagará permanentemente a disciplina "${d.name}", seus ${dTopics.length} tópico(s) cadastrados, materiais de estudo e ${qCount} questão(ões) associadas.`,
      confirmLabel: 'Sim, Excluir Disciplina',
      isDanger: true,
      onConfirm: () => {
        onDeleteDiscipline(d.id);
        if (selectedDisciplineId === d.id) {
          setSelectedDisciplineId(null);
          setSelectedTopicId(null);
        }
        setConfirmModal(null);
        showToast(`Disciplina "${d.name}" excluída com sucesso.`);
      }
    });
  };

  // --- Handlers de Tópico ---
  const handleTopicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicName.trim() || !selectedDisciplineId) return;

    if (editingTopic) {
      onUpdateTopic({ ...editingTopic, name: newTopicName.trim() });
      showToast(`Tópico renomeado para "${newTopicName.trim()}".`);
      setEditingTopic(null);
    } else {
      const newId = `t-${Date.now()}`;
      onAddTopic({ id: newId, name: newTopicName.trim(), disciplineId: selectedDisciplineId });
      setSelectedTopicId(newId);
      setTopicSubView('content');
      showToast(`Tópico "${newTopicName.trim()}" criado com sucesso.`);
    }
    setNewTopicName('');
    setShowNewTopicForm(false);
  };

  const handleStartEditTopic = (t: Topic, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setEditingTopic(t);
    setNewTopicName(t.name);
    setShowNewTopicForm(true);
  };

  const handleDeleteTopic = (t: Topic, e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    const countQ = questions.filter(q => q.topicId === t.id).length;

    setConfirmModal({
      isOpen: true,
      title: `Excluir Tópico "${t.name}"?`,
      message: `Deseja realmente excluir este tópico? Isso apagará também suas ${countQ} questão(ões) e o conteúdo didático associado.`,
      confirmLabel: 'Sim, Excluir Tópico',
      isDanger: true,
      onConfirm: () => {
        onDeleteTopic(t.id);
        if (selectedTopicId === t.id) {
          setSelectedTopicId(null);
        }
        setConfirmModal(null);
        showToast(`Tópico "${t.name}" excluído com sucesso.`);
      }
    });
  };

  // --- Handlers de Conteúdo Didático (Export / Import / Reset) ---
  const handleExportTopicMaterial = (topic: Topic) => {
    if (!getStudyMaterial) return;
    const material = getStudyMaterial(topic);
    const safeName = topic.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    downloadJSON(material, `conteudo-topico-${safeName}.json`);
    showToast(`Download de "${safeName}.json" iniciado.`);
  };

  const handleImportMaterialFile = (topic: Topic, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text) as StudyMaterial;
        if (!parsed || typeof parsed !== 'object') {
          throw new Error('Formato inválido');
        }
        parsed.topicId = topic.id;
        parsed.topicName = parsed.topicName || topic.name;
        if (onUpdateStudyMaterial) {
          onUpdateStudyMaterial(parsed);
          showToast(`Conteúdo didático do tópico "${topic.name}" importado e salvo com sucesso!`);
        }
      } catch (err) {
        console.error(err);
        showToast('Erro ao importar JSON de conteúdo. Verifique o arquivo.');
      }
      if (e.target) e.target.value = '';
    };
    reader.readAsText(file);
  };

  const handleResetTopicMaterial = (topic: Topic) => {
    if (!onResetStudyMaterial) return;
    setConfirmModal({
      isOpen: true,
      title: `Restaurar Conteúdo de "${topic.name}"?`,
      message: `Deseja excluir as customizações salvas no navegador e restaurar a apostila padrão original do sistema?`,
      confirmLabel: 'Sim, Restaurar Original',
      isDanger: false,
      onConfirm: () => {
        onResetStudyMaterial(topic.id);
        setConfirmModal(null);
        showToast(`Conteúdo do tópico "${topic.name}" restaurado para o padrão original.`);
      }
    });
  };

  // --- Handlers de Questões (CRUD e Import/Export) ---
  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTopicId) {
      showToast('Selecione um tópico para vincular a questão.');
      return;
    }
    if (!questionForm.question?.trim() || questionForm.options?.some(o => !o?.trim())) {
      showToast('Preencha o enunciado e todas as 5 alternativas da questão.');
      return;
    }

    const qData: Question = {
      id: editingQuestion?.id || `q-${Date.now()}`,
      topicId: selectedTopicId,
      question: questionForm.question.trim(),
      options: (questionForm.options as string[]).map(o => o.trim()),
      correctAnswer: questionForm.correctAnswer ?? 0,
      explanation: questionForm.explanation?.trim() || ''
    };

    if (editingQuestion) {
      onUpdateQuestion(qData);
      showToast('Questão atualizada com sucesso!');
      setEditingQuestion(null);
    } else {
      onAddQuestion(qData);
      showToast('Questão cadastrada com sucesso!');
    }

    setQuestionForm({
      question: '',
      options: ['', '', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    });
  };

  const handleStartEditQuestion = (q: Question) => {
    setEditingQuestion(q);
    setQuestionForm({
      question: q.question,
      options: [...q.options],
      correctAnswer: q.correctAnswer,
      explanation: q.explanation
    });
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const handleDeleteQuestion = (q: Question) => {
    setConfirmModal({
      isOpen: true,
      title: 'Excluir Questão?',
      message: `Deseja remover permanentemente esta questão: "${q.question.substring(0, 80)}${q.question.length > 80 ? '...' : ''}"?`,
      confirmLabel: 'Sim, Excluir Questão',
      isDanger: true,
      onConfirm: () => {
        onDeleteQuestion(q.id);
        setConfirmModal(null);
        showToast('Questão excluída com sucesso.');
      }
    });
  };

  const handleExportTopicQuestions = (topic: Topic) => {
    const topicQuestions = questions.filter(q => q.topicId === topic.id);
    if (topicQuestions.length === 0) {
      showToast('Este tópico ainda não possui questões cadastradas.');
      return;
    }
    const safeName = topic.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    downloadJSON(topicQuestions, `questoes-topico-${safeName}.json`);
    showToast(`Download de "${safeName}.json" iniciado.`);
  };

  const handleImportQuestionsFile = (topic: Topic, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        const list = Array.isArray(parsed)
          ? parsed
          : (parsed.questions && Array.isArray(parsed.questions) ? parsed.questions : null);

        if (!list || list.length === 0) {
          showToast('Nenhuma questão válida encontrada no arquivo JSON.');
          return;
        }

        let count = 0;
        list.forEach((item: any, idx: number) => {
          if (item.question && Array.isArray(item.options)) {
            const newQ: Question = {
              id: `q-${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 4)}`,
              topicId: topic.id,
              question: item.question,
              options: item.options.slice(0, 5),
              correctAnswer: typeof item.correctAnswer === 'number' ? item.correctAnswer : 0,
              explanation: item.explanation || ''
            };
            onAddQuestion(newQ);
            count++;
          }
        });
        showToast(`${count} questão(ões) importada(s) com sucesso para "${topic.name}"!`);
      } catch (err) {
        console.error(err);
        showToast('Erro ao importar JSON de questões.');
      }
      if (e.target) e.target.value = '';
    };
    reader.readAsText(file);
  };

  // --- Exportar Backup de Disciplina ---
  const handleExportDisciplineBackup = (discipline: Discipline, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const dTopics = topics.filter(t => t.disciplineId === discipline.id);
    const dTopicIds = dTopics.map(t => t.id);
    const dQuestions = questions.filter(q => dTopicIds.includes(q.topicId));
    const dMaterials: Record<string, StudyMaterial> = {};

    dTopics.forEach(t => {
      if (getStudyMaterial) {
        dMaterials[t.id] = getStudyMaterial(t);
      }
    });

    const payload = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      discipline,
      topics: dTopics,
      studyMaterials: dMaterials,
      questions: dQuestions
    };

    const safeName = discipline.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    downloadJSON(payload, `backup-disciplina-${safeName}.json`);
    showToast(`Backup da disciplina "${discipline.name}" gerado.`);
  };

  // --- Importar Backup Completo de Disciplina ---
  const handleImportDisciplineBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);

        if (!parsed.discipline || !Array.isArray(parsed.topics)) {
          throw new Error('Arquivo de backup inválido');
        }

        const targetDiscipline: Discipline = parsed.discipline;
        const existsDiscipline = disciplines.some(d => d.id === targetDiscipline.id);
        if (existsDiscipline) {
          onUpdateDiscipline(targetDiscipline);
        } else {
          onAddDiscipline(targetDiscipline);
        }

        parsed.topics.forEach((top: Topic) => {
          const topExists = topics.some(t => t.id === top.id);
          if (topExists) {
            onUpdateTopic(top);
          } else {
            onAddTopic(top);
          }
        });

        if (parsed.studyMaterials && onImportStudyMaterials) {
          onImportStudyMaterials(parsed.studyMaterials);
        }

        if (Array.isArray(parsed.questions) && onImportQuestions) {
          onImportQuestions(parsed.questions);
        }

        showToast(`Backup da disciplina "${targetDiscipline.name}" importado com sucesso!`);
        setSelectedDisciplineId(targetDiscipline.id);
      } catch (err) {
        console.error(err);
        showToast('Erro ao importar backup de disciplina.');
      }
      if (e.target) e.target.value = '';
    };
    reader.readAsText(file);
  };

  // Modo Editor em Tela Cheia para o Material Didático
  if (editingMaterialTopicId) {
    const topicToEdit = topics.find(t => t.id === editingMaterialTopicId);
    if (topicToEdit && getStudyMaterial) {
      const materialToEdit = getStudyMaterial(topicToEdit);
      const isCustom = hasCustomStudyMaterial ? hasCustomStudyMaterial(topicToEdit.id) : false;

      return (
        <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-300">
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={() => setEditingMaterialTopicId(null)}
              className={`text-sm font-bold flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all ${
                isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <i className="fas fa-arrow-left"></i> Voltar ao Painel da Disciplina
            </button>
          </div>

          <StudyMaterialEditor
            initialMaterial={materialToEdit}
            isDarkMode={isDarkMode}
            isCustomized={isCustom}
            onSave={(updated) => {
              if (onUpdateStudyMaterial) {
                onUpdateStudyMaterial(updated);
              }
              showToast('Conteúdo salvo com sucesso no armazenamento local!');
              setEditingMaterialTopicId(null);
            }}
            onCancel={() => setEditingMaterialTopicId(null)}
            onResetToDefault={onResetStudyMaterial ? () => {
              onResetStudyMaterial(topicToEdit.id);
              showToast('Conteúdo restaurado para o original.');
              setEditingMaterialTopicId(null);
            } : undefined}
            renderPreview={(previewMaterial) => (
              <StudyMaterialContent
                material={previewMaterial}
                isDarkMode={isDarkMode}
              />
            )}
          />
        </div>
      );
    }
  }

  const activeDiscipline = disciplines.find(d => d.id === selectedDisciplineId);
  const activeDisciplineTopics = topics.filter(t => t.disciplineId === selectedDisciplineId);
  const activeTopic = topics.find(t => t.id === selectedTopicId);
  const activeTopicQuestions = selectedTopicId ? questions.filter(q => q.topicId === selectedTopicId) : [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-500 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl bg-emerald-600 text-white text-sm font-bold animate-in slide-in-from-bottom-5 duration-300">
          <i className="fas fa-check-circle text-base"></i>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modal Customizado de Confirmação (Não é bloqueado em iframes) */}
      {confirmModal && confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className={`max-w-md w-full p-6 rounded-3xl shadow-2xl border ${
            isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-200 text-gray-900'
          } animate-in zoom-in-95 duration-200`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold ${
                confirmModal.isDanger
                  ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                  : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
              }`}>
                <i className={`fas ${confirmModal.isDanger ? 'fa-triangle-exclamation' : 'fa-circle-question'}`}></i>
              </div>
              <div>
                <h4 className="font-extrabold text-lg leading-snug">{confirmModal.title}</h4>
                <span className="text-xs text-gray-400">Confirmação de Ação</span>
              </div>
            </div>

            <p className={`text-sm mb-6 leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
              {confirmModal.message}
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmModal(null)}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                  isDarkMode
                    ? 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
                    : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => confirmModal.onConfirm()}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg transition-all ${
                  confirmModal.isDanger
                    ? 'bg-red-600 hover:bg-red-700 active:scale-95'
                    : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
                }`}
              >
                {confirmModal.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Input oculto para backup */}
      <input
        type="file"
        ref={disciplineBackupInputRef}
        onChange={handleImportDisciplineBackup}
        accept=".json"
        className="hidden"
      />

      {/* Cabeçalho do Painel do Professor */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 pb-6 border-b border-gray-200 dark:border-slate-700">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-600 text-white">
              Painel do Professor
            </span>
            <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
              Gestão Curricular & Pedagógica
            </span>
          </div>
          <h2 className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Disciplinas & Conteúdos
          </h2>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            Gerencie o currículo em cascata: crie disciplinas, estruture tópicos e configure conteúdos didáticos e questões.
          </p>
        </div>

        {/* Ações de Backup Global */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => disciplineBackupInputRef.current?.click()}
            className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
              isDarkMode 
                ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white' 
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
            title="Importar arquivo de backup em JSON"
          >
            <i className="fas fa-file-import text-blue-500"></i>
            <span>Importar Backup JSON</span>
          </button>
        </div>
      </div>

      {/* Trilha de Navegação (Breadcrumbs) */}
      <div className="flex items-center flex-wrap gap-2 text-sm font-semibold mb-6">
        <button
          onClick={() => { setSelectedDisciplineId(null); setSelectedTopicId(null); }}
          className={`flex items-center gap-1.5 transition-colors ${
            !selectedDisciplineId
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : (isDarkMode ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-900')
          }`}
        >
          <i className="fas fa-book text-xs"></i>
          <span>Disciplinas ({disciplines.length})</span>
        </button>

        {activeDiscipline && (
          <>
            <span className={isDarkMode ? 'text-slate-600' : 'text-gray-300'}>/</span>
            <button
              onClick={() => setSelectedTopicId(null)}
              className={`flex items-center gap-1.5 transition-colors ${
                selectedDisciplineId && !selectedTopicId
                  ? 'text-blue-600 dark:text-blue-400 font-bold'
                  : (isDarkMode ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-900')
              }`}
            >
              <i className="fas fa-layer-group text-xs"></i>
              <span>{activeDiscipline.name}</span>
            </button>
          </>
        )}

        {activeTopic && (
          <>
            <span className={isDarkMode ? 'text-slate-600' : 'text-gray-300'}>/</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1.5">
              <i className="fas fa-bookmark text-xs"></i>
              <span>{activeTopic.name}</span>
            </span>
          </>
        )}
      </div>

      {/* ========================================================================= */}
      {/* NÍVEL 1: VISÃO GERAL DE DISCIPLINAS (Quando nenhuma está selecionada)      */}
      {/* ========================================================================= */}
      {!selectedDisciplineId && (
        <div className="space-y-8">
          {/* Barra de Ação: Nova Disciplina */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Disciplinas Cadastradas
              </h3>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                Selecione uma disciplina para gerenciar seus tópicos, materiais teóricos e banco de questões.
              </p>
            </div>

            <button
              onClick={() => {
                setEditingDiscipline(null);
                setNewDisciplineName('');
                setShowNewDisciplineForm(true);
              }}
              className="px-4 py-2.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all flex items-center gap-2"
            >
              <i className="fas fa-plus"></i>
              <span>Nova Disciplina</span>
            </button>
          </div>

          {/* Formulário de Criação/Edição de Disciplina */}
          {showNewDisciplineForm && (
            <div className={`p-6 rounded-3xl shadow-xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
              <h4 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {editingDiscipline ? 'Editar Nome da Disciplina' : 'Cadastrar Nova Disciplina'}
              </h4>
              <form onSubmit={handleDisciplineSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={newDisciplineName}
                  onChange={(e) => setNewDisciplineName(e.target.value)}
                  placeholder="Nome da disciplina (ex: Arquitetura de Software)"
                  className={`flex-grow px-4 py-3 rounded-xl border-2 transition-all outline-none ${
                    isDarkMode
                      ? 'bg-slate-700 border-slate-600 text-white focus:border-blue-500'
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
                  }`}
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all"
                  >
                    {editingDiscipline ? 'Salvar' : 'Adicionar'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowNewDisciplineForm(false); setEditingDiscipline(null); }}
                    className={`px-4 py-3 rounded-xl font-bold transition-all ${
                      isDarkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Grid de Cards de Disciplinas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {disciplines.map(d => {
              const dTopics = topics.filter(t => t.disciplineId === d.id);
              const dTopicIds = dTopics.map(t => t.id);
              const dQuestions = questions.filter(q => dTopicIds.includes(q.topicId));
              const customCount = dTopics.filter(t => hasCustomStudyMaterial ? hasCustomStudyMaterial(t.id) : false).length;

              return (
                <div
                  key={d.id}
                  onClick={() => setSelectedDisciplineId(d.id)}
                  className={`p-6 rounded-3xl shadow-md hover:shadow-xl transition-all border cursor-pointer group flex flex-col justify-between ${
                    isDarkMode ? 'bg-slate-800 border-slate-700/80 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-500'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300 flex items-center justify-center font-bold text-lg">
                        <i className="fas fa-book"></i>
                      </div>
                      <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={(e) => handleStartEditDiscipline(d, e)}
                          className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-700 text-blue-600 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center cursor-pointer"
                          title="Editar Nome"
                        >
                          <i className="fas fa-edit text-xs"></i>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleExportDisciplineBackup(d, e)}
                          className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-700 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center cursor-pointer"
                          title="Exportar Backup da Disciplina (JSON)"
                        >
                          <i className="fas fa-file-export text-xs"></i>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleDeleteDiscipline(d, e)}
                          className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950/40 text-red-600 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center cursor-pointer"
                          title="Excluir Disciplina"
                        >
                          <i className="fas fa-trash text-xs"></i>
                        </button>
                      </div>
                    </div>

                    <h4 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {d.name}
                    </h4>

                    <div className="flex flex-wrap gap-2 text-xs font-semibold mb-6">
                      <span className={`px-2.5 py-1 rounded-lg ${
                        isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-700'
                      }`}>
                        <i className="fas fa-layer-group mr-1.5 text-blue-500"></i>
                        {dTopics.length} {dTopics.length === 1 ? 'Tópico' : 'Tópicos'}
                      </span>
                      <span className={`px-2.5 py-1 rounded-lg ${
                        isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-700'
                      }`}>
                        <i className="fas fa-question-circle mr-1.5 text-amber-500"></i>
                        {dQuestions.length} {dQuestions.length === 1 ? 'Questão' : 'Questões'}
                      </span>
                      {customCount > 0 && (
                        <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20">
                          <i className="fas fa-pen-nib mr-1.5"></i>
                          {customCount} editados
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between text-blue-600 dark:text-blue-400 font-bold text-sm">
                    <span>Gerenciar Tópicos & Conteúdo</span>
                    <i className="fas fa-arrow-right group-hover:translate-x-1.5 transition-transform"></i>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* NÍVEL 2: DISCIPLINA SELECIONADA -> GESTÃO DE TÓPICOS                      */}
      {/* ========================================================================= */}
      {selectedDisciplineId && activeDiscipline && (
        <div className="space-y-8">
          {/* Header da Disciplina Ativa */}
          <div className={`p-6 rounded-3xl shadow-sm border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            isDarkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-gray-200'
          }`}>
            <div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => { setSelectedDisciplineId(null); setSelectedTopicId(null); }}
                  className={`text-xs font-bold px-2 py-1 rounded-md border transition-all ${
                    isDarkMode ? 'bg-slate-700 text-slate-300 border-slate-600 hover:text-white' : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  <i className="fas fa-arrow-left mr-1"></i> Ver Todas as Disciplinas
                </button>
                <span className="text-xs uppercase font-extrabold tracking-wider text-blue-500">
                  Disciplina Ativa
                </span>
              </div>
              <h3 className={`text-2xl font-black mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {activeDiscipline.name}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleStartEditDiscipline(activeDiscipline)}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                  isDarkMode ? 'bg-slate-700 text-slate-200 border-slate-600 hover:bg-slate-600' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <i className="fas fa-pen text-blue-500"></i>
                <span>Renomear</span>
              </button>

              <button
                type="button"
                onClick={() => handleExportDisciplineBackup(activeDiscipline)}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                  isDarkMode ? 'bg-slate-700 text-emerald-400 border-slate-600 hover:bg-slate-600' : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                }`}
                title="Exportar JSON completo desta disciplina"
              >
                <i className="fas fa-file-export"></i>
                <span>Exportar Backup</span>
              </button>

              <button
                type="button"
                onClick={() => handleDeleteDiscipline(activeDiscipline)}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                  isDarkMode
                    ? 'bg-red-950/40 text-red-300 border-red-900/50 hover:bg-red-600 hover:text-white'
                    : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-600 hover:text-white'
                }`}
                title="Excluir esta disciplina"
              >
                <i className="fas fa-trash"></i>
                <span>Excluir Disciplina</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setEditingTopic(null);
                  setNewTopicName('');
                  setShowNewTopicForm(true);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all flex items-center gap-1.5"
              >
                <i className="fas fa-plus"></i>
                <span>Novo Tópico</span>
              </button>
            </div>
          </div>

          {/* Formulário de Criação/Edição de Tópico */}
          {showNewTopicForm && (
            <div className={`p-6 rounded-3xl shadow-xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
              <h4 className={`text-lg font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {editingTopic ? `Editar Tópico: ${editingTopic.name}` : `Novo Tópico em "${activeDiscipline.name}"`}
              </h4>
              <form onSubmit={handleTopicSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={newTopicName}
                  onChange={(e) => setNewTopicName(e.target.value)}
                  placeholder="Nome do Tópico (ex: Microsserviços e Mensageria)"
                  className={`flex-grow px-4 py-3 rounded-xl border-2 transition-all outline-none ${
                    isDarkMode
                      ? 'bg-slate-700 border-slate-600 text-white focus:border-blue-500'
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
                  }`}
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all"
                  >
                    {editingTopic ? 'Salvar' : 'Criar Tópico'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowNewTopicForm(false); setEditingTopic(null); }}
                    className={`px-4 py-3 rounded-xl font-bold transition-all ${
                      isDarkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Lista de Tópicos da Disciplina */}
          {!selectedTopicId ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Tópicos da Disciplina ({activeDisciplineTopics.length})
                </h4>
              </div>

              {activeDisciplineTopics.length === 0 ? (
                <div className={`p-12 text-center rounded-3xl border border-dashed ${
                  isDarkMode ? 'bg-slate-800/40 border-slate-700 text-slate-400' : 'bg-gray-50 border-gray-300 text-gray-500'
                }`}>
                  <i className="fas fa-layer-group text-4xl mb-3 text-blue-500/50"></i>
                  <p className="font-bold text-base">Nenhum tópico cadastrado nesta disciplina.</p>
                  <p className="text-xs mt-1">Clique no botão "+ Novo Tópico" acima para iniciar o cadastro.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeDisciplineTopics.map(topic => {
                    const topicQCount = questions.filter(q => q.topicId === topic.id).length;
                    const isCustom = hasCustomStudyMaterial ? hasCustomStudyMaterial(topic.id) : false;

                    return (
                      <div
                        key={topic.id}
                        className={`p-5 rounded-3xl shadow-sm border transition-all flex flex-col justify-between ${
                          isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h5 className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {topic.name}
                            </h5>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={(e) => handleStartEditTopic(topic, e)}
                                className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-slate-700 text-blue-600 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center text-xs"
                                title="Renomear Tópico"
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button
                                type="button"
                                onClick={(e) => handleDeleteTopic(topic, e)}
                                className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-950/40 text-red-600 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center text-xs"
                                title="Excluir Tópico"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </div>

                          {/* Status do Conteúdo e Questões */}
                          <div className="flex flex-wrap gap-2 text-xs mb-4">
                            <span className={`px-2.5 py-1 rounded-md font-semibold ${
                              isCustom
                                ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20'
                                : (isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600')
                            }`}>
                              <i className={`fas ${isCustom ? 'fa-pen-to-square' : 'fa-book-open'} mr-1.5`}></i>
                              {isCustom ? 'Apostila Editada (Local)' : 'Apostila Original'}
                            </span>

                            <span className={`px-2.5 py-1 rounded-md font-semibold ${
                              isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600'
                            }`}>
                              <i className="fas fa-question-circle mr-1.5 text-amber-500"></i>
                              {topicQCount} {topicQCount === 1 ? 'questão' : 'questões'}
                            </span>
                          </div>
                        </div>

                        {/* Botões para gerenciar Conteúdo ou Questões */}
                        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 dark:border-slate-700">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedTopicId(topic.id);
                              setTopicSubView('content');
                            }}
                            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                              isDarkMode
                                ? 'bg-slate-700/60 text-blue-300 border-slate-600 hover:bg-slate-700'
                                : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                            }`}
                          >
                            <i className="fas fa-book-open"></i>
                            <span>Conteúdo Didático</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedTopicId(topic.id);
                              setTopicSubView('questions');
                            }}
                            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                              isDarkMode
                                ? 'bg-slate-700/60 text-amber-300 border-slate-600 hover:bg-slate-700'
                                : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                            }`}
                          >
                            <i className="fas fa-list-check"></i>
                            <span>Questões ({topicQCount})</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* ========================================================================= */
            /* NÍVEL 3: TÓPICO SELECIONADO -> CRUD DE CONTEÚDOS & QUESTÕES               */
            /* ========================================================================= */
            activeTopic && (
              <div className="space-y-6">
                {/* Barra do Tópico Ativo */}
                <div className={`p-6 rounded-3xl shadow-sm border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
                }`}>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <button
                        type="button"
                        onClick={() => setSelectedTopicId(null)}
                        className={`text-xs font-bold px-2 py-0.5 rounded-md border transition-all ${
                          isDarkMode ? 'bg-slate-700 text-slate-300 border-slate-600 hover:text-white' : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                        }`}
                      >
                        <i className="fas fa-arrow-left mr-1"></i> Tópicos de {activeDiscipline.name}
                      </button>
                      <span className="text-xs uppercase font-extrabold tracking-wider text-blue-500">
                        Tópico Ativo
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <h3 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {activeTopic.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() => handleDeleteTopic(activeTopic)}
                        className="text-xs text-red-500 hover:text-red-700 hover:underline font-bold"
                        title="Excluir este tópico"
                      >
                        <i className="fas fa-trash mr-1"></i> Excluir Tópico
                      </button>
                    </div>
                  </div>

                  {/* Sub-Aba: Conteúdos vs Questões */}
                  <div className={`flex p-1 rounded-2xl ${isDarkMode ? 'bg-slate-900' : 'bg-gray-100'}`}>
                    <button
                      type="button"
                      onClick={() => setTopicSubView('content')}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 ${
                        topicSubView === 'content'
                          ? 'bg-blue-600 text-white shadow-md'
                          : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <i className="fas fa-book-open"></i>
                      <span>Conteúdo Didático</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTopicSubView('questions')}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 ${
                        topicSubView === 'questions'
                          ? 'bg-blue-600 text-white shadow-md'
                          : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <i className="fas fa-question-circle"></i>
                      <span>Banco de Questões ({activeTopicQuestions.length})</span>
                    </button>
                  </div>
                </div>

                {/* SUB-VIEW 1: CRUD DE CONTEÚDO DIDÁTICO DO TÓPICO */}
                {topicSubView === 'content' && (
                  <div className="space-y-6">
                    {/* Barra de Ações Rápidas de Conteúdo */}
                    <div className={`p-6 rounded-3xl shadow-sm border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isDarkMode ? 'bg-slate-800/70 border-slate-700' : 'bg-white border-gray-200'
                    }`}>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                            hasCustomStudyMaterial && hasCustomStudyMaterial(activeTopic.id)
                              ? 'bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30'
                              : 'bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/30'
                          }`}>
                            {hasCustomStudyMaterial && hasCustomStudyMaterial(activeTopic.id)
                              ? 'Armazenamento Local Ativo (Customizado)'
                              : 'Conteúdo Original do Sistema'}
                          </span>
                        </div>
                        <h4 className={`text-lg font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          Apostila e Material Teórico
                        </h4>
                        <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                          Edite o texto pedagógico, fundamentação, diagrama ASCII, código e boas práticas salvos no navegador e exportáveis em JSON.
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <input
                          type="file"
                          ref={materialFileInputRef}
                          onChange={(e) => handleImportMaterialFile(activeTopic, e)}
                          accept=".json"
                          className="hidden"
                        />

                        <button
                          type="button"
                          onClick={() => handleExportTopicMaterial(activeTopic)}
                          className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                            isDarkMode
                              ? 'bg-slate-700 text-blue-300 border-slate-600 hover:bg-slate-600'
                              : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                          }`}
                          title="Baixar material deste tópico como arquivo .json"
                        >
                          <i className="fas fa-file-export"></i>
                          <span>Exportar JSON</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => materialFileInputRef.current?.click()}
                          className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                            isDarkMode
                              ? 'bg-slate-700 text-slate-200 border-slate-600 hover:bg-slate-600'
                              : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                          }`}
                          title="Carregar arquivo .json de material didático"
                        >
                          <i className="fas fa-file-import"></i>
                          <span>Importar JSON</span>
                        </button>

                        {hasCustomStudyMaterial && hasCustomStudyMaterial(activeTopic.id) && (
                          <button
                            type="button"
                            onClick={() => handleResetTopicMaterial(activeTopic)}
                            className="px-3 py-2 rounded-xl text-xs font-bold text-rose-600 border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all flex items-center gap-1.5"
                            title="Excluir alterações salvas e restaurar conteúdo padrão"
                          >
                            <i className="fas fa-trash-can"></i>
                            <span>Restaurar Padrão</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setEditingMaterialTopicId(activeTopic.id)}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all flex items-center gap-1.5"
                        >
                          <i className="fas fa-pen-to-square"></i>
                          <span>Abrir Editor Completo</span>
                        </button>
                      </div>
                    </div>

                    {/* Prévia do Conteúdo do Tópico */}
                    {getStudyMaterial && (
                      <div className={`p-6 rounded-3xl shadow-sm border ${
                        isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
                      }`}>
                        <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100 dark:border-slate-700">
                          <h5 className={`font-bold text-base flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            <i className="fas fa-eye text-blue-500"></i>
                            <span>Visualização do Conteúdo Atual</span>
                          </h5>
                          <button
                            type="button"
                            onClick={() => setEditingMaterialTopicId(activeTopic.id)}
                            className="text-xs text-blue-500 hover:underline font-bold"
                          >
                            Editar no Modo Completo →
                          </button>
                        </div>

                        <StudyMaterialContent
                          material={getStudyMaterial(activeTopic)}
                          isDarkMode={isDarkMode}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* SUB-VIEW 2: CRUD DE QUESTÕES DO TÓPICO */}
                {topicSubView === 'questions' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <input
                      type="file"
                      ref={questionsFileInputRef}
                      onChange={(e) => handleImportQuestionsFile(activeTopic, e)}
                      accept=".json"
                      className="hidden"
                    />

                    {/* Formulário de Questão */}
                    <div className={`lg:col-span-5 p-6 rounded-3xl shadow-md border h-fit sticky top-20 ${
                      isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {editingQuestion ? 'Editar Questão' : 'Nova Questão'}
                        </h4>
                        <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300">
                          {activeTopic.name}
                        </span>
                      </div>

                      <form onSubmit={handleQuestionSubmit} className="space-y-4">
                        <div>
                          <label className={`block text-xs font-bold mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                            Enunciado da Questão
                          </label>
                          <textarea
                            value={questionForm.question || ''}
                            onChange={(e) => setQuestionForm({ ...questionForm, question: e.target.value })}
                            rows={3}
                            className={`w-full px-3.5 py-2.5 text-sm rounded-xl border transition-all outline-none resize-none ${
                              isDarkMode
                                ? 'bg-slate-700 border-slate-600 text-white focus:border-blue-500'
                                : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
                            }`}
                            placeholder="Digite o enunciado claro e objetivo da questão..."
                            required
                          />
                        </div>

                        <div className="space-y-2.5">
                          <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                            Alternativas (Selecione a correta no botão redondo)
                          </label>
                          {questionForm.options?.map((opt, idx) => (
                            <div key={`opt-${idx}`} className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="correctAnswerTopic"
                                checked={questionForm.correctAnswer === idx}
                                onChange={() => setQuestionForm({ ...questionForm, correctAnswer: idx })}
                                className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                title="Marcar como alternativa correta"
                              />
                              <input
                                type="text"
                                value={opt || ''}
                                onChange={(e) => {
                                  const newOpts = [...(questionForm.options || [])];
                                  newOpts[idx] = e.target.value;
                                  setQuestionForm({ ...questionForm, options: newOpts });
                                }}
                                className={`flex-grow px-3 py-2 text-sm rounded-xl border transition-all outline-none ${
                                  isDarkMode
                                    ? 'bg-slate-700 border-slate-600 text-white focus:border-blue-500'
                                    : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
                                }`}
                                placeholder={`Alternativa ${String.fromCharCode(65 + idx)}`}
                                required
                              />
                            </div>
                          ))}
                        </div>

                        <div>
                          <label className={`block text-xs font-bold mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                            Explicação / Justificativa Pedagógica
                          </label>
                          <textarea
                            value={questionForm.explanation || ''}
                            onChange={(e) => setQuestionForm({ ...questionForm, explanation: e.target.value })}
                            rows={3}
                            className={`w-full px-3.5 py-2.5 text-sm rounded-xl border transition-all outline-none resize-none ${
                              isDarkMode
                                ? 'bg-slate-700 border-slate-600 text-white focus:border-blue-500'
                                : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
                            }`}
                            placeholder="Por que esta é a alternativa correta? Justifique pedagogicamente..."
                          />
                        </div>

                        <div className="flex gap-2 pt-2">
                          <button
                            type="submit"
                            className="flex-grow bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl shadow-md transition-all text-sm"
                          >
                            {editingQuestion ? 'Salvar Alterações' : 'Criar Questão'}
                          </button>
                          {editingQuestion && (
                            <button
                              type="button"
                              onClick={() => {
                                setEditingQuestion(null);
                                setQuestionForm({
                                  question: '',
                                  options: ['', '', '', '', ''],
                                  correctAnswer: 0,
                                  explanation: ''
                                });
                              }}
                              className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                                isDarkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              Cancelar
                            </button>
                          )}
                        </div>
                      </form>
                    </div>

                    {/* Lista de Questões do Tópico */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <h4 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Questões deste Tópico ({activeTopicQuestions.length})
                          </h4>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleExportTopicQuestions(activeTopic)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                              isDarkMode ? 'bg-slate-800 text-blue-300 border-slate-700 hover:bg-slate-700' : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                            }`}
                            title="Exportar questões deste tópico em JSON"
                          >
                            <i className="fas fa-file-export"></i>
                            <span>Exportar JSON</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => questionsFileInputRef.current?.click()}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                              isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                            }`}
                            title="Importar arquivo JSON de questões"
                          >
                            <i className="fas fa-file-import"></i>
                            <span>Importar JSON</span>
                          </button>
                        </div>
                      </div>

                      {/* Busca de Questões */}
                      <div className="relative">
                        <i className={`fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`}></i>
                        <input
                          type="text"
                          placeholder="Buscar no enunciado, opções ou justificativa..."
                          value={questionSearch}
                          onChange={(e) => setQuestionSearch(e.target.value)}
                          className={`w-full pl-9 pr-8 py-2 text-sm rounded-xl border transition-all outline-none ${
                            isDarkMode
                              ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500'
                              : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500'
                          }`}
                        />
                        {questionSearch && (
                          <button
                            type="button"
                            onClick={() => setQuestionSearch('')}
                            className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs hover:opacity-70 ${
                              isDarkMode ? 'text-slate-400' : 'text-gray-400'
                            }`}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        )}
                      </div>

                      {/* Lista filtrada de Questões */}
                      <div className="space-y-3">
                        {activeTopicQuestions.length === 0 ? (
                          <div className={`p-8 text-center rounded-2xl border border-dashed ${
                            isDarkMode ? 'bg-slate-800/40 border-slate-700 text-slate-400' : 'bg-gray-50 border-gray-300 text-gray-500'
                          }`}>
                            <p className="text-sm font-semibold">Nenhuma questão cadastrada para este tópico.</p>
                            <p className="text-xs mt-1">Utilize o formulário ao lado para cadastrar ou importe um arquivo JSON.</p>
                          </div>
                        ) : (
                          activeTopicQuestions
                            .filter(q => {
                              const query = questionSearch.trim().toLowerCase();
                              if (!query) return true;
                              return q.question.toLowerCase().includes(query) ||
                                q.options.some(opt => opt.toLowerCase().includes(query)) ||
                                q.explanation.toLowerCase().includes(query);
                            })
                            .map((q, qIndex) => (
                              <div
                                key={q.id}
                                className={`p-5 rounded-2xl shadow-sm border transition-all ${
                                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
                                }`}
                              >
                                <div className="flex justify-between items-start gap-2 mb-2">
                                  <span className="text-xs font-bold text-blue-500">
                                    Questão #{qIndex + 1}
                                  </span>
                                  <div className="flex gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => handleStartEditQuestion(q)}
                                      className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center text-xs"
                                      title="Editar Questão"
                                    >
                                      <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteQuestion(q)}
                                      className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-950/40 text-red-600 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center text-xs"
                                      title="Excluir Questão"
                                    >
                                      <i className="fas fa-trash"></i>
                                    </button>
                                  </div>
                                </div>

                                <h5 className={`font-bold text-sm mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {q.question}
                                </h5>

                                <div className="space-y-1.5 mb-3">
                                  {q.options.map((opt, i) => (
                                    <div
                                      key={`opt-view-${i}`}
                                      className={`text-xs p-2 rounded-lg flex items-center gap-2 ${
                                        i === q.correctAnswer
                                          ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800'
                                          : isDarkMode ? 'text-slate-400 bg-slate-750' : 'text-gray-600 bg-gray-50'
                                      }`}
                                    >
                                      <span className="font-bold">{String.fromCharCode(65 + i)})</span>
                                      {i === q.correctAnswer && <i className="fas fa-check-circle text-emerald-600"></i>}
                                      <span>{opt}</span>
                                    </div>
                                  ))}
                                </div>

                                {q.explanation && (
                                  <div className={`p-2.5 rounded-xl text-xs ${
                                    isDarkMode ? 'bg-slate-700/50 text-slate-300 border border-slate-600/50' : 'bg-blue-50/70 text-blue-800 border border-blue-100'
                                  }`}>
                                    <span className="font-bold block mb-0.5">Explicação:</span>
                                    <span>{q.explanation}</span>
                                  </div>
                                )}
                              </div>
                            ))
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
