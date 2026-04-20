import { Question } from '../../../types';

export const FRONTEND_HTML5_QUESTIONS: Question[] = [
  {
    id: 'fe-html1',
    topicId: 't-fe-html5',
    question: 'Qual é a instrução obrigatória que deve aparecer na primeira linha de um documento HTML5 para informar ao navegador que o padrão utilizado é a versão mais recente da linguagem?',
    options: [
      '<html version="5.0">',
      '<!DOCTYPE html>',
      '<header type="html5">',
      '<?xml version="1.0" ?>',
      '<metadata standard="html5">'
    ],
    correctAnswer: 1,
    explanation: '<!DOCTYPE html> é a declaração obrigatória para identificar um documento HTML5.'
  },
  {
    id: 'fe-html2',
    topicId: 't-fe-html5',
    question: 'Dentro da estrutura básica de um documento HTML5, qual elemento é considerado o "container" raiz que envolve todo o conteúdo da página, exceto o doctype?',
    options: [
      '<body>',
      '<head>',
      '<main>',
      '<html>',
      '<section>'
    ],
    correctAnswer: 3,
    explanation: 'A tag <html> é o elemento raiz de um documento HTML.'
  },
  {
    id: 'fe-html3',
    topicId: 't-fe-html5',
    question: 'Sobre as tags de estrutura, qual a principal diferença funcional entre os elementos <head> e <body> em um documento HTML5?',
    options: [
      'O <head> contém metadados e informações não visíveis, enquanto o <body> contém o conteúdo visual.',
      'O <head> é usado para títulos de seções, enquanto o <body> é usado para o rodapé da página.',
      'O <head> armazena scripts de animação, enquanto o <body> armazena apenas links de navegação.',
      'O <body> deve ser declarado antes do <head> para garantir o carregamento do layout.',
      'O <head> é opcional em documentos modernos, sendo substituído totalmente pela tag <header>.'
    ],
    correctAnswer: 0,
    explanation: 'O <head> contém metadados (título, scripts, meta tags) e o <body> o conteúdo visual.'
  },
  {
    id: 'fe-html4',
    topicId: 't-fe-html5',
    question: 'A tag semântica <header> é comumente utilizada para qual finalidade dentro de um documento ou de uma seção específica?',
    options: [
      'Para agrupar os links de redes sociais exclusivamente no final da página.',
      'Para definir o conteúdo principal e central de um artigo de blog.',
      'Para conter elementos introdutórios, como logotipos, títulos ou menus de navegação superior.',
      'Para marcar o final de um parágrafo importante dentro de uma <section>.',
      'Para importar arquivos de estilo CSS externos dentro da tag <html>.'
    ],
    correctAnswer: 2,
    explanation: 'A tag <header> agrupa conteúdos introdutórios ou de navegação.'
  },
  {
    id: 'fe-html5',
    topicId: 't-fe-html5',
    question: 'Qual das alternativas descreve corretamente o propósito da tag <nav> no HTML5?',
    options: [
      'Identificar qualquer bloco de texto que contenha mais de três links externos.',
      'Marcar uma seção da página que contém links de navegação, como menus ou índices.',
      'Criar uma barra lateral fixa para anúncios e propagandas de terceiros.',
      'Definir o caminho de diretórios (bread crumbs) apenas em dispositivos móveis.',
      'Substituir a tag <a> em todos os menus de navegação complexos.'
    ],
    correctAnswer: 1,
    explanation: '<nav> é usada para blocos de links de navegação.'
  },
  {
    id: 'fe-html6',
    topicId: 't-fe-html5',
    question: 'A tag <article> deve ser utilizada preferencialmente quando o conteúdo:',
    options: [
      'For uma parte genérica de um documento que não possui um título próprio.',
      'For um conteúdo independente e autoexplicativo, como um post de blog ou uma notícia.',
      'For um conjunto de links que levam o usuário para fora do domínio atual.',
      'For o rodapé do site contendo apenas informações de direitos autorais.',
      'For uma barra lateral que complementa o assunto principal da página.'
    ],
    correctAnswer: 1,
    explanation: '<article> etiqueta conteúdo que faz sentido por si só, independente do resto da página.'
  },
  {
    id: 'fe-html7',
    topicId: 't-fe-html5',
    question: 'Em relação à tag <section>, qual é a sua aplicação mais adequada segundo os padrões semânticos?',
    options: [
      'Agrupar conteúdos relacionados que possuem uma temática comum, geralmente com um título.',
      'Substituir a tag <div> em todos os casos de estilização visual com CSS.',
      'Criar botões de interação que disparam funções em JavaScript.',
      'Marcar apenas o cabeçalho principal localizado no topo do site.',
      'Envolver imagens que não possuem descrição textual (alt text).'
    ],
    correctAnswer: 0,
    explanation: '<section> agrupa conteúdos logicamente relacionados.'
  },
  {
    id: 'fe-html8',
    topicId: 't-fe-html5',
    question: 'O elemento <footer> é projetado para conter quais tipos de informações em uma página web?',
    options: [
      'O título principal H1 e o resumo inicial do conteúdo da página.',
      'Apenas os formulários de contato e campos de busca do site.',
      'Informações de encerramento, como créditos, direitos autorais, links relacionados ou dados de contato.',
      'O menu de navegação principal localizado logo abaixo do logotipo.',
      'Vídeos e mídias que devem ser carregados por último pelo navegador.'
    ],
    correctAnswer: 2,
    explanation: '<footer> contém informações de rodapé como direitos autorais e contatos.'
  },
  {
    id: 'fe-html9',
    topicId: 't-fe-html5',
    question: 'Considere a hierarquia semântica. Qual seria a estrutura interna mais coerente para um bloco de notícias em um portal?',
    options: [
      '<nav> contendo vários <footer> individuais.',
      '<header> dentro de um <article>, que por sua vez está dentro de uma <section>.',
      '<footer> contendo a estrutura básica de um <html>.',
      '<section> contendo apenas tags <nav> sem conteúdo textual.',
      '<article> sendo obrigatoriamente filho direto da tag <head>.'
    ],
    correctAnswer: 1,
    explanation: 'Estruturas semanticamente organizadas ajudam na organização do conteúdo.'
  },
  {
    id: 'fe-html10',
    topicId: 't-fe-html5',
    question: 'Por que o uso das tags mencionadas na imagem (header, nav, section, article, footer) é preferível ao uso exclusivo de tags genéricas como <div>?',
    options: [
      'Porque as tags semânticas garantem que o site carregue mais rápido em conexões lentas.',
      'Porque elas são obrigatórias para que as cores do CSS funcionem corretamente.',
      'Porque fornecem significado ao conteúdo, melhorando a acessibilidade e o rankeamento em motores de busca (SEO).',
      'Porque impedem que hackers consigam acessar o código-fonte através do navegador.',
      'Porque convertem automaticamente o texto da página para outros idiomas sem auxílio externo.'
    ],
    correctAnswer: 2,
    explanation: 'Tags semânticas dão significado ao conteúdo, essencial para acessibilidade e SEO.'
  }
];
