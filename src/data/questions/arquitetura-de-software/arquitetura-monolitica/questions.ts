import { Question } from '../../../types';

export const MONOLITHIC_QUESTIONS: Question[] = [
  {
    id: 'mono1',
    topicId: 't-mono',
    question: 'Qual a principal característica de uma arquitetura Monolítica?',
    options: [
      'O sistema é dividido em pequenos serviços independentes que se comunicam via rede.',
      'A aplicação é construída como uma única unidade lógica e indivisível.',
      'Cada funcionalidade do sistema possui seu próprio banco de dados isolado.',
      'O código é obrigatoriamente escrito em uma linguagem funcional.',
      'O sistema não possui interface de usuário, operando apenas via linha de comando.'
    ],
    correctAnswer: 1,
    explanation: 'No monólito, todas as funções (UI, lógica de negócio, acesso a dados) compartilham o mesmo processo e base de código.'
  },
  {
    id: 'mono2',
    topicId: 't-mono',
    question: 'Uma vantagem comum de sistemas monolíticos no início de um projeto é:',
    options: [
      'A extrema facilidade de escalar partes específicas do sistema de forma independente.',
      'Menor complexidade operacional e facilidade de testes integrados iniciais.',
      'A capacidade de usar centenas de tecnologias diferentes em cada módulo.',
      'O isolamento total de falhas entre as diferentes funcionalidades.',
      'A redução drástica do tempo de compilação em grandes bases de código.'
    ],
    correctAnswer: 1,
    explanation: 'Monólitos são simples de desenvolver, testar e fazer deploy quando o sistema ainda é pequeno.'
  },
  {
    id: 'mono3',
    topicId: 't-mono',
    question: 'Qual o principal desafio de escalabilidade em um monólito?',
    options: [
      'Não é possível escalar o sistema horizontalmente em nenhum cenário.',
      'É necessário escalar toda a aplicação, mesmo que apenas uma função precisa de mais recursos.',
      'O banco de dados de um monólito não pode ser replicado entre servidores.',
      'A rede interna do monólito fica sobrecarregada com chamadas RPC.',
      'A interface de usuário impede o balanceamento de carga (Load Balancing).'
    ],
    correctAnswer: 1,
    explanation: 'Se uma funcionalidade pesada exige mais memória, você deve replicar o monólito inteiro, desperdiçando recursos.'
  },
  {
    id: 'mono4',
    topicId: 't-mono',
    question: 'O termo "Big Ball of Mud" (Grande Bola de Lama) refere-se a:',
    options: [
      'Uma técnica de compressão de dados utilizada em bancos legados.',
      'Um monólito que perdeu sua estrutura interna e tornou-se um emaranhado de dependências.',
      'Um padrão de design focado na criação de objetos dinâmicos.',
      'A arquitetura ideal recomendada para sistemas de alta performance.',
      'O processo de limpeza de código durante o refactoring.'
    ],
    correctAnswer: 1,
    explanation: 'Refere-se a sistemas sem arquitetura perceptível, onde qualquer mudança gera efeitos colaterais imprevisíveis.'
  },
  {
    id: 'mono5',
    topicId: 't-mono',
    question: 'Como ocorre o deploy de uma aplicação monolítica típica?',
    options: [
      'Cada classe do sistema é enviada individualmente para o servidor.',
      'Todo o código é empacotado em um único artefato (ex: .jar, .war, .exe) e implantado.',
      'O deploy é feito via streaming de código diretamente para o navegador do usuário.',
      'Apenas as funções modificadas são enviadas para o servidor de produção.',
      'Não existe processo de deploy, pois o monólito roda apenas localmente.'
    ],
    correctAnswer: 1,
    explanation: 'A unidade de implantação única é o que define fisicamente o monólito.'
  },
  {
    id: 'mono6',
    topicId: 't-mono',
    question: 'Qual o impacto de um bug crítico em um módulo de um sistema Monolítico?',
    options: [
      'Apenas o módulo afetado para de funcionar, mantendo o resto do sistema ativo.',
      'O bug pode derrubar a aplicação inteira, pois todos os módulos compartilham o mesmo processo.',
      'O sistema isola o bug automaticamente e continua operando normalmente.',
      'O bug é transferido para o banco de dados e resolvido via trigger.',
      'O compilador remove o código defeituoso em tempo de execução.'
    ],
    correctAnswer: 1,
    explanation: 'A falta de isolamento de falhas é uma das principais desvantagens de monólitos grandes.'
  },
  {
    id: 'mono7',
    topicId: 't-mono',
    question: 'O que é um "Modular Monolith" (Monólito Modular)?',
    options: [
      'Um sistema de microsserviços que foi unido em um único banco de dados.',
      'Um monólito com separação lógica clara entre módulos, mas implantado como uma unidade.',
      'Um conjunto de aplicações independentes que não se comunicam.',
      'Um framework que permite criar plugins para navegadores web.',
      'Uma técnica de hardware para empilhar servidores em racks.'
    ],
    correctAnswer: 1,
    explanation: 'O monólito modular busca os benefícios de organização dos microsserviços sem a complexidade de rede.'
  },
  {
    id: 'mono8',
    topicId: 't-mono',
    question: 'Por que o tempo de build tende a aumentar em monólitos grandes?',
    options: [
      'Porque o compilador precisa processar toda a base de código a cada mudança.',
      'Porque a internet fica mais lenta conforme o arquivo de código cresce.',
      'Porque o banco de dados exige uma reindexação total a cada compilação.',
      'Porque o sistema operacional limita o número de arquivos que podem ser lidos.',
      'Porque os desenvolvedores escrevem mais comentários em sistemas grandes.'
    ],
    correctAnswer: 0,
    explanation: 'Em grandes monólitos, mesmo uma mudança pequena pode exigir um ciclo completo de build e deploy.'
  },
  {
    id: 'mono9',
    topicId: 't-mono',
    question: 'Qual o desafio de adotar novas tecnologias em um projeto Monolítico existente?',
    options: [
      'Não há desafios, pois monólitos aceitam qualquer tecnologia simultaneamente.',
      'É difícil adotar novas linguagens ou frameworks, pois o sistema está preso à stack inicial.',
      'O custo de licença de novas tecnologias é maior em sistemas monolíticos.',
      'As novas tecnologias não funcionam em servidores que rodam monólitos.',
      'A interface de usuário impede a atualização de bibliotecas de backend.'
    ],
    correctAnswer: 1,
    explanation: 'O "Technology Lock-in" é forte em monólitos; mudar a stack muitas vezes exige reescrever tudo.'
  },
  {
    id: 'mono10',
    topicId: 't-mono',
    question: 'Como a escalabilidade horizontal funciona em um monólito?',
    options: [
      'Não é possível escalar horizontalmente, apenas verticalmente (mais CPU/RAM).',
      'Através da replicação de instâncias completas da aplicação atrás de um Load Balancer.',
      'Dividindo o código em arquivos menores e espalhando-os por vários servidores.',
      'Movendo apenas a camada de dados para um cluster de servidores.',
      'O monólito escala automaticamente usando inteligência artificial.'
    ],
    correctAnswer: 1,
    explanation: 'Você escala o monólito replicando a unidade inteira, o que pode ser ineficiente em termos de recursos.'
  },
  {
    id: 'mono11',
    topicId: 't-mono',
    question: 'O que caracteriza o acoplamento em um monólito?',
    options: [
      'As chamadas entre módulos são feitas via rede (HTTP/gRPC).',
      'As chamadas entre módulos são feitas em memória, através de referências de código direto.',
      'Não existe acoplamento, pois os módulos são totalmente independentes.',
      'O acoplamento é definido apenas pelas chaves estrangeiras no banco de dados.',
      'O acoplamento ocorre apenas entre o frontend e o backend.'
    ],
    correctAnswer: 1,
    explanation: 'O acoplamento em memória é rápido, mas facilita a criação de dependências ocultas e complexas.'
  },
  {
    id: 'mono12',
    topicId: 't-mono',
    question: 'Qual a principal dificuldade de testes de integração em grandes monólitos?',
    options: [
      'A falta de ferramentas de teste para linguagens usadas em monólitos.',
      'A necessidade de subir todo o sistema e suas dependências para validar um fluxo.',
      'O fato de que monólitos não permitem o uso de mocks ou stubs.',
      'A velocidade excessiva dos testes que impede a análise dos resultados.',
      'A interface gráfica que bloqueia a execução de testes automatizados.'
    ],
    correctAnswer: 1,
    explanation: 'Subir um monólito gigante para testes pode ser demorado e consumir muitos recursos de infraestrutura.'
  },
  {
    id: 'mono13',
    topicId: 't-mono',
    question: 'O termo "Strangler Fig Pattern" (Padrão Figo Estrangulador) é usado para:',
    options: [
      'Aumentar a performance de consultas SQL em bancos legados.',
      'Migrar gradualmente funcionalidades de um monólito para microsserviços.',
      'Bloquear o acesso de usuários não autorizados ao sistema.',
      'Comprimir o tamanho do artefato final da aplicação.',
      'Remover código morto que não é mais utilizado no monólito.'
    ],
    correctAnswer: 1,
    explanation: 'Ele consiste em criar novos serviços em volta do monólito até que ele seja totalmente substituído.'
  },
  {
    id: 'mono14',
    topicId: 't-mono',
    question: 'Em termos de transações, o monólito oferece a vantagem de:',
    options: [
      'Não precisar de transações, pois o código é síncrono.',
      'Facilidade em manter transações ACID (Atômicas, Consistentes, Isoladas e Duráveis).',
      'Substituir o banco de dados por arquivos de texto simples.',
      'Garantir que as transações nunca falhem, independente de erros de código.',
      'Permitir transações distribuídas sem o uso de protocolos complexos.'
    ],
    correctAnswer: 1,
    explanation: 'Como os dados costumam estar em um único banco, gerenciar transações é muito mais simples que em sistemas distribuídos.'
  },
  {
    id: 'mono15',
    topicId: 't-mono',
    question: 'Qual o impacto do crescimento do time de desenvolvimento em um monólito?',
    options: [
      'A produtividade aumenta linearmente com o número de desenvolvedores.',
      'Conflitos de merge e coordenação tornam-se mais frequentes e complexos.',
      'O sistema divide o código automaticamente entre os novos membros.',
      'Não há impacto, pois cada desenvolvedor trabalha em sua própria cópia do sistema.',
      'O tempo de deploy diminui, pois há mais pessoas para realizar o processo.'
    ],
    correctAnswer: 1,
    explanation: 'Muitas pessoas mexendo na mesma base de código exige processos rigorosos de integração.'
  }
];
