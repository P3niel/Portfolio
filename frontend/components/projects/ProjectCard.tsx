import Link from "next/link";
import type { Project } from "@/lib/config";
import TagBadge from "./TagBadge";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block p-5 rounded border border-rule hover:border-accent/40 bg-surface/50 transition-colors group"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-sm font-medium text-ink group-hover:text-accent transition-colors">
          {project.name}
        </h3>
        {project.featured && (
          <span className="text-accent text-xs shrink-0">★ featured</span>
        )}
      </div>
      <p className="text-ink-2 text-xs leading-relaxed mb-4">
        {project.shortDescription}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.slice(0, 5).map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
        {project.tags.length > 5 && (
          <span className="text-ink-3 text-xs">+{project.tags.length - 5}</span>
        )}
      </div>
    </Link>
  );
}
