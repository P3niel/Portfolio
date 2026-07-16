import type { AcademicJourneyStep } from "@/lib/config";

export default function CvAcademicJourney({ steps }: { steps: AcademicJourneyStep[] }) {
  return (
    <section className="mb-10">
      <h2 className="mb-6 text-xs font-medium uppercase tracking-widest text-accent">
        <span className="text-ink-3">#</span> Parcours académique
      </h2>
      <ol className="border-l border-rule pl-5">
        {steps.map((step) => (
          <li key={`${step.period}-${step.title}`} className="relative pb-6 last:pb-0">
            <span className="absolute -left-[1.47rem] top-1.5 h-2 w-2 border border-accent bg-bg" aria-hidden="true" />
            <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.12em] text-accent">{step.period}</p>
            <h3 className="mb-1 text-sm font-medium text-ink">{step.title}</h3>
            <p className="text-xs leading-relaxed text-ink-2">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
