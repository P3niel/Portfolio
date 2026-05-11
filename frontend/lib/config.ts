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
  name: "Peniel Mams",
  title: "DevOps / MLOps Engineer",
  tagline: "Building reproducible, observable, automated ML systems.",
  contact: {
    email: "mamsbruce@gmail.com",
    github: "https://github.com/peniel",
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
    githubUrl: "https://github.com/peniel/mlops-platform",
    liveUrl: "/lab",
    featured: true,
  },
];

// ─── Lab / Live Config ────────────────────────────────────────────────────────

export const labConfig: LabConfig = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000",
  mlflowUrl: process.env.NEXT_PUBLIC_MLFLOW_URL ?? "http://localhost:5000",
  grafanaUrl: process.env.NEXT_PUBLIC_GRAFANA_URL ?? "http://localhost:3001",
  lokiUrl: process.env.NEXT_PUBLIC_LOKI_URL ?? "http://localhost:3100",
};
