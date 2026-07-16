export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  projectSlug?: string;
}

export interface Project {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  tags: string[];
  experienceId?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  flagship?: boolean;
  domain?: string;
  role?: string;
  timeframe?: string;
  impact?: { label: string; value: string }[];
  problem?: string;
  architecture?: string;
  decisions?: string[];
  outcomes?: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface AcademicJourneyStep {
  period: string;
  title: string;
  description: string;
}

export interface LabConfig {
  apiUrl: string;
  mlflowUrl: string;
  grafanaUrl: string;
  lokiUrl: string;
}

// ─── CV Data ──────────────────────────────────────────────────────────────────

export const cv = {
  name: "Peniel Teko-Agbo",
  title: "Étudiant en informatique — Backend, DevOps & IA",
  tagline: "Je conçois des applications Python, des API et des systèmes IA observables.",
  profile: [
    "Étudiant en informatique spécialisé dans le développement backend et les architectures logicielles.",
    "Je conçois des applications Python et des API, mets en place des environnements Docker, automatise des workflows et développe des outils autour de l'intelligence artificielle, de l'observabilité et du DevOps.",
    "Mon principal projet est AI-Obs, une plateforme d'observabilité destinée aux systèmes IA, conçue autour d'une architecture événementielle et d'une gouvernance orientée qualité logicielle.",
    "Cofondateur de Lambda-section et lead sur NeuralDBG, j'ai piloté le volet DevOps/MLOps : reproductibilité avec Docker et scripting, gouvernance des branches selon les rôles et assainissement Git du dépôt.",
    "Je recherche une alternance afin de participer au développement de produits techniques exigeants et d'évoluer vers des fonctions d'ingénieur logiciel, DevOps ou IA.",
  ],
  contact: {
    email: "penielteko02@gmail.com",
    github: "https://github.com/P3niel",
    linkedin: "https://www.linkedin.com/in/péniel-teko-agbo-b6a759237",
    location: "France",
  },
  experiences: [
    {
      id: "exp-ai-obs",
      role: "Fondateur · Concepteur et développeur backend",
      company: "AI-Obs — Projet personnel",
      period: "En cours",
      description: [
        "Conception d'un prototype d'observabilité pour rendre les exécutions d'agents IA inspectables, comparables et reproductibles.",
        "Développement en Python d'un Kernel déterministe, du replay, de la comparaison de runs et de la détection d'anomalies.",
        "Définition de contrats versionnés, schémas JSON, décisions d'architecture et règles de traçabilité.",
        "Mise en place d'un workflow de livraison piloté par tickets avec lint, typage, tests, sécurité et validation CI.",
      ],
      projectSlug: "ai-obs",
    },
    {
      id: "exp-lambda-section",
      role: "Cofondateur · Lead DevOps/MLOps",
      company: "Lambda-section — NeuralDBG",
      period: "Collaboration open source",
      description: [
        "Lead sur le volet DevOps/MLOps de NeuralDBG, projet open source porté par Lambda-section.",
        "Initiative et mise en place de la reproductibilité des environnements avec Docker et des scripts d'automatisation.",
        "Mise en place et amélioration de la CI/CD avec GitHub Actions pour automatiser les contrôles et validations.",
        "Organisation des accès aux branches en fonction des rôles et responsabilités des contributeurs.",
        "Assainissement Git du dépôt, amélioration de la traçabilité et stabilisation des workflows de contribution.",
      ],
      projectSlug: "neuraldbg",
    },
    {
      id: "exp-eurial",
      role: "Technicien Service Desk",
      company: "Eurial — Nantes · Alternance",
      period: "Alternance",
      description: [
        "Assistance et support aux utilisateurs ; diagnostic et résolution d'incidents matériels, logiciels et réseau.",
        "Administration des comptes utilisateurs sous Active Directory et Microsoft 365.",
        "Gestion des postes de travail, des équipements informatiques et des environnements Windows.",
        "Participation à l'amélioration des procédures de support et de la documentation.",
      ],
    },
    {
      id: "exp-mairie-2024",
      role: "Stagiaire Informatique",
      company: "Mairie de Saint-Lambert-la-Potherie",
      period: "Avril 2024 — Mai 2024",
      description: [
        "Développement d'un outil Python automatisant la génération de documents Word à partir de fichiers Excel.",
        "Utilisation de xlwings et docxtpl pour automatiser les processus administratifs.",
        "Participation à des travaux de segmentation réseau.",
        "Contribution à la préparation d'un espace collaboratif SharePoint.",
      ],
    },
  ] satisfies Experience[],

  skills: [
    {
      category: "Langages",
      items: ["Python", "Java", "C", "C++", "PHP", "JavaScript", "SQL", "HTML5 / CSS3"],
    },
    {
      category: "Backend",
      items: ["FastAPI", "Flask", "Laravel", "API REST", "Architecture logicielle", "POO", "SMTP", "Génération de rapports HTML"],
    },
    {
      category: "IA",
      items: ["Intégration de LLM", "Instrumentation IA", "Observabilité IA", "NLP", "Prompt Engineering"],
    },
    {
      category: "DevOps & Cloud",
      items: ["Docker", "Docker Compose", "Git", "GitHub Actions", "CI/CD", "Terraform", "Infrastructure as Code", "AWS", "Ansible", "Linux", "Nginx"],
    },
    {
      category: "Bases de données",
      items: ["PostgreSQL", "MySQL", "SQL Server"],
    },
    {
      category: "Systèmes",
      items: ["Active Directory", "Microsoft Entra ID", "Microsoft Intune", "Microsoft 365", "Windows Server", "PowerShell", "GPO"],
    },
    {
      category: "Outils",
      items: ["psutil", "Postman", "Vite", "Composer", "VS Code", "GitHub"],
    },
    {
      category: "Observabilité",
      items: ["Monitoring CPU / RAM / stockage", "Détection d'anomalies", "Alertes automatisées", "Rapports système", "Grafana"],
    },
    {
      category: "Méthodes",
      items: ["Git Flow", "Architecture événementielle", "Conception orientée API", "Documentation technique", "Tests logiciels", "Revue de code", "Agile / Scrum"],
    },
  ] satisfies Skill[],

  education: [
    {
      degree: "Programme Grande École",
      institution: "Epitech Technology — Paris",
      year: "2022 — 2023",
    },
    {
      degree: "Bachelor Informatique — première année validée, deuxième année suivie",
      institution: "Learn IT Open Campus — Angers",
      year: "À partir de 2023",
    },
  ] satisfies Education[],

  academicJourney: [
    {
      period: "Septembre 2022",
      title: "Arrivée en France",
      description: "Arrivée en France comme étudiant international avec l'objectif de construire un parcours en ingénierie informatique.",
    },
    {
      period: "2022 — 2023",
      title: "Epitech Technology — Paris",
      description: "Intégration du Programme Grande École et découverte d'un apprentissage du développement logiciel structuré autour de projets.",
    },
    {
      period: "À partir de 2023",
      title: "Learn IT Open Campus — Angers",
      description: "Première année du Bachelor Informatique validée, puis deuxième année consacrée au développement logiciel, à l'administration systèmes et à l'ingénierie informatique.",
    },
    {
      period: "Après la deuxième année",
      title: "Interruption administrative",
      description: "La troisième année n'a pas pu être poursuivie en raison d'une procédure administrative liée au droit au séjour, malgré la validation du parcours académique jusque-là.",
    },
    {
      period: "Depuis cette interruption",
      title: "Apprentissage autonome et projets d'ingénierie",
      description: "Approfondissement intensif de l'architecture logicielle, du DevOps, de l'observabilité des systèmes IA et du cloud à travers plusieurs projets personnels, dont AI-Obs comme projet principal.",
    },
  ] satisfies AcademicJourneyStep[],
};

// ─── Projects ─────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    slug: "ai-obs",
    name: "AI-Obs",
    shortDescription: "Prototype Python gouverné pour inspecter, comparer et rejouer les exécutions d’agents IA.",
    description: "Prototype d'observabilité pour agents IA fondé sur un Kernel déterministe, des analyses d'exécution, des contrats techniques versionnés et une gouvernance orientée qualité logicielle.",
    tags: ["Python", "Pytest", "JSON Schema", "GitHub Actions", "Observabilité", "Architecture événementielle", "Gouvernance"],
    githubUrl: "https://github.com/P3niel/ai-observability",
    featured: true,
    flagship: true,
    domain: "Observabilité des systèmes IA",
    role: "Conception, architecture et développement backend",
    timeframe: "Projet personnel · En cours",
    problem: "Rendre les exécutions d'agents IA inspectables, comparables et reproductibles, tout en conservant des contrats et des critères de qualité vérifiables.",
    architecture: `Kernel en mémoire -> vérité d'exécution
Payloads sérialisés -> analyses et détection
Replay et comparaison -> investigation
Dashboard statique -> surface de revue`,
    decisions: [
      "Conserver les événements immuables comme source de vérité pour la reconstruction des traces.",
      "Séparer le Kernel, les projections d'observabilité et les futures couches HTTP et de persistance.",
      "Appuyer chaque évolution sur des contrats versionnés, la revue de code et des règles de gouvernance.",
    ],
    outcomes: [
      "Kernel, replay, comparaison de runs et détection d'anomalies implémentés en Python.",
      "Dashboard statique et alertes Slack ou Discord disponibles comme surfaces de revue.",
      "Contrats, décisions d'architecture et validations reliés au cycle de développement.",
    ],
  },
  {
    slug: "neuraldbg",
    name: "NeuralDBG",
    shortDescription: "Lead DevOps/MLOps sur un outil open source de diagnostic causal pour entraînements PyTorch.",
    description: "NeuralDBG est un projet open source porté par Lambda-section qui s'intègre aux boucles d'entraînement PyTorch pour détecter des anomalies — gradients instables, activations saturées, pertes divergentes ou données invalides — et produire des hypothèses causales. Cofondateur de Lambda-section et lead sur NeuralDBG, j'ai pris en charge le volet DevOps/MLOps afin de rendre le développement reproductible, traçable et mieux gouverné.",
    tags: ["DevOps", "MLOps", "CI/CD", "GitHub Actions", "Docker", "Scripting", "Git", "PyTorch", "Reproductibilité", "Traçabilité"],
    githubUrl: "https://github.com/LambdaSection/NeuralDBG",
    featured: true,
    domain: "Collaboration open source · Lambda-section",
    role: "Co-founder · Lead DevOps/MLOps",
    timeframe: "Contribution collaborative",
    impact: [
      { label: "Rôle", value: "Lead DevOps / MLOps" },
      { label: "Priorité", value: "Reproductibilité" },
      { label: "Organisation", value: "Lambda-section" },
    ],
    problem: "Un outil de diagnostic PyTorch validé sur de nombreuses architectures mobilise des dépendances, des benchmarks, des exemples et plusieurs chemins d'exécution. J'ai pris l'initiative de structurer son environnement de développement afin de limiter les écarts entre machines, rendre les validations rejouables, contrôler les accès aux branches selon les rôles et maintenir un historique Git propre.",
    architecture: `Code NeuralDBG et dépendances
        ↓
Docker et scripts d'automatisation
        ↓
Installation et validations reproductibles
        ↓
CI/CD avec GitHub Actions
        ↓
Accès aux branches selon les rôles
        ↓
Dépôt Git assaini et changements traçables`,
    decisions: [
      "Prendre le lead du volet DevOps/MLOps et formaliser les besoins de reproductibilité du projet.",
      "Conteneuriser l'environnement avec Docker et automatiser les opérations répétitives avec des scripts.",
      "Mettre en place une CI/CD avec GitHub Actions pour exécuter automatiquement les contrôles et validations du projet.",
      "Organiser les accès aux branches en fonction des rôles pour mieux encadrer les contributions.",
      "Assainir le dépôt au niveau Git et renforcer la traçabilité des changements et validations.",
    ],
    outcomes: [
      "Environnement Docker et scripts facilitant une installation cohérente entre contributeurs.",
      "Tests, benchmarks et validations plus faciles à reproduire.",
      "Contrôles automatisés dans la CI/CD avant intégration des changements.",
      "Accès aux branches structurés selon les responsabilités de l'équipe.",
      "Historique Git assaini et changements techniques plus simples à auditer.",
    ],
  },
  {
    slug: "devops-lab",
    name: "DevOpsLab",
    shortDescription: "Environnements de préproduction reproductibles avec Docker et Terraform.",
    description: "Laboratoire personnel consacré au déploiement de services Linux, à l'automatisation d'infrastructure et à l'expérimentation de pipelines CI/CD.",
    tags: ["Docker", "Terraform", "Linux", "CI/CD", "DevOps"],
    featured: true,
    domain: "Infrastructure et automatisation",
    role: "Conception et mise en œuvre",
    timeframe: "Projet personnel",
    outcomes: [
      "Mise en place d'environnements de préproduction.",
      "Automatisation de l'infrastructure et du déploiement de services Linux.",
      "Expérimentation de pratiques CI/CD reproductibles.",
    ],
  },
  {
    slug: "portfolio",
    name: "Portfolio",
    shortDescription: "Frontend public documentant mes projets, mon parcours et ma manière de construire des systèmes.",
    description: "Ce portfolio est un produit Next.js conçu comme une preuve d'ingénierie : navigation responsive, terminal interactif, CV structuré, études de cas pilotées par configuration, Lab en mode démonstration contrôlée, routes proxy prêtes pour un backend et publication continue avec GitHub Actions et Vercel.",
    tags: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "GitHub Actions", "Vercel"],
    githubUrl: "https://github.com/P3niel/Portfolio",
    liveUrl: "/",
    featured: true,
    domain: "Frontend, plateforme et expérience développeur",
    role: "Conception et développement full-stack",
    timeframe: "Projet personnel · Frontend public",
    impact: [
      { label: "Surface", value: "Vercel public" },
      { label: "Contenu", value: "Config-driven" },
      { label: "Runtime", value: "Demo contrôlée" },
    ],
    problem: "Présenter des compétences backend, DevOps et IA sans se limiter à une liste de technologies, tout en distinguant clairement les fonctionnalités réellement actives des infrastructures volontairement arrêtées.",
    architecture: `Visiteur -> Next.js App Router
        ├──> accueil et terminal interactif
        ├──> CV et parcours
        ├──> études de cas pilotées par config
        └──> Lab et routes proxy

GitHub Actions -> lint, types et tests
Vercel -> preview par PR et frontend public
k3s / MLflow -> IaC conservée, runtime éteint`,
    decisions: [
      "Centraliser le CV et les études de cas dans une configuration typée pour éviter la dérive de contenu.",
      "Conserver une navigation classique en complément du terminal interactif.",
      "Présenter le Lab en démonstration contrôlée lorsque le backend est volontairement hors ligne.",
      "Conserver les workflows et manifests backend comme preuves reproductibles sans maintenir l'infrastructure coûteuse en permanence.",
    ],
    outcomes: [
      "Accueil responsive avec terminal, sélection éditoriale de projets et contact direct.",
      "CV, parcours académique et études de cas accessibles par des routes dédiées.",
      "Lab capable de basculer entre données de démonstration et services live par configuration.",
      "Contrôles GitHub Actions et previews Vercel sur les pull requests.",
    ],
  },
  {
    slug: "toxic-ai",
    name: "ToxicAI",
    shortDescription: "Analyse des comportements et de la fiabilité des modèles d'IA.",
    description: "Étude et développement d'outils d'analyse des comportements de modèles d'intelligence artificielle, avec un intérêt particulier pour la détection d'anomalies et l'évaluation de leur fiabilité.",
    tags: ["Intelligence artificielle", "NLP", "Détection d'anomalies", "Fiabilité"],
    featured: false,
    domain: "Évaluation des systèmes IA",
    role: "Étude et développement",
    timeframe: "Projet personnel",
    outcomes: [
      "Expérimentations autour de la détection d'anomalies.",
      "Exploration de critères d'évaluation de la fiabilité des systèmes IA.",
    ],
  },
  {
    slug: "infra-terraform-preprod",
    name: "Infra Terraform Preprod",
    shortDescription: "Environnement de préproduction AWS reproductible avec Terraform.",
    description: "Infrastructure de préproduction conçue avec Terraform pour automatiser le provisionnement d'un environnement AWS reproductible. L'environnement cloud a été volontairement désactivé après la phase d'expérimentation afin de maîtriser les coûts, tandis que le code conserve la conception et permet de recréer l'infrastructure de manière contrôlée.",
    tags: ["Terraform", "AWS", "Infrastructure as Code", "Linux", "Git", "CI/CD"],
    featured: false,
    domain: "Cloud et Infrastructure as Code",
    role: "Conception et automatisation de l'infrastructure",
    timeframe: "Projet personnel · Infrastructure désactivée",
    problem: "Disposer d'un environnement de préproduction proche des conditions cloud réelles, sans dépendre d'une configuration manuelle ni conserver des ressources AWS coûteuses en permanence.",
    architecture: `Code Terraform -> plan de déploiement
AWS -> environnement de préproduction
Validation de l'infrastructure
Arrêt des ressources -> maîtrise des coûts`,
    decisions: [
      "Décrire l'environnement sous forme de code afin de pouvoir le reproduire et le faire évoluer.",
      "Séparer la conception de l'infrastructure de son état d'exécution dans le cloud.",
      "Désactiver l'environnement après validation pour éviter des coûts AWS permanents.",
    ],
    outcomes: [
      "Mise en pratique du provisionnement cloud avec Terraform.",
      "Environnement recréable à partir du code plutôt que d'une configuration manuelle.",
      "Prise en compte du coût comme contrainte d'exploitation de l'infrastructure.",
    ],
  },
  {
    slug: "sentinelops",
    name: "SentinelOps",
    shortDescription: "Monitoring local autonome avec détection d'anomalies, alertes SMTP et rapports HTML.",
    description: "SentinelOps est une application de surveillance système locale conçue pour rester simple à déployer et autonome. Elle collecte les signaux CPU, mémoire et stockage, expose leur état via une API Flask et une interface web, détecte les anomalies, conserve un historique d'événements, génère des rapports HTML et peut envoyer des alertes par e-mail. Le projet est exécutable localement, mais aucune instance publique n'est actuellement maintenue afin de réduire les coûts d'hébergement.",
    tags: ["Python 3.12", "Flask", "psutil", "SMTP", "Docker Compose", "GitHub Actions", "Tailwind CSS"],
    githubUrl: "https://github.com/P3niel/sentinelops",
    featured: false,
    domain: "Monitoring système et automatisation",
    role: "Conception et développement full-stack",
    timeframe: "Projet personnel · Déploiement public désactivé",
    impact: [
      { label: "Signaux", value: "CPU · RAM · Stockage" },
      { label: "Exposition", value: "API + Interface web" },
      { label: "Statut", value: "Local · Non hébergé" },
    ],
    problem: "Surveiller une machine locale sans déployer une plateforme d'observabilité lourde : identifier rapidement une saturation CPU, mémoire ou stockage, notifier l'administrateur et conserver une trace exploitable pour le diagnostic ou l'audit.",
    architecture: `psutil -> collecte CPU, RAM et stockage
        ↓
Flask -> API de statut et interface web
        ↓
Moteur de détection -> anomalies et événements
        ├──> SMTP -> notification e-mail
        └──> HTML -> rapport exploitable

Docker Compose -> environnement local reproductible
GitHub Actions -> contrôles automatisés`,
    decisions: [
      "Utiliser psutil pour collecter localement les signaux système sans dépendre d'un agent externe.",
      "Séparer l'observation, la détection, la réponse et la génération de rapports derrière des routes Flask dédiées.",
      "Utiliser SMTP avec une configuration par variables d'environnement afin de garder les secrets hors du code.",
      "Conteneuriser l'application avec Docker Compose et fournir un lancement reproductible via Make.",
      "Automatiser les contrôles du projet avec GitHub Actions.",
    ],
    outcomes: [
      "API couvrant le statut système, la détection, la réponse, l'historique des événements et la génération de rapports.",
      "Interface web dédiée à la consultation de l'état local et au déclenchement d'une alerte de test.",
      "Notifications SMTP configurables lors de la détection d'un seuil critique.",
      "Rapports HTML utilisables comme historique de diagnostic et preuve d'incident.",
      "Environnement local reproductible avec Docker Compose et pipeline GitHub Actions.",
      "Déploiement public volontairement désactivé pour éviter des coûts d'infrastructure permanents.",
    ],
  },
];

// Archived concept studies kept out of the rendered portfolio.
export const archivedProjectDrafts: Project[] = [
  {
    slug: "mlops-platform",
    name: "MLOps Platform",
    shortDescription: "Plateforme MLOps complète déployée sur k3s avec CI/CD automatisé.",
    description: `Plateforme DevOps/MLOps déployée sur un VPS (Hetzner) avec k3s.
Intègre une API ML FastAPI, MLflow pour le tracking des expériences,
un pipeline de données automatisé et un monitoring Prometheus/Grafana.`,
    tags: ["Python", "FastAPI", "MLflow", "k3s", "Docker", "GitHub Actions", "Prometheus", "Grafana"],
    experienceId: "exp-mlops-2024",
    githubUrl: "https://github.com/P3niel/mlops-platform",
    liveUrl: "/lab",
    featured: true,
    domain: "MLOps infrastructure",
    role: "End-to-end architecture, deployment, monitoring",
    timeframe: "2024 — present",
    impact: [
      { label: "Deploy path", value: "lint -> test -> build -> k8s" },
      { label: "Runtime", value: "k3s + FastAPI + MLflow" },
      { label: "Observability", value: "Prometheus / Grafana / Loki" },
    ],
    problem: "Turn a notebook-oriented ML workflow into a repeatable production service with deployment, monitoring, model registry, and rollback points.",
    architecture: `GitHub Actions -> GHCR -> k3s
FastAPI /predict + /metrics
MLflow tracking + registry
Prometheus scrape -> Grafana dashboard
CronJob retraining -> promotion gate`,
    decisions: [
      "Use k3s on a small VPS to keep infrastructure realistic and cost-aware.",
      "Expose /health and /metrics from the API so deploy status is observable from the portfolio lab.",
      "Keep model promotion explicit instead of silently replacing production artifacts.",
    ],
    outcomes: [
      "Single path from code change to deployed service.",
      "Visible runtime health from the portfolio lab.",
      "Project connects CV experience, infrastructure decisions, and production constraints.",
    ],
  },
  {
    slug: "toxic-ai",
    name: "Toxic AI",
    shortDescription: "Real-time toxic comment classifier served through FastAPI with model metrics.",
    description: "A production-shaped NLP service around toxic comment classification: inference API, confidence thresholds, Docker packaging, and monitoring hooks for latency and error rate.",
    tags: ["NLP", "FastAPI", "PyTorch", "Docker", "MLflow", "Prometheus"],
    githubUrl: "https://github.com/P3niel/toxic-ai",
    featured: true,
    domain: "NLP inference",
    role: "API design, model serving, operational metrics",
    timeframe: "Case study",
    impact: [
      { label: "Latency target", value: "p95 < 150ms" },
      { label: "Signal", value: "score + threshold" },
      { label: "Runtime", value: "FastAPI + Docker" },
    ],
    problem: "Moderation models are easy to demo but hard to operate: inference must be fast, decisions must be explainable enough for downstream systems, and failures must be observable.",
    architecture: `Client -> FastAPI /classify
Tokenizer -> model inference
Threshold policy -> prediction + score
/metrics -> Prometheus
Model versions -> MLflow registry`,
    decisions: [
      "Return both the class and confidence score so product logic can decide how aggressive moderation should be.",
      "Separate threshold policy from the model artifact to allow safe tuning without retraining.",
      "Track request latency and prediction distribution to detect drift-like behavior.",
    ],
    outcomes: [
      "Clear API contract for consuming applications.",
      "Production-oriented monitoring instead of a notebook-only result.",
      "Model changes can be compared before promotion.",
    ],
  },
  {
    slug: "fraud-detection",
    name: "Fraud Detection",
    shortDescription: "Streaming fraud detection pipeline with feature freshness and alert-oriented metrics.",
    description: "A streaming ML pipeline pattern for financial events: ingestion, feature computation, model scoring, and alerting around latency, throughput, and high-risk predictions.",
    tags: ["Kafka", "Spark", "XGBoost", "Airflow", "Terraform", "Prometheus"],
    githubUrl: "https://github.com/P3niel/fraud-detection",
    domain: "Streaming ML",
    role: "Pipeline architecture, data freshness, deployment model",
    timeframe: "Case study",
    impact: [
      { label: "Throughput model", value: "millions/day" },
      { label: "Freshness", value: "stream + nightly retrain" },
      { label: "Model", value: "XGBoost scorer" },
    ],
    problem: "Fraud detection needs low-latency scoring without losing retraining discipline. The pipeline has to keep feature freshness visible and make alert quality measurable.",
    architecture: `Events -> Kafka topic
Spark Structured Streaming -> feature table
XGBoost serving -> risk score
Airflow nightly job -> retrain + validation
Prometheus -> throughput / latency / high-risk rate`,
    decisions: [
      "Split real-time scoring from nightly retraining so online latency remains predictable.",
      "Track freshness and high-risk rate as first-class operational metrics.",
      "Keep Terraform in the case study to show how the pipeline would be reproduced outside a laptop.",
    ],
    outcomes: [
      "Architecture explains how data, model, and infrastructure fit together.",
      "The project demonstrates streaming constraints beyond a static ML benchmark.",
      "Operational metrics make model behavior inspectable.",
    ],
  },
  {
    slug: "air-quality",
    name: "Air Quality Edge",
    shortDescription: "IoT forecasting system with edge nodes, MQTT ingestion, and Grafana visibility.",
    description: "An edge-oriented forecasting system for air-quality sensors: MQTT ingestion, time-series storage, LSTM serving, and Grafana dashboards for fleet and forecast health.",
    tags: ["IoT", "MQTT", "TensorFlow", "K3s", "InfluxDB", "Grafana"],
    githubUrl: "https://github.com/P3niel/air-quality-edge",
    domain: "Edge MLOps",
    role: "Edge architecture, inference packaging, observability",
    timeframe: "Case study",
    impact: [
      { label: "Fleet model", value: "edge nodes" },
      { label: "Forecast", value: "24h horizon" },
      { label: "Telemetry", value: "MQTT -> InfluxDB" },
    ],
    problem: "Edge forecasting has messy constraints: intermittent devices, local inference needs, noisy sensor feeds, and a need for fleet-level visibility.",
    architecture: `Sensors -> MQTT broker
Edge worker -> validation + buffering
InfluxDB -> time-series history
LSTM serving -> 24h forecast
Grafana -> node health + forecast quality`,
    decisions: [
      "Use MQTT for lightweight device ingestion and reconnect behavior.",
      "Model edge nodes as deployable units rather than one central batch job.",
      "Keep sensor health next to forecast output so model quality is tied to data quality.",
    ],
    outcomes: [
      "Shows infrastructure thinking for unreliable environments.",
      "Makes data quality visible before judging model output.",
      "Demonstrates how MLOps changes at the edge.",
    ],
  },
  {
    slug: "devops-lab",
    name: "DevOps Lab",
    shortDescription: "Interactive portfolio lab exposing API health, metrics, and deployment state.",
    description: "A live-feeling lab surface connected to the portfolio: health probes, metrics panels, deployment status, and terminal-inspired workflows to make infrastructure inspectable.",
    tags: ["Next.js", "FastAPI", "Prometheus", "Grafana", "SWR", "Observability"],
    liveUrl: "/lab",
    domain: "Portfolio systems lab",
    role: "Frontend, API proxying, observability UX",
    timeframe: "2026",
    impact: [
      { label: "Surface", value: "/lab" },
      { label: "Signal", value: "health + metrics" },
      { label: "UX", value: "inspectable runtime" },
    ],
    problem: "A technical portfolio should show that systems are alive, not only describe them. The lab turns runtime signals into a UI a recruiter or engineer can inspect quickly.",
    architecture: `Next.js /lab
API proxy routes -> backend health / metrics
SWR polling -> status panels
Portfolio terminal -> guided commands
External dashboards -> Grafana / MLflow links`,
    decisions: [
      "Proxy runtime endpoints through Next.js routes to keep the UI simple and environment-aware.",
      "Use small status panels instead of a marketing dashboard.",
      "Keep terminal interactions as a discovery layer, not the only way to navigate.",
    ],
    outcomes: [
      "The portfolio can demonstrate operational thinking in the first visit.",
      "Lab panels give a concrete destination for project CTAs.",
      "The experience bridges visual design and engineering proof.",
    ],
  },
];

// ─── Lab / Live Config ────────────────────────────────────────────────────────

export const labConfig: LabConfig = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000",
  mlflowUrl: process.env.NEXT_PUBLIC_MLFLOW_URL ?? "http://localhost:5000",
  grafanaUrl: process.env.NEXT_PUBLIC_GRAFANA_URL ?? "http://localhost:3001",
  lokiUrl: process.env.NEXT_PUBLIC_LOKI_URL ?? "http://localhost:3100",
};
