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

export interface LabConfig {
  apiUrl: string;
  mlflowUrl: string;
  grafanaUrl: string;
  lokiUrl: string;
}

// ─── CV Data ──────────────────────────────────────────────────────────────────

export const cv = {
  name: "Peniel Teko-Agbo",
  title: "DevOps / MLOps Engineer",
  tagline: "Building reproducible, observable, automated ML systems.",
  contact: {
    email: "mamsbruce@gmail.com",
    github: "https://github.com/P3niel",
    linkedin: "https://linkedin.com/in/peniel-mams",
    location: "Paris, France",
  },
  experiences: [
    {
      id: "exp-mlops-2024",
      role: "MLOps Engineer",
      company: "Projet Personnel",
      period: "2024 — présent",
      description: [
        "Conception et déploiement d'une plateforme MLOps complète sur VPS (k3s)",
        "Pipeline CI/CD automatisé avec GitHub Actions : lint, tests, build Docker, déploiement Kubernetes",
        "Monitoring Prometheus + Grafana avec dashboards latence, error rate et version modèle",
        "Automatisation de la promotion de modèles MLflow basée sur les métriques de performance",
      ],
      projectSlug: "mlops-platform",
    },
    {
      id: "exp-devops-2023",
      role: "Ingénieur DevOps",
      company: "Expérience professionnelle",
      period: "2023 — 2024",
      description: [
        "Infrastructure as Code avec Terraform et Kubernetes",
        "Mise en place de pipelines CI/CD robustes",
        "Observabilité et monitoring des systèmes en production",
      ],
    },
  ] satisfies Experience[],

  skills: [
    {
      category: "Infrastructure",
      items: ["Kubernetes (k3s)", "Docker", "Terraform", "Linux", "Traefik"],
    },
    {
      category: "MLOps",
      items: ["MLflow", "FastAPI", "scikit-learn", "Prometheus", "Grafana"],
    },
    {
      category: "CI/CD",
      items: ["GitHub Actions", "Docker Registry (GHCR)", "Kustomize"],
    },
    {
      category: "Langages",
      items: ["Python", "TypeScript", "Bash", "YAML"],
    },
    {
      category: "Frontend",
      items: ["Next.js 15", "React 19", "Tailwind CSS"],
    },
  ] satisfies Skill[],

  education: [
    {
      degree: "Master — Data Science / IA",
      institution: "Université (placeholder)",
      year: "2023",
    },
    {
      degree: "Licence — Informatique",
      institution: "Université (placeholder)",
      year: "2021",
    },
  ] satisfies Education[],
};

// ─── Projects ─────────────────────────────────────────────────────────────────

export const projects: Project[] = [
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
