import { Question } from '../../../types';

export const FRONTEND_BOOTSTRAP_QUESTIONS: Question[] = [
  {
    id: 'fe-boot1',
    topicId: 't-fe-bootstrap',
    question: 'No contexto do desenvolvimento web, assinale a alternativa correta que define o que é o Bootstrap:',
    options: [
      'É um banco de dados relacional utilizado para armazenar informações estruturadas de usuários.',
      'É uma linguagem de programação back-end utilizada para gerenciar requisições de servidores.',
      'É um framework front-end de código aberto que fornece componentes de interface prontos e estilos CSS.',
      'É um editor de texto avançado utilizado exclusivamente para a escrita de códigos em linguagem HTML.',
      'É um protocolo de segurança utilizado para criptografar o envio de formulários dentro de um site.'
    ],
    correctAnswer: 2,
    explanation: 'Bootstrap é um framework front-end conhecido por seus componentes prontos e sistema de grid.'
  },
  {
    id: 'fe-boot2',
    topicId: 't-fe-bootstrap',
    question: 'Sobre as formas de associar o Bootstrap ao HTML, assinale a alternativa correta que descreve o uso via CDN (Content Delivery Network):',
    options: [
      'Consiste em baixar todos os arquivos do framework para o computador e referenciá-los localmente.',
      'Consiste em vincular o Bootstrap ao projeto através de links externos (URLs), sem a necessidade de baixar os arquivos.',
      'Consiste em copiar o código-fonte do Bootstrap e colá-lo manualmente dentro de cada tag <section> do site.',
      'Consiste em utilizar uma tag exclusiva chamada <bootstrap-cdn> no corpo do documento HTML.',
      'Consiste em instalar o framework diretamente no sistema operacional do servidor de hospedagem.'
    ],
    correctAnswer: 1,
    explanation: 'CDN permite linkar arquivos do framework hospedados externamente.'
  },
  {
    id: 'fe-boot3',
    topicId: 't-fe-bootstrap',
    question: 'Assinale a alternativa correta sobre a forma de associação local do Bootstrap em um documento HTML:',
    options: [
      'Os arquivos CSS e JS do Bootstrap devem ser armazenados na pasta do projeto e referenciados por caminhos de diretório.',
      'A associação local dispensa o uso das tags <link> ou <script>, pois o navegador reconhece o framework automaticamente.',
      'A associação local só funciona se o computador estiver conectado à internet para validar a licença do framework.',
      'O desenvolvedor deve criar um arquivo chamado bootstrap.html e importar todo o conteúdo do site para dentro dele.',
      'Os arquivos baixados devem ser inseridos obrigatoriamente dentro da pasta raiz do sistema operacional Windows.'
    ],
    correctAnswer: 0,
    explanation: 'Associação local exige que os arquivos estejam no projeto e sejam apontados pelos caminhos corretos.'
  },
  {
    id: 'fe-boot4',
    topicId: 't-fe-bootstrap',
    question: 'Ao realizar a associação do Bootstrap, onde é o local tecnicamente correto para inserir o link da folha de estilo (CSS) do framework, visando o carregamento adequado?',
    options: [
      'Dentro da tag <body>, logo após a abertura, utilizando o elemento <href>.',
      'Dentro da tag <head>, utilizando o elemento <link> com os atributos rel e href.',
      'No final da tag <footer>, utilizando o elemento <meta> para garantir a responsividade.',
      'Dentro de uma tag <section>, utilizando o atributo src para apontar para o arquivo externo.',
      'Logo após o fechamento da tag </html>, utilizando o elemento <style> de forma isolada.'
    ],
    correctAnswer: 1,
    explanation: 'Folhas de estilo devem ser vinculadas no <head> usando a tag <link>.'
  },
  {
    id: 'fe-boot5',
    topicId: 't-fe-bootstrap',
    question: 'Assinale a alternativa correta que apresenta uma das principais propostas e vantagens de se utilizar o Bootstrap no desenvolvimento de sistemas web:',
    options: [
      'Ele permite que o desenvolvedor crie novos elementos HTML que não existem na especificação da W3C.',
      'Ele facilita a criação de sites responsivos e "mobile-first" através de um sistema de grids e classes utilitárias.',
      'Ele substitui completamente a necessidade de aprender a sintaxe básica do CSS e do HTML5.',
      'Ele aumenta a performance do site ao converter automaticamente imagens pesadas em arquivos de texto.',
      'Ele é a única ferramenta capaz de conectar uma página web a um servidor de banco de dados SQL.'
    ],
    correctAnswer: 1,
    explanation: 'O Bootstrap é focado em design responsivo e componente mobile-first.'
  }
];
