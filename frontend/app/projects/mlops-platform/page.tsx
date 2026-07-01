import { cv, projects } from "@/lib/config";
import ProjectCaseStudy from "@/components/projects/ProjectCaseStudy";

export const metadata = {
  title: "MLOps Platform - Peniel Teko-Agbo",
  description: "Plateforme MLOps complete deployee sur k3s : FastAPI, MLflow, CI/CD, Prometheus/Grafana.",
};

export default function MlOpsPlatformPage() {
  const project = projects.find((item) => item.slug === "mlops-platform");
  const linkedExperience = project?.experienceId
    ? cv.experiences.find((experience) => experience.id === project.experienceId)
    : null;

  if (!project) {
    return <p className="p-24 text-ink-2">Projet introuvable.</p>;
  }

  return <ProjectCaseStudy project={project} linkedExperience={linkedExperience} />;
}
