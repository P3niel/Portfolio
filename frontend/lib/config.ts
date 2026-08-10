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
  goal?: string;
  role?: string;
  timeframe?: string;
  impact?: { label: string; value: string }[];
  problem?: string;
  solution?: string;
  skillsDemonstrated?: string[];
  status?: "Prototype" | "MVP" | "Active Development" | "Production";
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

export interface ExpertiseArea {
  title: string;
  body: string;
}

export interface VisitorIntent {
  label: string;
  body: string;
  href: string;
}

// ─── CV Data ──────────────────────────────────────────────────────────────────

export const cv = {
  name: "Peniel Teko-Agbo",
  title: "Computer Science Student — Backend, DevOps & AI",
  tagline: "I build Python applications, APIs, and observable AI systems.",
  profile: [
    "Computer science student specialized in backend development and software architecture.",
    "I build Python applications and APIs, set up Docker environments, automate workflows, and develop tools around artificial intelligence, observability, and DevOps.",
    "My main project is AI-Obs, an observability platform for AI systems, built around an event-driven architecture and software-quality-oriented governance.",
    "Co-founder of Lambda-section and lead on NeuralDBG, I drove the DevOps/MLOps side: reproducibility with Docker and scripting, role-based branch governance, and Git repository cleanup.",
    "I'm looking for a work-study placement to contribute to demanding technical products and grow into software engineering, DevOps, or AI roles.",
  ],
  contact: {
    email: "penielteko02@gmail.com",
    github: "https://github.com/P3niel",
    linkedin: "https://www.linkedin.com/in/péniel-teko-agbo-b6a759237",
    location: "France",
  },
  snapshot: {
    positioning: "AI Systems Engineer with a forward-deployed mindset",
    status: "Computer science student",
    opportunities: "Work-study placement (alternance) — open to internships too",
    availability: "Open to work",
    primaryStack: ["Python", "FastAPI", "Docker", "Terraform", "GitHub Actions", "Prometheus / Grafana"],
  },
  experiences: [
    {
      id: "exp-ai-obs",
      role: "Founder · Backend Designer & Developer",
      company: "AI-Obs — Personal project",
      period: "In progress",
      description: [
        "Designed an observability prototype to make AI agent executions inspectable, comparable, and reproducible.",
        "Developed a deterministic Kernel in Python, along with replay, run comparison, and anomaly detection.",
        "Defined versioned contracts, JSON schemas, architecture decisions, and traceability rules.",
        "Set up a ticket-driven delivery workflow with linting, typing, tests, security, and CI validation.",
      ],
      projectSlug: "ai-obs",
    },
    {
      id: "exp-lambda-section",
      role: "Co-founder · DevOps/MLOps Lead",
      company: "Lambda-section — NeuralDBG",
      period: "Open source collaboration",
      description: [
        "Led the DevOps/MLOps side of NeuralDBG, an open source project driven by Lambda-section.",
        "Initiated and implemented environment reproducibility with Docker and automation scripts.",
        "Set up and improved CI/CD with GitHub Actions to automate checks and validations.",
        "Organized branch access based on contributor roles and responsibilities.",
        "Cleaned up the Git repository, improved traceability, and stabilized contribution workflows.",
      ],
      projectSlug: "neuraldbg",
    },
    {
      id: "exp-eurial",
      role: "Service Desk Technician",
      company: "Eurial — Nantes · Work-study",
      period: "Work-study",
      description: [
        "Provided user assistance and support; diagnosed and resolved hardware, software, and network incidents.",
        "Administered user accounts under Active Directory and Microsoft 365.",
        "Managed workstations, IT equipment, and Windows environments.",
        "Contributed to improving support procedures and documentation.",
      ],
    },
    {
      id: "exp-mairie-2024",
      role: "IT Intern",
      company: "Saint-Lambert-la-Potherie Town Hall",
      period: "April 2024 — May 2024",
      description: [
        "Built a Python tool automating Word document generation from Excel files.",
        "Used xlwings and docxtpl to automate administrative processes.",
        "Took part in network segmentation work.",
        "Contributed to setting up a SharePoint collaborative space.",
      ],
    },
  ] satisfies Experience[],

  skills: [
    {
      category: "Languages",
      items: ["Python", "Java", "C", "C++", "PHP", "JavaScript", "SQL", "HTML5 / CSS3"],
    },
    {
      category: "Backend",
      items: ["FastAPI", "Flask", "Laravel", "REST API", "Software architecture", "OOP", "SMTP", "HTML report generation"],
    },
    {
      category: "AI",
      items: ["LLM integration", "AI instrumentation", "AI observability", "NLP", "Prompt Engineering"],
    },
    {
      category: "DevOps & Cloud",
      items: ["Docker", "Docker Compose", "Git", "GitHub Actions", "CI/CD", "Terraform", "Infrastructure as Code", "AWS", "Ansible", "Linux", "Nginx"],
    },
    {
      category: "Databases",
      items: ["PostgreSQL", "MySQL", "SQL Server"],
    },
    {
      category: "Systems",
      items: ["Active Directory", "Microsoft Entra ID", "Microsoft Intune", "Microsoft 365", "Windows Server", "PowerShell", "GPO"],
    },
    {
      category: "Tools",
      items: ["psutil", "Postman", "Vite", "Composer", "VS Code", "GitHub"],
    },
    {
      category: "Observability",
      items: ["CPU / RAM / storage monitoring", "Anomaly detection", "Automated alerts", "System reports", "Grafana"],
    },
    {
      category: "Methods",
      items: ["Git Flow", "Event-driven architecture", "API-first design", "Technical documentation", "Software testing", "Code review", "Agile / Scrum"],
    },
  ] satisfies Skill[],

  education: [
    {
      degree: "Grande École Program",
      institution: "Epitech Technology — Paris",
      year: "2022 — 2023",
    },
    {
      degree: "Computer Science Bachelor's — 1st year completed, 2nd year in progress",
      institution: "Learn IT Open Campus — Angers",
      year: "Since 2023",
    },
  ] satisfies Education[],

  academicJourney: [
    {
      period: "September 2022",
      title: "Arrival in France",
      description: "Arrived in France as an international student aiming to build a career in computer engineering.",
    },
    {
      period: "2022 — 2023",
      title: "Epitech Technology — Paris",
      description: "Joined the Grande École Program and discovered project-based, structured software development learning.",
    },
    {
      period: "Since 2023",
      title: "Learn IT Open Campus — Angers",
      description: "Completed the first year of the Computer Science Bachelor's, then spent the second year on software development, systems administration, and computer engineering.",
    },
    {
      period: "After the second year",
      title: "Administrative interruption",
      description: "The third year could not be continued due to an administrative procedure related to residency status, despite the academic track being validated up to that point.",
    },
    {
      period: "Since that interruption",
      title: "Self-directed learning and engineering projects",
      description: "Intensive deep-dive into software architecture, DevOps, AI systems observability, and cloud through several personal projects, with AI-Obs as the flagship project.",
    },
  ] satisfies AcademicJourneyStep[],
};

// ─── Positioning ──────────────────────────────────────────────────────────────

export const whatIDo: ExpertiseArea[] = [
  {
    title: "AI Systems & Observability",
    body: "I build tools that make AI systems inspectable — execution traces, anomaly detection, and dashboards that turn a black box into something a team can debug.",
  },
  {
    title: "DevOps & Cloud Infrastructure",
    body: "I containerize, automate, and ship: Docker environments, CI/CD pipelines, and infrastructure as code that make delivery repeatable instead of manual.",
  },
  {
    title: "Backend & Software Engineering",
    body: "I design and build Python applications and APIs — typed contracts, clean architecture, and tests that catch regressions before they reach a user.",
  },
];

export const lookingFor: VisitorIntent[] = [
  {
    label: "Build and observe AI systems",
    body: "Kernel-level execution tracing, replay, and anomaly detection for AI agents.",
    href: "/projects/ai-obs",
  },
  {
    label: "Automate delivery and CI/CD",
    body: "Reproducible environments, GitHub Actions pipelines, governed branch access.",
    href: "/projects/neuraldbg",
  },
  {
    label: "Design reproducible cloud infrastructure",
    body: "Terraform-defined AWS environments, provisioned and torn down on demand.",
    href: "/projects/infra-terraform-preprod",
  },
  {
    label: "Monitor systems and catch anomalies early",
    body: "CPU/RAM/storage signals, detection engine, SMTP alerts, HTML reports.",
    href: "/projects/sentinelops",
  },
  {
    label: "See the full picture",
    body: "All case studies — problems, architecture decisions, and proof points.",
    href: "/projects",
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    slug: "ai-obs",
    name: "AI-Obs",
    shortDescription: "A governed Python prototype for inspecting, comparing, and replaying AI agent executions.",
    description: "An observability prototype for AI agents built on a deterministic Kernel, execution analysis, versioned technical contracts, and software-quality-oriented governance.",
    tags: ["Python", "Pytest", "JSON Schema", "GitHub Actions", "Observability", "Event-Driven Architecture", "Governance"],
    githubUrl: "https://github.com/P3niel/ai-observability",
    featured: true,
    flagship: true,
    domain: "AI Systems Observability",
    goal: "AI Observability",
    role: "Design, architecture, and backend development",
    timeframe: "Personal project · In progress",
    impact: [
      { label: "Kernel", value: "In-memory Kernel" },
      { label: "Functions", value: "Replay · comparison" },
      { label: "Alerts", value: "Slack / Discord" },
    ],
    problem: "Make AI agent executions inspectable, comparable, and reproducible, while keeping verifiable contracts and quality criteria.",
    solution: "A deterministic Kernel captures execution as immutable events, with replay, comparison, and anomaly detection layered on top — all governed by versioned contracts and CI checks.",
    skillsDemonstrated: ["AI Engineering", "Software Architecture", "Observability", "Governance"],
    status: "Active Development",
    architecture: `In-memory Kernel -> execution truth
Serialized payloads -> analysis and detection
Replay and comparison -> investigation
Static dashboard -> review surface`,
    decisions: [
      "Keep immutable events as the source of truth for trace reconstruction.",
      "Separate the Kernel, observability projections, and future HTTP and persistence layers.",
      "Ground every change in versioned contracts, code review, and governance rules.",
    ],
    outcomes: [
      "Kernel, replay, run comparison, and anomaly detection implemented in Python.",
      "Static dashboard and Slack or Discord alerts available as review surfaces.",
      "Contracts, architecture decisions, and validations tied to the development cycle.",
    ],
  },
  {
    slug: "neuraldbg",
    name: "NeuralDBG",
    shortDescription: "DevOps/MLOps lead on an open source causal diagnostic tool for PyTorch training.",
    description: "NeuralDBG is an open source project driven by Lambda-section that hooks into PyTorch training loops to detect anomalies — unstable gradients, saturated activations, diverging losses, or invalid data — and produce causal hypotheses. As co-founder of Lambda-section and lead on NeuralDBG, I took on the DevOps/MLOps side to make development reproducible, traceable, and better governed.",
    tags: ["DevOps", "MLOps", "CI/CD", "GitHub Actions", "Docker", "Scripting", "Git", "PyTorch", "Reproducibility", "Traceability"],
    githubUrl: "https://github.com/LambdaSection/NeuralDBG",
    featured: true,
    domain: "Open source collaboration · Lambda-section",
    goal: "Neural Debugging",
    role: "Co-founder · Lead DevOps/MLOps",
    timeframe: "Collaborative contribution",
    impact: [
      { label: "Role", value: "Lead DevOps / MLOps" },
      { label: "Priority", value: "Reproducibility" },
      { label: "Organization", value: "Lambda-section" },
    ],
    problem: "A PyTorch diagnostic tool validated across many architectures juggles dependencies, benchmarks, examples, and multiple execution paths. I took the initiative to structure its development environment to limit drift between machines, make validations replayable, control branch access by role, and keep a clean Git history.",
    solution: "Structured the project around Docker-based reproducibility, GitHub Actions CI/CD, role-based branch access, and a cleaned-up Git history so contributions stay traceable.",
    skillsDemonstrated: ["DevOps", "CI/CD", "Reproducibility", "Team Leadership"],
    status: "Active Development",
    architecture: `NeuralDBG code and dependencies
        ↓
Docker and automation scripts
        ↓
Reproducible install and validations
        ↓
CI/CD with GitHub Actions
        ↓
Role-based branch access
        ↓
Clean Git repository and traceable changes`,
    decisions: [
      "Took the lead on the DevOps/MLOps side and formalized the project's reproducibility needs.",
      "Containerized the environment with Docker and automated repetitive operations with scripts.",
      "Set up CI/CD with GitHub Actions to automatically run the project's checks and validations.",
      "Organized branch access based on roles to better govern contributions.",
      "Cleaned up the repository at the Git level and strengthened traceability of changes and validations.",
    ],
    outcomes: [
      "Docker environment and scripts enabling consistent setup across contributors.",
      "Tests, benchmarks, and validations easier to reproduce.",
      "Automated checks in CI/CD before changes are merged.",
      "Branch access structured around team responsibilities.",
      "Cleaned-up Git history and technical changes easier to audit.",
    ],
  },
  {
    slug: "devops-lab",
    name: "DevOpsLab",
    shortDescription: "Reproducible preproduction environments with Docker and Terraform.",
    description: "A personal lab dedicated to deploying Linux services, automating infrastructure, and experimenting with CI/CD pipelines.",
    tags: ["Docker", "Terraform", "Linux", "CI/CD", "DevOps"],
    featured: true,
    liveUrl: "/lab",
    domain: "Infrastructure and automation",
    goal: "DevOps Research",
    role: "Design and implementation",
    timeframe: "Personal project",
    impact: [
      { label: "Environments", value: "Preproduction" },
      { label: "Stack", value: "Docker · Terraform" },
      { label: "Target", value: "Linux services" },
    ],
    solution: "Docker and Terraform provision disposable preproduction environments, used to rehearse infrastructure changes and CI/CD patterns before they touch anything real.",
    skillsDemonstrated: ["DevOps", "Infrastructure as Code", "CI/CD"],
    status: "Prototype",
    outcomes: [
      "Set up preproduction environments.",
      "Automated infrastructure and Linux service deployment.",
      "Experimented with reproducible CI/CD practices.",
    ],
  },
  {
    slug: "portfolio",
    name: "Portfolio",
    shortDescription: "A public frontend documenting my projects, background, and way of building systems.",
    description: "This portfolio is a Next.js product built as an engineering proof point: responsive navigation, interactive terminal, structured CV, config-driven case studies, a Lab in controlled demo mode, backend-ready proxy routes, and continuous publishing with GitHub Actions and Vercel.",
    tags: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "GitHub Actions", "Vercel"],
    githubUrl: "https://github.com/P3niel/Portfolio",
    liveUrl: "/",
    featured: true,
    domain: "Frontend, platform, and developer experience",
    goal: "Public Documentation",
    role: "Full-stack design and development",
    timeframe: "Personal project · Public frontend",
    impact: [
      { label: "Surface", value: "Public on Vercel" },
      { label: "Content", value: "Config-driven" },
      { label: "Runtime", value: "Controlled demo" },
    ],
    problem: "Present backend, DevOps, and AI skills without reducing them to a technology list, while clearly distinguishing features that are actually live from infrastructure that's intentionally stopped.",
    solution: "A Next.js app with config-driven content, an interactive terminal, and proxy routes that switch cleanly between live backend data and clearly labelled demo mode.",
    skillsDemonstrated: ["Frontend Engineering", "Software Architecture", "DevOps"],
    status: "Production",
    architecture: `Visitor -> Next.js App Router
        ├──> home and interactive terminal
        ├──> CV and background
        ├──> config-driven case studies
        └──> Lab and proxy routes

GitHub Actions -> lint, types, and tests
Vercel -> PR previews and public frontend
k3s / MLflow -> IaC preserved, runtime off`,
    decisions: [
      "Centralized the CV and case studies in a typed config to avoid content drift.",
      "Kept classic navigation alongside the interactive terminal.",
      "Presented the Lab in controlled demo mode whenever the backend is intentionally offline.",
      "Kept backend workflows and manifests as reproducible proof without permanently running costly infrastructure.",
    ],
    outcomes: [
      "Responsive home page with terminal, curated project selection, and direct contact.",
      "CV, academic journey, and case studies accessible through dedicated routes.",
      "Lab able to switch between demo data and live services via configuration.",
      "GitHub Actions checks and Vercel previews on pull requests.",
    ],
  },
  {
    slug: "toxic-ai",
    name: "ToxicAI",
    shortDescription: "Analyzing AI model behavior and reliability.",
    description: "Research and development of tools analyzing AI model behavior, with a particular focus on anomaly detection and reliability evaluation.",
    tags: ["Artificial Intelligence", "NLP", "Anomaly Detection", "Reliability"],
    featured: false,
    domain: "AI Systems Evaluation",
    role: "Research and development",
    timeframe: "Personal project",
    impact: [
      { label: "Focus", value: "Anomaly detection" },
      { label: "Domain", value: "NLP" },
      { label: "Angle", value: "Model reliability" },
    ],
    solution: "Experiments in anomaly detection and evaluation criteria applied to AI model outputs, focused on identifying unreliable or toxic behavior.",
    skillsDemonstrated: ["AI Engineering", "Anomaly Detection", "Evaluation"],
    status: "Prototype",
    outcomes: [
      "Experiments around anomaly detection.",
      "Explored evaluation criteria for AI system reliability.",
    ],
  },
  {
    slug: "infra-terraform-preprod",
    name: "Infra Terraform Preprod",
    shortDescription: "A reproducible AWS preproduction environment with Terraform.",
    description: "A preproduction infrastructure designed with Terraform to automate provisioning a reproducible AWS environment. The cloud environment was intentionally disabled after the experimentation phase to control costs, while the code preserves the design and allows recreating the infrastructure in a controlled way.",
    tags: ["Terraform", "AWS", "Infrastructure as Code", "Linux", "Git", "CI/CD"],
    featured: false,
    domain: "Cloud and Infrastructure as Code",
    role: "Infrastructure design and automation",
    timeframe: "Personal project · Infrastructure disabled",
    impact: [
      { label: "IaC", value: "Terraform" },
      { label: "Cloud", value: "AWS (disabled)" },
      { label: "Constraint", value: "Cost control" },
    ],
    problem: "Have a preproduction environment close to real cloud conditions, without relying on manual configuration or permanently keeping costly AWS resources running.",
    solution: "Terraform describes the full AWS preproduction environment as code, so it can be recreated on demand and torn down afterward to avoid idle cloud cost.",
    skillsDemonstrated: ["Cloud Infrastructure", "Infrastructure as Code", "Cost Governance"],
    status: "Prototype",
    architecture: `Terraform code -> deployment plan
AWS -> preproduction environment
Infrastructure validation
Resource teardown -> cost control`,
    decisions: [
      "Described the environment as code so it can be reproduced and evolved.",
      "Separated infrastructure design from its runtime state in the cloud.",
      "Disabled the environment after validation to avoid permanent AWS costs.",
    ],
    outcomes: [
      "Hands-on practice with cloud provisioning using Terraform.",
      "Environment recreatable from code rather than manual configuration.",
      "Cost treated as an operating constraint of the infrastructure.",
    ],
  },
  {
    slug: "sentinelops",
    name: "SentinelOps",
    shortDescription: "Standalone local monitoring with anomaly detection, SMTP alerts, and HTML reports.",
    description: "SentinelOps is a local system monitoring application designed to stay simple to deploy and self-contained. It collects CPU, memory, and storage signals, exposes their state through a Flask API and a web interface, detects anomalies, keeps an event history, generates HTML reports, and can send email alerts. The project runs locally, but no public instance is currently maintained to reduce hosting costs.",
    tags: ["Python 3.12", "Flask", "psutil", "SMTP", "Docker Compose", "GitHub Actions", "Tailwind CSS"],
    githubUrl: "https://github.com/P3niel/sentinelops",
    featured: false,
    domain: "System monitoring and automation",
    role: "Full-stack design and development",
    timeframe: "Personal project · Public deployment disabled",
    impact: [
      { label: "Signals", value: "CPU · RAM · Storage" },
      { label: "Exposure", value: "API + Web interface" },
      { label: "Status", value: "Local · Not hosted" },
    ],
    problem: "Monitor a local machine without deploying a heavy observability platform: quickly spot CPU, memory, or storage saturation, notify the administrator, and keep an actionable trace for diagnosis or audit.",
    solution: "psutil collects system signals, a Flask API and web UI expose them, and a detection engine triggers SMTP alerts and HTML reports when thresholds are crossed.",
    skillsDemonstrated: ["Full-Stack Development", "Observability", "Automation"],
    status: "MVP",
    architecture: `psutil -> collects CPU, RAM, and storage
        ↓
Flask -> status API and web interface
        ↓
Detection engine -> anomalies and events
        ├──> SMTP -> email notification
        └──> HTML -> actionable report

Docker Compose -> reproducible local environment
GitHub Actions -> automated checks`,
    decisions: [
      "Used psutil to collect system signals locally without relying on an external agent.",
      "Separated observation, detection, response, and report generation behind dedicated Flask routes.",
      "Used SMTP configured through environment variables to keep secrets out of the code.",
      "Containerized the app with Docker Compose and provided a reproducible launch via Make.",
      "Automated project checks with GitHub Actions.",
    ],
    outcomes: [
      "API covering system status, detection, response, event history, and report generation.",
      "Web interface dedicated to reviewing local state and triggering a test alert.",
      "Configurable SMTP notifications when a critical threshold is detected.",
      "HTML reports usable as a diagnostic history and incident proof.",
      "Reproducible local environment with Docker Compose and a GitHub Actions pipeline.",
      "Public deployment intentionally disabled to avoid permanent infrastructure costs.",
    ],
  },
];

// Archived concept studies kept out of the rendered portfolio.
export const archivedProjectDrafts: Project[] = [
  {
    slug: "mlops-platform",
    name: "MLOps Platform",
    shortDescription: "A complete MLOps platform deployed on k3s with automated CI/CD.",
    description: `DevOps/MLOps platform deployed on a VPS (Hetzner) with k3s.
Includes a FastAPI ML API, MLflow for experiment tracking,
an automated data pipeline, and Prometheus/Grafana monitoring.`,
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
