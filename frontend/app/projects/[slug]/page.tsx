import { notFound } from "next/navigation";
import { projects } from "@/lib/config";
import ProjectCaseStudy from "@/components/projects/ProjectCaseStudy";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "Projet introuvable - Peniel Teko-Agbo",
    };
  }

  return {
    title: `${project.name} - Peniel Teko-Agbo`,
    description: project.shortDescription,
  };
}

export default async function ProjectCaseStudyPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return <ProjectCaseStudy project={project} />;
}
