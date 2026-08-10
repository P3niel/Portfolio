import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface BentoCardItem {
  title: string;
  description: string;
  className?: string;
  accent?: boolean;
}

function BentoCard({ title, description, className, accent }: BentoCardItem) {
  return (
    <div className={cn("relative border border-rule bg-bg p-5", className)}>
      <CornerTicks />
      <div className="relative z-10 space-y-2">
        <h3 className={cn("text-sm font-semibold tracking-wide", accent ? "text-accent" : "text-ink")}>
          {title}
        </h3>
        <p className="text-[13px] leading-relaxed text-ink-2">{description}</p>
      </div>
    </div>
  );
}

function CornerTicks() {
  return (
    <>
      <Tick className="-top-px -left-px" />
      <Tick className="-top-px -right-px rotate-90" />
      <Tick className="-bottom-px -left-px -rotate-90" />
      <Tick className="-bottom-px -right-px rotate-180" />
    </>
  );
}

function Tick({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      width={10}
      height={10}
      className={cn("pointer-events-none absolute text-ink-3", className)}
    >
      <path d="M0 0H12M0 0V12" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}

export function BentoCards({
  cards,
  className,
  children,
}: {
  cards: BentoCardItem[];
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12", className)}>
      {cards.map((card) => (
        <BentoCard key={card.title} {...card} />
      ))}
      {children}
    </div>
  );
}
