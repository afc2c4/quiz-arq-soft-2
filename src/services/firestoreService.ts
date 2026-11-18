import fs from 'fs';
import path from 'path';
import { initializeApp, getApps, getApp, cert, applicationDefault, type ServiceAccount, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore, type WriteBatch } from 'firebase-admin/firestore';
import type { Discipline, Topic, Question, StudyMaterial } from '../../types.ts';

const COLLECTIONS = {
  disciplines: 'disciplines',
  topics: 'topics',
  questions: 'questions',
  apostilas: 'apostilas',
} as const;

export class FirestoreServiceError extends Error {
  code: string;
  httpStatus: number;

  constructor(code: string, message: string, httpStatus = 500) {
    super(message);
    this.name = 'FirestoreServiceError';
    this.code = code;
    this.httpStatus = httpStatus;
  }
}

let settingsApplied = false;

interface AppletFirebaseFallback {
  projectId?: string;
  firestoreDatabaseId?: string;
}

function readServerAppletConfig(): AppletFirebaseFallback {
  try {
    const configPath = path.resolve(process.cwd(), 'firebase-applet-config.json');
    if (!fs.existsSync(configPath)) return {};
    const raw = fs.readFileSync(configPath, 'utf8');
    const parsed = JSON.parse(raw) as AppletFirebaseFallback;
    const projectId = typeof parsed.projectId === 'string' ? parsed.projectId.trim() : '';
    const firestoreDatabaseId =
      typeof parsed.firestoreDatabaseId === 'string' ? parsed.firestoreDatabaseId.trim() : '';
    if (!projectId || projectId === 'remixed-project-id') {
      return {};
    }
    return {
      projectId,
      firestoreDatabaseId:
        firestoreDatabaseId && firestoreDatabaseId !== 'remixed-firestore-database-id'
          ? firestoreDatabaseId
          : undefined,
    };
  } catch {
    return {};
  }
}

function resolveAdminApp(): { app: App; databaseId?: string } {
  const appletConfig = readServerAppletConfig();
  const envProjectId = process.env.FIREBASE_PROJECT_ID?.trim() || appletConfig.projectId;
  const databaseId = process.env.FIREBASE_DATABASE_ID?.trim() || appletConfig.firestoreDatabaseId;

  if (getApps().length > 0) {
    return { app: getApp(), databaseId };
  }

  const rawServiceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
  const envClientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
  const envPrivateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n').trim();

  if (rawServiceAccountJson) {
    let parsed: ServiceAccount & { project_id?: string };
    try {
      parsed = JSON.parse(rawServiceAccountJson) as ServiceAccount & { project_id?: string };
    } catch {
      throw new FirestoreServiceError(
        'FIREBASE_CONFIG_INVALID',
        'A variável FIREBASE_SERVICE_ACCOUNT_JSON no servidor não contém um JSON válido.',
        503
      );
    }
    const projectId = envProjectId || parsed.projectId || parsed.project_id;
    if (!projectId) {
      throw new FirestoreServiceError(
        'FIREBASE_CONFIG_MISSING',
        'FIREBASE_PROJECT_ID não encontrado na configuração da Service Account.',
        503
      );
    }
    return {
      app: initializeApp({
        credential: cert(parsed),
        projectId,
      }),
      databaseId,
    };
  }

  if (envClientEmail && envPrivateKey) {
    if (!envProjectId) {
      throw new FirestoreServiceError(
        'FIREBASE_CONFIG_MISSING',
        'FIREBASE_PROJECT_ID é obrigatório quando FIREBASE_CLIENT_EMAIL e FIREBASE_PRIVATE_KEY são utilizados.',
        503
      );
    }
    return {
      app: initializeApp({
        credential: cert({
          projectId: envProjectId,
          clientEmail: envClientEmail,
          privateKey: envPrivateKey,
        }),
        projectId: envProjectId,
      }),
      databaseId,
    };
  }

  if (!envProjectId) {
    throw new FirestoreServiceError(
      'FIREBASE_CONFIG_MISSING',
      'Credenciais do Firebase Admin SDK não configuradas. Defina FIREBASE_PROJECT_ID e FIREBASE_DATABASE_ID no .env do servidor.',
      503
    );
  }

  return {
    app: initializeApp({
      credential: applicationDefault(),
      projectId: envProjectId,
    }),
    databaseId,
  };
}

function getDb(): Firestore {
  const { app, databaseId } = resolveAdminApp();
  const db = databaseId && databaseId !== '(default)' ? getFirestore(app, databaseId) : getFirestore(app);

  if (!settingsApplied) {
    try {
      db.settings({ ignoreUndefinedProperties: true });
    } catch {
      // Ignora caso as configuracoes ja tenham sido aplicadas nesta instancia
    }
    settingsApplied = true;
  }

  return db;
}

function assertValidDocId(id: string, label: string): string {
  const trimmed = typeof id === 'string' ? id.trim() : '';
  if (!trimmed || trimmed.length > 128 || trimmed.includes('/') || !/^[a-zA-Z0-9_\-:.]+$/.test(trimmed)) {
    throw new FirestoreServiceError(
      'INVALID_ID',
      `${label} inválido. Use apenas letras, números, hífen, sublinhado, ponto ou dois-pontos (máx. 128 caracteres).`,
      400
    );
  }
  return trimmed;
}

function sanitizeDiscipline(input: Discipline): Discipline & { updatedAt: string } {
  const id = assertValidDocId(input.id, 'ID da disciplina');
  const name = typeof input.name === 'string' ? input.name.trim().slice(0, 200) : '';
  if (!name) {
    throw new FirestoreServiceError('INVALID_INPUT', 'O nome da disciplina é obrigatório.', 400);
  }
  return {
    id,
    name,
    updatedAt: new Date().toISOString(),
  };
}

function sanitizeTopic(input: Topic): Topic & { updatedAt: string } {
  const id = assertValidDocId(input.id, 'ID do tópico');
  const disciplineId = assertValidDocId(input.disciplineId, 'ID da disciplina');
  const name = typeof input.name === 'string' ? input.name.trim().slice(0, 200) : '';
  if (!name) {
    throw new FirestoreServiceError('INVALID_INPUT', 'O nome do tópico é obrigatório.', 400);
  }
  return {
    id,
    name,
    disciplineId,
    updatedAt: new Date().toISOString(),
  };
}

function sanitizeQuestion(input: Question, overrideTopicId?: string): Question & { updatedAt: string } {
  const id = assertValidDocId(input.id, 'ID da questão');
  const topicId = assertValidDocId(overrideTopicId || input.topicId, 'ID do tópico');
  const questionText = typeof input.question === 'string' ? input.question.trim().slice(0, 5000) : '';
  if (!questionText) {
    throw new FirestoreServiceError('INVALID_INPUT', 'O enunciado da questão é obrigatório.', 400);
  }

  const rawOptions = Array.isArray(input.options) ? input.options : [];
  const options = rawOptions.slice(0, 5).map((opt) => String(opt ?? '').trim().slice(0, 1000));
  if (options.length < 2 || options.some((opt) => opt.length === 0)) {
    throw new FirestoreServiceError('INVALID_INPUT', 'A questão deve possuir alternativas válidas e preenchidas.', 400);
  }

  const rawAnswer = typeof input.correctAnswer === 'number' ? Math.floor(input.correctAnswer) : 0;
  const correctAnswer = rawAnswer >= 0 && rawAnswer < options.length ? rawAnswer : 0;
  const explanation = typeof input.explanation === 'string' ? input.explanation.trim().slice(0, 5000) : '';

  return {
    id,
    topicId,
    question: questionText,
    options,
    correctAnswer,
    explanation,
    updatedAt: new Date().toISOString(),
  };
}

function sanitizeApostila(topicId: string, material: StudyMaterial): StudyMaterial & { updatedAt: string } {
  const validTopicId = assertValidDocId(topicId || material.topicId, 'ID do tópico');
  const sanitized: StudyMaterial & { updatedAt: string } = {
    topicId: validTopicId,
    topicName: typeof material.topicName === 'string' ? material.topicName.trim().slice(0, 200) : undefined,
    summary: typeof material.summary === 'string' ? material.summary.slice(0, 10000) : undefined,
    markdownContent: typeof material.markdownContent === 'string' ? material.markdownContent.slice(0, 400000) : undefined,
    customTabs: Array.isArray(material.customTabs)
      ? material.customTabs.slice(0, 20).map((tab) => ({
          id: String(tab.id || '').slice(0, 100),
          label: String(tab.label || '').slice(0, 120),
          icon: typeof tab.icon === 'string' ? tab.icon.slice(0, 60) : undefined,
          content: String(tab.content || '').slice(0, 100000),
        }))
      : undefined,
    introduction: Array.isArray(material.introduction)
      ? material.introduction.slice(0, 20).map((p) => String(p || '').slice(0, 10000))
      : undefined,
    theoreticalFoundation: material.theoreticalFoundation
      ? {
          description: String(material.theoreticalFoundation.description || '').slice(0, 30000),
          asciiDiagram:
            typeof material.theoreticalFoundation.asciiDiagram === 'string'
              ? material.theoreticalFoundation.asciiDiagram.slice(0, 20000)
              : undefined,
        }
      : undefined,
    codeSnippet: material.codeSnippet
      ? {
          title: String(material.codeSnippet.title || '').slice(0, 200),
          language: String(material.codeSnippet.language || 'typescript').slice(0, 40),
          code: String(material.codeSnippet.code || '').slice(0, 50000),
        }
      : undefined,
    syntaxDeconstruction: Array.isArray(material.syntaxDeconstruction)
      ? material.syntaxDeconstruction.slice(0, 50).map((item) => ({
          lineOrKeyword: String(item.lineOrKeyword || '').slice(0, 500),
          spokenReasoning: String(item.spokenReasoning || '').slice(0, 3000),
          sideEffect: String(item.sideEffect || '').slice(0, 3000),
        }))
      : undefined,
    bestPracticesAndPitfalls: Array.isArray(material.bestPracticesAndPitfalls)
      ? material.bestPracticesAndPitfalls.slice(0, 50).map((item) => String(item || '').slice(0, 2000))
      : undefined,
    keyPoints: Array.isArray(material.keyPoints)
      ? material.keyPoints.slice(0, 50).map((item) => String(item || '').slice(0, 2000))
      : undefined,
    bestPractices: Array.isArray(material.bestPractices)
      ? material.bestPractices.slice(0, 50).map((item) => String(item || '').slice(0, 2000))
      : undefined,
    codeSnippets: Array.isArray(material.codeSnippets)
      ? material.codeSnippets.slice(0, 10).map((cs) => ({
          title: String(cs.title || '').slice(0, 200),
          language: String(cs.language || 'typescript').slice(0, 40),
          code: String(cs.code || '').slice(0, 50000),
          explanation: typeof cs.explanation === 'string' ? cs.explanation.slice(0, 5000) : undefined,
        }))
      : undefined,
    commonPitfalls: Array.isArray(material.commonPitfalls)
      ? material.commonPitfalls.slice(0, 50).map((item) => String(item || '').slice(0, 2000))
      : undefined,
    updatedAt: new Date().toISOString(),
  };

  return sanitized;
}

async function commitOperationsInBatches(
  db: Firestore,
  operations: Array<(batch: WriteBatch) => void>
): Promise<void> {
  const CHUNK_SIZE = 400;
  for (let i = 0; i < operations.length; i += CHUNK_SIZE) {
    const chunk = operations.slice(i, i + CHUNK_SIZE);
    const batch = db.batch();
    for (const op of chunk) {
      op(batch);
    }
    await batch.commit();
  }
}

// --- Disciplinas ---

export async function getDisciplines(): Promise<Discipline[]> {
  const db = getDb();
  const snapshot = await db.collection(COLLECTIONS.disciplines).get();
  return snapshot.docs.map((doc) => {
    const data = doc.data() as Discipline;
    return {
      id: data.id || doc.id,
      name: String(data.name || ''),
    };
  });
}

export async function saveDiscipline(discipline: Discipline): Promise<Discipline> {
  const db = getDb();
  const payload = sanitizeDiscipline(discipline);
  await db.collection(COLLECTIONS.disciplines).doc(payload.id).set(payload, { merge: true });
  return { id: payload.id, name: payload.name };
}

export async function deleteDiscipline(disciplineId: string): Promise<void> {
  const db = getDb();
  const validId = assertValidDocId(disciplineId, 'ID da disciplina');

  const topicsSnap = await db.collection(COLLECTIONS.topics).where('disciplineId', '==', validId).get();
  const topicIds = topicsSnap.docs.map((d) => d.id);

  const ops: Array<(batch: WriteBatch) => void> = [
    (batch) => batch.delete(db.collection(COLLECTIONS.disciplines).doc(validId)),
  ];

  for (const tId of topicIds) {
    ops.push((batch) => batch.delete(db.collection(COLLECTIONS.topics).doc(tId)));
    ops.push((batch) => batch.delete(db.collection(COLLECTIONS.apostilas).doc(tId)));

    const qSnap = await db.collection(COLLECTIONS.questions).where('topicId', '==', tId).get();
    qSnap.docs.forEach((qDoc) => {
      ops.push((batch) => batch.delete(qDoc.ref));
    });
  }

  await commitOperationsInBatches(db, ops);
}

// --- Topicos ---

export async function getTopics(disciplineId?: string): Promise<Topic[]> {
  const db = getDb();
  const col = db.collection(COLLECTIONS.topics);
  const snapshot = disciplineId
    ? await col.where('disciplineId', '==', assertValidDocId(disciplineId, 'ID da disciplina')).get()
    : await col.get();

  return snapshot.docs.map((doc) => {
    const data = doc.data() as Topic;
    return {
      id: data.id || doc.id,
      name: String(data.name || ''),
      disciplineId: String(data.disciplineId || ''),
    };
  });
}

export async function saveTopic(topic: Topic): Promise<Topic> {
  const db = getDb();
  const payload = sanitizeTopic(topic);
  await db.collection(COLLECTIONS.topics).doc(payload.id).set(payload, { merge: true });
  return {
    id: payload.id,
    name: payload.name,
    disciplineId: payload.disciplineId,
  };
}

export async function deleteTopic(topicId: string): Promise<void> {
  const db = getDb();
  const validId = assertValidDocId(topicId, 'ID do tópico');
  const qSnap = await db.collection(COLLECTIONS.questions).where('topicId', '==', validId).get();

  const ops: Array<(batch: WriteBatch) => void> = [
    (batch) => batch.delete(db.collection(COLLECTIONS.topics).doc(validId)),
    (batch) => batch.delete(db.collection(COLLECTIONS.apostilas).doc(validId)),
    ...qSnap.docs.map((qDoc) => (batch: WriteBatch) => batch.delete(qDoc.ref)),
  ];

  await commitOperationsInBatches(db, ops);
}

// --- Questoes ---

export async function getQuestions(topicId?: string): Promise<Question[]> {
  const db = getDb();
  const col = db.collection(COLLECTIONS.questions);
  const snapshot = topicId
    ? await col.where('topicId', '==', assertValidDocId(topicId, 'ID do tópico')).get()
    : await col.get();

  return snapshot.docs.map((doc) => {
    const data = doc.data() as Question;
    return {
      id: data.id || doc.id,
      topicId: String(data.topicId || ''),
      question: String(data.question || ''),
      options: Array.isArray(data.options) ? data.options.map((o) => String(o ?? '')) : [],
      correctAnswer: typeof data.correctAnswer === 'number' ? data.correctAnswer : 0,
      explanation: String(data.explanation || ''),
    };
  });
}

export async function saveQuestions(topicId: string, questions: Question[]): Promise<Question[]> {
  const db = getDb();
  const validTopicId = assertValidDocId(topicId, 'ID do tópico');
  if (!Array.isArray(questions) || questions.length === 0) {
    throw new FirestoreServiceError('INVALID_INPUT', 'Informe ao menos uma questão para salvar.', 400);
  }

  const sanitizedList = questions.map((q) => sanitizeQuestion(q, validTopicId));
  const ops: Array<(batch: WriteBatch) => void> = sanitizedList.map((item) => (batch) => {
    batch.set(db.collection(COLLECTIONS.questions).doc(item.id), item, { merge: true });
  });

  await commitOperationsInBatches(db, ops);

  return sanitizedList.map(({ id, topicId: tId, question, options, correctAnswer, explanation }) => ({
    id,
    topicId: tId,
    question,
    options,
    correctAnswer,
    explanation,
  }));
}

export async function saveQuestion(question: Question): Promise<Question> {
  const [saved] = await saveQuestions(question.topicId, [question]);
  return saved;
}

export async function deleteQuestion(questionId: string): Promise<void> {
  const db = getDb();
  const validId = assertValidDocId(questionId, 'ID da questão');
  await db.collection(COLLECTIONS.questions).doc(validId).delete();
}

// --- Apostilas (Materiais de Estudo) ---

export async function getApostila(topicId: string): Promise<StudyMaterial | null> {
  const db = getDb();
  const validId = assertValidDocId(topicId, 'ID do tópico');
  const snap = await db.collection(COLLECTIONS.apostilas).doc(validId).get();
  if (!snap.exists) {
    return null;
  }
  const data = snap.data() as StudyMaterial & { updatedAt?: string };
  const { updatedAt: _ignored, ...material } = data;
  return {
    ...material,
    topicId: material.topicId || validId,
  };
}

export async function getAllApostilas(): Promise<Record<string, StudyMaterial>> {
  const db = getDb();
  const snap = await db.collection(COLLECTIONS.apostilas).get();
  const result: Record<string, StudyMaterial> = {};
  snap.docs.forEach((doc) => {
    const data = doc.data() as StudyMaterial & { updatedAt?: string };
    const { updatedAt: _ignored, ...material } = data;
    const topicId = material.topicId || doc.id;
    result[topicId] = { ...material, topicId };
  });
  return result;
}

export async function saveApostila(topicId: string, material: StudyMaterial): Promise<StudyMaterial> {
  const db = getDb();
  const payload = sanitizeApostila(topicId, material);
  await db.collection(COLLECTIONS.apostilas).doc(payload.topicId).set(payload);
  const { updatedAt: _ignored, ...cleanMaterial } = payload;
  return cleanMaterial;
}

export async function deleteApostila(topicId: string): Promise<void> {
  const db = getDb();
  const validId = assertValidDocId(topicId, 'ID do tópico');
  await db.collection(COLLECTIONS.apostilas).doc(validId).delete();
}

export async function clearAllApostilas(): Promise<void> {
  const db = getDb();
  const snap = await db.collection(COLLECTIONS.apostilas).get();
  if (snap.empty) return;
  const ops: Array<(batch: WriteBatch) => void> = snap.docs.map(
    (doc) => (batch) => batch.delete(doc.ref)
  );
  await commitOperationsInBatches(db, ops);
}

// --- Migracao em Lote (localStorage -> Firestore) ---

export interface MigrationPayload {
  disciplines?: Discipline[];
  topics?: Topic[];
  questions?: Question[];
  apostilas?: Record<string, StudyMaterial>;
}

export interface MigrationSummary {
  disciplines: number;
  topics: number;
  questions: number;
  apostilas: number;
}

export async function migrateDataToFirestore(payload: MigrationPayload): Promise<MigrationSummary> {
  const db = getDb();
  const ops: Array<(batch: WriteBatch) => void> = [];

  const disciplines = Array.isArray(payload.disciplines) ? payload.disciplines : [];
  const topics = Array.isArray(payload.topics) ? payload.topics : [];
  const questions = Array.isArray(payload.questions) ? payload.questions : [];
  const apostilasMap =
    payload.apostilas && typeof payload.apostilas === 'object' && !Array.isArray(payload.apostilas)
      ? payload.apostilas
      : {};

  const sanitizedDisciplines = disciplines.map((d) => sanitizeDiscipline(d));
  const sanitizedTopics = topics.map((t) => sanitizeTopic(t));
  const sanitizedQuestions = questions.map((q) => sanitizeQuestion(q));
  const sanitizedApostilas = Object.entries(apostilasMap).map(([topicId, mat]) =>
    sanitizeApostila(topicId, mat)
  );

  for (const d of sanitizedDisciplines) {
    ops.push((batch) => batch.set(db.collection(COLLECTIONS.disciplines).doc(d.id), d, { merge: true }));
  }
  for (const t of sanitizedTopics) {
    ops.push((batch) => batch.set(db.collection(COLLECTIONS.topics).doc(t.id), t, { merge: true }));
  }
  for (const q of sanitizedQuestions) {
    ops.push((batch) => batch.set(db.collection(COLLECTIONS.questions).doc(q.id), q, { merge: true }));
  }
  for (const a of sanitizedApostilas) {
    ops.push((batch) => batch.set(db.collection(COLLECTIONS.apostilas).doc(a.topicId), a, { merge: true }));
  }

  if (ops.length > 0) {
    await commitOperationsInBatches(db, ops);
  }

  return {
    disciplines: sanitizedDisciplines.length,
    topics: sanitizedTopics.length,
    questions: sanitizedQuestions.length,
    apostilas: sanitizedApostilas.length,
  };
}
