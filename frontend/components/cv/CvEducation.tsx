import type { Education } from "@/lib/config";

export default function CvEducation({ education }: { education: Education[] }) {
  return (
    <section className="mb-10">
      <h2 className="text-xs font-medium text-accent tracking-widest uppercase mb-6">
        <span className="text-ink-3">#</span> Formation
      </h2>
      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu.degree} className="flex flex-col sm:flex-row justify-between gap-1">
            <div>
              <p className="text-sm text-ink">{edu.degree}</p>
              <p className="text-ink-2 text-xs">{edu.institution}</p>
            </div>
            <span className="text-ink-3 text-xs shrink-0">{edu.year}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
