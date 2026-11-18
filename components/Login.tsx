import React, { useState } from 'react';

interface LoginProps {
  onLogin: (password: string) => Promise<{ ok: boolean; error?: string }>;
  isDarkMode: boolean;
  notice?: string | null;
}

const Login: React.FC<LoginProps> = ({ onLogin, isDarkMode, notice }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Digite a senha de acesso.');
      return;
    }

    setError('');
    setIsSubmitting(true);
    try {
      const result = await onLogin(password);
      if (!result.ok) {
        setError(result.error || 'Senha incorreta. Tente novamente.');
      }
    } catch {
      setError('Erro ao validar credenciais no servidor.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center p-4">
      <div className={`w-full max-w-md p-8 rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-500 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 bg-blue-600 text-white rounded-2xl items-center justify-center text-3xl mb-4 shadow-lg">
            <i className="fas fa-user-shield"></i>
          </div>
          <h2 className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Acesso Restrito
          </h2>
          <p className={`mt-2 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            Área exclusiva para professores.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-sm font-bold mb-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
              Senha de Acesso
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none ${
                isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-white focus:border-blue-500' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
              }`}
              placeholder="Digite a senha..."
              autoFocus
            />
          </div>

          {!error && notice && (
            <div className={`border-l-4 border-amber-500 p-3 rounded-lg text-sm font-medium ${
              isDarkMode ? 'bg-amber-950/60 text-amber-200' : 'bg-amber-50 text-amber-800'
            }`}>
              <i className="fas fa-clock mr-2"></i> {notice}
            </div>
          )}

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-lg text-sm font-medium animate-in slide-in-from-top duration-300">
              <i className="fas fa-exclamation-circle mr-2"></i> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Verificando...
              </>
            ) : (
              <>
                Entrar no Painel <i className="fas fa-sign-in-alt"></i>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
