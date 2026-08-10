import Link from "next/link";
import Nav from "@/components/Nav";

export const metadata = {
  title: "AI-Obs — AI Observability Platform",
  description: "Observability for AI systems. From execution to understanding.",
};

const features = [
  ["Kernel Runtime", "Deterministic capture of steps, observations, and evaluations."],
  ["Replay", "Reconstructing an immutable timeline from a run."],
  ["Run Comparison", "Comparing durations, steps, observations, and evaluations."],
  ["Anomaly Detection", "Detecting slow, stuck, failed, or inconsistent runs."],
  ["Static Dashboard", "Exploring embedded Kernel payloads in a static interface."],
  ["Governance", "Versioned contracts, manifests, and integration validation."],
];

const architecture = ["Agent or Test", "In-Memory Kernel", "Serialized Run", "Analysis Helpers", "Static Dashboard"];
const timeline = ["Run started", "Prompt received", "Memory Read", "Tool Call", "Tool Result", "Model Call", "Model Response", "Run Completed"];
const metrics = ["Run Duration", "Failure Rate", "Tool Calls", "Memory Reads", "Latency", "Token Usage", "Gap Score"];
const governance = ["Kernel Specification", "Event Schema", "Metric Dictionary", "Instrumentation Contract", "Governance Rules", "Gap Reports", "Architecture Decisions (ADR)"];
const learnings = ["Event-Driven Architecture", "API Design", "Backend Engineering", "Observability", "Software Architecture", "DevOps", "CI/CD", "Testing", "Documentation", "Technical Governance"];
const workflowSteps = ["Idea", "Specification", "Ticket", "Implementation", "Review", "Validation", "Documentation", "Release"];
const engineeringMetrics = [
  ["Architecture Decisions", "2"],
  ["Versioned Contracts", "14"],
  ["Task Artifacts", "84"],
  ["Backend Modules", "14"],
  ["Test Files", "18"],
];

function SectionTitle({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em]">
      <span className="text-ink-3">/{index}</span>
      <h2 className="text-accent">{children}</h2>
      <span className="h-px flex-1 bg-rule" />
    </div>
  );
}

export default function AiObsPage() {
  return (
    <main className="min-h-screen px-6 py-20">
      <Nav />
      <div className="mx-auto max-w-6xl">
        <Link href="/projects" className="mb-6 inline-block font-mono text-xs text-ink-3 transition-colors hover:text-accent">← projects</Link>

        <header className="mb-5 border border-rule bg-surface/40 p-6 md:p-8">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">AI Observability Platform</p>
          <h1 className="mb-3 text-4xl font-bold text-ink md:text-6xl">AI-Obs</h1>
          <p className="mb-5 text-lg text-ink-2">Observability for AI Systems. From execution to understanding.</p>
          <p className="max-w-4xl text-sm leading-7 text-ink-2">AI-Obs is a governed prototype designed to make AI agent executions inspectable, comparable, and reproducible. Its Kernel records execution facts, then dedicated modules produce analyses, alerts, replay, and comparisons.</p>
          <div className="mt-6 flex flex-wrap gap-2">{["Python", "Pytest", "Mypy", "JSON Schema", "HTML/CSS/JS", "GitHub Actions"].map((tech) => <span key={tech} className="border border-rule px-3 py-1 font-mono text-xs text-ink-2">{tech}</span>)}</div>
        </header>

        <section className="mb-5 grid gap-5 border border-rule bg-surface/20 p-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionTitle index="01">Vision</SectionTitle>
            <p className="mb-4 text-sm leading-6 text-ink-2">AI systems are becoming more autonomous, but how they operate often stays opaque. AI-Obs carries over the principles of distributed systems — logs, traces, and metrics — to AI agents.</p>
            <ul className="grid grid-cols-2 gap-2 text-xs text-ink-2">{["Observe every execution", "Reconstruct operational reasoning", "Measure performance", "Detect anomalies", "Ease debugging", "Provide a governance base"].map((item) => <li key={item} className="border-l border-accent/50 pl-3">{item}</li>)}</ul>
          </div>
          <div>
            <SectionTitle index="02">Architecture</SectionTitle>
            <div className="aiobs-flow">{architecture.map((node, index) => <div key={node} className="contents"><div className="aiobs-node">{node}</div>{index < architecture.length - 1 && <span className="aiobs-arrow">↓</span>}</div>)}</div>
          </div>
        </section>

        <section className="mb-5 border border-rule bg-surface/20 p-6">
          <SectionTitle index="03">Features</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{features.map(([title, text]) => <article key={title} className="border border-rule bg-bg/30 p-4 transition-colors hover:border-accent/60"><h3 className="mb-2 font-mono text-xs text-accent">{title}</h3><p className="text-xs leading-5 text-ink-2">{text}</p></article>)}</div>
        </section>

        <section className="mb-5 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="border border-rule bg-surface/20 p-6">
            <SectionTitle index="04">Example of a Run</SectionTitle>
            <ol className="aiobs-timeline">{timeline.map((event, index) => <li key={event}><span>{String(index + 1).padStart(2, "0")}</span><p>{event}</p></li>)}</ol>
          </div>
          <div className="border border-rule bg-surface/20 p-6">
            <SectionTitle index="05">Event Viewer</SectionTitle>
            <pre className="overflow-x-auto border border-rule bg-bg p-5 font-mono text-xs leading-6 text-ink-2">{`{
  "event_type": "TOOL_CALL",
  "timestamp": "2026-07-15T14:32:08Z",
  "duration_ms": 120,
  "tool": "weather_api",
  "status": "success"
}`}</pre>
          </div>
        </section>

        <section className="mb-5 border border-rule bg-surface/20 p-6">
          <SectionTitle index="06">Observed Metrics</SectionTitle>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">{metrics.map((metric) => <div key={metric} className="border border-rule bg-bg/30 p-3"><p className="mb-3 font-mono text-[10px] uppercase text-ink-3">{metric}</p><p className="font-mono text-xs text-ink-3">not computed</p></div>)}</div>
        </section>

        <section className="mb-5 grid gap-5 lg:grid-cols-2">
          <div className="border border-rule bg-surface/20 p-6"><SectionTitle index="07">Governance</SectionTitle><div className="grid gap-2 sm:grid-cols-2">{governance.map((artifact) => <div key={artifact} className="border-l border-accent/50 px-3 py-2 font-mono text-xs text-ink-2">{artifact}</div>)}</div></div>
          <div className="border border-rule bg-surface/20 p-6"><SectionTitle index="08">Roadmap</SectionTitle><div className="space-y-3 font-mono text-xs">{[["done", "Kernel Runtime"], ["done", "Event Contracts"], ["done", "Replay Engine"], ["done", "Run Comparison"], ["done", "Static Dashboard"], ["work", "HTTP API"], ["work", "Durable Persistence"], ["work", "Live Dashboard Feed"]].map(([state, item]) => <div key={item} className="flex gap-3"><span className={state === "done" ? "text-accent" : "text-ink-3"}>{state === "done" ? "✓" : "◇"}</span><span className="text-ink-2">{item}</span></div>)}</div></div>
        </section>

        <section className="mb-5 border border-rule bg-surface/20 p-6 md:p-8">
          <SectionTitle index="09">Engineering Workflow</SectionTitle>
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="mb-5 max-w-3xl text-sm leading-7 text-ink-2">AI-Obs is developed following a structured process inspired by modern software engineering practices. Every change is planned, documented, and validated before integration.</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <article className="border border-rule bg-bg/30 p-4">
                  <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-accent">Planning</h3>
                  <ul className="space-y-2 text-xs leading-5 text-ink-2">{["Product backlog", "Feature prioritization", "Breakdown into technical tasks", "Defined goals for each cycle"].map((item) => <li key={item} className="border-l border-accent/50 pl-3">{item}</li>)}</ul>
                </article>
                <article className="border border-rule bg-bg/30 p-4">
                  <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-accent">Ticketing</h3>
                  <p className="mb-3 text-xs leading-5 text-ink-2">Every change is tracked through a dedicated ticket to ensure decision traceability and controlled progress.</p>
                  <p className="font-mono text-[10px] leading-5 text-ink-3">OBJECTIVE · SCOPE · ACCEPTANCE CRITERIA · DELIVERABLES · STATUS</p>
                </article>
                <article className="border border-rule bg-bg/30 p-4">
                  <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-accent">Architecture & Documentation</h3>
                  <p className="mb-3 text-xs leading-5 text-ink-2">Design is documented before any significant implementation.</p>
                  <p className="font-mono text-[10px] leading-5 text-ink-3">ADR · SPECIFICATIONS · CONTRACTS · GAP REPORTS · TECHNICAL DOCUMENTATION</p>
                </article>
                <article className="border border-rule bg-bg/30 p-4">
                  <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-accent">Code Review & Governance</h3>
                  <p className="text-xs leading-5 text-ink-2">Every contribution follows a review and validation process before integration to preserve architectural consistency and project conventions.</p>
                </article>
              </div>
            </div>

            <aside className="border border-accent/40 bg-accent/5 p-5">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-accent">Engineering Metrics</p>
              <div className="divide-y divide-rule border-y border-rule">{engineeringMetrics.map(([label, value]) => <div key={label} className="flex items-center justify-between gap-4 py-3"><span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3">{label}</span><strong className="font-mono text-lg text-ink">{value}</strong></div>)}</div>
              <p className="mt-4 text-[10px] leading-5 text-ink-3">Figures from artifacts currently versioned in the repository.</p>
            </aside>
          </div>

          <div className="mt-6 border border-rule bg-bg/30 p-4">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-accent">Continuous Improvement</p>
            <ol className="flex flex-wrap items-center gap-2">{workflowSteps.map((step, index) => <li key={step} className="contents"><span className="border border-rule px-3 py-2 font-mono text-[10px] uppercase text-ink-2">{step}</span>{index < workflowSteps.length - 1 && <span className="font-mono text-xs text-accent" aria-hidden="true">→</span>}</li>)}</ol>
          </div>

          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3">Project Management: Linear · GitHub · Documentation-first workflow</p>
        </section>

        <section className="mb-5 border border-rule bg-surface/20 p-6"><SectionTitle index="10">What I&apos;m Learning</SectionTitle><div className="flex flex-wrap gap-2">{learnings.map((item) => <span key={item} className="border border-rule px-3 py-1.5 text-xs text-ink-2">{item}</span>)}</div></section>

        <footer className="border border-accent/40 bg-accent/5 p-6 md:p-8">
          <p className="max-w-4xl text-sm leading-7 text-ink-2">AI-Obs was born from a simple question: how do you precisely understand what an AI system is doing during its execution? The project applies observability principles to AI systems to provide actionable traces, reliable metrics, and a solid foundation for debugging, auditing, and governance.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="https://github.com/P3niel/ai-observability" target="_blank" rel="noopener noreferrer" className="border border-accent px-4 py-2 font-mono text-xs text-accent transition-colors hover:bg-accent hover:text-bg">View repository ↗</a>
            <Link href="/#contact" className="border border-rule px-4 py-2 font-mono text-xs text-ink-2 transition-colors hover:border-accent hover:text-accent">Discuss similar work</Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
