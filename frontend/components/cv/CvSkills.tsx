import type { Skill } from "@/lib/config";

export default function CvSkills({ skills }: { skills: Skill[] }) {
  return (
    <section className="mb-10">
      <h2 className="text-xs font-medium text-accent tracking-widest uppercase mb-6">
        <span className="text-ink-3">#</span> Compétences
      </h2>
      <div className="space-y-4">
        {skills.map((group) => (
          <div key={group.category} className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <span className="text-ink-3 text-xs w-28 shrink-0">{group.category}</span>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="px-2 py-0.5 rounded text-xs border border-rule text-ink-2 hover:border-accent hover:text-accent transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
