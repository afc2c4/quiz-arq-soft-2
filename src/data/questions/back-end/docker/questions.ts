import { Question } from '../../../types';

export const BACKEND_DOCKER_QUESTIONS: Question[] = [
  {
    id: 'be-doc-01',
    topicId: 't-be-docker',
    question: 'O Docker revolucionou a forma como distribuímos aplicações por meio da conteinerização. Qual é a diferença fundamental entre um Contêiner Docker e uma Máquina Virtual (VM) tradicional?',
    options: [
      'Contêineres compartilham o kernel do sistema operacional do hospedeiro (Host OS) de forma leve e isolada, enquanto VMs virtualizam o hardware completo e executam um sistema operacional convidado (Guest OS) dedicado.',
      'Contêineres exigem mais memória RAM e espaço em disco do que Máquinas Virtuais para rodar aplicações simples.',
      'VMs inicializam em questão de milissegundos, enquanto contêineres levam de 10 a 20 minutos para dar boot.',
      'Contêineres funcionam apenas no sistema operacional Linux, sendo impossível executá-los em Windows ou macOS.',
      'VMs não utilizam hipervisores (Hypervisors), enquanto contêineres exigem hipervisores tipo 1 em hardware dedicado.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: Contêineres virtualizam a nível de SO (compartilhando o mesmo Kernel do host de forma isolada via cgroups e namespaces), tornando-os extremamente leves e rápidos de inicializar em relação a VMs, que executam uma cópia inteira de um Guest OS sobre um Hypervisor. B, C, D, E: incorretos.'
  },
  {
    id: 'be-doc-02',
    topicId: 't-be-docker',
    question: 'No ecossistema Docker, como se relacionam os conceitos de Imagem Docker e Contêiner Docker?',
    options: [
      'Imagem é a instância em execução do contêiner; Contêiner é o arquivo de código em C++ que compila a imagem.',
      'Imagem é um modelo somente leitura ( blueprint/template ) estático que contém o código, dependências e configurações; Contêiner é uma instância executável isolada criada a partir de uma Imagem.',
      'Imagem e Contêiner são termos idênticos para o arquivo de banco de dados do Docker.',
      'Uma Imagem Docker só pode ser criada a partir de um contêiner que já esteja em execução em produção.',
      'Um Contêiner é armazenado no Docker Hub, enquanto a Imagem fica armazenada exclusivamente na memória RAM da máquina.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: A Imagem Docker é o modelo/template estático de somente leitura. O Contêiner é a instância em tempo de execução (instância viva) criada a partir dessa Imagem com uma camada de escrita temporária (writable layer).'
  },
  {
    id: 'be-doc-03',
    topicId: 't-be-docker',
    question: 'Em um arquivo Dockerfile, qual é a diferença crucial entre as instruções RUN e CMD?',
    options: [
      'RUN é executado durante o processo de construção (build) da imagem; CMD especifica o comando padrão executado quando o contêiner é iniciado (run).',
      'RUN define a imagem de origem; CMD cria as pastas no sistema de arquivos do hospedeiro.',
      'RUN é utilizado apenas para instalar o Node.js; CMD é utilizado apenas para copiar arquivos .env.',
      'RUN executa comandos no cliente; CMD executa comandos no servidor de banco de dados.',
      'Não há diferença de execução, ambas as instruções rodam no momento em que o contêiner é desligado.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: `RUN` executa comandos em tempo de construção da Imagem (build-time) criando novas camadas (ex: `RUN npm install`). `CMD` especifica o comando principal executado quando o contêiner é instanciado em tempo de execução (run-time) (ex: `CMD ["node", "server.js"]`).'
  },
  {
    id: 'be-doc-04',
    topicId: 't-be-docker',
    question: 'Por padrão, os dados gravados no sistema de arquivos de um contêiner são efêmeros e perdidos quando o contêiner é destruído. Qual recurso do Docker deve ser utilizado para garantir a persistência de dados (ex: dados do PostgreSQL) fora do ciclo de vida do contêiner?',
    options: [
      'Docker Volumes (ou Bind Mounts)',
      'Docker Overlay Network',
      'Dockerfile CMD layer',
      'Docker Swarm Secret',
      'Docker Inspect Log'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: Docker Volumes (gerenciados pelo Docker na máquina host) e Bind Mounts (mapeamento de uma pasta específica da máquina host) persistem dados permanentemente, sobrevivendo à destruição e reinicialização de contêineres.'
  },
  {
    id: 'be-doc-05',
    topicId: 't-be-docker',
    question: 'O que é o Docker Compose e para que serve o arquivo docker-compose.yml?',
    options: [
      'Uma linguagem de programação que substitui o JavaScript na criação de APIs.',
      'Uma ferramenta para definir e executar aplicações Docker multi-contêineres, permitindo configurar serviços, redes e volumes em um único arquivo descritivo.',
      'Um antivírus para checar imagens com vulnerabilidades no Docker Hub.',
      'Um compilador para transformar código C# em imagens Docker para Android.',
      'Um plugin de navegador para visualizar gráficos de memória RAM do servidor.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: O Docker Compose simplifica a orquestração local de múltiplos contêineres interconectados (ex: API Node + Banco Postgres + Cache Redis) declarados de forma legível em um arquivo `docker-compose.yml` e subidos via `docker compose up`.'
  },
  {
    id: 'be-doc-06',
    topicId: 't-be-docker',
    question: 'Para otimizar o tamanho final da imagem Docker de uma aplicação Node.js/TypeScript em produção, qual técnica avançada de escrita de Dockerfile é altamente recomendada?',
    options: [
      'Multi-stage Builds (Construção em Múltiplas Etapas), dividindo o build em etapas de compilação/desenvolvimento e copiando apenas os artefatos compilados finais para uma imagem limpa de produção.',
      'Incluir toda a pasta node_modules e arquivos de teste na imagem final de produção.',
      'Utilizar imagens de origem pesadas com sistemas operacionais completos como Ubuntu Desktop sem minificação.',
      'Remover a instrução FROM do arquivo Dockerfile.',
      'Executar o comando npm install --only=dev dentro do contêiner de produção.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: O `Multi-stage build` usa múltiplos blocos `FROM` no mesmo Dockerfile. Uma etapa instala TypeScript/devDependencies e compila o código; a etapa final copia apenas os arquivos compilados `dist/` e `dependencies` de produção para uma imagem leve (ex: `alpine`), reduzindo radicalmente o tamanho final da imagem.'
  },
  {
    id: 'be-doc-07',
    topicId: 't-be-docker',
    question: 'Qual comando da CLI do Docker é utilizado para visualizar os contêineres que estão atualmente em execução no sistema hospedeiro?',
    options: [
      'docker ps',
      'docker image list --active',
      'docker run --status',
      'docker container find',
      'docker show all'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: `docker ps` (ou `docker container ls`) lista todos os contêineres atualmente rodando no host. Para ver também os contêineres parados, utiliza-se `docker ps -a`.'
  },
  {
    id: 'be-doc-08',
    topicId: 't-be-docker',
    question: 'Ao executar um contêiner que roda um servidor web na porta interna 3000, qual parâmetro do comando docker run deve ser informado para redirecionar a porta 8080 da máquina hospedeira para a porta 3000 do contêiner?',
    options: [
      '-p 8080:3000',
      '-v 8080:3000',
      '--net 8080->3000',
      '-e PORT=8080',
      '--expose-all 8080'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: O parâmetro `-p hostPort:containerPort` (ou `--publish`) expõe e mapeia portas do host para o contêiner. A sintaxe `-p 8080:3000` conecta a porta 8080 do host à porta 3000 do contêiner.'
  },
  {
    id: 'be-doc-09',
    topicId: 't-be-docker',
    question: 'Como funciona a comunicação via rede entre dois contêineres definidos no mesmo arquivo docker-compose.yml que pertencem à mesma rede padrão (bridge)?',
    options: [
      'Os contêineres só conseguem se comunicar se o desenvolvedor configurar manualmente os endereços IP estáticos no arquivo .env.',
      'Os contêineres conseguem se comunicar diretamente utilizando o nome do serviço (service name) definido no docker-compose.yml como nome de host DNS interno.',
      'A comunicação entre contêineres do mesmo compose é proibida por questões de segurança.',
      'O tráfego de dados precisa obrigatoriamente sair para a internet pública e retornar via roteador.',
      'A comunicação exige a digitação constante do comando docker exec a cada requisição.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: O Docker Compose cria uma rede personalizada bridge automática. Ele inclui um servidor DNS interno que resolve o nome do serviço (ex: `postgres`, `redis`) diretamente para o IP do contêiner correspondente na rede virtual.'
  },
  {
    id: 'be-doc-10',
    topicId: 't-be-docker',
    question: 'O que é o Docker Hub e qual é o seu papel no ciclo de desenvolvimento e distribuição de imagens de software?',
    options: [
      'Um registro de imagens em nuvem público e privado (Registry) onde desenvolvedores e empresas podem armazenar, compartilhar e baixar imagens de contêineres.',
      'Um editor de código-fonte online mantido pela Microsoft.',
      'Um servidor de banco de dados NoSQL gerenciado em memória.',
      'Uma biblioteca de componentes de interface gráfica para React.',
      'Um protocolo de rede para transmissão de chamadas telefônicas via IP.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: O Docker Hub é o repositório público (Registry) oficial mantido pela Docker Inc. onde é possível publicar (push) e baixar (pull) imagens oficiais e comunitárias (ex: `node`, `postgres`, `nginx`, `redis`).'
  }
];
