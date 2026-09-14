import React, { useState, useRef } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { StudyMaterial, SyntaxDeconstruction, StudyMaterialTab } from '../types';
import { MermaidBlock } from './MermaidBlock';

interface StudyMaterialEditorProps {
  initialMaterial: StudyMaterial;
  isDarkMode: boolean;
  isCustomized?: boolean;
  onSave: (updatedMaterial: StudyMaterial) => void;
  onCancel: () => void;
  onResetToDefault?: () => void;
  renderPreview: (previewMaterial: StudyMaterial) => React.ReactNode;
}

export const StudyMaterialEditor: React.FC<StudyMaterialEditorProps> = ({
  initialMaterial,
  isDarkMode,
  isCustomized = false,
  onSave,
  onCancel,
  onResetToDefault,
  renderPreview
}) => {
  // Nome do tópico
  const [topicName, setTopicName] = useState(initialMaterial.topicName || '');

  // Conteúdo Markdown Primário (inicia limpo se o material for novo)
  const [markdownContent, setMarkdownContent] = useState<string>(
    initialMaterial.markdownContent || ''
  );
  const [markdownViewMode, setMarkdownViewMode] = useState<'editor' | 'split' | 'preview'>('split');
  const [codeLanguageToInsert, setCodeLanguageToInsert] = useState('typescript');
  const markdownTextareaRef = useRef<HTMLTextAreaElement>(null);

  // 1. Introdução
  const [introParagraphs, setIntroParagraphs] = useState<string[]>(
    initialMaterial.introduction && initialMaterial.introduction.length > 0
      ? initialMaterial.introduction
      : (initialMaterial.summary ? [initialMaterial.summary] : [])
  );

  // 2. Fundamentação Teórica e Diagrama ASCII
  const [theoryDescription, setTheoryDescription] = useState(
    initialMaterial.theoreticalFoundation?.description || ''
  );
  const [asciiDiagram, setAsciiDiagram] = useState(
    initialMaterial.theoreticalFoundation?.asciiDiagram || ''
  );

  // 3. Demonstração Prática de Código
  const [codeTitle, setCodeTitle] = useState(
    initialMaterial.codeSnippet?.title || initialMaterial.codeSnippets?.[0]?.title || ''
  );
  const [codeLanguage, setCodeLanguage] = useState(
    initialMaterial.codeSnippet?.language || initialMaterial.codeSnippets?.[0]?.language || 'typescript'
  );
  const [codeBody, setCodeBody] = useState(
    initialMaterial.codeSnippet?.code || initialMaterial.codeSnippets?.[0]?.code || ''
  );

  // 4. Desconstrução da Sintaxe
  const [syntaxList, setSyntaxList] = useState<SyntaxDeconstruction[]>(
    initialMaterial.syntaxDeconstruction || []
  );

  // 5. Boas Práticas e Armadilhas
  const [pitfallsList, setPitfallsList] = useState<string[]>(
    initialMaterial.bestPracticesAndPitfalls || initialMaterial.bestPractices || []
  );

  // Abas customizadas extras (Markdown)
  const [customTabs, setCustomTabs] = useState<StudyMaterialTab[]>(
    initialMaterial.customTabs ? [...initialMaterial.customTabs] : []
  );

  // Controle de Abas do Editor vs Live Preview
  const [activeMode, setActiveMode] = useState<'edit' | 'preview'>('edit');
  // Se o material tem markdownContent ou é novo, inicia diretamente em 'markdown'
  const [editorSection, setEditorSection] = useState<'markdown' | 'tabs' | 'intro' | 'theory' | 'code' | 'syntax' | 'pitfalls'>('markdown');
  const [toastNotification, setToastNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToastNotification({ type, message });
    setTimeout(() => {
      setToastNotification(null);
    }, 3500);
  };

  // Helper para inserir sintaxe Markdown na posição do cursor
  const insertMarkdownSyntax = (prefix: string, suffix: string = '', defaultPlaceholder: string = '') => {
    const textarea = markdownTextareaRef.current;
    if (!textarea) {
      setMarkdownContent(prev => prev + prefix + defaultPlaceholder + suffix);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = textarea.value;
    const selectedText = currentText.substring(start, end);

    const insertion = selectedText || defaultPlaceholder;
    const newText = currentText.substring(0, start) + prefix + insertion + suffix + currentText.substring(end);

    setMarkdownContent(newText);

    // Reposiciona o cursor após a inserção
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + prefix.length + insertion.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 50);
  };

  // Inserir Template Completo de Aula
  const insertFullLessonTemplate = () => {
    const template = `# ${topicName || 'Título da Aula'}

## 🎯 Objetivos de Aprendizagem
- Compreender o propósito e a fundamentação prática do tema.
- Implementar e testar a solução em código real.
- Reconhecer boas práticas e evitar armadilhas frequentes no mercado.

---

## 📖 1. Contextualização e Fundamentação
Explique aqui a contextualização da tecnologia, seu surgimento e o problema real que ela resolve.

> 💡 **Dica do Professor:** Relacione este conceito com cenários práticos de arquitetura e desempenho em produção.

---

## 💻 2. Demonstração Prática

Abaixo está a implementação recomendada:

\`\`\`typescript
// Exemplo demonstrativo
export function executeDemonstration() {
  console.log("Executando implementação de ${topicName || 'exemplo'}...");
}
\`\`\`

---

## 📊 3. Tabela Comparativa de Abordagens

| Característica | Abordagem A | Abordagem B |
| :--- | :--- | :--- |
| **Complexidade** | Baixa | Média / Alta |
| **Desempenho** | Rápido | Escala Horizontal |
| **Caso de Uso** | Scripts e Prototipagem | Ambientes de Alta Disponibilidade |

---

## ⚠️ 4. Boas Práticas e Pontos de Atenção
> ⚠️ **Atenção:** Evite acoplamentos desnecessários e valide sempre as entradas do usuário.
- Mantenha testes unitários cobrindo os caminhos críticos.
- Documente decisões arquiteturais para a equipe.
`;
    setMarkdownContent(template);
    triggerToast('Template estruturado de aula inserido com sucesso!');
  };

  // Gera o objeto StudyMaterial consolidado a partir do estado atual
  const buildCurrentMaterial = (): StudyMaterial => {
    return {
      ...initialMaterial,
      topicName: topicName.trim() || initialMaterial.topicName,
      markdownContent: markdownContent.trim().length > 0 ? markdownContent : undefined,
      introduction: introParagraphs.filter(p => p.trim().length > 0),
      theoreticalFoundation: (theoryDescription.trim() || asciiDiagram.trim()) ? {
        description: theoryDescription,
        asciiDiagram: asciiDiagram.trim() ? asciiDiagram : undefined
      } : undefined,
      codeSnippet: (codeBody.trim() || codeTitle.trim()) ? {
        title: codeTitle || 'Demonstração de Código',
        language: codeLanguage,
        code: codeBody
      } : undefined,
      syntaxDeconstruction: syntaxList.filter(s => s.lineOrKeyword.trim().length > 0),
      bestPracticesAndPitfalls: pitfallsList.filter(p => p.trim().length > 0),
      customTabs: customTabs.length > 0 ? customTabs : undefined
    };
  };

  const handleExportJSON = () => {
    const current = buildCurrentMaterial();
    const safeName = (topicName || initialMaterial.topicId).toLowerCase().replace(/[^a-z0-9]/g, '-');
    const blob = new Blob([JSON.stringify(current, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conteudo-topico-${safeName}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    triggerToast('Arquivo JSON gerado e exportado com sucesso!');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text) as StudyMaterial;
        if (!parsed || typeof parsed !== 'object') throw new Error('Arquivo inválido');
        if (parsed.topicName) setTopicName(parsed.topicName);
        if (parsed.markdownContent !== undefined) setMarkdownContent(parsed.markdownContent);
        if (Array.isArray(parsed.introduction)) setIntroParagraphs(parsed.introduction);
        if (parsed.theoreticalFoundation?.description) setTheoryDescription(parsed.theoreticalFoundation.description);
        if (parsed.theoreticalFoundation?.asciiDiagram) setAsciiDiagram(parsed.theoreticalFoundation.asciiDiagram);
        if (parsed.codeSnippet?.title) setCodeTitle(parsed.codeSnippet.title);
        if (parsed.codeSnippet?.language) setCodeLanguage(parsed.codeSnippet.language);
        if (parsed.codeSnippet?.code) setCodeBody(parsed.codeSnippet.code);
        if (Array.isArray(parsed.syntaxDeconstruction)) setSyntaxList(parsed.syntaxDeconstruction);
        if (Array.isArray(parsed.bestPracticesAndPitfalls)) setPitfallsList(parsed.bestPracticesAndPitfalls);
        if (Array.isArray(parsed.customTabs)) setCustomTabs(parsed.customTabs);
        triggerToast('Conteúdo do arquivo JSON importado com sucesso!');
      } catch (err) {
        console.error(err);
        triggerToast('Erro ao carregar o arquivo JSON. Verifique se o formato é compatível.', 'error');
      }
      if (e.target) e.target.value = '';
    };
    reader.readAsText(file);
  };

  const handleSave = () => {
    const updated = buildCurrentMaterial();
    onSave(updated);
    triggerToast('Apostila salva com sucesso no armazenamento local!');
  };

  // Funções de manipulação da Introdução
  const handleIntroChange = (index: number, val: string) => {
    const next = [...introParagraphs];
    next[index] = val;
    setIntroParagraphs(next);
  };

  const handleAddIntroParagraph = () => {
    setIntroParagraphs([...introParagraphs, '']);
  };

  const handleRemoveIntroParagraph = (index: number) => {
    setIntroParagraphs(introParagraphs.filter((_, i) => i !== index));
  };

  // Funções da Desconstrução da Sintaxe
  const handleSyntaxChange = (index: number, field: keyof SyntaxDeconstruction, val: string) => {
    const next = [...syntaxList];
    next[index] = { ...next[index], [field]: val };
    setSyntaxList(next);
  };

  const handleAddSyntaxRow = () => {
    setSyntaxList([
      ...syntaxList,
      { lineOrKeyword: '', spokenReasoning: '', sideEffect: '' }
    ]);
  };

  const handleRemoveSyntaxRow = (index: number) => {
    setSyntaxList(syntaxList.filter((_, i) => i !== index));
  };

  // Funções de Boas Práticas
  const handlePitfallChange = (index: number, val: string) => {
    const next = [...pitfallsList];
    next[index] = val;
    setPitfallsList(next);
  };

  const handleAddPitfall = () => {
    setPitfallsList([...pitfallsList, '']);
  };

  const handleRemovePitfall = (index: number) => {
    setPitfallsList(pitfallsList.filter((_, i) => i !== index));
  };

  // Funções das Abas Customizadas (Markdown)
  const handleAddCustomTab = () => {
    const newId = `tab-${Date.now()}`;
    setCustomTabs([
      ...customTabs,
      {
        id: newId,
        label: `Módulo ${customTabs.length + 1}`,
        icon: 'fa-file-lines',
        content: `### Novo Módulo\n\nEscreva seu conteúdo em Markdown aqui.`
      }
    ]);
  };

  const handleUpdateCustomTab = (index: number, field: keyof StudyMaterialTab, val: string) => {
    const next = [...customTabs];
    next[index] = { ...next[index], [field]: val };
    setCustomTabs(next);
  };

  const handleRemoveCustomTab = (index: number) => {
    setCustomTabs(customTabs.filter((_, i) => i !== index));
  };

  // Contadores de métricas para o Markdown
  const wordCount = markdownContent.trim() ? markdownContent.trim().split(/\s+/).length : 0;
  const charCount = markdownContent.length;
  const lineCount = markdownContent ? markdownContent.split('\n').length : 0;

  return (
    <div className={`rounded-3xl border shadow-2xl overflow-hidden transition-all duration-300 animate-in fade-in ${
      isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-gray-200 text-gray-900'
    }`}>
      {/* Barra de Topo com Alternância Editar / Preview e Ações */}
      <div className={`p-4 md:px-6 border-b flex flex-wrap items-center justify-between gap-4 ${
        isDarkMode ? 'bg-slate-900/95 border-slate-700' : 'bg-slate-50 border-gray-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold text-lg">
            <i className="fas fa-file-pen"></i>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase font-extrabold tracking-wider text-blue-500">
                Editor de Conteúdo Didático
              </span>
              {isCustomized && (
                <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Personalizado
                </span>
              )}
            </div>
            <h2 className="text-base md:text-lg font-bold truncate max-w-md">
              {topicName || 'Apostila do Tópico'}
            </h2>
          </div>
        </div>

        {/* Botoes Centrais: Editar vs Pré-visualizar (Live Preview) */}
        <div className="flex items-center bg-gray-200/80 dark:bg-slate-800 p-1 rounded-xl border border-gray-300/50 dark:border-slate-700">
          <button
            id="btn-tab-mode-edit"
            type="button"
            onClick={() => setActiveMode('edit')}
            className={`px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all flex items-center gap-2 ${
              activeMode === 'edit'
                ? 'bg-blue-600 text-white shadow-sm'
                : isDarkMode
                ? 'text-slate-400 hover:text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="fas fa-edit"></i>
            <span>Edição</span>
          </button>

          <button
            id="btn-tab-mode-preview"
            type="button"
            onClick={() => setActiveMode('preview')}
            className={`px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all flex items-center gap-2 ${
              activeMode === 'preview'
                ? 'bg-blue-600 text-white shadow-sm'
                : isDarkMode
                ? 'text-slate-400 hover:text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="fas fa-eye"></i>
            <span>Pré-visualização do Aluno</span>
          </button>
        </div>

        {/* Botões de Ação: Exportar / Importar / Restaurar / Cancelar / Salvar */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Input oculto para import de JSON */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportJSON}
            accept=".json"
            className="hidden"
          />

          <button
            type="button"
            onClick={handleExportJSON}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
              isDarkMode
                ? 'border-blue-900/50 text-blue-300 hover:bg-slate-800'
                : 'border-blue-200 text-blue-700 hover:bg-blue-50'
            }`}
            title="Exportar conteúdo completo como JSON"
          >
            <i className="fas fa-file-export text-xs"></i>
            <span className="hidden sm:inline">Exportar JSON</span>
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
              isDarkMode
                ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
            title="Importar conteúdo de arquivo JSON"
          >
            <i className="fas fa-file-import text-xs"></i>
            <span className="hidden sm:inline">Importar JSON</span>
          </button>

          {isCustomized && onResetToDefault && (
            <button
              id="btn-reset-material-default"
              type="button"
              onClick={() => setShowResetConfirmModal(true)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
                isDarkMode
                  ? 'border-rose-900/50 text-rose-300 hover:bg-rose-950/40'
                  : 'border-rose-200 text-rose-600 hover:bg-rose-50'
              }`}
              title="Restaurar apostila padrão"
            >
              <i className="fas fa-rotate-left text-xs"></i>
              <span className="hidden md:inline">Restaurar</span>
            </button>
          )}

          <button
            type="button"
            onClick={onCancel}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
              isDarkMode
                ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            Cancelar
          </button>

          <button
            id="btn-save-study-material"
            type="button"
            onClick={handleSave}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all flex items-center gap-1.5 active:scale-95"
          >
            <i className="fas fa-floppy-disk"></i>
            <span>Salvar Apostila</span>
          </button>
        </div>
      </div>

      {/* Toast Feedback */}
      {toastNotification && (
        <div className={`px-4 py-2.5 text-center text-xs md:text-sm font-bold flex items-center justify-center gap-2 animate-in slide-in-from-top-2 duration-300 ${
          toastNotification.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
        }`}>
          <i className={`fas ${toastNotification.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}`}></i>
          <span>{toastNotification.message}</span>
        </div>
      )}

      {/* CONTEÚDO PRINCIPAL: MODO PREVIEW */}
      {activeMode === 'preview' && (
        <div className="p-4 md:p-8 bg-slate-900/10">
          <div className="mb-4 flex items-center justify-between text-xs text-gray-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 font-bold">
              <i className="fas fa-eye text-blue-500"></i> Visualização exatamente como o aluno verá:
            </span>
            <button
              onClick={() => setActiveMode('edit')}
              className="text-blue-500 hover:underline font-bold"
            >
              Voltar para a área de edição
            </button>
          </div>
          {renderPreview(buildCurrentMaterial())}
        </div>
      )}

      {/* CONTEÚDO PRINCIPAL: MODO EDIÇÃO */}
      {activeMode === 'edit' && (
        <div className="p-4 md:p-8">
          {/* Campo de Título do Tópico */}
          <div className="mb-6 pb-4 border-b border-gray-200 dark:border-slate-800">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1.5">
              Título do Tópico / Apostila
            </label>
            <input
              type="text"
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
              placeholder="Ex: Introdução ao Docker e Contêineres"
              className={`w-full p-3 text-sm md:text-base font-bold rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>

          {/* Navegação entre seções da apostila */}
          <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-gray-200 dark:border-slate-800">
            {[
              { 
                id: 'markdown', 
                label: 'Apostila em Markdown', 
                icon: 'fa-file-lines', 
                badge: markdownContent.trim() ? `${wordCount} palavras` : 'Em Branco' 
              },
              { id: 'tabs', label: 'Módulos Extras', icon: 'fa-folder-plus', badge: customTabs.length || undefined }
            ].map(sec => {
              const isActive = editorSection === sec.id;
              return (
                <button
                  key={sec.id}
                  id={`edit-sec-btn-${sec.id}`}
                  type="button"
                  onClick={() => setEditorSection(sec.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : isDarkMode
                      ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <i className={`fas ${sec.icon}`}></i>
                  <span>{sec.label}</span>
                  {sec.badge !== undefined && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive 
                        ? 'bg-blue-700 text-white' 
                        : isDarkMode 
                        ? 'bg-slate-700 text-slate-300' 
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {sec.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* SEÇÃO PRINCIPAL: APOSTILA EM FORMATO MARKDOWN COM TOOLBAR RICA */}
          {editorSection === 'markdown' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base md:text-lg font-bold flex items-center gap-2">
                    <span className="text-blue-500">📝</span> Editor Completo em Formato Markdown
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} mt-0.5`}>
                    Use a barra de ferramentas para inserir títulos, códigos, tabelas comparativas, listas e notas pedagógicas.
                  </p>
                </div>

                {/* Alternância de Modo de Visualização do Markdown */}
                <div className="flex items-center gap-1 bg-gray-100 dark:bg-slate-800 p-1 rounded-xl self-start sm:self-auto border border-gray-200 dark:border-slate-700 text-xs">
                  <button
                    type="button"
                    onClick={() => setMarkdownViewMode('editor')}
                    className={`px-2.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                      markdownViewMode === 'editor'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                    title="Apenas Editor de Código"
                  >
                    <i className="fas fa-code"></i> Editor
                  </button>
                  <button
                    type="button"
                    onClick={() => setMarkdownViewMode('split')}
                    className={`px-2.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                      markdownViewMode === 'split'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                    title="Editor e Prévia Lado a Lado"
                  >
                    <i className="fas fa-columns"></i> Lado a Lado
                  </button>
                  <button
                    type="button"
                    onClick={() => setMarkdownViewMode('preview')}
                    className={`px-2.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                      markdownViewMode === 'preview'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                    title="Apenas Prévia Formatada"
                  >
                    <i className="fas fa-eye"></i> Prévia
                  </button>
                </div>
              </div>

              {/* BARRA DE FERRAMENTAS MARKDOWN (TOOLBAR) */}
              <div className={`p-2.5 rounded-2xl border flex flex-wrap items-center gap-1.5 ${
                isDarkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-gray-100/90 border-gray-200'
              }`}>
                {/* Cabeçalhos */}
                <div className="flex items-center gap-1 pr-2 border-r border-gray-300 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => insertMarkdownSyntax('# ', '', 'Título Principal H1')}
                    className={`px-2 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      isDarkMode ? 'hover:bg-slate-700 text-slate-200' : 'hover:bg-gray-200 text-gray-800'
                    }`}
                    title="Título H1 (# Título)"
                  >
                    H1
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdownSyntax('## ', '', 'Subtítulo H2')}
                    className={`px-2 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      isDarkMode ? 'hover:bg-slate-700 text-slate-200' : 'hover:bg-gray-200 text-gray-800'
                    }`}
                    title="Subtítulo H2 (## Subtítulo)"
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdownSyntax('### ', '', 'Seção H3')}
                    className={`px-2 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      isDarkMode ? 'hover:bg-slate-700 text-slate-200' : 'hover:bg-gray-200 text-gray-800'
                    }`}
                    title="Seção H3 (### Seção)"
                  >
                    H3
                  </button>
                </div>

                {/* Estilização Básica */}
                <div className="flex items-center gap-1 pr-2 border-r border-gray-300 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => insertMarkdownSyntax('**', '**', 'texto em negrito')}
                    className={`p-2 rounded-lg text-xs font-bold transition-all ${
                      isDarkMode ? 'hover:bg-slate-700 text-slate-200' : 'hover:bg-gray-200 text-gray-800'
                    }`}
                    title="Negrito (**texto**)"
                  >
                    <i className="fas fa-bold"></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdownSyntax('*', '*', 'texto em itálico')}
                    className={`p-2 rounded-lg text-xs font-bold transition-all ${
                      isDarkMode ? 'hover:bg-slate-700 text-slate-200' : 'hover:bg-gray-200 text-gray-800'
                    }`}
                    title="Itálico (*texto*)"
                  >
                    <i className="fas fa-italic"></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdownSyntax('~~', '~~', 'texto tachado')}
                    className={`p-2 rounded-lg text-xs font-bold transition-all ${
                      isDarkMode ? 'hover:bg-slate-700 text-slate-200' : 'hover:bg-gray-200 text-gray-800'
                    }`}
                    title="Tachado (~~texto~~)"
                  >
                    <i className="fas fa-strikethrough"></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdownSyntax('`', '`', 'codigoInline()')}
                    className={`p-2 rounded-lg text-xs font-mono font-bold transition-all ${
                      isDarkMode ? 'hover:bg-slate-700 text-cyan-300' : 'hover:bg-gray-200 text-cyan-700'
                    }`}
                    title="Código Inline (`código`)"
                  >
                    &lt;/&gt;
                  </button>
                </div>

                {/* Listas */}
                <div className="flex items-center gap-1 pr-2 border-r border-gray-300 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => insertMarkdownSyntax('\n- ', '', 'Item da lista')}
                    className={`p-2 rounded-lg text-xs font-bold transition-all ${
                      isDarkMode ? 'hover:bg-slate-700 text-slate-200' : 'hover:bg-gray-200 text-gray-800'
                    }`}
                    title="Lista com Marcadores (- Item)"
                  >
                    <i className="fas fa-list-ul"></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdownSyntax('\n1. ', '', 'Primeiro passo')}
                    className={`p-2 rounded-lg text-xs font-bold transition-all ${
                      isDarkMode ? 'hover:bg-slate-700 text-slate-200' : 'hover:bg-gray-200 text-gray-800'
                    }`}
                    title="Lista Numerada (1. Item)"
                  >
                    <i className="fas fa-list-ol"></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdownSyntax('\n- [ ] ', '', 'Tarefa pendente')}
                    className={`p-2 rounded-lg text-xs font-bold transition-all ${
                      isDarkMode ? 'hover:bg-slate-700 text-slate-200' : 'hover:bg-gray-200 text-gray-800'
                    }`}
                    title="Checklist / Lista de Tarefas (- [ ] Tarefa)"
                  >
                    <i className="fas fa-list-check"></i>
                  </button>
                </div>

                {/* Callouts Didáticos */}
                <div className="flex items-center gap-1 pr-2 border-r border-gray-300 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => insertMarkdownSyntax('\n> 💡 **Dica do Professor:** ', '', 'Insira uma dica didática ou recomendação prática aqui.')}
                    className={`px-2 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 text-amber-500 ${
                      isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'
                    }`}
                    title="Inserir Dica Pedagógica"
                  >
                    <span>💡 Dica</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdownSyntax('\n> ⚠️ **Atenção:** ', '', 'Cuidado com erros comuns e armadilhas de arquitetura.')}
                    className={`px-2 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 text-rose-500 ${
                      isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'
                    }`}
                    title="Inserir Alerta de Risco"
                  >
                    <span>⚠️ Alerta</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdownSyntax('\n> 📌 **Conceito Fundamental:** ', '', 'Explique o princípio central indispensável para concursos e mercado.')}
                    className={`px-2 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 text-blue-500 ${
                      isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'
                    }`}
                    title="Inserir Conceito Fundamental"
                  >
                    <span>📌 Conceito</span>
                  </button>
                </div>

                {/* Inserções Estruturais (Código, Tabela, Link, Linha) */}
                <div className="flex items-center gap-1 pr-2 border-r border-gray-300 dark:border-slate-700">
                  <div className="flex items-center gap-1">
                    <select
                      value={codeLanguageToInsert}
                      onChange={(e) => setCodeLanguageToInsert(e.target.value)}
                      className={`text-[11px] p-1 rounded-lg border outline-none font-mono ${
                        isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      title="Linguagem do bloco de código"
                    >
                      <option value="typescript">TS</option>
                      <option value="javascript">JS</option>
                      <option value="python">Python</option>
                      <option value="sql">SQL</option>
                      <option value="bash">Bash</option>
                      <option value="yaml">YAML</option>
                      <option value="json">JSON</option>
                      <option value="html">HTML</option>
                      <option value="css">CSS</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => insertMarkdownSyntax(`\n\`\`\`${codeLanguageToInsert}\n`, '\n```\n', '// Insira seu código aqui')}
                      className={`px-2 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                        isDarkMode ? 'hover:bg-slate-700 text-emerald-400' : 'hover:bg-gray-200 text-emerald-700'
                      }`}
                      title="Inserir Bloco de Código"
                    >
                      <i className="fas fa-code"></i> Bloco
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => insertMarkdownSyntax(
                      '\n| Recurso | Descrição | Exemplo Prático |\n| :--- | :--- | :--- |\n| Item A | Explicação detalhada | `exemploA()` |\n| Item B | Outra abordagem | `exemploB()` |\n'
                    )}
                    className={`p-2 rounded-lg text-xs font-bold transition-all ${
                      isDarkMode ? 'hover:bg-slate-700 text-purple-400' : 'hover:bg-gray-200 text-purple-700'
                    }`}
                    title="Inserir Tabela Comparativa Markdown"
                  >
                    <i className="fas fa-table"></i>
                  </button>

                  <button
                    type="button"
                    onClick={() => insertMarkdownSyntax('[', '](https://exemplo.com)', 'Texto do Link')}
                    className={`p-2 rounded-lg text-xs font-bold transition-all ${
                      isDarkMode ? 'hover:bg-slate-700 text-slate-200' : 'hover:bg-gray-200 text-gray-800'
                    }`}
                    title="Inserir Link"
                  >
                    <i className="fas fa-link"></i>
                  </button>

                  <button
                    type="button"
                    onClick={() => insertMarkdownSyntax('\n\n---\n\n')}
                    className={`p-2 rounded-lg text-xs font-bold transition-all ${
                      isDarkMode ? 'hover:bg-slate-700 text-slate-200' : 'hover:bg-gray-200 text-gray-800'
                    }`}
                    title="Inserir Linha Separadora (---)"
                  >
                    <i className="fas fa-minus"></i>
                  </button>

                  <button
                    type="button"
                    onClick={() => insertMarkdownSyntax('\n```mermaid\ngraph TD;\n    A[Início] --> B[Processo];\n    B --> C[Fim];\n```\n')}
                    className={`px-2 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      isDarkMode ? 'hover:bg-slate-700 text-teal-400' : 'hover:bg-gray-200 text-teal-700'
                    }`}
                    title="Inserir Diagrama / Grafo Mermaid"
                  >
                    <i className="fas fa-project-diagram"></i> <span className="hidden sm:inline">Mermaid</span>
                  </button>
                </div>

                {/* Templates Rápidos e Ações */}
                <div className="flex items-center gap-1 ml-auto">
                  <button
                    type="button"
                    onClick={insertFullLessonTemplate}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border border-blue-500/30 transition-all flex items-center gap-1"
                    title="Inserir estrutura didática completa de aula"
                  >
                    <i className="fas fa-wand-magic-sparkles"></i>
                    <span className="hidden lg:inline">Inserir Modelo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMarkdownContent('');
                      triggerToast('Área de Markdown limpa.');
                    }}
                    className={`p-2 rounded-lg text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition-all`}
                    title="Limpar texto do Markdown"
                  >
                    <i className="fas fa-trash-can"></i>
                  </button>
                </div>
              </div>

              {/* CORPO DO EDITOR MARKDOWN: SPLIT VIEW OU TELA CHEIA */}
              <div className={`grid ${markdownViewMode === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-4 items-start`}>
                {/* Painel do Editor de Texto */}
                {(markdownViewMode === 'editor' || markdownViewMode === 'split') && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-400">
                      <span className="font-bold flex items-center gap-1.5">
                        <i className="fas fa-keyboard"></i> Digitação em Markdown
                      </span>
                      <span className="font-mono">
                        {lineCount} linhas • {wordCount} palavras • {charCount} caracteres
                      </span>
                    </div>

                    <textarea
                      ref={markdownTextareaRef}
                      rows={20}
                      value={markdownContent}
                      onChange={(e) => setMarkdownContent(e.target.value)}
                      placeholder="# Comece a escrever a apostila didática aqui...&#10;&#10;Use títulos com ##, listas com -, blocos de código com ``` ou utilize a barra de botões acima."
                      className={`w-full p-4 font-mono text-xs md:text-sm rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500 transition-all leading-relaxed ${
                        isDarkMode
                          ? 'bg-slate-950 border-slate-700 text-slate-100 placeholder-slate-600'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                    />
                  </div>
                )}

                {/* Painel de Prévia em Tempo Real com remark-gfm */}
                {(markdownViewMode === 'preview' || markdownViewMode === 'split') && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-400">
                      <span className="font-bold flex items-center gap-1.5 text-blue-500">
                        <i className="fas fa-eye"></i> Renderização em Tempo Real (Preview)
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-500">
                        Suporte a GFM, Tabelas e Códigos
                      </span>
                    </div>

                    <div className={`p-6 rounded-2xl border min-h-[480px] max-h-[560px] overflow-y-auto ${
                      isDarkMode ? 'bg-slate-900/80 border-slate-700 text-slate-200' : 'bg-slate-50/90 border-gray-200 text-gray-900'
                    }`}>
                      {markdownContent.trim() ? (
                        <div className="markdown-body space-y-3">
                          <Markdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              h1: ({ ...props }) => <h1 className="text-xl font-bold my-3 text-blue-600 dark:text-blue-400 border-b pb-2 border-gray-200 dark:border-slate-700" {...props} />,
                              h2: ({ ...props }) => <h2 className="text-lg font-bold mt-5 mb-2 text-blue-600 dark:text-blue-400 flex items-center gap-2" {...props} />,
                              h3: ({ ...props }) => <h3 className="text-base font-bold mt-4 mb-2 text-slate-900 dark:text-white" {...props} />,
                              p: ({ ...props }) => <p className="text-xs md:text-sm leading-relaxed my-2 text-slate-900 dark:text-slate-300" {...props} />,
                              ul: ({ ...props }) => <ul className="list-disc pl-5 my-2 space-y-1 text-xs md:text-sm text-slate-700 dark:text-slate-300" {...props} />,
                              ol: ({ ...props }) => <ol className="list-decimal pl-5 my-2 space-y-1 text-xs md:text-sm text-slate-700 dark:text-slate-300" {...props} />,
                              blockquote: ({ ...props }) => (
                                <blockquote className={`border-l-4 border-amber-500 pl-3 py-2 my-3 italic rounded-r-lg text-xs md:text-sm ${
                                  isDarkMode ? 'bg-amber-950/20 border-amber-700 text-amber-200' : 'bg-amber-50 border-amber-400 text-amber-900'
                                }`} {...props} />
                              ),
                              code: ({ className, children, ...props }) => {
                                const codeString = String(children).trim();
                                const isMermaid = className?.includes('mermaid') || 
                                  codeString.startsWith('graph ') || 
                                  codeString.startsWith('flowchart ') || 
                                  codeString.startsWith('sequenceDiagram') || 
                                  codeString.startsWith('classDiagram') || 
                                  codeString.startsWith('stateDiagram') || 
                                  codeString.startsWith('erDiagram');

                                if (isMermaid) {
                                  return <MermaidBlock chart={codeString} />;
                                }

                                const isBlock = className?.includes('language-') || String(children).includes('\n');
                                if (isBlock) {
                                  return (
                                    <pre className="p-3 my-3 overflow-x-auto text-xs font-mono rounded-xl bg-slate-950 text-cyan-300 border border-slate-800">
                                      <code {...props}>{children}</code>
                                    </pre>
                                  );
                                }
                                return (
                                  <code className="px-1.5 py-0.5 rounded font-mono text-xs bg-slate-200 dark:bg-slate-800 text-cyan-700 dark:text-cyan-300 font-semibold" {...props}>
                                    {children}
                                  </code>
                                );
                              },
                              table: ({ ...props }) => (
                                <div className="my-4 overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700">
                                  <table className="w-full text-left text-xs border-collapse" {...props} />
                                </div>
                              ),
                              thead: ({ ...props }) => <thead className="bg-gray-100 dark:bg-slate-800 font-bold uppercase text-[10px]" {...props} />,
                              th: ({ ...props }) => <th className="px-3 py-2 border-b border-gray-200 dark:border-slate-700" {...props} />,
                              td: ({ ...props }) => <td className="px-3 py-2 border-b border-gray-100 dark:border-slate-800/60" {...props} />,
                            }}
                          >
                            {markdownContent}
                          </Markdown>
                        </div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center py-16 text-gray-400 dark:text-slate-500">
                          <i className="fas fa-file-circle-plus text-4xl mb-3 opacity-50 text-blue-500"></i>
                          <p className="font-bold text-sm">Apostila ainda sem conteúdo.</p>
                          <p className="text-xs mt-1 max-w-sm">Digite no editor ao lado ou clique em &quot;Inserir Modelo&quot; para começar a estruturar sua aula.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SEÇÃO 1: INTRODUÇÃO CLÁSSICA */}
          {editorSection === 'intro' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base md:text-lg font-bold flex items-center gap-2">
                    <span className="text-blue-500">📚</span> 1. Introdução e Contextualização do Tema
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} mt-1`}>
                    Escreva os parágrafos introdutórios em texto corrido (o que motivou o surgimento da tecnologia e sua importância).
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddIntroParagraph}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 flex items-center gap-1.5"
                >
                  <i className="fas fa-plus"></i> Adicionar Parágrafo
                </button>
              </div>

              {introParagraphs.length === 0 ? (
                <div className={`p-8 text-center rounded-2xl border border-dashed ${
                  isDarkMode ? 'border-slate-700 text-slate-400' : 'border-gray-300 text-gray-500'
                }`}>
                  <p className="text-sm font-semibold">Nenhum parágrafo introdutório adicionado.</p>
                  <button
                    type="button"
                    onClick={handleAddIntroParagraph}
                    className="mt-3 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white"
                  >
                    Adicionar Primeiro Parágrafo
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {introParagraphs.map((paragraph, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-xl border ${
                        isDarkMode ? 'bg-slate-900/60 border-slate-700' : 'bg-gray-50/70 border-gray-200'
                      } space-y-2`}
                    >
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-gray-500 dark:text-slate-400">
                          Parágrafo {index + 1}
                        </label>
                        <button
                          type="button"
                          onClick={() => handleRemoveIntroParagraph(index)}
                          className="text-xs text-rose-500 hover:text-rose-700 font-semibold flex items-center gap-1"
                        >
                          <i className="fas fa-trash-can"></i> Remover
                        </button>
                      </div>
                      <textarea
                        rows={3}
                        value={paragraph}
                        onChange={(e) => handleIntroChange(index, e.target.value)}
                        placeholder={`Escreva o conteúdo do parágrafo ${index + 1}...`}
                        className={`w-full p-3 text-sm rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          isDarkMode
                            ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-500'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SEÇÃO 2: FUNDAMENTAÇÃO TEÓRICA & DIAGRAMA */}
          {editorSection === 'theory' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-base md:text-lg font-bold flex items-center gap-2">
                  <span className="text-blue-500">⚙️</span> 2. Fundamentação Teórica e Mecanismos Internos
                </h3>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} mt-1`}>
                  Descreva o funcionamento por baixo do capô (Under the Hood) e monte um diagrama esquemático em caracteres ASCII.
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                  Explicação Teórica dos Mecanismos
                </label>
                <textarea
                  rows={4}
                  value={theoryDescription}
                  onChange={(e) => setTheoryDescription(e.target.value)}
                  placeholder="Explicação conceitual detalhada sobre como o sistema/tecnologia se comporta internamente..."
                  className={`w-full p-3 text-sm rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-cyan-500">
                    Diagrama ASCII Esquemático (Opcional)
                  </label>
                  <span className="text-[11px] text-gray-500 dark:text-slate-400 font-mono">
                    {'Use fontes monoespaçadas (caixas, setas: ┌ ┐ └ ┘ │ ──> ▼)'}
                  </span>
                </div>
                <textarea
                  rows={10}
                  value={asciiDiagram}
                  onChange={(e) => setAsciiDiagram(e.target.value)}
                  placeholder={`           ┌────────────────────────┐\n           │      COMPONENTE A      │\n           └───────────┬────────────┘\n                       │\n                       ▼\n           ┌────────────────────────┐\n           │      COMPONENTE B      │\n           └────────────────────────┘`}
                  className={`w-full p-4 font-mono text-xs md:text-sm rounded-xl border outline-none focus:ring-2 focus:ring-cyan-500 transition-all leading-relaxed ${
                    isDarkMode
                      ? 'bg-slate-950 border-slate-800 text-cyan-300'
                      : 'bg-slate-900 border-slate-800 text-cyan-200'
                  }`}
                />
              </div>
            </div>
          )}

          {/* SEÇÃO 3: CÓDIGO PRÁTICO */}
          {editorSection === 'code' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-base md:text-lg font-bold flex items-center gap-2">
                  <span className="text-blue-500">💻</span> 3. Demonstração Prática de Código
                </h3>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} mt-1`}>
                  Exemplo de código real e limpo (6 a 16 linhas), ideal para demonstração ao vivo em aula.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                    Título do Snippet
                  </label>
                  <input
                    type="text"
                    value={codeTitle}
                    onChange={(e) => setCodeTitle(e.target.value)}
                    placeholder="Ex: Manifesto Declarativo de Deployment (YAML)"
                    className={`w-full p-2.5 text-sm rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                    Linguagem
                  </label>
                  <select
                    value={codeLanguage}
                    onChange={(e) => setCodeLanguage(e.target.value)}
                    className={`w-full p-2.5 text-sm rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 font-mono ${
                      isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="typescript">TypeScript</option>
                    <option value="javascript">JavaScript</option>
                    <option value="yaml">YAML</option>
                    <option value="php">PHP</option>
                    <option value="python">Python</option>
                    <option value="bash">Bash / Shell</option>
                    <option value="sql">SQL</option>
                    <option value="json">JSON</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="dockerfile">Dockerfile</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-cyan-500">
                  Código-Fonte
                </label>
                <textarea
                  rows={12}
                  value={codeBody}
                  onChange={(e) => setCodeBody(e.target.value)}
                  placeholder="// Digite ou cole o snippet de código aqui..."
                  className={`w-full p-4 font-mono text-xs md:text-sm rounded-xl border outline-none focus:ring-2 focus:ring-cyan-500 transition-all leading-relaxed ${
                    isDarkMode
                      ? 'bg-slate-950 border-slate-800 text-emerald-400'
                      : 'bg-slate-900 border-slate-800 text-emerald-300'
                  }`}
                />
              </div>
            </div>
          )}

          {/* SEÇÃO 4: DESCONSTRUÇÃO DA SINTAXE */}
          {editorSection === 'syntax' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base md:text-lg font-bold flex items-center gap-2">
                    <span className="text-blue-500">🎙️</span> 4. Desconstrução da Sintaxe (O que falar ao vivo)
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} mt-1`}>
                    Orienta o professor ou aluno sobre a fala exata e o efeito de cada linha durante o live coding.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddSyntaxRow}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 flex items-center gap-1.5"
                >
                  <i className="fas fa-plus"></i> Adicionar Linha
                </button>
              </div>

              {syntaxList.length === 0 ? (
                <div className={`p-8 text-center rounded-2xl border border-dashed ${
                  isDarkMode ? 'border-slate-700 text-slate-400' : 'border-gray-300 text-gray-500'
                }`}>
                  <p className="text-sm font-semibold">Nenhuma linha de desconstrução de sintaxe cadastrada.</p>
                  <button
                    type="button"
                    onClick={handleAddSyntaxRow}
                    className="mt-3 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white"
                  >
                    Adicionar Primeira Linha
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {syntaxList.map((item, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border space-y-3 ${
                        isDarkMode ? 'bg-slate-900/60 border-slate-700' : 'bg-gray-50/70 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-500">
                          Linha / Comando #{index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSyntaxRow(index)}
                          className="text-xs text-rose-500 hover:text-rose-700 font-semibold flex items-center gap-1"
                        >
                          <i className="fas fa-trash-can"></i> Excluir
                        </button>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 dark:text-slate-400 mb-1">
                          Linha ou Palavra-Chave de Código
                        </label>
                        <input
                          type="text"
                          value={item.lineOrKeyword}
                          onChange={(e) => handleSyntaxChange(index, 'lineOrKeyword', e.target.value)}
                          placeholder="Ex: replicas: 3 ou const [state, setState] = useState()"
                          className={`w-full p-2 text-xs md:text-sm font-mono rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 ${
                            isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-500 dark:text-slate-400 mb-1">
                            O que o professor fala (Raciocínio)
                          </label>
                          <textarea
                            rows={2}
                            value={item.spokenReasoning}
                            onChange={(e) => handleSyntaxChange(index, 'spokenReasoning', e.target.value)}
                            placeholder="Explicação didática verbalizada..."
                            className={`w-full p-2 text-xs rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 ${
                              isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-gray-500 dark:text-slate-400 mb-1">
                            Efeito no Sistema (Runtime)
                          </label>
                          <textarea
                            rows={2}
                            value={item.sideEffect}
                            onChange={(e) => handleSyntaxChange(index, 'sideEffect', e.target.value)}
                            placeholder="Comportamento interno ou impacto no ambiente..."
                            className={`w-full p-2 text-xs rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 ${
                              isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SEÇÃO 5: BOAS PRÁTICAS E ARMADILHAS */}
          {editorSection === 'pitfalls' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base md:text-lg font-bold flex items-center gap-2">
                    <span className="text-amber-500">⚠️</span> 5. Boas Práticas e Armadilhas Frequentes
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} mt-1`}>
                    Destaques de segurança, boas práticas arquiteturais e erros clássicos que devem ser evitados.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddPitfall}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 flex items-center gap-1.5"
                >
                  <i className="fas fa-plus"></i> Adicionar Alerta
                </button>
              </div>

              {pitfallsList.length === 0 ? (
                <div className={`p-8 text-center rounded-2xl border border-dashed ${
                  isDarkMode ? 'border-slate-700 text-slate-400' : 'border-gray-300 text-gray-500'
                }`}>
                  <p className="text-sm font-semibold">Nenhuma boa prática ou armadilha cadastrada.</p>
                  <button
                    type="button"
                    onClick={handleAddPitfall}
                    className="mt-3 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-600 text-white"
                  >
                    Adicionar Primeiro Alerta
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {pitfallsList.map((item, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-xl border flex items-center gap-3 ${
                        isDarkMode ? 'bg-slate-900/60 border-slate-700' : 'bg-gray-50/70 border-gray-200'
                      }`}
                    >
                      <span className="text-amber-500 font-bold shrink-0 text-sm">
                        #{index + 1}
                      </span>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handlePitfallChange(index, e.target.value)}
                        placeholder="Descreva a boa prática ou risco operacional..."
                        className={`flex-grow p-2 text-xs md:text-sm rounded-lg border outline-none focus:ring-2 focus:ring-amber-500 ${
                          isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemovePitfall(index)}
                        className="text-rose-500 hover:text-rose-700 p-2 shrink-0 text-xs"
                        title="Excluir"
                      >
                        <i className="fas fa-trash-can"></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SEÇÃO 6: MÓDULOS EXTRAS (MARKDOWN) */}
          {editorSection === 'tabs' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base md:text-lg font-bold flex items-center gap-2">
                    <span className="text-blue-500">📄</span> Módulos de Aprofundamento (Abas em Markdown)
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} mt-1`}>
                    Crie abas extras com conteúdos temáticos, estudos de caso e artigos estruturados em Markdown.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddCustomTab}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 flex items-center gap-1.5"
                >
                  <i className="fas fa-plus"></i> Nova Aba Customizada
                </button>
              </div>

              {customTabs.length === 0 ? (
                <div className={`p-8 text-center rounded-2xl border border-dashed ${
                  isDarkMode ? 'border-slate-700 text-slate-400' : 'border-gray-300 text-gray-500'
                }`}>
                  <i className="fas fa-file-lines text-3xl mb-2 text-blue-500 opacity-60"></i>
                  <p className="font-semibold text-sm">Nenhum módulo de aprofundamento adicional configurado.</p>
                  <p className="text-xs mt-1">Clique no botão acima para adicionar uma nova aba customizada com conteúdo rico em Markdown.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {customTabs.map((tab, index) => (
                    <div
                      key={tab.id}
                      className={`p-5 rounded-2xl border space-y-4 ${
                        isDarkMode ? 'bg-slate-900/60 border-slate-700' : 'bg-gray-50/80 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between border-b pb-3 border-gray-200 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                            {index + 1}
                          </span>
                          <span className="text-sm font-bold">Aba: {tab.label}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveCustomTab(index)}
                          className="text-xs text-rose-500 hover:text-rose-700 font-semibold flex items-center gap-1"
                        >
                          <i className="fas fa-trash-can"></i> Excluir Aba
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-500 dark:text-slate-400 mb-1">
                            Nome da Aba (Label)
                          </label>
                          <input
                            type="text"
                            value={tab.label}
                            onChange={(e) => handleUpdateCustomTab(index, 'label', e.target.value)}
                            placeholder="Ex: Origem & Filosofia"
                            className={`w-full p-2 text-xs md:text-sm rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 ${
                              isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-gray-500 dark:text-slate-400 mb-1">
                            Ícone (FontAwesome class)
                          </label>
                          <input
                            type="text"
                            value={tab.icon || ''}
                            onChange={(e) => handleUpdateCustomTab(index, 'icon', e.target.value)}
                            placeholder="Ex: fa-cube, fa-server, fa-compass"
                            className={`w-full p-2 text-xs md:text-sm rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 ${
                              isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 dark:text-slate-400 mb-1">
                          Conteúdo (Formato Markdown)
                        </label>
                        <textarea
                          rows={8}
                          value={tab.content}
                          onChange={(e) => handleUpdateCustomTab(index, 'content', e.target.value)}
                          placeholder="Digite títulos com ##, listas com *, blocos de código com ```..."
                          className={`w-full p-3 font-mono text-xs md:text-sm rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed ${
                            isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Modal de Confirmação para Restaurar Conteúdo */}
      {showResetConfirmModal && onResetToDefault && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className={`max-w-md w-full p-6 rounded-3xl shadow-2xl border ${
            isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-200 text-gray-900'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                <i className="fas fa-circle-question"></i>
              </div>
              <div>
                <h4 className="font-extrabold text-lg">Restaurar Apostila Original?</h4>
                <span className="text-xs text-gray-400">Confirmação de Ação</span>
              </div>
            </div>

            <p className={`text-sm mb-6 leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
              Deseja excluir as personalizações deste tópico e restaurar o conteúdo didático original? Todas as edições salvas no armazenamento local para esta apostila serão apagadas.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowResetConfirmModal(false)}
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
                onClick={() => {
                  setShowResetConfirmModal(false);
                  onResetToDefault();
                }}
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-lg transition-all active:scale-95"
              >
                Sim, Restaurar Original
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
