import 'dotenv/config';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { GoogleGenAI, Type } from '@google/genai';
import type { Discipline, Topic, Question, StudyMaterial } from './types.ts';
import {
  FirestoreServiceError,
  getDisciplines,
  saveDiscipline,
  deleteDiscipline,
  getTopics,
  saveTopic,
  deleteTopic,
  getQuestions,
  saveQuestions,
  saveQuestion,
  deleteQuestion,
  getApostila,
  getAllApostilas,
  saveApostila,
  deleteApostila,
  clearAllApostilas,
  migrateDataToFirestore,
} from './src/services/firestoreService.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const SESSION_COOKIE_NAME = 'mestre_digital_session';
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 horas

// Segredo de assinatura HMAC para sessoes (lido de .env ou gerado aleatoriamente por execucao)
const RAW_SESSION_SECRET = process.env.SESSION_SECRET?.trim();
const SESSION_SECRET = RAW_SESSION_SECRET
  ? RAW_SESSION_SECRET.length >= 32
    ? RAW_SESSION_SECRET
    : crypto.createHash('sha256').update(RAW_SESSION_SECRET, 'utf8').digest('hex')
  : crypto.randomBytes(32).toString('hex');

interface SessionPayload {
  role: 'admin';
  iat: number;
  exp: number;
}

function signSessionToken(payload: SessionPayload): string {
  const encodedPayload = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(encodedPayload)
    .digest('base64url');
  return `${encodedPayload}.${signature}`;
}

function verifySessionToken(token: string | undefined): SessionPayload | null {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [encodedPayload, providedSig] = parts;
  if (!encodedPayload || !providedSig) return null;

  const expectedSig = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(encodedPayload)
    .digest('base64url');

  const providedBuf = Buffer.from(providedSig, 'utf8');
  const expectedBuf = Buffer.from(expectedSig, 'utf8');
  if (providedBuf.length !== expectedBuf.length) return null;
  if (!crypto.timingSafeEqual(providedBuf, expectedBuf)) return null;

  try {
    const parsed = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as SessionPayload;
    if (parsed.role !== 'admin' || typeof parsed.exp !== 'number' || Date.now() > parsed.exp) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function constantTimePasswordEquals(input: string, target: string): boolean {
  const inputHash = crypto.createHash('sha256').update(input, 'utf8').digest();
  const targetHash = crypto.createHash('sha256').update(target, 'utf8').digest();
  return crypto.timingSafeEqual(inputHash, targetHash);
}

function isRequestSecure(req: Request): boolean {
  const forwardedProto = String(req.headers['x-forwarded-proto'] || '').toLowerCase();
  const origin = String(req.headers.origin || '').toLowerCase();
  return Boolean(req.secure || forwardedProto.includes('https') || origin.startsWith('https://'));
}

function getCookieOptions(req: Request) {
  const secure = isRequestSecure(req);
  return {
    httpOnly: true,
    sameSite: (secure ? 'none' : 'lax') as 'none' | 'lax',
    secure,
    ...(secure ? { partitioned: true } : {}),
    path: '/',
    maxAge: SESSION_TTL_MS,
  };
}

function extractSessionToken(req: Request): { token: string | undefined; source: 'cookie' | 'bearer' | 'none' } {
  const cookieToken = req.cookies?.[SESSION_COOKIE_NAME] as string | undefined;
  if (cookieToken) {
    return { token: cookieToken, source: 'cookie' };
  }
  const authHeader = req.headers.authorization;
  if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
    const bearerToken = authHeader.slice(7).trim();
    if (bearerToken) {
      return { token: bearerToken, source: 'bearer' };
    }
  }
  return { token: undefined, source: 'none' };
}

function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const { token } = extractSessionToken(req);
  const session = verifySessionToken(token);
  if (!session) {
    res.status(401).json({
      error: 'Sessão não autenticada ou expirada. Faça login como professor para continuar.',
    });
    return;
  }
  next();
}

function getParam(req: Request, name: string): string {
  const value = req.params?.[name];
  return Array.isArray(value) ? value[0] || '' : value || '';
}

function mapFirestoreError(err: unknown): { status: number; message: string } {
  if (err instanceof FirestoreServiceError) {
    return { status: err.httpStatus, message: err.message };
  }

  const rawMessage = err instanceof Error ? err.message : String(err);
  const code = typeof (err as { code?: unknown })?.code === 'number' || typeof (err as { code?: unknown })?.code === 'string'
    ? String((err as { code?: unknown }).code)
    : '';

  if (code === '7' || rawMessage.includes('PERMISSION_DENIED')) {
    return {
      status: 403,
      message: 'Permissão negada no Cloud Firestore. Verifique as permissões IAM da conta de serviço no projeto Firebase.',
    };
  }
  if (code === '5' || rawMessage.includes('NOT_FOUND')) {
    return {
      status: 404,
      message: 'Banco de dados ou coleção do Firestore não encontrada. Verifique FIREBASE_PROJECT_ID e FIREBASE_DATABASE_ID no servidor.',
    };
  }
  if (code === '16' || rawMessage.includes('UNAUTHENTICATED') || rawMessage.includes('Could not load the default credentials')) {
    return {
      status: 503,
      message: 'Credenciais do Firebase Admin SDK ausentes ou inválidas no servidor (.env).',
    };
  }
  if (code === '8' || rawMessage.includes('RESOURCE_EXHAUSTED')) {
    return {
      status: 429,
      message: 'Limite temporário de operações no Firestore atingido. Aguarde alguns instantes e tente novamente.',
    };
  }

  return {
    status: 500,
    message: 'Falha ao acessar o banco de dados Firestore no servidor. Tente novamente.',
  };
}

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY_MISSING');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function mapGeminiError(err: unknown): { status: number; message: string } {
  const rawMessage = err instanceof Error ? err.message : String(err);

  if (rawMessage === 'GEMINI_API_KEY_MISSING') {
    return {
      status: 503,
      message: 'A chave GEMINI_API_KEY não está configurada no ambiente do servidor (.env / Settings > Secrets).',
    };
  }
  if (rawMessage.includes('API_KEY_INVALID') || rawMessage.includes('PERMISSION_DENIED') || rawMessage.includes('403')) {
    return {
      status: 502,
      message: 'Chave da API Gemini inválida ou sem permissão. Verifique a variável GEMINI_API_KEY no servidor.',
    };
  }
  if (rawMessage.includes('RESOURCE_EXHAUSTED') || rawMessage.includes('429')) {
    return {
      status: 429,
      message: 'Limite de requisições da API Gemini atingido temporariamente. Aguarde alguns instantes e tente novamente.',
    };
  }
  return {
    status: 500,
    message: 'Falha ao processar solicitação na API Gemini. Tente novamente em instantes.',
  };
}

async function startServer() {
  const app = express();
  app.set('trust proxy', 1);

  // Cabecalhos de seguranca HTTP (compativeis com preview em iframe e popup OAuth Google)
  app.use(
    helmet({
      contentSecurityPolicy: false,
      frameguard: false,
      crossOriginEmbedderPolicy: false,
      crossOriginOpenerPolicy: false,
    })
  );

  app.use(express.json({ limit: '5mb' }));
  app.use(cookieParser());

  // Limitador de taxa para prevenir forca bruta no login
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 15,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      error: 'Muitas tentativas de login. Aguarde alguns minutos antes de tentar novamente.',
    },
  });

  // Limitador de taxa para chamadas de IA
  const geminiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      error: 'Limite temporário de geração atingido. Aguarde um minuto e tente novamente.',
    },
  });

  // --- Rotas de Autenticacao ---
  app.get('/api/auth/session', (req: Request, res: Response) => {
    const cookieToken = req.cookies?.[SESSION_COOKIE_NAME] as string | undefined;
    const cookieSession = verifySessionToken(cookieToken);
    const { token } = extractSessionToken(req);
    const session = verifySessionToken(token);
    res.json({
      authenticated: Boolean(session),
      cookieActive: Boolean(cookieSession),
    });
  });

  app.post('/api/auth/login', authLimiter, (req: Request, res: Response) => {
    const configuredPassword = process.env.ADMIN_PASSWORD;
    if (!configuredPassword || configuredPassword.trim().length === 0) {
      res.status(503).json({
        error: 'Senha administrativa (ADMIN_PASSWORD) não configurada no arquivo .env do servidor.',
      });
      return;
    }

    const body = req.body as { password?: unknown };
    const password = typeof body?.password === 'string' ? body.password : '';
    if (!password) {
      res.status(400).json({ error: 'Informe a senha de acesso.' });
      return;
    }

    if (!constantTimePasswordEquals(password, configuredPassword)) {
      res.status(401).json({ error: 'Senha incorreta. Tente novamente.' });
      return;
    }

    const now = Date.now();
    const token = signSessionToken({
      role: 'admin',
      iat: now,
      exp: now + SESSION_TTL_MS,
    });

    res.cookie(SESSION_COOKIE_NAME, token, getCookieOptions(req));
    res.json({ authenticated: true, token });
  });

  app.post('/api/auth/logout', (req: Request, res: Response) => {
    const opts = getCookieOptions(req);
    res.clearCookie(SESSION_COOKIE_NAME, {
      httpOnly: opts.httpOnly,
      sameSite: opts.sameSite,
      secure: opts.secure,
      ...(opts.partitioned ? { partitioned: opts.partitioned } : {}),
      path: opts.path,
    });
    res.json({ authenticated: false });
  });

  // --- Rotas REST do Banco de Dados (Cloud Firestore via Firebase Admin SDK) ---
  // Leitura (GET) publica para alunos no Quiz/Apostilas; escrita/migracao protegida por requireAdmin (verifySessionToken).

  app.get('/api/disciplines', async (_req: Request, res: Response) => {
    try {
      const disciplines = await getDisciplines();
      res.json({ disciplines });
    } catch (err) {
      console.error('Erro em GET /api/disciplines:', err);
      const mapped = mapFirestoreError(err);
      res.status(mapped.status).json({ error: mapped.message });
    }
  });

  app.post('/api/disciplines', requireAdmin, async (req: Request, res: Response) => {
    try {
      const body = req.body as Partial<Discipline>;
      const discipline: Discipline = {
        id: typeof body?.id === 'string' && body.id.trim() ? body.id.trim() : `d-${Date.now()}`,
        name: typeof body?.name === 'string' ? body.name : '',
      };
      const saved = await saveDiscipline(discipline);
      res.status(201).json({ discipline: saved });
    } catch (err) {
      console.error('Erro em POST /api/disciplines:', err);
      const mapped = mapFirestoreError(err);
      res.status(mapped.status).json({ error: mapped.message });
    }
  });

  app.put('/api/disciplines/:id', requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = getParam(req, 'id');
      const body = req.body as Partial<Discipline>;
      const saved = await saveDiscipline({
        id,
        name: typeof body?.name === 'string' ? body.name : '',
      });
      res.json({ discipline: saved });
    } catch (err) {
      console.error('Erro em PUT /api/disciplines/:id:', err);
      const mapped = mapFirestoreError(err);
      res.status(mapped.status).json({ error: mapped.message });
    }
  });

  app.delete('/api/disciplines/:id', requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = getParam(req, 'id');
      await deleteDiscipline(id);
      res.json({ deleted: true, id });
    } catch (err) {
      console.error('Erro em DELETE /api/disciplines/:id:', err);
      const mapped = mapFirestoreError(err);
      res.status(mapped.status).json({ error: mapped.message });
    }
  });

  app.get('/api/topics', async (req: Request, res: Response) => {
    try {
      const disciplineId = typeof req.query.disciplineId === 'string' ? req.query.disciplineId.trim() : undefined;
      const topics = await getTopics(disciplineId || undefined);
      res.json({ topics });
    } catch (err) {
      console.error('Erro em GET /api/topics:', err);
      const mapped = mapFirestoreError(err);
      res.status(mapped.status).json({ error: mapped.message });
    }
  });

  app.get('/api/disciplines/:id/topics', async (req: Request, res: Response) => {
    try {
      const disciplineId = getParam(req, 'id');
      const topics = await getTopics(disciplineId);
      res.json({ topics });
    } catch (err) {
      console.error('Erro em GET /api/disciplines/:id/topics:', err);
      const mapped = mapFirestoreError(err);
      res.status(mapped.status).json({ error: mapped.message });
    }
  });

  app.post('/api/disciplines/:id/topics', requireAdmin, async (req: Request, res: Response) => {
    try {
      const disciplineId = getParam(req, 'id');
      const body = req.body as Partial<Topic>;
      const topic: Topic = {
        id: typeof body?.id === 'string' && body.id.trim() ? body.id.trim() : `t-${Date.now()}`,
        name: typeof body?.name === 'string' ? body.name : '',
        disciplineId,
      };
      const saved = await saveTopic(topic);
      res.status(201).json({ topic: saved });
    } catch (err) {
      console.error('Erro em POST /api/disciplines/:id/topics:', err);
      const mapped = mapFirestoreError(err);
      res.status(mapped.status).json({ error: mapped.message });
    }
  });

  app.put('/api/topics/:id', requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = getParam(req, 'id');
      const body = req.body as Partial<Topic>;
      const saved = await saveTopic({
        id,
        name: typeof body?.name === 'string' ? body.name : '',
        disciplineId: typeof body?.disciplineId === 'string' ? body.disciplineId : '',
      });
      res.json({ topic: saved });
    } catch (err) {
      console.error('Erro em PUT /api/topics/:id:', err);
      const mapped = mapFirestoreError(err);
      res.status(mapped.status).json({ error: mapped.message });
    }
  });

  app.delete('/api/topics/:id', requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = getParam(req, 'id');
      await deleteTopic(id);
      res.json({ deleted: true, id });
    } catch (err) {
      console.error('Erro em DELETE /api/topics/:id:', err);
      const mapped = mapFirestoreError(err);
      res.status(mapped.status).json({ error: mapped.message });
    }
  });

  app.get('/api/questions', async (req: Request, res: Response) => {
    try {
      const topicId = typeof req.query.topicId === 'string' ? req.query.topicId.trim() : undefined;
      const questions = await getQuestions(topicId || undefined);
      res.json({ questions });
    } catch (err) {
      console.error('Erro em GET /api/questions:', err);
      const mapped = mapFirestoreError(err);
      res.status(mapped.status).json({ error: mapped.message });
    }
  });

  app.get('/api/topics/:id/questions', async (req: Request, res: Response) => {
    try {
      const topicId = getParam(req, 'id');
      const questions = await getQuestions(topicId);
      res.json({ questions });
    } catch (err) {
      console.error('Erro em GET /api/topics/:id/questions:', err);
      const mapped = mapFirestoreError(err);
      res.status(mapped.status).json({ error: mapped.message });
    }
  });

  app.post('/api/topics/:id/questions', requireAdmin, async (req: Request, res: Response) => {
    try {
      const topicId = getParam(req, 'id');
      const rawBody = req.body as Question | Question[] | { questions?: Question[] };
      let list: Question[];
      if (Array.isArray(rawBody)) {
        list = rawBody;
      } else if (rawBody && typeof rawBody === 'object' && Array.isArray((rawBody as { questions?: Question[] }).questions)) {
        list = (rawBody as { questions: Question[] }).questions;
      } else if (rawBody && typeof rawBody === 'object') {
        list = [rawBody as Question];
      } else {
        list = [];
      }

      const normalized = list.map((q, idx) => ({
        ...q,
        id: typeof q?.id === 'string' && q.id.trim() ? q.id.trim() : `q-${Date.now()}-${idx}`,
        topicId,
      }));

      const saved = await saveQuestions(topicId, normalized);
      res.status(201).json({ questions: saved });
    } catch (err) {
      console.error('Erro em POST /api/topics/:id/questions:', err);
      const mapped = mapFirestoreError(err);
      res.status(mapped.status).json({ error: mapped.message });
    }
  });

  app.put('/api/questions/:id', requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = getParam(req, 'id');
      const body = req.body as Partial<Question>;
      const saved = await saveQuestion({
        id,
        topicId: typeof body?.topicId === 'string' ? body.topicId : '',
        question: typeof body?.question === 'string' ? body.question : '',
        options: Array.isArray(body?.options) ? body.options : [],
        correctAnswer: typeof body?.correctAnswer === 'number' ? body.correctAnswer : 0,
        explanation: typeof body?.explanation === 'string' ? body.explanation : '',
      });
      res.json({ question: saved });
    } catch (err) {
      console.error('Erro em PUT /api/questions/:id:', err);
      const mapped = mapFirestoreError(err);
      res.status(mapped.status).json({ error: mapped.message });
    }
  });

  app.delete('/api/questions/:id', requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = getParam(req, 'id');
      await deleteQuestion(id);
      res.json({ deleted: true, id });
    } catch (err) {
      console.error('Erro em DELETE /api/questions/:id:', err);
      const mapped = mapFirestoreError(err);
      res.status(mapped.status).json({ error: mapped.message });
    }
  });

  app.get('/api/apostilas', async (_req: Request, res: Response) => {
    try {
      const apostilas = await getAllApostilas();
      res.json({ apostilas });
    } catch (err) {
      console.error('Erro em GET /api/apostilas:', err);
      const mapped = mapFirestoreError(err);
      res.status(mapped.status).json({ error: mapped.message });
    }
  });

  app.get('/api/topics/:id/apostila', async (req: Request, res: Response) => {
    try {
      const topicId = getParam(req, 'id');
      const apostila = await getApostila(topicId);
      res.json({ apostila });
    } catch (err) {
      console.error('Erro em GET /api/topics/:id/apostila:', err);
      const mapped = mapFirestoreError(err);
      res.status(mapped.status).json({ error: mapped.message });
    }
  });

  app.put('/api/topics/:id/apostila', requireAdmin, async (req: Request, res: Response) => {
    try {
      const topicId = getParam(req, 'id');
      const body = req.body as StudyMaterial | { apostila?: StudyMaterial };
      const material =
        body && typeof body === 'object' && 'apostila' in body && body.apostila
          ? body.apostila
          : (body as StudyMaterial);

      if (!material || typeof material !== 'object') {
        res.status(400).json({ error: 'Conteúdo da apostila inválido.' });
        return;
      }

      const saved = await saveApostila(topicId, { ...material, topicId });
      res.json({ apostila: saved });
    } catch (err) {
      console.error('Erro em PUT /api/topics/:id/apostila:', err);
      const mapped = mapFirestoreError(err);
      res.status(mapped.status).json({ error: mapped.message });
    }
  });

  app.delete('/api/topics/:id/apostila', requireAdmin, async (req: Request, res: Response) => {
    try {
      const topicId = getParam(req, 'id');
      await deleteApostila(topicId);
      res.json({ deleted: true, topicId });
    } catch (err) {
      console.error('Erro em DELETE /api/topics/:id/apostila:', err);
      const mapped = mapFirestoreError(err);
      res.status(mapped.status).json({ error: mapped.message });
    }
  });

  app.delete('/api/apostilas', requireAdmin, async (_req: Request, res: Response) => {
    try {
      await clearAllApostilas();
      res.json({ cleared: true });
    } catch (err) {
      console.error('Erro em DELETE /api/apostilas:', err);
      const mapped = mapFirestoreError(err);
      res.status(mapped.status).json({ error: mapped.message });
    }
  });

  app.post('/api/migrate', requireAdmin, async (req: Request, res: Response) => {
    try {
      const body = req.body as {
        disciplines?: Discipline[];
        topics?: Topic[];
        questions?: Question[];
        apostilas?: Record<string, StudyMaterial>;
        customMaterials?: Record<string, StudyMaterial>;
        studyMaterials?: Record<string, StudyMaterial>;
      };

      const apostilasMap = body?.apostilas || body?.customMaterials || body?.studyMaterials || {};
      const disciplines = Array.isArray(body?.disciplines) ? body.disciplines : [];
      const topics = Array.isArray(body?.topics) ? body.topics : [];
      const questions = Array.isArray(body?.questions) ? body.questions : [];

      if (
        disciplines.length === 0 &&
        topics.length === 0 &&
        questions.length === 0 &&
        Object.keys(apostilasMap).length === 0
      ) {
        res.status(400).json({ error: 'Nenhum dado informado no corpo da requisição para migração.' });
        return;
      }

      const summary = await migrateDataToFirestore({
        disciplines,
        topics,
        questions,
        apostilas: apostilasMap,
      });

      res.json({
        ok: true,
        migrated: summary,
      });
    } catch (err) {
      console.error('Erro em POST /api/migrate:', err);
      const mapped = mapFirestoreError(err);
      res.status(mapped.status).json({ error: mapped.message });
    }
  });

  // --- Rotas da API Gemini (Exclusivas no Back-end e Protegidas por Sessao) ---
  app.post('/api/gemini/generate-questions', requireAdmin, geminiLimiter, async (req: Request, res: Response) => {
    try {
      const body = req.body as {
        disciplineName?: unknown;
        topicName?: unknown;
        count?: unknown;
        focus?: unknown;
      };

      const topicName = typeof body?.topicName === 'string' ? body.topicName.trim().slice(0, 120) : '';
      const disciplineName =
        typeof body?.disciplineName === 'string' ? body.disciplineName.trim().slice(0, 120) : 'Desenvolvimento de Sistemas';
      const focus = typeof body?.focus === 'string' ? body.focus.trim().slice(0, 400) : '';
      const rawCount = typeof body?.count === 'number' ? Math.floor(body.count) : 3;
      const count = Math.min(Math.max(rawCount || 3, 1), 10);

      if (!topicName) {
        res.status(400).json({ error: 'O nome do tópico é obrigatório para gerar questões.' });
        return;
      }

      const ai = getGeminiClient();
      const prompt = [
        `Gere exatamente ${count} questões inéditas de múltipla escolha em Português (Brasil) para ensino técnico/superior de Desenvolvimento de Sistemas.`,
        `Disciplina: "${disciplineName}".`,
        `Tópico: "${topicName}".`,
        focus ? `Foco pedagógico adicional solicitado pelo professor: "${focus}".` : '',
        'Regras obrigatórias:',
        '- Cada questão deve ter exatamente 5 alternativas plausíveis (sem letras A/B/C/D/E no texto da alternativa).',
        '- Apenas 1 alternativa correta, indicada pelo índice inteiro correctAnswer (0 a 4).',
        '- Inclua uma explicação pedagógica clara e objetiva justificando a resposta correta.',
        '- Não inclua tags HTML brutas nos textos.',
      ]
        .filter(Boolean)
        .join('\n');

      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: prompt,
        config: {
          systemInstruction:
            'Você é um professor especialista em Engenharia e Desenvolvimento de Sistemas elaborando questões de avaliação precisas e didáticas.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: {
                  type: Type.STRING,
                  description: 'Enunciado claro e completo da questão.',
                },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Lista com exatamente 5 alternativas de resposta.',
                },
                correctAnswer: {
                  type: Type.INTEGER,
                  description: 'Índice da alternativa correta entre 0 e 4.',
                },
                explanation: {
                  type: Type.STRING,
                  description: 'Explicação didática do motivo da resposta correta.',
                },
              },
              required: ['question', 'options', 'correctAnswer', 'explanation'],
            },
          },
        },
      });

      const rawJson = (response.text ?? '[]').trim();
      const parsed = JSON.parse(rawJson) as Array<{
        question?: unknown;
        options?: unknown;
        correctAnswer?: unknown;
        explanation?: unknown;
      }>;

      if (!Array.isArray(parsed)) {
        res.status(502).json({ error: 'Resposta inválida recebida do modelo Gemini.' });
        return;
      }

      const sanitizedQuestions = parsed
        .filter((item) => typeof item?.question === 'string' && Array.isArray(item?.options) && item.options.length >= 5)
        .slice(0, count)
        .map((item) => {
          const opts = (item.options as unknown[]).slice(0, 5).map((o) => String(o ?? '').trim());
          const rawIdx = typeof item.correctAnswer === 'number' ? Math.floor(item.correctAnswer) : 0;
          const correctAnswer = rawIdx >= 0 && rawIdx < 5 ? rawIdx : 0;
          return {
            question: String(item.question).trim(),
            options: opts,
            correctAnswer,
            explanation: typeof item.explanation === 'string' ? item.explanation.trim() : '',
          };
        });

      if (sanitizedQuestions.length === 0) {
        res.status(502).json({ error: 'Não foi possível estruturar questões válidas a partir da resposta da IA.' });
        return;
      }

      res.json({ questions: sanitizedQuestions });
    } catch (err) {
      console.error('Erro em /api/gemini/generate-questions:', err);
      const mapped = mapGeminiError(err);
      res.status(mapped.status).json({ error: mapped.message });
    }
  });

  app.post('/api/gemini/generate-material', requireAdmin, geminiLimiter, async (req: Request, res: Response) => {
    try {
      const body = req.body as {
        disciplineName?: unknown;
        topicName?: unknown;
        guidelines?: unknown;
      };

      const topicName = typeof body?.topicName === 'string' ? body.topicName.trim().slice(0, 120) : '';
      const disciplineName =
        typeof body?.disciplineName === 'string' ? body.disciplineName.trim().slice(0, 120) : 'Desenvolvimento de Sistemas';
      const guidelines = typeof body?.guidelines === 'string' ? body.guidelines.trim().slice(0, 600) : '';

      if (!topicName) {
        res.status(400).json({ error: 'O nome do tópico é obrigatório para gerar a apostila.' });
        return;
      }

      const ai = getGeminiClient();
      const prompt = [
        `Elabore uma apostila didática completa em Markdown (GFM) em Português (Brasil) sobre o tópico "${topicName}" da disciplina "${disciplineName}".`,
        guidelines ? `Orientações específicas do professor: "${guidelines}".` : '',
        'Estruture o material com:',
        '1. Título principal (#) e Introdução contextualizando o problema prático.',
        '2. Fundamentação Teórica e conceitos-chave explicados com clareza.',
        '3. Tabela comparativa ou resumo técnico em Markdown.',
        '4. Exemplo prático de código comentado em bloco Markdown (```).',
        '5. Se útil, um diagrama simples em bloco ```mermaid (sem usar HTML dentro dos rótulos, usando aspas em rótulos com parênteses).',
        '6. Boas práticas, armadilhas comuns e síntese final.',
        'Não inclua tags HTML inline (como <script>, <div> ou <iframe>). Use apenas Markdown puro.',
      ]
        .filter(Boolean)
        .join('\n');

      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: prompt,
        config: {
          systemInstruction:
            'Você é um autor de material didático técnico em Engenharia de Software. Escreva exclusivamente em Markdown limpo, didático e bem estruturado.',
        },
      });

      const markdownContent = (response.text ?? '').trim();
      if (!markdownContent) {
        res.status(502).json({ error: 'O modelo não retornou conteúdo para a apostila.' });
        return;
      }

      res.json({ markdownContent });
    } catch (err) {
      console.error('Erro em /api/gemini/generate-material:', err);
      const mapped = mapGeminiError(err);
      res.status(mapped.status).json({ error: mapped.message });
    }
  });

  // --- Servico do Front-End (Vite em Dev, Arquivos Estaticos em Producao) ---
  if (!IS_PRODUCTION) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('/{*splat}', (req: Request, res: Response) => {
      if (req.path.startsWith('/api/')) {
        res.status(404).json({ error: 'Rota de API não encontrada.' });
        return;
      }
      const indexHtml = path.join(distDir, 'index.html');
      if (fs.existsSync(indexHtml)) {
        res.sendFile(indexHtml);
      } else {
        res.status(404).send('Build do front-end não encontrado. Execute npm run build.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor Mestre Digital rodando na porta ${PORT} (${IS_PRODUCTION ? 'produção' : 'desenvolvimento'})`);
  });
}

startServer().catch((err) => {
  console.error('Falha fatal ao iniciar o servidor:', err);
  process.exit(1);
});
