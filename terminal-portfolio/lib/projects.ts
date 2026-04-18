export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  metrics: { requests: string; latency: string; uptime: string; errors: string };
  architecture: string;
  github: string;
};

export const projects: Project[] = [
  {
    id: "toxic-ai",
    title: "toxic-ai",
    tagline: "Real-time toxic comment classifier",
    description:
      "FastAPI microservice serving a PyTorch classifier trained on the Jigsaw dataset. Shipped with Docker + GitHub Actions, scraped by Prometheus.",
    tags: ["FastAPI", "PyTorch", "Docker", "MLflow", "GH Actions"],
    metrics: { requests: "12,480", latency: "120 ms", uptime: "99.94%", errors: "0.2%" },
    architecture: `ingress ──▶ fastapi ──▶ torchserve ──▶ postgres
              │              │
              └──▶ prometheus ◀── grafana`,
    github: "github.com/peniel/toxic-ai",
  },
  {
    id: "fraud-detection",
    title: "fraud-detection",
    tagline: "Streaming fraud detection pipeline",
    description:
      "Kafka + Spark Structured Streaming. XGBoost model re-trained nightly with Airflow, served via BentoML. Infra as code with Terraform.",
    tags: ["Kafka", "Spark", "XGBoost", "Airflow", "Terraform"],
    metrics: { requests: "4.2M/day", latency: "38 ms", uptime: "99.99%", errors: "0.04%" },
    architecture: `events ─▶ kafka ─▶ spark-streaming ─▶ xgboost
                     │
                     └─▶ feature-store ─▶ s3`,
    github: "github.com/peniel/fraud-detection",
  },
  {
    id: "air-quality",
    title: "air-quality",
    tagline: "IoT air-quality forecasting",
    description:
      "LSTM forecaster with geospatial features. Edge inference on Raspberry Pi clusters via k3s; Grafana dashboards surface trends to stakeholders.",
    tags: ["TensorFlow", "MQTT", "Grafana", "K3s", "Helm"],
    metrics: { requests: "820/min", latency: "64 ms", uptime: "99.7%", errors: "0.1%" },
    architecture: `sensors ─▶ mqtt ─▶ k3s-edge ─▶ lstm
                    │
                    └─▶ influxdb ─▶ grafana`,
    github: "github.com/peniel/air-quality",
  },
];

export const projectsById = Object.fromEntries(projects.map((p) => [p.id, p]));

export const skills = {
  infra: ["kubernetes", "terraform", "aws", "gcp", "helm", "argo-cd"],
  mlops: ["mlflow", "kubeflow", "airflow", "dvc", "bentoml", "feast"],
  languages: ["python", "go", "bash", "typescript"],
  observe: ["prometheus", "grafana", "loki", "opentelemetry"],
};

export const bootLines = [
  "> booting system...",
  "> loading modules... [kubernetes, prometheus, mlflow]",
  "> initializing DevOps environment...",
  "> connecting to ML services... ok",
  "> welcome to peniel.dev",
];

export function mockToxicScore(text: string): number {
  const base = (text.length % 10) / 10;
  const jitter = Math.random() * 0.4;
  return Math.min(0.99, Math.max(0.05, base + jitter));
}
