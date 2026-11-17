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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const SESSION_COOKIE_NAME = 'mestre_digital_session';
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 horas

// Segredo de assinatura HMAC para sessoes (lido de .env ou gerado aleatoriamente por execucao)
const SESSION_SECRET =
  process.env.SESSION_SECRET && process.env.SESSION_SECRET.trim().length >= 16
    ? process.env.SESSION_SECRET.trim()
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
  return Boolean(req.secure || req.headers['x-forwarded-proto'] === 'https');
}

function getCookieOptions(req: Request) {
  const secure = isRequestSecure(req);
  return {
    httpOnly: true,
    sameSite: (secure ? 'none' : 'lax') as 'none' | 'lax',
    secure,
    path: '/',
    maxAge: SESSION_TTL_MS,
  };
}

function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const token = req.cookies?.[SESSION_COOKIE_NAME] as string | undefined;
  const session = verifySessionToken(token);
  if (!session) {
    res.status(401).json({
      error: 'Sessão não autenticada ou expirada. Faça login como professor para continuar.',
    });
    return;
  }
  next();
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

  app.use(express.json({ limit: '1mb' }));
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
    const token = req.cookies?.[SESSION_COOKIE_NAME] as string | undefined;
    const session = verifySessionToken(token);
    res.json({ authenticated: Boolean(session) });
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
    res.json({ authenticated: true });
  });

  app.post('/api/auth/logout', (req: Request, res: Response) => {
    const opts = getCookieOptions(req);
    res.clearCookie(SESSION_COOKIE_NAME, {
      httpOnly: opts.httpOnly,
      sameSite: opts.sameSite,
      secure: opts.secure,
      path: opts.path,
    });
    res.json({ authenticated: false });
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
