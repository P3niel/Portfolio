import Link from "next/link";
import type { Experience, Project } from "@/lib/config";
import TagBadge from "./TagBadge";

type ProjectCaseStudyProps = {
  project: Project;
  linkedExperience?: Experience | null;
};

const statusClass: Record<string, string> = {
  Production: "status-production",
  "Active Development": "status-active",
  MVP: "status-mvp",
  Prototype: "status-prototype",
};

export default function ProjectCaseStudy({ project, linkedExperience }: ProjectCaseStudyProps) {
  return (
    <main className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-5 font-mono text-xs text-ink-3">
          <Link href="/projects" className="hover:text-accent transition-colors">
            projects
          </Link>
          {" / "}
          <span className="text-ink-2">{project.name}</span>
        </nav>

        <header className="mb-4 grid gap-4 border border-rule bg-surface/40 p-5 lg:grid-cols-[1fr_340px]">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
              {project.domain && <span>{project.domain}</span>}
              {project.timeframe && <span className="text-accent">/ {project.timeframe}</span>}
              {project.status && (
                <span className={`status-pill ${statusClass[project.status] ?? ""}`}>{project.status}</span>
              )}
            </div>
            <h1 className="mb-3 text-3xl font-bold text-ink">{project.name}</h1>
            <p className="max-w-3xl text-sm leading-6 text-ink-2">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
            {project.skillsDemonstrated && project.skillsDemonstrated.length > 0 && (
              <div className="mt-4">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">skills demonstrated</p>
                <div className="flex flex-wrap gap-2">
                  {project.skillsDemonstrated.map((skill) => (
                    <span key={skill} className="border border-accent/25 bg-accent-soft px-2 py-0.5 font-mono text-xs text-accent">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {project.impact && project.impact.length > 0 && (
            <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
              {project.impact.map((item) => (
                <div key={item.label} className="border border-rule bg-bg/30 px-3 py-2">
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3">
                    {item.label}
                  </p>
                  <p className="text-xs font-semibold text-accent">{item.value}</p>
                </div>
              ))}
            </div>
          )}
        </header>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
          <section className="border border-rule bg-surface/20 p-4">
            {project.problem && (
              <article className="mb-4">
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.16em] text-accent">
                  # problem
                </p>
                <p className="text-sm leading-6 text-ink-2">{project.problem}</p>
              </article>
            )}

            {project.solution && (
              <article className="mb-4">
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.16em] text-accent">
                  # solution
                </p>
                <p className="text-sm leading-6 text-ink-2">{project.solution}</p>
              </article>
            )}

            {project.architecture && (
              <article>
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.16em] text-accent">
                  # architecture
                </p>
                <pre className="overflow-x-auto border border-rule bg-bg p-4 text-xs leading-5 text-ink-3">{project.architecture}</pre>
              </article>
            )}
          </section>

          <aside className="grid gap-4">
            <section className="border border-rule bg-surface/20 p-4">
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.16em] text-accent">
                # role
              </p>
              <p className="text-sm leading-6 text-ink-2">{project.role ?? "Technical case study"}</p>
              {linkedExperience && (
                <p className="mt-3 border-t border-rule pt-3 text-xs leading-5 text-ink-3">
                  Linked to {linkedExperience.role}, {linkedExperience.company} ({linkedExperience.period}).
                </p>
              )}
            </section>

            {project.decisions && project.decisions.length > 0 && (
              <section className="border border-rule bg-surface/20 p-4">
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.16em] text-accent">
                  # decisions
                </p>
                <ul className="space-y-2 text-sm leading-5 text-ink-2">
                  {project.decisions.map((decision) => (
                    <li key={decision} className="border-l border-accent/40 pl-3">
                      {decision}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.outcomes && project.outcomes.length > 0 && (
              <section className="border border-rule bg-surface/20 p-4">
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.16em] text-accent">
                  # proof
                </p>
                <ul className="space-y-2 text-sm leading-5 text-ink-2">
                  {project.outcomes.map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>
              </section>
            )}
          </aside>
        </div>

        <section className="mt-4 flex flex-wrap gap-3 border border-rule bg-surface/20 p-4">
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              className="border border-accent px-4 py-2 font-mono text-xs font-medium text-accent transition-colors hover:bg-accent hover:text-bg"
            >
              Open live surface
            </Link>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-rule px-4 py-2 font-mono text-xs text-ink-2 transition-colors hover:border-accent hover:text-accent"
            >
              View source
            </a>
          )}
          <Link
            href="/#contact"
            className="border border-rule px-4 py-2 font-mono text-xs text-ink-2 transition-colors hover:border-accent hover:text-accent"
          >
            Discuss similar work
          </Link>
        </section>
      </div>
    </main>
  );
}
