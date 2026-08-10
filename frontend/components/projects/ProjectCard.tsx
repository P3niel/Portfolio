import Link from "next/link";
import type { Project } from "@/lib/config";
import TagBadge from "./TagBadge";

const statusClass: Record<string, string> = {
  Production: "status-production",
  "Active Development": "status-active",
  MVP: "status-mvp",
  Prototype: "status-prototype",
};

export default function ProjectCard({ project }: { project: Project }) {
  const href = `/projects/${project.slug}`;

  return (
    <article className="group flex h-full min-w-0 flex-col border border-rule bg-surface/40 transition-colors hover:border-accent/40 hover:bg-accent-soft">
      <Link href={href} className="flex flex-1 flex-col p-5">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
              {project.domain ?? "case study"}
            </p>
            <h3 className="text-base font-semibold text-ink transition-colors group-hover:text-accent">
              {project.name}
            </h3>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            {(project.flagship || project.featured) && (
              <span className="border border-accent/30 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
                {project.flagship ? "flagship" : "featured"}
              </span>
            )}
            {project.status && (
              <span className={`status-pill ${statusClass[project.status] ?? ""}`}>{project.status}</span>
            )}
          </div>
        </div>

        <div className="mb-4 space-y-3 text-sm leading-6 text-ink-2">
          <div>
            <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent"># problem</p>
            <p>{project.problem ?? project.shortDescription}</p>
          </div>
          {project.solution && (
            <div>
              <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent"># solution</p>
              <p>{project.solution}</p>
            </div>
          )}
        </div>

        {project.skillsDemonstrated && project.skillsDemonstrated.length > 0 && (
          <div className="mb-4">
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

        <div className="mb-2 flex flex-wrap gap-2">
          {project.tags.slice(0, 5).map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
          {project.tags.length > 5 && (
            <span className="text-ink-3 text-xs">+{project.tags.length - 5}</span>
          )}
        </div>

        <div className="mt-auto grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-end gap-3 pt-4 font-mono text-xs">
          <span className="min-w-0 break-words leading-5 text-ink-3">{project.role ?? "technical case study"}</span>
          <span className="shrink-0 text-accent transition-transform group-hover:translate-x-1">case study -&gt;</span>
        </div>
      </Link>

      {(project.githubUrl || project.liveUrl) && (
        <div className="flex flex-wrap gap-4 border-t border-rule px-5 py-3 font-mono text-xs">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-3 transition-colors hover:text-accent"
            >
              GitHub ↗
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} className="text-ink-3 transition-colors hover:text-accent">
              Live Demo ↗
            </a>
          )}
        </div>
      )}
    </article>
  );
}
