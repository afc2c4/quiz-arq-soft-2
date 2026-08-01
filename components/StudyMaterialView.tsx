import React, { useState } from 'react';
import { StudyMaterial } from '../types';

interface StudyMaterialViewProps {
  material: StudyMaterial;
  isDarkMode: boolean;
  onStartQuiz?: () => void;
  onClose?: () => void;
}

const StudyMaterialView: React.FC<StudyMaterialViewProps> = ({
  material,
  isDarkMode,
  onStartQuiz,
  onClose
}) => {
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Helper to fallback for legacy materials if any exist
  const introParagraphs = material.introduction && material.introduction.length > 0 
    ? material.introduction 
    : [material.summary || '', ...(material.keyPoints ? [material.keyPoints.join(' ')] : [])];

  const theoreticalDesc = material.theoreticalFoundation?.description 
    || (material.keyPoints ? material.keyPoints.join('\n') : '');

  const asciiDiagram = material.theoreticalFoundation?.asciiDiagram;

  const codeSnippet = material.codeSnippet || (material.codeSnippets && material.codeSnippets[0] ? {
    title: material.codeSnippets[0].title,
    language: material.codeSnippets[0].language,
    code: material.codeSnippets[0].code
  } : {
    title: 'Exemplo Prático',
    language: 'typescript',
    code: '// Código de demonstração'
  });

  const syntaxList = material.syntaxDeconstruction || [];
  const pitfallsAndPractices = material.bestPracticesAndPitfalls || [
    ...(material.bestPractices || []),
    ...(material.commonPitfalls || [])
  ];

  return (
    <div className={`rounded-2xl shadow-2xl border p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 transition-colors max-w-4xl mx-auto ${
      isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-200 text-gray-900'
    }`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-gray-100 dark:border-slate-700">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              isDarkMode ? 'bg-blue-900/60 text-blue-300 border border-blue-700' : 'bg-blue-100 text-blue-700'
            }`}>
              <i className="fas fa-book-open mr-1.5"></i> Apostila Técnica Completa
            </span>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-md ${
              isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600'
            }`}>
              {material.topicName}
            </span>
          </div>
          <h2 className={`text-2xl md:text-3xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {material.topicName}
          </h2>
        </div>

        {onClose && (
          <button
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

      {/* Main Content Areas */}
      <div className="space-y-8">
        
        {/* 1. Introdução e Contextualização do Tema */}
        <section className={`p-6 rounded-2xl border ${
          isDarkMode ? 'bg-slate-900/80 border-blue-900/40 text-slate-200' : 'bg-blue-50/50 border-blue-100 text-slate-800'
        }`}>
          <h3 className="text-lg font-bold flex items-center gap-2.5 mb-3 text-blue-600 dark:text-blue-400">
            <span>📚</span> 1. Introdução e Contextualização do Tema
          </h3>
          <div className="space-y-3.5 text-sm md:text-base leading-relaxed font-normal">
            {introParagraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </section>

        {/* 2. Fundamentação Teórica e Mecanismos Internos */}
        <section className="space-y-4">
          <h3 className={`text-lg font-bold flex items-center gap-2.5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <span>⚙️</span> 2. Fundamentação Teórica e Mecanismos Internos (Under the Hood)
          </h3>
          <p className={`text-sm md:text-base leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
            {theoreticalDesc}
          </p>

          {/* Mini Diagrama ASCII */}
          {asciiDiagram && (
            <div className="mt-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
                Fluxo de Execução e Estado (Diagrama de Arquitetura):
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 text-cyan-300 font-mono text-xs md:text-sm overflow-x-auto border border-slate-800 leading-snug">
                <code>{asciiDiagram}</code>
              </pre>
            </div>
          )}
        </section>

        {/* 3. Demonstração Prática de Código */}
        <section className="space-y-3">
          <h3 className={`text-lg font-bold flex items-center gap-2.5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <span>💻</span> 3. Demonstração Prática de Código
          </h3>
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-xl">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block"></span>
                <span className="ml-2 font-bold text-slate-200">{codeSnippet.title}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="uppercase text-[10px] tracking-wider px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-bold border border-slate-700">
                  {codeSnippet.language}
                </span>
                <button
                  onClick={() => handleCopyCode(codeSnippet.code)}
                  className="hover:text-white transition-colors text-slate-400 flex items-center gap-1.5"
                  title="Copiar código"
                >
                  <i className={`fas ${copiedCode ? 'fa-check text-green-400' : 'fa-copy'}`}></i>
                  <span>{copiedCode ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>
            </div>
            <pre className="p-4 overflow-x-auto text-xs md:text-sm font-mono text-cyan-300 leading-relaxed bg-slate-950">
              <code>{codeSnippet.code}</code>
            </pre>
          </div>
        </section>

        {/* 4. Desconstrução da Sintaxe (O que falar ENQUANTO digita) */}
        {syntaxList.length > 0 && (
          <section className="space-y-4">
            <div>
              <h3 className={`text-lg font-bold flex items-center gap-2.5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <span>🎙️</span> 4. Desconstrução da Sintaxe (O que falar ENQUANTO digita)
              </h3>
              <p className={`text-xs md:text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                Simulação de explicação ao vivo linha por linha, focando nas palavras-chave, raciocínio e impacto em memória/execução:
              </p>
            </div>

            <div className="space-y-3">
              {syntaxList.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all ${
                    isDarkMode 
                      ? 'bg-slate-900/60 border-slate-700/80 hover:border-slate-600' 
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-400 font-mono text-xs font-bold border border-indigo-500/30">
                      {item.lineOrKeyword}
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

        {/* 5. Boas Práticas, Anti-Patterns e Armadilhas Frequentes */}
        {pitfallsAndPractices.length > 0 && (
          <section className={`p-5 rounded-2xl border ${
            isDarkMode ? 'bg-amber-950/20 border-amber-800/40 text-amber-100' : 'bg-amber-50/80 border-amber-200 text-amber-950'
          }`}>
            <h3 className="text-lg font-bold flex items-center gap-2 mb-3 text-amber-600 dark:text-amber-400">
              <span>⚠️</span> 5. Boas Práticas, Anti-Patterns e Armadilhas Frequentes
            </h3>
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

      {/* Footer CTA */}
      {onStartQuiz && (
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs md:text-sm text-gray-500 dark:text-slate-400 flex items-center gap-2">
            <i className="fas fa-graduation-cap text-blue-500"></i>
            <span>Leitura da apostila concluída? Teste a fixação no simulado.</span>
          </div>

          <button
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
