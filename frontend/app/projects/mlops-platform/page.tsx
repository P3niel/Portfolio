import Link from "next/link";
import { projects, cv } from "@/lib/config";
import TagBadge from "@/components/projects/TagBadge";

export const metadata = {
  title: "MLOps Platform — Peniel Mams",
  description: "Plateforme MLOps complète déployée sur k3s : FastAPI, MLflow, CI/CD, Prometheus/Grafana.",
};

const ASCII_ARCH = `
  ┌─────────────────────────────────────────────┐
  │              GitHub Actions CI/CD            │
  │   lint → test → docker build → k8s deploy   │
  └──────────────────┬──────────────────────────┘
                     │
  ┌──────────────────▼──────────────────────────┐
  │           k3s Cluster (VPS)                 │
  │                                             │
  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
  │  │ FastAPI  │  │  MLflow  │  │Prometheus│  │
  │  │ /predict │  │ registry │  │ + Grafana│  │
  │  └──────────┘  └──────────┘  └──────────┘  │
  │                                             │
  │  ┌──────────────────────────────────────┐   │
  │  │  CronJob: data pipeline (2h daily)   │   │
  │  └──────────────────────────────────────┘   │
  └─────────────────────────────────────────────┘
                     │
  ┌──────────────────▼──────────────────────────┐
  │         Portfolio (Vercel)                  │
  │   /  /cv  /projects  /lab (live metrics)    │
  └─────────────────────────────────────────────┘
`;

export default function MlOpsPlatformPage() {
  const project = projects.find((p) => p.slug === "mlops-platform");
  const linkedExp = project?.experienceId
    ? cv.experiences.find((e) => e.id === project.experienceId)
    : null;

  if (!project) return <p className="p-24 text-ink-2">Projet introuvable.</p>;

  return (
    <div className="min-h-screen px-6 py-24">
      <div className="max-w-2xl mx-auto">

        {/* Breadcrumb */}
        <nav className="text-xs text-ink-3 mb-8">
          <Link href="/projects" className="hover:text-accent transition-colors">projets</Link>
          {" / "}
          <span className="text-ink-2">{project.name}</span>
        </nav>

        {/* Hero */}
        <header className="mb-10">
          <h1 className="text-2xl font-bold text-ink mb-3">{project.name}</h1>
          <p className="text-ink-2 text-sm leading-relaxed mb-5">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        </header>

        {/* Contexte — lien vers expérience CV */}
        {linkedExp && (
          <section className="mb-10 p-4 rounded border border-accent/20 bg-accent-soft">
            <h2 className="text-xs font-medium text-accent tracking-widest uppercase mb-3">
              Contexte
            </h2>
            <p className="text-ink-2 text-xs leading-relaxed mb-3">
              Ce projet découle directement de l&apos;expérience{" "}
              <strong className="text-ink">{linkedExp.role}</strong> chez{" "}
              <strong className="text-ink">{linkedExp.company}</strong>{" "}
              ({linkedExp.period}).
            </p>
            <Link
              href="/cv"
              className="text-xs text-accent hover:underline underline-offset-4"
            >
              → Voir cette expérience dans le CV
            </Link>
          </section>
        )}

        {/* Architecture */}
        <section className="mb-10">
          <h2 className="text-xs font-medium text-accent tracking-widest uppercase mb-4">
            <span className="text-ink-3">#</span> Architecture
          </h2>
          <pre className="text-ink-3 text-xs leading-snug overflow-x-auto rounded border border-rule p-4 bg-surface">
            {ASCII_ARCH}
          </pre>
        </section>

        {/* Stack détaillé */}
        <section className="mb-10">
          <h2 className="text-xs font-medium text-accent tracking-widest uppercase mb-4">
            <span className="text-ink-3">#</span> Stack technique
          </h2>
          <div className="space-y-3 text-xs text-ink-2">
            {[
              ["API ML", "FastAPI + scikit-learn, endpoint /predict /health /metrics"],
              ["MLflow", "Tracking expériences, model registry, stages Staging/Production"],
              ["Kubernetes", "k3s sur VPS Hetzner CX22, Kustomize base/overlays"],
              ["CI/CD", "GitHub Actions : lint → test → docker build → k8s deploy"],
              ["Monitoring", "Prometheus scrape /metrics, Grafana dashboards latence/erreurs"],
              ["Logs", "Loki centralisé, rétention 7 jours"],
              ["Frontend", "Next.js 15 App Router déployé sur Vercel"],
            ].map(([label, desc]) => (
              <div key={label} className="flex gap-4">
                <span className="text-ink-3 w-24 shrink-0">{label}</span>
                <span>{desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Liens */}
        <section className="flex flex-wrap gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded border border-rule text-ink-2 text-xs hover:border-accent hover:text-accent transition-colors"
            >
              → GitHub
            </a>
          )}
          <Link
            href="/lab"
            className="px-4 py-2 rounded border border-accent text-accent text-xs hover:bg-accent hover:text-bg transition-colors font-medium"
          >
            → Lab (statut live)
          </Link>
        </section>

      </div>
    </div>
  );
}
