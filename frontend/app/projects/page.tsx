import { projects } from "@/lib/config";
import Nav from "@/components/Nav";
import ProjectCard from "@/components/projects/ProjectCard";

export const metadata = {
  title: "Projets — Peniel Mams",
  description: "Projets DevOps/MLOps : plateforme ML, CI/CD, Kubernetes.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen px-6 py-24">
      <Nav />
      <div className="max-w-2xl mx-auto">
        <header className="mb-10">
          <p className="text-accent text-xs mb-2">
            <span className="text-ink-3">~/</span>projects
          </p>
          <h1 className="text-2xl font-bold text-ink mb-2">Projets</h1>
          <p className="text-ink-2 text-sm">
            Réalisations concrètes liées aux expériences du CV.
          </p>
        </header>

        <div className="space-y-4">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {projects.length === 0 && (
          <p className="text-ink-3 text-sm">Aucun projet pour l&apos;instant.</p>
        )}
      </div>
    </div>
  );
}
