import Link from "next/link";
import { cv } from "@/lib/config";

export default function Home() {
  return (
    <main className="scanlines flex min-h-screen flex-col items-center justify-center px-6 text-center">
      {/* Prompt line */}
      <p className="text-ink-3 text-xs mb-6 tracking-widest uppercase">
        <span className="text-accent">›</span> portfolio.sh
      </p>

      {/* Hero */}
      <h1 className="text-3xl sm:text-4xl font-bold text-ink mb-2 tracking-tight">
        {cv.name}
      </h1>
      <p className="text-accent text-sm sm:text-base font-medium mb-3">
        {cv.title}
      </p>
      <p className="text-ink-2 text-sm max-w-md mb-10 leading-relaxed">
        {cv.tagline}
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap gap-3 justify-center mb-4">
        <Link
          href="/cv"
          className="px-5 py-2.5 rounded border border-accent text-accent text-sm hover:bg-accent hover:text-bg transition-colors font-medium"
        >
          → CV
        </Link>
        <Link
          href="/projects"
          className="px-5 py-2.5 rounded border border-rule text-ink-2 text-sm hover:border-ink hover:text-ink transition-colors"
        >
          → Projets
        </Link>
      </div>

      <Link
        href="/lab"
        className="text-ink-3 text-xs hover:text-accent transition-colors underline underline-offset-4"
      >
        → Lab (statut live)
      </Link>

      {/* Footer hint */}
      <p className="absolute bottom-6 text-ink-3 text-xs opacity-50">
        <span className="text-accent">$</span> make dev
      </p>
    </main>
  );
}
