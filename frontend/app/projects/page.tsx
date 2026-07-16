import { projects } from "@/lib/config";
import Nav from "@/components/Nav";
import ProjectCard from "@/components/projects/ProjectCard";

export const metadata = {
  title: "Projets — Peniel Teko-Agbo",
  description: "Études de cas en backend, DevOps et observabilité des systèmes IA.",
};

export default function ProjectsPage() {
  const featuredProjects = projects.filter((project) => project.featured).length;

  return (
    <div className="min-h-screen px-6 py-24">
      <Nav />
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 border border-rule bg-surface/40 p-6">
          <p className="mb-3 font-mono text-xs text-accent">
            <span className="text-ink-3">~/</span>projects
          </p>
          <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-end">
            <div>
              <h1 className="mb-4 text-3xl font-bold text-ink">Production-shaped case studies</h1>
              <p className="max-w-2xl text-sm leading-7 text-ink-2">
                Systems framed around constraints, architecture choices, operational signals, and proof points.
                The goal is not to show isolated demos, but the path from model or service idea to something a team can run.
              </p>
            </div>
            <div className="grid grid-cols-3 border border-rule font-mono text-xs">
              <div className="border-r border-rule p-3">
                <p className="mb-1 text-ink-3">CASES</p>
                <p className="text-accent">{projects.length}</p>
              </div>
              <div className="border-r border-rule p-3">
                <p className="mb-1 text-ink-3">FEATURED</p>
                <p className="text-accent">{featuredProjects}</p>
              </div>
              <div className="p-3">
                <p className="mb-1 text-ink-3">FOCUS</p>
                <p className="text-accent">SYSTEMS</p>
              </div>
            </div>
          </div>
        </header>

        <div className="mb-8 grid gap-4 border border-rule bg-surface/20 p-4 text-xs text-ink-2 md:grid-cols-3">
          <div>
            <p className="mb-2 font-mono uppercase tracking-[0.14em] text-accent">What to inspect</p>
            <p className="leading-6">Problem framing, runtime architecture, deploy path, and operational visibility.</p>
          </div>
          <div>
            <p className="mb-2 font-mono uppercase tracking-[0.14em] text-accent">What it proves</p>
            <p className="leading-6">Backend, DevOps and AI-observability judgment beyond a landing page or static GitHub README.</p>
          </div>
          <div>
            <p className="mb-2 font-mono uppercase tracking-[0.14em] text-accent">Best entry</p>
            <p className="leading-6">Start with AI-Obs for the contract-first engineering story, then inspect the lab surface.</p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <section className="mt-10 flex flex-wrap items-center justify-between gap-4 border border-accent/30 bg-accent-soft p-5">
          <div>
            <p className="mb-1 font-mono text-xs uppercase tracking-[0.14em] text-accent">next action</p>
            <p className="text-sm text-ink-2">
              Need a shorter view? The lab exposes runtime-style signals without reading every case study.
            </p>
          </div>
          <a
            href="/lab"
            className="border border-accent px-4 py-2 font-mono text-xs text-accent transition-colors hover:bg-accent hover:text-bg"
          >
            open lab -&gt;
          </a>
        </section>

        {projects.length === 0 && (
          <p className="text-sm text-ink-3">Aucun projet pour l&apos;instant.</p>
        )}
      </div>
    </div>
  );
}
