import React, { useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { StudyMaterial } from '../types';
import { StudyMaterialEditor } from './StudyMaterialEditor';
import { MermaidBlock } from './MermaidBlock';

interface StudyMaterialViewProps {
  material: StudyMaterial;
  isDarkMode: boolean;
  isLoggedIn?: boolean;
  isCustomized?: boolean;
  onSaveMaterial?: (material: StudyMaterial) => void;
  onResetMaterial?: (topicId: string) => void;
  onStartQuiz?: () => void;
  onClose?: () => void;
}

interface TabConfig {
  id: string;
  label: string;
  badge?: string | number;
  icon: string;
}

interface StudyMaterialContentProps {
  material: StudyMaterial;
  isDarkMode: boolean;
  onOpenEditor?: () => void;
}

export const StudyMaterialContent: React.FC<StudyMaterialContentProps> = ({
  material,
  isDarkMode,
  onOpenEditor
}) => {
  const hasMarkdownContent = Boolean(material.markdownContent && material.markdownContent.trim().length > 0);

  const introParagraphs = material.introduction && material.introduction.length > 0 
    ? material.introduction.filter(p => p && p.trim().length > 0)
    : (material.summary ? [material.summary] : []);

  const theoreticalDesc = material.theoreticalFoundation?.description?.trim() || '';
  const asciiDiagram = material.theoreticalFoundation?.asciiDiagram?.trim() || '';
  const hasTheory = Boolean(theoreticalDesc || asciiDiagram);

  const codeSnippet = material.codeSnippet?.code?.trim() ? material.codeSnippet : (
    material.codeSnippets && material.codeSnippets[0]?.code?.trim() ? material.codeSnippets[0] : null
  );
  const hasCode = Boolean(codeSnippet);

  const syntaxList = (material.syntaxDeconstruction || []).filter(s => s.lineOrKeyword?.trim().length > 0);
  const hasSyntax = syntaxList.length > 0;

  const pitfallsAndPractices = (material.bestPracticesAndPitfalls || [
    ...(material.bestPractices || []),
    ...(material.commonPitfalls || [])
  ]).filter(p => p && p.trim().length > 0);
  const hasPitfalls = pitfallsAndPractices.length > 0;

  const hasStandardSections = Boolean(
    introParagraphs.length > 0 || hasTheory || hasCode || hasSyntax || hasPitfalls
  );
  const hasCustomTabs = Boolean(material.customTabs && material.customTabs.length > 0);

  const isCompletelyEmpty = !hasMarkdownContent && !hasStandardSections && !hasCustomTabs;

  // Define as abas disponíveis
  const tabs: TabConfig[] = [
    { id: 'all', label: 'Visão Completa', icon: 'fa-book-open' },
    ...(hasMarkdownContent ? [
      { id: 'markdown', label: 'Apostila (Markdown)', icon: 'fa-file-lines' }
    ] : []),
    ...(hasStandardSections ? [
      ...(introParagraphs.length > 0 ? [{ id: 'intro', label: '1. Introdução', icon: 'fa-align-left' }] : []),
      ...(hasTheory ? [{ id: 'theory', label: '2. Teoria & Internos', icon: 'fa-gears' }] : []),
      ...(hasCode ? [{ id: 'code', label: '3. Código Prático', icon: 'fa-code' }] : []),
      ...(hasSyntax ? [{ 
        id: 'syntax', 
        label: '4. Desconstrução', 
        badge: syntaxList.length || undefined, 
        icon: 'fa-microphone' 
      }] : []),
      ...(hasPitfalls ? [{ 
        id: 'pitfalls', 
        label: '5. Boas Práticas', 
        badge: pitfallsAndPractices.length || undefined, 
        icon: 'fa-triangle-exclamation' 
      }] : []),
    ] : []),
    ...(hasCustomTabs ? material.customTabs!.map((tab) => ({
      id: tab.id,
      label: tab.label,
      icon: tab.icon || 'fa-file-lines'
    })) : [])
  ];

  const tabOrder: string[] = tabs.filter((t) => t.id !== 'all').map((t) => t.id);

  const [activeTab, setActiveTab] = useState<string>('all');
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const goToNextTab = () => {
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex >= 0 && currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    }
  };

  const goToPrevTab = () => {
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabOrder[currentIndex - 1]);
    }
  };

  // Componentes de estilização para o Markdown
  const markdownComponents = {
    h1: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h1 className="text-xl md:text-2xl font-bold my-4 text-blue-700 dark:text-blue-400 border-b pb-2 border-gray-300 dark:border-slate-700" {...props} />
    ),
    h2: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2 className="text-lg md:text-xl font-bold mt-6 mb-3 text-blue-700 dark:text-blue-400 flex items-center gap-2" {...props} />
    ),
    h3: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h3 className="text-base md:text-lg font-bold mt-5 mb-2.5 text-slate-950 dark:text-white flex items-center gap-2" {...props} />
    ),
    h4: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h4 className="text-sm md:text-base font-bold mt-4 mb-2 text-indigo-700 dark:text-indigo-400" {...props} />
    ),
    p: ({ ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p className="text-sm md:text-base leading-relaxed my-3 text-slate-950 dark:text-slate-300 font-medium" {...props} />
    ),
    ul: ({ ...props }: React.HTMLAttributes<HTMLUListElement>) => (
      <ul className="list-disc pl-5 my-3 space-y-2 text-sm md:text-base text-slate-950 dark:text-slate-300 font-medium" {...props} />
    ),
    ol: ({ ...props }: React.HTMLAttributes<HTMLOListElement>) => (
      <ol className="list-decimal pl-5 my-3 space-y-2 text-sm md:text-base text-slate-950 dark:text-slate-300 font-medium" {...props} />
    ),
    li: ({ ...props }: React.HTMLAttributes<HTMLLIElement>) => (
      <li className="leading-relaxed pl-1 text-slate-950 dark:text-slate-300 font-medium" {...props} />
    ),
    blockquote: ({ ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
      <blockquote className={`border-l-4 border-amber-500 pl-4 py-3 my-4 italic rounded-r-xl text-sm md:text-base ${
        isDarkMode ? 'bg-amber-950/20 border-amber-700 text-amber-200' : 'bg-amber-50/80 border-amber-400 text-amber-900'
      }`} {...props} />
    ),
    hr: () => (
      <hr className="my-6 border-gray-200 dark:border-slate-700" />
    ),
    code: ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => {
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
          <div className="my-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-lg">
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
              </div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                {className?.replace('language-', '') || 'terminal'}
              </span>
            </div>
            <pre className="p-4 overflow-x-auto text-xs md:text-sm font-mono text-cyan-300 leading-relaxed bg-slate-950">
              <code {...props}>{children}</code>
            </pre>
          </div>
        );
      }
      return (
        <code className={`font-mono text-xs px-1.5 py-0.5 rounded font-semibold border ${
          isDarkMode 
            ? 'bg-slate-900 text-cyan-300 border-slate-700' 
            : 'bg-slate-100 text-cyan-700 border-slate-200'
        }`} {...props}>
          {children}
        </code>
      );
    },
    strong: ({ ...props }: React.HTMLAttributes<HTMLElement>) => (
      <strong className="font-bold text-slate-900 dark:text-white" {...props} />
    ),
    del: ({ ...props }: React.HTMLAttributes<HTMLElement>) => (
      <del className="line-through text-slate-400" {...props} />
    ),
    a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-500 hover:text-blue-600 underline font-semibold transition-colors" 
        {...props}
      >
        {children} <i className="fas fa-external-link-alt text-[10px] ml-0.5"></i>
      </a>
    ),
    table: ({ ...props }: React.HTMLAttributes<HTMLTableElement>) => (
      <div className="my-5 overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
        <table className="w-full text-left text-sm border-collapse" {...props} />
      </div>
    ),
    thead: ({ ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
      <thead className={`border-b border-gray-200 dark:border-slate-700 text-xs uppercase font-extrabold tracking-wider ${
        isDarkMode ? 'bg-slate-800 text-slate-200' : 'bg-gray-100 text-gray-700'
      }`} {...props} />
    ),
    tbody: ({ ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
      <tbody className="divide-y divide-gray-200 dark:divide-slate-800" {...props} />
    ),
    tr: ({ ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
      <tr className={`transition-colors ${isDarkMode ? 'hover:bg-slate-800/40' : 'hover:bg-gray-50'}`} {...props} />
    ),
    th: ({ ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
      <th className="px-4 py-3 font-extrabold" {...props} />
    ),
    td: ({ ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
      <td className="px-4 py-3 text-sm" {...props} />
    ),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
      {/* Painel Lateral com Abas Verticais (só exibe se não estiver completamente vazio) */}
      {!isCompletelyEmpty && (
        <aside className="md:col-span-4 lg:col-span-3 space-y-3 md:sticky md:top-4">
          <div className={`p-2 rounded-2xl border ${
            isDarkMode ? 'bg-slate-900/80 border-slate-700' : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="px-3 py-2 flex items-center justify-between border-b border-gray-100 dark:border-slate-800 mb-1.5">
              <span className={`text-[11px] font-bold uppercase tracking-wider ${
                isDarkMode ? 'text-slate-400' : 'text-gray-500'
              }`}>
                Abas do Conteúdo
              </span>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                isDarkMode ? 'bg-slate-800 text-blue-400' : 'bg-blue-100 text-blue-700'
              }`}>
                {activeTab === 'all' ? 'Todas' : `${tabOrder.indexOf(activeTab) + 1}/${tabOrder.length}`}
              </span>
            </div>

            {/* Lista Vertical de Abas */}
            <nav className="flex flex-col gap-1" aria-label="Abas verticais do material">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`tab-btn-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left py-2.5 px-3 rounded-xl text-xs md:text-sm transition-all flex items-center justify-between group select-none ${
                      isActive
                        ? isDarkMode
                          ? 'bg-blue-600 text-white shadow-md font-bold'
                          : 'bg-white text-blue-700 shadow-sm border border-blue-200 font-bold'
                        : isDarkMode
                          ? 'text-slate-300 hover:text-white hover:bg-slate-800/80 font-medium'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-white/80 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs ${
                        isActive
                          ? isDarkMode ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-700'
                          : isDarkMode ? 'bg-slate-800 text-slate-400 group-hover:text-slate-200' : 'bg-gray-200 text-gray-500 group-hover:text-gray-700'
                      }`}>
                        <i className={`fas ${tab.icon}`}></i>
                      </span>
                      <span className="truncate">{tab.label}</span>
                    </div>
                    {tab.badge && (
                      <span className={`ml-1.5 text-[10px] px-1.5 py-0.2 rounded-full font-bold shrink-0 ${
                        isActive 
                          ? (isDarkMode ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-800') 
                          : (isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-gray-200 text-gray-700')
                      }`}>
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Dica Didática na barra lateral */}
          <div className={`hidden md:block p-3.5 rounded-xl text-xs border ${
            isDarkMode ? 'bg-slate-900/40 border-slate-800 text-slate-400' : 'bg-blue-50/40 border-blue-100 text-slate-600'
          }`}>
            <p className="flex items-center gap-1.5 font-bold text-blue-500 dark:text-blue-400">
              <i className="fas fa-lightbulb text-amber-500"></i>
              <span>Dica de Estudo</span>
            </p>
            <p className="mt-1 leading-relaxed text-[11px]">
              Selecione cada aba verticalmente para avançar na ordem pedagógica antes de realizar o simulado de fixação.
            </p>
          </div>
        </aside>
      )}

      {/* Coluna de Conteúdo Principal */}
      <main className={`${isCompletelyEmpty ? 'col-span-12' : 'md:col-span-8 lg:col-span-9'} space-y-6 min-w-0`}>
        {/* ESTADO VAZIO: Quando a apostila ainda não possui nenhum conteúdo cadastrado */}
        {isCompletelyEmpty && (
          <div className={`p-8 md:p-12 text-center rounded-3xl border border-dashed transition-all ${
            isDarkMode ? 'border-slate-700 bg-slate-900/40 text-slate-300' : 'border-gray-300 bg-gray-50/70 text-gray-700'
          }`}>
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              <i className="fas fa-file-circle-plus"></i>
            </div>
            <h4 className={`text-xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Apostila em Branco
            </h4>
            <p className="text-sm max-w-lg mx-auto text-gray-500 dark:text-slate-400 mb-6 leading-relaxed">
              Este tópico foi criado recentemente e ainda não possui conteúdo didático cadastrado.
              Você pode redigir a aula diretamente em <strong>Markdown</strong> com títulos, blocos de código, tabelas e avisos pedagógicos.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto mb-8 text-xs font-semibold text-slate-400">
              <span className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <i className="fas fa-heading text-blue-500"></i> Títulos (# H1, ## H2)
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <i className="fas fa-code text-emerald-500"></i> Blocos de Código
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <i className="fas fa-table text-purple-500"></i> Tabelas Comparativas
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <i className="fas fa-lightbulb text-amber-500"></i> Dicas Pedagógicas
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <i className="fas fa-list-check text-cyan-500"></i> Listas & Checklist
              </span>
            </div>

            {onOpenEditor && (
              <button
                type="button"
                onClick={onOpenEditor}
                className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 mx-auto active:scale-95"
              >
                <i className="fas fa-pen-to-square"></i>
                <span>Começar a Escrever Apostila em Markdown</span>
              </button>
            )}
          </div>
        )}

        {/* SEÇÃO MARKDOWN PRINCIPAL: Quando o conteúdo em Markdown foi preenchido */}
        {hasMarkdownContent && (activeTab === 'all' || activeTab === 'markdown') && (
          <section 
            id="study-section-markdown"
            className={`p-6 md:p-8 rounded-2xl border transition-all animate-in fade-in duration-300 ${
              isDarkMode ? 'bg-slate-900/60 border-slate-700/80 text-slate-200' : 'bg-white border-slate-200 text-slate-800 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between gap-2 pb-3 mb-5 border-b border-gray-200/80 dark:border-slate-700/80">
              <h3 className="text-lg md:text-xl font-bold flex items-center gap-2.5 text-blue-600 dark:text-blue-400">
                <i className="fas fa-book-open text-blue-500"></i>
                <span>Apostila Didática</span>
              </h3>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                isDarkMode ? 'bg-blue-950 text-blue-300 border border-blue-900/50' : 'bg-blue-100 text-blue-700 border border-blue-200'
              }`}>
                Markdown Formatado
              </span>
            </div>
            <div className="markdown-body space-y-4">
              <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {material.markdownContent}
              </Markdown>
            </div>
          </section>
        )}
        {/* MODO PADRÃO (Para as 5 etapas clássicas) */}
        {hasStandardSections && (
          <div className="space-y-6">
            {/* 1. Introdução */}
            {(activeTab === 'all' || activeTab === 'intro') && introParagraphs.length > 0 && (
              <section 
                id="study-section-intro"
                className={`p-6 rounded-2xl border transition-all animate-in fade-in duration-300 ${
                  isDarkMode ? 'bg-slate-900/50 border-slate-700/80' : 'bg-slate-50/80 border-slate-200/80'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <span>📚</span> 1. Introdução e Contextualização do Tema
                  </h3>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                    isDarkMode ? 'bg-blue-950 text-blue-300' : 'bg-blue-100 text-blue-800'
                  }`}>
                    Visão Geral
                  </span>
                </div>
                <div className="space-y-3.5 text-sm md:text-base leading-relaxed text-slate-900 dark:text-slate-300 font-normal">
                  {introParagraphs.map((paragraph, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            )}

            {/* 2. Fundamentação Teórica e Diagrama ASCII */}
            {(activeTab === 'all' || activeTab === 'theory') && (theoreticalDesc || asciiDiagram) && (
              <section 
                id="study-section-theory"
                className={`p-6 rounded-2xl border transition-all animate-in fade-in duration-300 ${
                  isDarkMode ? 'bg-slate-900/50 border-slate-700/80' : 'bg-slate-50/80 border-slate-200/80'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <span>⚙️</span> 2. Fundamentação Teórica & Mecanismos Internos
                  </h3>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                    isDarkMode ? 'bg-indigo-950 text-indigo-300' : 'bg-indigo-100 text-indigo-800'
                  }`}>
                    Under the Hood
                  </span>
                </div>
                {theoreticalDesc && (
                  <p className="text-sm md:text-base leading-relaxed text-slate-900 dark:text-slate-300 mb-4 whitespace-pre-line">
                    {theoreticalDesc}
                  </p>
                )}
                {asciiDiagram && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-400 mb-1.5 font-mono">
                      <span className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 font-bold">
                        <i className="fas fa-diagram-project"></i> Diagrama Esquemático:
                      </span>
                    </div>
                    <pre className="p-4 rounded-xl font-mono text-xs md:text-sm overflow-x-auto leading-relaxed border bg-slate-950 text-cyan-300 border-slate-800 shadow-inner">
                      {asciiDiagram}
                    </pre>
                  </div>
                )}
              </section>
            )}

            {/* 3. Demonstração Prática de Código */}
            {(activeTab === 'all' || activeTab === 'code') && codeSnippet && (
              <section 
                id="study-section-code"
                className="rounded-2xl border overflow-hidden border-slate-800 bg-slate-950 shadow-xl transition-all animate-in fade-in duration-300"
              >
                <div className="bg-slate-900 px-5 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 mr-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/90"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/90"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/90"></div>
                    </div>
                    <h3 className="font-bold text-sm md:text-base text-white flex items-center gap-2">
                      <span>💻</span> 3. {codeSnippet.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700 font-semibold">
                      {codeSnippet.language}
                    </span>
                    <button
                      onClick={() => handleCopyCode(codeSnippet.code)}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 border border-slate-700"
                      title="Copiar código"
                    >
                      <i className={`fas ${copiedCode ? 'fa-check text-green-400' : 'fa-copy'}`}></i>
                      <span>{copiedCode ? 'Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 md:p-5 overflow-x-auto">
                  <pre className="font-mono text-xs md:text-sm text-emerald-400 leading-relaxed">
                    <code>{codeSnippet.code}</code>
                  </pre>
                </div>
              </section>
            )}

            {/* 4. Desconstrução da Sintaxe */}
            {(activeTab === 'all' || activeTab === 'syntax') && syntaxList.length > 0 && (
              <section 
                id="study-section-syntax"
                className={`p-6 rounded-2xl border transition-all animate-in fade-in duration-300 ${
                  isDarkMode ? 'bg-slate-900/50 border-slate-700/80' : 'bg-slate-50/80 border-slate-200/80'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-4">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <span>🎙️</span> 4. Desconstrução da Sintaxe (O que falar ao vivo)
                  </h3>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                    isDarkMode ? 'bg-blue-950 text-blue-300' : 'bg-blue-100 text-blue-800'
                  }`}>
                    Live Coding Guide
                  </span>
                </div>
                <div className="space-y-3">
                  {syntaxList.map((item, idx) => (
                    <div 
                      key={idx}
                      className={`p-4 rounded-xl border transition-all ${
                        isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-gray-200 shadow-sm'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="font-mono font-bold text-xs md:text-sm text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-200 dark:border-cyan-800/60">
                          {item.lineOrKeyword}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-slate-400">
                          Passo {idx + 1}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm">
                        <div className="space-y-1">
                          <span className="font-bold text-amber-500 dark:text-amber-400 flex items-center gap-1 text-xs uppercase tracking-wider">
                            <i className="fas fa-comment-dots"></i> Raciocínio Falado (Ao Vivo):
                          </span>
                          <p className={`italic ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                            "{item.spokenReasoning}"
                          </p>
                        </div>
                        <div className="space-y-1">
                          <span className="font-bold text-cyan-500 dark:text-cyan-400 flex items-center gap-1 text-xs uppercase tracking-wider">
                            <i className="fas fa-microchip"></i> Efeito de Borda / Escopo:
                          </span>
                          <p className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>
                            {item.sideEffect}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 5. Boas Práticas e Armadilhas */}
            {(activeTab === 'all' || activeTab === 'pitfalls') && pitfallsAndPractices.length > 0 && (
              <section 
                id="study-section-pitfalls"
                className={`p-5 rounded-2xl border transition-all animate-in fade-in duration-300 ${
                  isDarkMode ? 'bg-amber-950/20 border-amber-800/40 text-amber-100' : 'bg-amber-50/80 border-amber-200 text-amber-950'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-amber-600 dark:text-amber-400">
                    <span>⚠️</span> 5. Boas Práticas, Anti-Patterns e Armadilhas Frequentes
                  </h3>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                    isDarkMode ? 'bg-amber-900/60 text-amber-200' : 'bg-amber-200/70 text-amber-900'
                  }`}>
                    Alertas
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {pitfallsAndPractices.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm md:text-base leading-relaxed">
                      <i className="fas fa-triangle-exclamation text-amber-500 mt-1 shrink-0 text-xs"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}

        {/* MÓDULOS DE APROFUNDAMENTO COM ABAS CUSTOMIZADAS */}
        {hasCustomTabs && (
          <div className={`space-y-6 ${hasStandardSections && activeTab === 'all' ? 'mt-6' : ''}`}>
            {material.customTabs!.map((tab) => {
              const shouldShow = activeTab === 'all' || activeTab === tab.id;
              if (!shouldShow) return null;

              return (
                <section
                  key={tab.id}
                  id={`study-custom-section-${tab.id}`}
                  className={`p-6 md:p-7 rounded-2xl border transition-all animate-in fade-in duration-300 ${
                    isDarkMode 
                      ? 'bg-slate-900/70 border-slate-700/80 text-slate-200' 
                      : 'bg-slate-50/90 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 pb-3 mb-5 border-b border-gray-200/80 dark:border-slate-700/80">
                    <h3 className="text-lg font-bold flex items-center gap-2.5 text-blue-600 dark:text-blue-400">
                      <i className={`fas ${tab.icon || 'fa-file-lines'} text-blue-500`}></i>
                      <span>{tab.label}</span>
                    </h3>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      isDarkMode ? 'bg-blue-950 text-blue-300 border border-blue-900/50' : 'bg-blue-100 text-blue-700 border border-blue-200'
                    }`}>
                      Módulo de Aprofundamento
                    </span>
                  </div>
                  <div className="markdown-body">
                    <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                      {tab.content}
                    </Markdown>
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* Navegação Entre Abas (quando em modo aba individual) */}
        {activeTab !== 'all' && (
          <div className="mt-8 pt-5 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between gap-4">
            <button
              onClick={goToPrevTab}
              disabled={tabOrder.indexOf(activeTab) === 0}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold flex items-center gap-2 transition-all ${
                tabOrder.indexOf(activeTab) === 0
                  ? 'opacity-30 cursor-not-allowed'
                  : isDarkMode
                    ? 'bg-slate-700 text-white hover:bg-slate-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <i className="fas fa-chevron-left text-xs"></i> Seção Anterior
            </button>

            <button
              onClick={() => setActiveTab('all')}
              className={`text-xs font-bold ${
                isDarkMode ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Ver Todas as Seções
            </button>

            <button
              onClick={goToNextTab}
              disabled={tabOrder.indexOf(activeTab) === tabOrder.length - 1}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold flex items-center gap-2 transition-all ${
                tabOrder.indexOf(activeTab) === tabOrder.length - 1
                  ? 'opacity-30 cursor-not-allowed'
                  : isDarkMode
                    ? 'bg-slate-700 text-white hover:bg-slate-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Próxima Seção <i className="fas fa-chevron-right text-xs"></i>
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

const StudyMaterialView: React.FC<StudyMaterialViewProps> = ({
  material,
  isDarkMode,
  isLoggedIn = false,
  isCustomized = false,
  onSaveMaterial,
  onResetMaterial,
  onStartQuiz,
  onClose
}) => {
  const [isEditing, setIsEditing] = useState(false);

  // Segurança: Somente o professor autenticado (isLoggedIn = true) pode entrar no modo de edição
  if (isEditing && isLoggedIn && onSaveMaterial) {
    return (
      <StudyMaterialEditor
        initialMaterial={material}
        isDarkMode={isDarkMode}
        isCustomized={isCustomized}
        onSave={(updated) => {
          if (isLoggedIn && onSaveMaterial) {
            onSaveMaterial(updated);
          }
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
        onResetToDefault={isLoggedIn && onResetMaterial ? () => {
          onResetMaterial(material.topicId);
          setIsEditing(false);
        } : undefined}
        renderPreview={(previewMaterial) => (
          <div className="max-w-5xl mx-auto">
            <StudyMaterialContent
              material={previewMaterial}
              isDarkMode={isDarkMode}
            />
          </div>
        )}
      />
    );
  }

  return (
    <div 
      id="study-material-card"
      className={`rounded-2xl shadow-2xl border p-5 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 transition-colors max-w-5xl mx-auto ${
        isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-200 text-gray-900'
      }`}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-gray-100 dark:border-slate-700">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              isDarkMode ? 'bg-blue-900/60 text-blue-300 border border-blue-700' : 'bg-blue-100 text-blue-700'
            }`}>
              <i className="fas fa-book-open mr-1.5"></i> Material de Estudo
            </span>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-md ${
              isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600'
            }`}>
              {material.topicName}
            </span>
            {isCustomized && (
              <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-amber-500/20 text-amber-500 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1">
                <i className="fas fa-user-pen"></i> Personalizado pelo Professor
              </span>
            )}
          </div>
          <h2 className={`text-2xl md:text-3xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {material.topicName}
          </h2>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Botão de Ação Rápida: Editar este Material (Visível para o professor logado) */}
          {isLoggedIn && onSaveMaterial && (
            <button
              id="btn-edit-study-material"
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2.5 rounded-xl text-xs md:text-sm font-extrabold bg-amber-500 hover:bg-amber-600 text-white shadow-md hover:shadow-lg transition-all flex items-center gap-2 transform active:scale-95"
              title="Editar o conteúdo deste material de estudo"
            >
              <i className="fas fa-pen-to-square"></i>
              <span>✏️ Editar este Material</span>
            </button>
          )}

          {onClose && (
            <button
              id="btn-close-study-material"
              onClick={onClose}
              className={`p-2.5 rounded-xl transition-all ${
                isDarkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900'
              }`}
              title="Fechar Material de Estudo"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          )}
        </div>
      </div>

      {/* Conteúdo da Apostila */}
      <StudyMaterialContent
        material={material}
        isDarkMode={isDarkMode}
        onOpenEditor={isLoggedIn && onSaveMaterial ? () => setIsEditing(true) : undefined}
      />

      {/* Footer CTA */}
      {onStartQuiz && (
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs md:text-sm text-gray-500 dark:text-slate-400 flex items-center gap-2">
            <i className="fas fa-graduation-cap text-blue-500"></i>
            <span>Leitura da apostila concluída? Teste a fixação no simulado.</span>
          </div>

          <button
            id="btn-start-quiz-from-material"
            onClick={onStartQuiz}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-8 py-3.5 rounded-2xl shadow-lg hover:shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-3 text-sm md:text-base"
          >
            <i className="fas fa-play"></i> Iniciar Simulado do Tópico
          </button>
        </div>
      )}
    </div>
  );
};

export default StudyMaterialView;
