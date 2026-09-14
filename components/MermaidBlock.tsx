import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidBlockProps {
  chart: string;
}

const sanitizeMermaidChart = (rawChart: string): string => {
  // Automatically quote node labels containing parentheses inside brackets if not already quoted
  let cleaned = rawChart.replace(/([A-Za-z0-9_]+)\s*\[([^\]"]*\([^\]"]*\)[^\]"]*)\]/g, (match, nodeId, innerText) => {
    return `${nodeId}["${innerText.replace(/"/g, '\\"')}"]`;
  });
  return cleaned;
};

export const MermaidBlock: React.FC<MermaidBlockProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [showDiagram, setShowDiagram] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalSvg, setModalSvg] = useState<string>('');

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'neutral',
      securityLevel: 'loose',
    });

    const validateAndRender = async () => {
      try {
        setError(null);
        // Validação e sanitização prévia com try-catch
        const sanitized = sanitizeMermaidChart(chart);
        if (!sanitized.trim()) {
          throw new Error("O diagrama Mermaid está vazio.");
        }

        const id1 = 'mermaid-' + Math.random().toString(36).substring(2, 9);
        const { svg: renderedSvg } = await mermaid.render(id1, sanitized.trim());
        setSvg(renderedSvg);
        setModalSvg(renderedSvg);
      } catch (err: any) {
        console.error('Mermaid syntax / render error caught:', err);
        const friendlyMessage = err?.message || 'Erro desconhecido ao processar sintaxe do Mermaid.';
        setError(friendlyMessage);
      }
    };

    validateAndRender();
  }, [chart]);

  return (
    <>
      <div className="my-4 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shadow-lg">
        {/* Barra de Ferramentas / Alternância */}
        <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
            </div>
            <span className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider ml-1">
              mermaid {error ? '(Erro de Sintaxe)' : ''}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setShowDiagram(!showDiagram)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                showDiagram 
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' 
                  : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              <i className={`fas ${showDiagram ? 'fa-project-diagram' : 'fa-code'}`}></i>
              {showDiagram ? 'Ver Grafo' : 'Ver Código'}
            </button>

            {showDiagram && (
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 transition-all flex items-center gap-1.5"
                title="Expandir em tela cheia"
              >
                <i className="fas fa-expand"></i>
                <span>Expandir</span>
              </button>
            )}
          </div>
        </div>

        {/* Conteúdo */}
        {showDiagram ? (
          <div className="p-4 bg-slate-900/60 flex flex-col items-center justify-center min-h-[160px]">
            {error ? (
              <div className="w-full p-4 bg-red-950/60 rounded-xl border border-red-800 text-red-300 text-xs font-mono shadow-inner">
                <div className="flex items-center gap-2 font-bold text-red-400 text-sm mb-2">
                  <i className="fas fa-triangle-exclamation"></i>
                  <span>Aviso de Sintaxe do Diagrama</span>
                </div>
                <p className="mb-2 text-slate-200">O validador capturou um erro ao processar o código Mermaid:</p>
                <div className="p-2.5 bg-slate-950 rounded border border-red-900 text-red-200 overflow-x-auto whitespace-pre-wrap mb-3">
                  {error}
                </div>
                <p className="text-[11px] text-slate-400">
                  Dica: Verifique se há parênteses não escapados em rótulos (ex: use <code className="text-cyan-300">A[&quot;Texto (exemplo)&quot;]</code>) ou chaves incorretas. Você pode alternar para &quot;Ver Código&quot; para corrigir.
                </p>
              </div>
            ) : (
              <div 
                ref={containerRef} 
                dangerouslySetInnerHTML={{ __html: svg }} 
                className="w-full flex justify-center py-2 cursor-pointer overflow-x-auto hover:opacity-95 transition-opacity"
                onClick={() => setIsModalOpen(true)}
                title="Clique para abrir o gráfico em tela cheia"
              />
            )}
          </div>
        ) : (
          <pre className="p-4 overflow-x-auto text-xs md:text-sm font-mono text-cyan-300 leading-relaxed bg-slate-950">
            <code>{chart}</code>
          </pre>
        )}
      </div>

      {/* Modal para Visualização Ampliada do Gráfico / Validação */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-5xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className="fas fa-project-diagram text-teal-400"></i>
                <h3 className="text-base font-bold text-white">Visualização Ampliada do Grafo Mermaid</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                title="Fechar"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="p-8 overflow-auto flex-1 flex items-center justify-center bg-slate-900/90">
              {error ? (
                <div className="max-w-xl w-full p-6 bg-red-950/80 rounded-2xl border border-red-700 text-red-200 font-mono shadow-2xl">
                  <div className="flex items-center gap-2 text-red-400 font-bold text-base mb-3">
                    <i className="fas fa-triangle-exclamation text-xl"></i>
                    <span>Falha na Validação do Diagrama</span>
                  </div>
                  <p className="text-sm text-slate-200 mb-3 leading-relaxed">
                    O validador executou a análise de sintaxe via try-catch e detectou um erro que impede a renderização gráfica:
                  </p>
                  <div className="p-3 bg-slate-950 rounded-lg border border-red-900 text-xs text-red-300 overflow-x-auto mb-4 whitespace-pre-wrap">
                    {error}
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300">
                    <p className="font-bold text-teal-300 mb-1">Como resolver:</p>
                    <p>Feche esta janela, clique em <strong className="text-white">&quot;Ver Código&quot;</strong> no bloco correspondente para inspecionar e corrigir a sintaxe do seu diagrama Mermaid.</p>
                  </div>
                </div>
              ) : (
                <div 
                  ref={modalContainerRef}
                  dangerouslySetInnerHTML={{ __html: modalSvg }} 
                  className="w-full flex justify-center py-6 scale-110 origin-center"
                />
              )}
            </div>

            <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Validador de Sintaxe Mermaid Ativo (try-catch)</span>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
