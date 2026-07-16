import Link from "next/link";
import type { Project } from "@/lib/config";
import TagBadge from "./TagBadge";

export default function ProjectCard({ project }: { project: Project }) {
  const href = `/projects/${project.slug}`;
  const topSignals = project.impact?.slice(0, 2) ?? [];

  return (
    <Link
      href={href}
      className="group flex h-full min-w-0 flex-col border border-rule bg-surface/40 p-5 transition-colors hover:border-accent/40 hover:bg-accent-soft"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
            {project.domain ?? "case study"}
          </p>
          <h3 className="text-base font-semibold text-ink transition-colors group-hover:text-accent">
            {project.name}
          </h3>
        </div>
        {(project.flagship || project.featured) && (
          <span className="shrink-0 border border-accent/30 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
            {project.flagship ? "projet phare" : "featured"}
          </span>
        )}
      </div>

      <p className="mb-5 text-sm leading-6 text-ink-2">
        {project.shortDescription}
      </p>

      {topSignals.length > 0 && (
        <div className="mb-5 grid gap-2 sm:grid-cols-2">
          {topSignals.map((signal) => (
            <div key={signal.label} className="border border-rule px-3 py-2">
              <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3">
                {signal.label}
              </p>
              <p className="text-xs font-medium text-accent">{signal.value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mb-5 flex flex-wrap gap-2">
        {project.tags.slice(0, 5).map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
        {project.tags.length > 5 && (
          <span className="text-ink-3 text-xs">+{project.tags.length - 5}</span>
        )}
      </div>

      <div className="mt-auto grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-end gap-3 border-t border-rule pt-4 font-mono text-xs">
        <span className="min-w-0 break-words leading-5 text-ink-3">{project.role ?? "technical case study"}</span>
        <span className="shrink-0 text-accent transition-transform group-hover:translate-x-1">open -&gt;</span>
      </div>
    </Link>
  );
}
