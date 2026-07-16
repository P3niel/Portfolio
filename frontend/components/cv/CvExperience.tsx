import Link from "next/link";
import type { Experience } from "@/lib/config";

export default function CvExperience({ experiences }: { experiences: Experience[] }) {
  return (
    <section className="mb-10">
      <h2 className="text-xs font-medium text-accent tracking-widest uppercase mb-6">
        <span className="text-ink-3">#</span> Expériences
      </h2>
      <div className="space-y-8">
        {experiences.map((exp) => (
          <div key={exp.id} className="group">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 mb-2">
              <div>
                <h3 className="text-sm font-medium text-ink">{exp.role}</h3>
                <p className="text-ink-2 text-xs">{exp.company}</p>
              </div>
              <span className="text-ink-3 text-xs shrink-0">{exp.period}</span>
            </div>
            <ul className="space-y-1 mb-3">
              {exp.description.map((line, i) => (
                <li key={i} className="text-ink-2 text-xs leading-relaxed before:content-['›'] before:text-accent before:mr-2">
                  {line}
                </li>
              ))}
            </ul>
            {exp.projectSlug && (
              <Link
                href={`/projects/${exp.projectSlug}`}
                className="inline-flex items-center gap-1 text-xs text-accent hover:underline underline-offset-4"
              >
                → Voir l’étude de cas associée
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
