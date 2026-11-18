export interface AuthLoginResult {
  ok: boolean;
  error?: string;
}

const SESSION_FALLBACK_KEY = 'mestre_digital_iframe_session_token';

function getStoredFallbackToken(): string | null {
  try {
    if (typeof window === 'undefined' || !window.sessionStorage) return null;
    return window.sessionStorage.getItem(SESSION_FALLBACK_KEY);
  } catch {
    return null;
  }
}

function setStoredFallbackToken(token: string | null): void {
  try {
    if (typeof window === 'undefined' || !window.sessionStorage) return;
    if (token) {
      window.sessionStorage.setItem(SESSION_FALLBACK_KEY, token);
    } else {
      window.sessionStorage.removeItem(SESSION_FALLBACK_KEY);
    }
  } catch {
    // Ignora erro caso sessionStorage esteja indisponivel
  }
}

export function clearClientSessionToken(): void {
  setStoredFallbackToken(null);
}

export function getAuthHeaders(): Record<string, string> {
  const token = getStoredFallbackToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const checkSession = async (): Promise<boolean> => {
  try {
    const res = await fetch('/api/auth/session', {
      method: 'GET',
      credentials: 'include',
      headers: getAuthHeaders(),
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { authenticated?: boolean; cookieActive?: boolean };
    if (!data.authenticated) {
      setStoredFallbackToken(null);
      return false;
    }
    if (data.cookieActive) {
      setStoredFallbackToken(null);
    }
    return true;
  } catch {
    return false;
  }
};

export const loginAdmin = async (password: string): Promise<AuthLoginResult> => {
  try {
    setStoredFallbackToken(null);

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ password }),
    });
    const data = (await res.json().catch(() => ({}))) as {
      authenticated?: boolean;
      token?: string;
      error?: string;
    };

    if (!res.ok || !data.authenticated) {
      return {
        ok: false,
        error: data.error || 'Não foi possível autenticar. Verifique a senha.',
      };
    }

    // Verifica se o navegador aceitou o cookie HttpOnly (em iframes cross-origin pode ser bloqueado)
    let cookieWorked = false;
    try {
      const verifyRes = await fetch('/api/auth/session', {
        method: 'GET',
        credentials: 'include',
      });
      if (verifyRes.ok) {
        const verifyData = (await verifyRes.json()) as { cookieActive?: boolean };
        cookieWorked = Boolean(verifyData.cookieActive);
      }
    } catch {
      cookieWorked = false;
    }

    if (!cookieWorked && typeof data.token === 'string' && data.token) {
      setStoredFallbackToken(data.token);
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
  const headers = getAuthHeaders();
  setStoredFallbackToken(null);
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
      headers,
    });
  } catch {
    // Ignora falha de rede ao encerrar sessao local
  }
};
