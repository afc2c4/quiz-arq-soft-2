import { Question } from './types';
import { DESIGN_PATTERNS_QUESTIONS } from './data/questions/arquitetura-de-software/design-patterns/questions';
import { DDD_QUESTIONS } from './data/questions/arquitetura-de-software/ddd/questions';
import { MONOLITHIC_QUESTIONS } from './data/questions/arquitetura-de-software/arquitetura-monolitica/questions';
import { MICROSERVICES_QUESTIONS } from './data/questions/arquitetura-de-software/microservicos/questions';
import { MVC_QUESTIONS } from './data/questions/arquitetura-de-software/mvc/questions';
import { FRAMEWORKS_QUESTIONS } from './data/questions/arquitetura-de-software/frameworks/questions';
import { LAYERED_QUESTIONS } from './data/questions/arquitetura-de-software/arquitetura-camadas/questions';
import { REFACTORING_QUESTIONS } from './data/questions/arquitetura-de-software/refatoracao/questions';
import { QUALITY_SCENARIOS_QUESTIONS } from './data/questions/qualidade-e-teste/cenarios-e-casos/questions';

export const QUIZ_DATABASE: Question[] = [
  ...DESIGN_PATTERNS_QUESTIONS,
  ...DDD_QUESTIONS,
  ...MONOLITHIC_QUESTIONS,
  ...MICROSERVICES_QUESTIONS,
  ...MVC_QUESTIONS,
  ...FRAMEWORKS_QUESTIONS,
  ...LAYERED_QUESTIONS,
  ...REFACTORING_QUESTIONS,
  ...QUALITY_SCENARIOS_QUESTIONS,
];
