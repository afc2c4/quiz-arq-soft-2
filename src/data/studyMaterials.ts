import { StudyMaterial, Topic } from '../../types';

// Banco padrão de conteúdos didáticos limpo - todos os tópicos iniciam com apostila em branco
export const STUDY_MATERIALS: Record<string, StudyMaterial> = {};

// Gera uma estrutura de apostila didática vazia para os tópicos
export function createEmptyStudyMaterial(topic: Topic): StudyMaterial {
  return {
    topicId: topic.id,
    topicName: topic.name,
    markdownContent: '',
    introduction: [],
    theoreticalFoundation: {
      description: '',
      asciiDiagram: ''
    },
    codeSnippet: {
      title: '',
      language: 'typescript',
      code: ''
    },
    syntaxDeconstruction: [],
    bestPracticesAndPitfalls: [],
    customTabs: []
  };
}

// Retorna a apostila didática do tópico (sempre em branco por padrão para novo preenchimento)
export function getStudyMaterialByTopic(topic: Topic): StudyMaterial {
  if (STUDY_MATERIALS[topic.id]) {
    return STUDY_MATERIALS[topic.id];
  }

  // Tenta localizar por nome de tópico no registro
  const existingKey = Object.keys(STUDY_MATERIALS).find(
    k => STUDY_MATERIALS[k].topicName?.toLowerCase() === topic.name.toLowerCase()
  );
  if (existingKey) {
    return STUDY_MATERIALS[existingKey];
  }

  // Todos os tópicos iniciam com apostila em branco para redação do professor
  return createEmptyStudyMaterial(topic);
}
