import Link from "next/link";

const samples = [
  {
    href: "/classic",
    title: "01 · Classic",
    tag: "single-column terminal",
    description:
      "Linear, focused. Boot sequence → clickable commands → project panels. The faithful interpretation of the brief.",
  },
  {
    href: "/split",
    title: "02 · Split",
    tag: "terminal + live dashboard",
    description:
      "Left pane runs the terminal; right pane mirrors state in bento tiles. Metrics tick in real time as you explore.",
  },
  {
    href: "/ide",
    title: "03 · IDE",
    tag: "workspace with sidebar + tabs",
    description:
      "VS Code-inspired layout. File explorer, tabbed editor, collapsible terminal drawer, Cmd+K command palette.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-[1120px] flex-col gap-10 px-6 py-16 md:py-24">
      <header className="flex flex-col gap-2">
        <div className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-gray-dim)]">
          peniel.dev · DevOps & MLOps portfolio
        </div>
        <h1 className="glow-strong text-[26px] font-medium text-[#eafff5] md:text-[32px]">
          three terminal samples
        </h1>
        <p className="max-w-2xl text-[13.5px] leading-[1.7] text-[color:var(--color-gray)]">
          Three directions for the same brief — dark, mono, alive. Each sample is
          a real interactive interface, not a mockup. Pick one to explore.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {samples.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group flex flex-col gap-3 rounded-[8px] border border-[color:var(--color-border)] bg-[color:var(--color-panel)] p-5 transition-all hover:-translate-y-[2px] hover:border-[color:var(--color-border-accent)] hover:shadow-[0_0_0_1px_rgba(0,255,156,0.18),0_16px_32px_-12px_rgba(0,255,156,0.12)]"
          >
            <div className="flex items-center justify-between">
              <span className="glow-soft text-[13px] text-[color:var(--color-green)]">
                {s.title}
              </span>
              <span className="text-[11px] text-[color:var(--color-gray-dim)]">→</span>
            </div>
            <div className="text-[11px] uppercase tracking-[0.15em] text-[color:var(--color-yellow)]">
              {s.tag}
            </div>
            <p className="text-[13px] leading-[1.65] text-[color:var(--color-gray)]">
              {s.description}
            </p>
            <div className="mt-2 text-[11px] text-[color:var(--color-gray-dim)] transition-colors group-hover:text-[color:var(--color-green)]">
              open sample →
            </div>
          </Link>
        ))}
      </div>

      <footer className="mt-auto flex items-center justify-between pt-6 text-[11px] text-[color:var(--color-gray-dim)]">
        <span>built with Next.js + Tailwind · JetBrains Mono</span>
        <span>press · enter · to begin</span>
      </footer>
    </main>
  );
}
