import { Question } from '../../../types';

export const BACKEND_K8S_QUESTIONS: Question[] = [
  {
    id: 'be-k8s-01',
    topicId: 't-be-k8s',
    question: 'O Kubernetes (K8s) é a plataforma padrão de orquestração de contêineres em nuvem. Qual é a finalidade principal do Kubernetes em um ambiente de produção?',
    options: [
      'Automatizar a implantação, o dimensionamento (escalabilidade), a alta disponibilidade e o gerenciamento de aplicações conteinerizadas em um cluster de servidores.',
      'Substituir o código-fonte escrito em Node.js por linguagens compiladas de baixo nível.',
      'Gerar relatórios de vendas e marketing a partir de logs do servidor web.',
      'Compilar imagens Docker no computador local do desenvolvedor sem o uso do terminal.',
      'Fornecer uma interface de chat para os usuários finais tirarem dúvidas sobre o sistema.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: O Kubernetes automatiza o ciclo de vida completo de aplicações em contêineres em escala distribuída: autocura (self-healing), escalabilidade automática (autoscaling), balanceamento de carga, deployments sem downtime (rolling updates) e gerenciamento de armazenamento/segurança. B, C, D, E: incorretos.'
  },
  {
    id: 'be-k8s-02',
    topicId: 't-be-k8s',
    question: 'No Kubernetes, qual é a menor unidade implantável (smallest deployable unit) do modelo de objetos, que encapsula um ou mais contêineres estreitamente vinculados que compartilham armazenamento e rede?',
    options: [
      'Pod',
      'Container Group',
      'Virtual Machine',
      'Docker Image',
      'Cluster Node'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: O Pod é o menor bloco básico de construção no K8s. Ele abstrai um ou mais contêineres (ex: contêiner principal da API + contêiner sidecar de logs) que compartilham o mesmo espaço de endereçamento IP (network namespace) e volumes de armazenamento.'
  },
  {
    id: 'be-k8s-03',
    topicId: 't-be-k8s',
    question: 'Na arquitetura do cluster Kubernetes, qual componente do Control Plane (Master Node) é o banco de dados chave-valor distribuído que armazena o estado completo do cluster?',
    options: [
      'etcd',
      'kube-apiserver',
      'kube-scheduler',
      'kube-controller-manager',
      'kubelet'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: O `etcd` é o banco de dados chave-valor altamente disponível e consistente que guarda todo o estado, dados de configuração e metadados declarativos do cluster K8s. O `kube-apiserver` é a porta de entrada da API. O `kube-scheduler` aloca Pods nos Nós.'
  },
  {
    id: 'be-k8s-04',
    topicId: 't-be-k8s',
    question: 'Qual objeto do Kubernetes é responsável por gerenciar de forma declarativa o estado desejado de um conjunto de Pods idênticos, oferecendo suporte nativo a atualizações sem paralisação da aplicação (Rolling Updates) e rollback?',
    options: [
      'Deployment',
      'DaemonSet',
      'StatefulSet',
      'Job',
      'ConfigMap'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: O objeto `Deployment` descreve o estado desejado de réplicas de Pods. O K8s altera gradualmente o estado real para o estado desejado, permitindo substituir versões antigas da aplicação por novas sem indisponibilidade (Rolling Update) através de ReplicaSets.'
  },
  {
    id: 'be-k8s-05',
    topicId: 't-be-k8s',
    question: 'Como os Pods possuem endereços IP efêmeros que mudam sempre que um Pod é recriado, qual objeto do Kubernetes abstrai o acesso aos Pods fornecendo um ponto de extremidade de IP/DNS estável e balanceamento de carga interno (ex: ClusterIP)?',
    options: [
      'Service',
      'Namespace',
      'IngressRoute',
      'VolumeBinding',
      'NodePortController'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: Um `Service` no K8s é uma abstração que define um conjunto lógico de Pods e uma política de acesso a eles (via seletor de labels). Ele fornece um IP virtual fixo e um nome no DNS do cluster (ex: `ClusterIP`), distribuindo o tráfego entre as réplicas ativas.'
  },
  {
    id: 'be-k8s-06',
    topicId: 't-be-k8s',
    question: 'Para expor serviços HTTP/HTTPS do cluster para o tráfego externo da internet com roteamento baseado em caminhos de URL (ex: /api vs /app) e terminação SSL/TLS, qual recurso do Kubernetes é utilizado em conjunto com um controlador de borda?',
    options: [
      'Ingress',
      'Kubelet',
      'Container Runtime Interface (CRI)',
      'StorageClass',
      'HorizontalPodAutoscaler'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: O `Ingress` gerencia o acesso externo aos serviços do cluster (geralmente HTTP/HTTPS). Ele fornece roteamento baseado em hostname e caminho de URL, além de terminação SSL/TLS, sendo operado por um Ingress Controller (como NGINX Ingress Controller ou Traefik).'
  },
  {
    id: 'be-k8s-07',
    topicId: 't-be-k8s',
    question: 'No gerenciamento de configurações do Kubernetes, qual é a diferença entre os objetos ConfigMap e Secret?',
    options: [
      'ConfigMap armazena dados de configuração não confidenciais em texto simples; Secret armazena informações sensíveis (como senhas, chaves de API e certificados) de forma codificada/criptografada.',
      'ConfigMap é usado apenas para imagens Docker; Secret é usado apenas para arquivos do Windows.',
      'ConfigMap expõe os dados para a internet pública; Secret só pode ser lido pelo criador do cluster.',
      'ConfigMap é apagado após 10 minutos; Secret permanece armazenado no disco por 10 anos.',
      'Não há diferença técnica, ambos são nomes idênticos no manifesto YAML.'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: `ConfigMap` injeta variáveis e arquivos de configuração não sensíveis. `Secret` guarda dados confidenciais (chaves, senhas) injetados como variáveis de ambiente ou volumes montados de forma restrita na memória (tmpfs) no Pod.'
  },
  {
    id: 'be-k8s-08',
    topicId: 't-be-k8s',
    question: 'Como funciona o recurso de escalabilidade automática Horizontal Pod Autoscaler (HPA) no Kubernetes?',
    options: [
      'Aumenta o número de núcleos de CPU e memória RAM da máquina física onde o Kubernetes está instalado.',
      'Aumenta ou diminui automaticamente o número de réplicas de Pods de um Deployment com base no uso observado de métricas como CPU, memória ou métricas customizadas.',
      'Deleta automaticamente os Pods que utilizam mais de 80% de largura de banda de rede.',
      'Reinicia o nó Master caso a carga de trabalho ultrapasse 100 requisições por segundo.',
      'Converte os contêineres Docker em funções serverless da AWS Lambda.'
    ],
    correctAnswer: 1,
    explanation: 'A correta é a B: O `HPA` ajusta dinamicamente a quantidade de réplicas de Pods (scale-out / scale-in) com base em métricas observadas (como utilização média de CPU ou requisições por segundo), garantindo que a aplicação aguente picos e economize recursos em momentos de calmaria.'
  },
  {
    id: 'be-k8s-09',
    topicId: 't-be-k8s',
    question: 'Para implementar o mecanismo de auto-recuperação (Self-Healing) e saber se uma aplicação dentro de um contêiner travou ou entrou em estado irrecuperável (ex: deadlock), qual sonda de verificação (probe) deve ser configurada no manifesto do Pod para que o K8s reinicie o contêiner?',
    options: [
      'Liveness Probe',
      'Readiness Probe',
      'Startup Probe',
      'Health Check Proxy',
      'Kube-proxy Ping'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: A `Liveness Probe` verifica se a aplicação está viva. Se falhar, o Kubernetes mata o contêiner e aplica a política de reinicialização. A `Readiness Probe` verifica se o contêiner está pronto para receber tráfego de rede (se falhar, remove o Pod dos endpoints do Service).'
  },
  {
    id: 'be-k8s-10',
    topicId: 't-be-k8s',
    question: 'Qual é o comando oficial de linha de comando (CLI) do Kubernetes utilizado para aplicar manifestos declarativos codificados em YAML ou JSON contra a API do cluster?',
    options: [
      'kubectl apply -f arquivo.yaml',
      'docker run -d arquivo.yaml',
      'k8s start --file=arquivo.yaml',
      'npm deploy arquivo.yaml',
      'minikube build arquivo.yaml'
    ],
    correctAnswer: 0,
    explanation: 'A correta é a A: `kubectl` é a ferramenta de linha de comando para controlar o cluster K8s. O comando `kubectl apply -f manifesto.yaml` lê as especificações declarativas do arquivo e atualiza o estado dos objetos no cluster para corresponder ao arquivo.'
  }
];
