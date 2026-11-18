import { initializeApp, getApps, getApp, type FirebaseOptions } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, type User, type Auth } from 'firebase/auth';

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/documents');
provider.addScope('https://www.googleapis.com/auth/drive.file');

let isSigningIn = false;
let cachedAccessToken: string | null = null;
let cachedAuth: Auth | null = null;

function getFirebaseClientConfig(): FirebaseOptions {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY?.trim();
  const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN?.trim();
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID?.trim();
  const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET?.trim();
  const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID?.trim();
  const appId = import.meta.env.VITE_FIREBASE_APP_ID?.trim();
  const measurementId = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID?.trim();

  if (!apiKey || !projectId || !appId) {
    throw new Error(
      'Configuração pública do Firebase (VITE_FIREBASE_API_KEY, VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_APP_ID) não definida no ambiente (.env).'
    );
  }

  return {
    apiKey,
    authDomain: authDomain || `${projectId}.firebaseapp.com`,
    projectId,
    ...(storageBucket ? { storageBucket } : {}),
    ...(messagingSenderId ? { messagingSenderId } : {}),
    appId,
    ...(measurementId ? { measurementId } : {}),
  };
}

function getFirebaseAuth(): Auth {
  if (cachedAuth) return cachedAuth;
  const config = getFirebaseClientConfig();
  const app = getApps().length ? getApp() : initializeApp(config);
  cachedAuth = getAuth(app);
  return cachedAuth;
}

export const initGoogleAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  let auth: Auth;
  try {
    auth = getFirebaseAuth();
  } catch {
    if (onAuthFailure) onAuthFailure();
    return () => {};
  }

  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    const auth = getFirebaseAuth();
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Nenhum token de acesso foi retornado pelo Google Sign-In.');
    }
    cachedAccessToken = credential.accessToken;
    isSigningIn = false;
    return { user: result.user, accessToken: credential.accessToken };
  } catch (error) {
    isSigningIn = false;
    console.error('Google Sign-In Error:', error);
    throw error;
  }
};

export const getAccessToken = async (): Promise<string> => {
  if (cachedAccessToken) return cachedAccessToken;
  const auth = getFirebaseAuth();
  const currentUser = auth.currentUser;
  if (!currentUser) {
    const res = await googleSignIn();
    if (!res) throw new Error('Autenticação com Google necessária.');
    return res.accessToken;
  }
  const res = await googleSignIn();
  if (!res) throw new Error('Não foi possível obter o token de acesso do Google.');
  return res.accessToken;
};

export const exportToGoogleDocs = async (title: string, content: string): Promise<string> => {
  const token = await getAccessToken();

  const createRes = await fetch('https://docs.googleapis.com/v1/documents', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  if (!createRes.ok) {
    const err = await createRes.text();
    throw new Error(`Erro ao criar Google Doc: ${err}`);
  }

  const docData = await createRes.json();
  const documentId = docData.documentId;

  const updateRes = await fetch(`https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requests: [
        {
          insertText: {
            location: { index: 1 },
            text: content,
          },
        },
      ],
    }),
  });

  if (!updateRes.ok) {
    const err = await updateRes.text();
    throw new Error(`Erro ao inserir conteúdo no Google Doc: ${err}`);
  }

  return `https://docs.google.com/document/d/${documentId}/edit`;
};
