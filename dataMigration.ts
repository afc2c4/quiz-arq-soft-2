import { Question, Topic, Discipline } from './types';
import { DESIGN_PATTERNS_QUESTIONS } from './src/data/questions/arquitetura-de-software/design-patterns/questions';
import { DDD_QUESTIONS } from './src/data/questions/arquitetura-de-software/ddd/questions';
import { MONOLITHIC_QUESTIONS } from './src/data/questions/arquitetura-de-software/arquitetura-monolitica/questions';
import { MICROSERVICES_QUESTIONS } from './src/data/questions/arquitetura-de-software/microservicos/questions';
import { MVC_QUESTIONS } from './src/data/questions/arquitetura-de-software/mvc/questions';
import { FRAMEWORKS_QUESTIONS } from './src/data/questions/arquitetura-de-software/frameworks/questions';
import { LAYERED_QUESTIONS } from './src/data/questions/arquitetura-de-software/arquitetura-camadas/questions';
import { REFACTORING_QUESTIONS } from './src/data/questions/arquitetura-de-software/refatoracao/questions';
import { QUALITY_SCENARIOS_QUESTIONS } from './src/data/questions/qualidade-e-teste/cenarios-e-casos/questions';
import { QUALITY_GESTION_QUESTIONS } from './src/data/questions/qualidade-e-teste/gestao/questions';
import { QUALITY_FUNDAMENTALS_QUESTIONS } from './src/data/questions/qualidade-e-teste/fundamentos-e-modelo-v/questions';
import { QUALITY_ESTRATEGIA_QUESTIONS } from './src/data/questions/qualidade-e-teste/estrategia/questions';
import { QUALITY_NIVEIS_TIPOS_QUESTIONS } from './src/data/questions/qualidade-e-teste/niveis-e-tipos/questions';
import { QUALITY_TECNICAS_TESTE_QUESTIONS } from './src/data/questions/qualidade-e-teste/tecnicas-teste/questions';
import { QUALITY_AMBIENTE_AUTOMACAO_QUESTIONS } from './src/data/questions/qualidade-e-teste/ambiente-automacao/questions';
import { QUALITY_FRAMEWORKS_QA_QUESTIONS } from './src/data/questions/qualidade-e-teste/frameworks-qa/questions';
import { FRONTEND_HTML5_QUESTIONS } from './src/data/questions/front-end/html5/questions';
import { FRONTEND_CSS3_QUESTIONS } from './src/data/questions/front-end/css3/questions';
import { FRONTEND_BOOTSTRAP_QUESTIONS } from './src/data/questions/front-end/bootstrap/questions';
import { FRONTEND_JAVASCRIPT_QUESTIONS } from './src/data/questions/front-end/javascript/questions';

export const MIGRATED_DISCIPLINES: Discipline[] = [
  { id: 'd1', name: 'Arquitetura de Software' },
  { id: 'd-qt', name: 'Qualidade e Teste de Software' },
  { id: 'd-fe', name: 'Desenvolvimento Front End' }
];

export const MIGRATED_TOPICS: Topic[] = [
  { id: 't-dp', name: 'Design Patterns', disciplineId: 'd1' },
  { id: 't-ddd', name: 'DDD', disciplineId: 'd1' },
  { id: 't-mono', name: 'Arquitetura Monolítica', disciplineId: 'd1' },
  { id: 't-ms', name: 'Microsserviços', disciplineId: 'd1' },
  { id: 't-mvc', name: 'Padrão MVC', disciplineId: 'd1' },
  { id: 't-fw', name: 'Frameworks', disciplineId: 'd1' },
  { id: 't-layer', name: 'Arquitetura em Camadas', disciplineId: 'd1' },
  { id: 't-ref', name: 'Refatoração', disciplineId: 'd1' },
  { id: 't-qt-cenarios', name: 'Cenários e Casos de Teste', disciplineId: 'd-qt' },
  { id: 't-qt-gestao', name: 'Aula 02 - Gestão', disciplineId: 'd-qt' },
  { id: 't-qt-fundamentos', name: 'Fundamentos e Modelo V', disciplineId: 'd-qt' },
  { id: 't-qt-estrategia', name: 'Aula 04 - Estratégia e Táticas', disciplineId: 'd-qt' },
  { id: 't-qt-niveis-tipos', name: 'Aula 05 — Níveis & Tipos de Testes de Software', disciplineId: 'd-qt' },
  { id: 't-qt-tecnicas-teste', name: 'Aula 06: Técnicas de Teste de Software', disciplineId: 'd-qt' },
  { id: 't-qt-ambiente-automacao', name: 'Aula 07: Ambiente de Testes e Automação', disciplineId: 'd-qt' },
  { id: 't-qt-frameworks', name: 'Aula 08: Frameworks', disciplineId: 'd-qt' },
  { id: 't-fe-html5', name: 'HTML5', disciplineId: 'd-fe' },
  { id: 't-fe-css3', name: 'CSS3', disciplineId: 'd-fe' },
  { id: 't-fe-bootstrap', name: 'Bootstrap', disciplineId: 'd-fe' },
  { id: 't-fe-javascript', name: 'Javascript', disciplineId: 'd-fe' },
];

export const MIGRATED_QUESTIONS: Question[] = [
  ...DESIGN_PATTERNS_QUESTIONS,
  ...DDD_QUESTIONS,
  ...MONOLITHIC_QUESTIONS,
  ...MICROSERVICES_QUESTIONS,
  ...MVC_QUESTIONS,
  ...FRAMEWORKS_QUESTIONS,
  ...LAYERED_QUESTIONS,
  ...REFACTORING_QUESTIONS,
  ...QUALITY_SCENARIOS_QUESTIONS,
  ...QUALITY_GESTION_QUESTIONS,
  ...QUALITY_FUNDAMENTALS_QUESTIONS,
  ...QUALITY_ESTRATEGIA_QUESTIONS,
  ...QUALITY_NIVEIS_TIPOS_QUESTIONS,
  ...QUALITY_TECNICAS_TESTE_QUESTIONS,
  ...QUALITY_AMBIENTE_AUTOMACAO_QUESTIONS,
  ...QUALITY_FRAMEWORKS_QA_QUESTIONS,
  ...FRONTEND_HTML5_QUESTIONS,
  ...FRONTEND_CSS3_QUESTIONS,
  ...FRONTEND_BOOTSTRAP_QUESTIONS,
  ...FRONTEND_JAVASCRIPT_QUESTIONS,
];
