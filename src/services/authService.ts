export interface AuthLoginResult {
  ok: boolean;
  error?: string;
}

export const checkSession = async (): Promise<boolean> => {
  try {
    const res = await fetch('/api/auth/session', {
      method: 'GET',
      credentials: 'include',
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { authenticated?: boolean };
    return Boolean(data.authenticated);
  } catch {
    return false;
  }
};

export const loginAdmin = async (password: string): Promise<AuthLoginResult> => {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ password }),
    });
    const data = (await res.json().catch(() => ({}))) as { authenticated?: boolean; error?: string };
    if (!res.ok || !data.authenticated) {
      return {
        ok: false,
        error: data.error || 'Não foi possível autenticar. Verifique a senha.',
      };
    }
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: 'Erro de conexão com o servidor de autenticação.',
    };
  }
};

export const logoutAdmin = async (): Promise<void> => {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  } catch {
    // Ignora falha de rede ao encerrar sessao local
  }
};
