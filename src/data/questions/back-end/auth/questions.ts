import { Question } from '../../../types';

export const BACKEND_AUTH_QUESTIONS: Question[] = [
  {
    id: 'be-auth-01',
    topicId: 't-be-auth',
    question: 'No armazenamento seguro de credenciais de usuários em banco de dados, por que a utilização de funções de Hashing unidirecionais lentas (como bcrypt ou argon2) combinadas com Salt é obrigatória, em vez de criptografia simétrica reversível?',
    options: [
      'Porque funções de hashing permitem recuperar a senha original em texto limpo quando o usuário solicita a recuperação de senha por e-mail.',
      'Porque o hashing unidirecional garante que mesmo se o banco de dados for vazado, as senhas não poderão ser revertidas matematicamente, e o Salt previne ataques baseados em Rainbow Tables.',
      'Porque a criptografia simétrica exige que o cliente envie a chave privada a cada requisição HTTP POST.',
      'Porque algoritmos de hashing reduzem o tamanho da senha para apenas 4 bytes, economizando espaço em disco.',
      'Porque o bcrypt criptografa a senha no próprio navegador antes do envio pela rede.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: Hashes são irreversíveis (one-way). O Salt (poda aleatória adicionada antes de gerar o hash) torna cada hash único, impedindo ataques de tabela pré-calculada (Rainbow Tables). A: recuperar senha exige redefinição, pois o hash não reverte. C, D, E: incorretos.'
  },
  {
    id: 'be-auth-02',
    topicId: 't-be-auth',
    question: 'Um JSON Web Token (JWT) é amplamente utilizado para autenticação stateless em APIs. De quais três partes separadas por pontos (.) um token JWT é composto?',
    options: [
      'Username, Password e Salt.',
      'Header, Payload e Signature.',
      'Domain, Issuer e Expiration.',
      'Client_ID, Client_Secret e Grant_Type.',
      'Request, Body e Response.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: A estrutura padrão do JWT (RFC 7519) consiste em três partes codificadas em Base64URL: Header (algoritmo e tipo), Payload (claims/dados) e Signature (assinatura digital que garante a integridade).'
  },
  {
    id: 'be-auth-03',
    topicId: 't-be-auth',
    question: 'Como o servidor valida se um JWT enviado por um cliente no cabeçalho Authorization: Bearer <token> foi alterado por um atacante?',
    options: [
      'O servidor consulta o banco de dados de senhas para comparar os dados contidos no Payload.',
      'O servidor recalcula a assinatura (Signature) utilizando o Header, Payload e a chave secreta mantida no servidor, comparando-a com a assinatura enviada no token.',
      'O servidor decodifica o Payload e verifica se a senha do usuário bate com o hash bcrypt salvo.',
      'O servidor faz uma requisição HTTP para a autoridade certificadora da W3C para validar o token.',
      'O servidor envia um SMS de confirmação ao usuário a cada verificação de JWT.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: A validação do JWT é feita localmente sem consultar banco de dados: o servidor aplica o algoritmo do Header sobre (Header + Payload) com a sua chave secreta privada. Se a assinatura gerada for idêntica à do token, o token é autêntico e não foi adulterado.'
  },
  {
    id: 'be-auth-04',
    topicId: 't-be-auth',
    question: 'Qual é a diferença fundamental entre os conceitos de Autenticação e Autorização no contexto de segurança em sistemas?',
    options: [
      'Autenticação verifica a identidade do usuário (quem ele é); Autorização verifica as permissões e direitos de acesso do usuário (o que ele pode fazer).',
      'Autenticação ocorre apenas no banco de dados; Autorização ocorre no servidor web Express.',
      'Autenticação utiliza apenas HTTPS; Autorização utiliza apenas tokens JWT sem criptografia.',
      'Autenticação refere-se ao cadastro do usuário; Autorização refere-se à exclusão da conta do usuário.',
      'Não há diferença conceitual, ambos os termos são sinônimos para o processo de login.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: Autenticação = "Quem é você?" (validação de credenciais). Autorização = "Você tem permissão para realizar esta ação/acessar este recurso?" (controle de acesso como RBAC/ABAC).'
  },
  {
    id: 'be-auth-05',
    topicId: 't-be-auth',
    question: 'Ao implementar "Autenticação Social" (ex: Entrar com Google ou GitHub), qual protocolo padrão aberto de autorização é utilizado para delegar o acesso às credenciais sem expor a senha do usuário ao seu sistema?',
    options: [
      'OAuth 2.0 / OpenID Connect',
      'SOAP / WSDL',
      'FTP / SFTP',
      'Basic Auth / Digest',
      'SAML 1.0 / Kerberos'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: OAuth 2.0 (com a camada de identidade OpenID Connect - OIDC) é o padrão da indústria para login federado e autorização delegada via provedores de terceiros (Google, GitHub, Auth0) sem expor senhas ao aplicativo cliente.'
  },
  {
    id: 'be-auth-06',
    topicId: 't-be-auth',
    question: 'Para mitigar os riscos de sequestro de tokens em APIs autenticadas por JWT, qual é a boa prática recomendada em relação ao tempo de vida (expiration) e renovação dos tokens?',
    options: [
      'Emitir Access Tokens sem data de expiração para evitar deslogar o usuário.',
      'Utilizar Access Tokens de curta duração (ex: 15 minutos) acompanhados de Refresh Tokens de longa duração mantidos com armazenamento seguro e revogável.',
      'Armazenar o Access Token no LocalStorage e a senha em texto limpo nos Cookies da aplicação.',
      'Exigir que o usuário digite a senha em todas as requisições HTTP da aplicação.',
      'Aumentar o tempo de vida do Access Token para 1 ano caso o usuário utilize navegação anônima.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: Access Tokens devem ter vida curta (ex: 15 min) para minimizar a janela de exposição se vazados. O Refresh Token (vida mais longa, mantido de forma segura como Cookie HttpOnly SameSite) serve para emitir novos Access Tokens sem exigir novo login.'
  },
  {
    id: 'be-auth-07',
    topicId: 't-be-auth',
    question: 'Qual técnica e pacote de apoio para Express.js são recomendados para proteger rotas de login contra ataques de Força Bruta (Brute-Force Attacks) por tentativas consecutivas de senhas?',
    options: [
      'Rate Limiting utilizando bibliotecas como express-rate-limit para limitar o número de requisições por IP em um intervalo de tempo.',
      'Compressão de payload utilizando o pacote compression.',
      'Agendamento de tarefas utilizando node-cron.',
      'Normalização de strings utilizando lodash.',
      'Criptografia de disco utilizando o pacote fs-extra.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: `express-rate-limit` restringe a frequência de requisições por IP ou conta em uma janela de tempo determinada, impedindo que bots façam milhares de tentativas por segundo em rotas de autenticação (Brute Force).'
  },
  {
    id: 'be-auth-08',
    topicId: 't-be-auth',
    question: 'No ecossistema Node.js, o que é o Passport.js e como funcionam suas "Estratégias" (Strategies)?',
    options: [
      'É um ORM para banco de dados que criptografa colunas sensíveis automaticamente.',
      'É um middleware de autenticação modular e flexível que abstrai diferentes métodos de autenticação (Local, JWT, Google, OAuth) em plugins chamados estratégias.',
      'É um gerenciador de processos para reiniciar o Node.js quando ocorrem falhas de autenticação.',
      'É um pacote de validação de formulários HTML no lado do servidor.',
      'É uma ferramenta para simulação de ataques de negação de serviço (DDoS).'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: O Passport.js é um middleware de autenticação extremamente popular que utiliza estratégias modulares (`passport-local`, `passport-jwt`, `passport-google-oauth20`) para lidar com múltiplos métodos de autenticação.'
  },
  {
    id: 'be-auth-09',
    topicId: 't-be-auth',
    question: 'Por que a verificação de assinatura de JWTs e comparação de hashes de senhas utilizam métodos de comparação de tempo constante (constant-time comparison) em vez de operadores de igualdade tradicionais (===)?',
    options: [
      'Para evitar vulnerabilidades de Timing Attacks, onde um atacante deduz a chave ou hash medindo pequenas variações no tempo de resposta do servidor ao comparar caractere por caractere.',
      'Para permitir que a comparação ignore diferenças de letras maiúsculas e minúsculas.',
      'Porque o operador === não funciona com strings que contêm caracteres especiais ou numéricos.',
      'Para acelerar a verificação em até 100 vezes em servidores com múltiplos núcleos de processador.',
      'Porque o operador === causa vazamento de memória quando usado em middlewares assíncronos.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: Comparações padrão (`===`) encerram no primeiro caractere diferente (short-circuit). Um atacante pode medir esse tempo e descobrir segredos caractere por caractere (Timing Attack). Funções seguras (como `crypto.timingSafeEqual`) levam sempre o mesmo tempo.'
  },
  {
    id: 'be-auth-10',
    topicId: 't-be-auth',
    question: 'Como resolver o desafio de revogar antecipadamente um token JWT (por exemplo, após o usuário clicar em "Sair de todos os dispositivos") mantendo a arquitetura stateless?',
    options: [
      'Excluindo o arquivo package.json do projeto.',
      'Mantendo uma lista negra (blacklist) de tokens revogados/jti (JWT ID) em um banco em memória de alta velocidade (como Redis) com tempo de expiração equivalente ao TTL do token.',
      'Recompilando o código fonte da aplicação Node.js a cada logout efetuado.',
      'Alterando a porta HTTP do servidor Express.',
      'O protocolo JWT proíbe qualquer tipo de logout antes que o token expire naturalmente.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: Para revogar JWTs antes do prazo de expiração (exp), a solução recomendada é checar o ID único do token (`jti`) em uma Blacklist armazenada no Redis com TTL ajustado para o tempo restante de vida do token. A, C, D, E: incorretos.'
  }
];
