# Mestre Digital — Plataforma Interativa de Quizzes e Simulados

O **Mestre Digital** é uma aplicação web interativa de questionários e simulados, projetada especialmente para estudantes e profissionais da área de Tecnologia e Desenvolvimento de Sistemas. O sistema organiza o conhecimento em disciplinas técnicas e tópicos focados, fornecendo um ambiente dinâmico para fixação de conteúdos com feedback imediato e gabaritos comentados.

---

## 🚀 O que é este projeto?

O aplicativo permite que o usuário navegue por disciplinas da área de TI (como *Desenvolvimento Front End*, *Programação Back End*, *Qualidade e Teste de Software*, *Arquitetura de Software*, entre outras) e selecione tópicos específicos para resolver listas de exercícios e simulados.

### Principais Funcionalidades:
- **Organização Hierárquica:** Disciplinas organizadas em tópicos especializados.
- **Guia Teórico Rápido & Material de Estudo:** Para cada tópico, um resumo conceitual com fundamentação teórica em tópicos (bullet points), boas práticas recomendadas, demonstrações de código práticas (5 a 10 linhas) com opção de cópia e alertas sobre erros comuns/pegadinhas.
- **Simulado Interativo:** Interface limpa para leitura das questões, seleção de alternativas (A a E) e envio de respostas.
- **Cronômetro Opcional por Questão:** Limite configurável de tempo (15s, 30s, 45s, 60s) com barra de progresso visual, mudanças de cor por urgência e encerramento automático da questão por *timeout*.
- **Feedback Imediato & Explicação:** Indicação clara da alternativa correta e explicação detalhada da regra ou conceito abordado.
- **Persistência de Dados:** Salvamento automático do estado e migração de dados locais via `localStorage`.
- **Interface Responsiva:** Visual adaptado para dispositivos móveis, tablets e computadores.

---

## 🛠️ Tecnologias Utilizadas

- **[React 19](https://react.dev/):** Biblioteca principal para construção de componentes e gerenciamento de estado.
- **[TypeScript](https://www.typescriptlang.org/):** Garantia de tipagem estática e segurança do código.
- **[Vite](https://vitejs.dev/):** Ferramenta de build e servidor de desenvolvimento de alta performance.
- **[Tailwind CSS](https://tailwindcss.com/):** Estilização utilitária e design responsivo.
- **[Font Awesome](https://fontawesome.com/):** Biblioteca de ícones vetoriais.
- **[Web Storage API (localStorage)](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/localStorage):** Armazenamento do progresso, disciplinas e banco de questões no navegador.

---

## ⚙️ O que pode ser alterado nas Regras de Negócio?

As regras de negócio atuais regem como as perguntas são apresentadas, como a pontuação é calculada e como as disciplinas estão estruturadas. É possível customizar e expandir os seguintes pontos:

1. **Pontuação e Sistema de Avaliação:**
   - Adicionar **nota mínima para aprovação** em cada tópico.
   - Implementar **pesos diferentes por questão** (ex: questões fáceis valem 1 ponto, difíceis valem 3 pontos).
   - Introduzir **cronômetro / limite de tempo** por questão ou simulado.

2. **Algoritmo de Exibição das Questões:**
   - **Embaralhamento (Shuffle):** Aleatorizar a ordem das perguntas e das alternativas a cada nova tentativa.
   - **Banco Dinâmico / Sorteio:** Exibir um subconjunto de perguntas (ex: sortear 10 questões aleatórias de um banco com 50).

3. **Modos de Estudo:**
   - **Modo Treino (Atual):** Exibe a explicação e o gabarito logo após responder cada questão.
   - **Modo Prova/Exame:** O aluno responde todas as questões sem saber se errou/acertou e só recebe a nota final e a explicação após a entrega do simulado completo.

4. **Gestão de Conteúdo e Disciplinas:**
   - Adicionar novas disciplinas (ex: *Banco de Dados*, *DevOps*, *Segurança da Informação*, *Cloud Computing*).
   - Inserir novos arquivos de questões estruturados na pasta `src/data/questions/[disciplina]/[topico]/questions.ts`.

---

## 🔄 O que pode ser alterado no Fluxo de Atividades?

O fluxo de atividades define a jornada do usuário dentro da aplicação. Atualmente, o fluxo segue: **Início -> Escolha da Disciplina -> Escolha do Tópico -> Resolução Sequencial -> Tela de Resultado**.

Abaixo estão melhorias e alterações que podem ser feitas no fluxo:

1. **Navegação Livre entre Questões:**
   - Permitir que o aluno avance e volte entre as perguntas (*Próxima / Anterior*) antes de responder ou confirmar a questão.
   - Permitir **marcar questões para revisão** antes da entrega final.

2. **Histórico e Relatório de Desempenho:**
   - Criar um painel ou aba de **Estatísticas do Aluno**, exibindo histórico de tentativas passadas, média de acertos e gráficos de evolução.
   - Sugestão automática de tópicos que o aluno precisa reforçar com base nos maiores índices de erro.

3. **Fluxo de Cadastro e Gerenciamento de Dados:**
   - Adicionar funcionalidade para **resetar o progresso** ou recarregar os dados padrões diretamente na interface.
   - Permitir que o professor ou aluno **mantenha ou importe suas próprias questões em JSON**.
   - Conectar o fluxo a uma API Backend (Node.js/Express, Firebase ou PostgreSQL) em vez de depender exclusivamente do `localStorage`.

---

## 📂 Estrutura do Projeto

```text
mestre-dos-bancos-ii/
├── src/
│   ├── data/
│   │   └── questions/             # Banco de questões organizado por disciplinas
│   │       ├── front-end/
│   │       ├── back-end/
│   │       └── qualidade-e-teste/
│   ├── hooks/
│   │   └── useDatabase.ts         # Hook personalizado para carregamento/sincronização
│   ├── App.tsx                    # Componente principal e fluxo das telas
│   └── main.tsx                   # Ponto de entrada da aplicação
├── dataMigration.ts               # Consolidação e migração inicial dos dados
├── types.ts                       # Definições das interfaces TypeScript
├── package.json                   # Dependências do projeto
└── README.md                      # Documentação do projeto
```
