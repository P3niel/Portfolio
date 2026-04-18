import { ReactNode } from "react";

type Props = {
  title?: string;
  badge?: string;
  children: ReactNode;
  className?: string;
};

export function TerminalFrame({
  title = "peniel.dev — terminal",
  badge,
  children,
  className = "",
}: Props) {
  return (
    <section
      role="application"
      aria-label={title}
      className={
        "flex flex-col overflow-hidden rounded-[8px] border border-[color:var(--color-border)] bg-[color:var(--color-panel)] shadow-[0_20px_60px_rgba(0,0,0,0.55),0_2px_10px_rgba(0,0,0,0.4)] " +
        className
      }
    >
      <header className="flex select-none items-center gap-3 border-b border-[color:var(--color-border)] bg-gradient-to-b from-[#161616] to-[#101010] px-4 py-3">
        <div className="flex gap-[7px]" aria-hidden>
          <span className="h-[12px] w-[12px] rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.4)]" />
          <span className="h-[12px] w-[12px] rounded-full bg-[#febc2e] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.4)]" />
          <span className="h-[12px] w-[12px] rounded-full bg-[#28c840] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.4)]" />
        </div>
        <div className="flex-1 text-center text-[12.5px] tracking-wide text-[color:var(--color-gray)]">
          <span className="font-medium text-[#d6d6d6]">
            {title.split("—")[0].trim()}
          </span>
          {title.includes("—") && (
            <span> — {title.split("—").slice(1).join("—").trim()}</span>
          )}
          {badge && (
            <span className="ml-2 rounded-full border border-[color:var(--color-border)] px-2 py-[1px] text-[11px] text-[color:var(--color-gray)]">
              {badge}
            </span>
          )}
        </div>
        <div className="text-[11px] text-[color:var(--color-gray-dim)]">
          <span className="mr-[6px] inline-block h-[6px] w-[6px] rounded-full bg-[color:var(--color-green)] shadow-[0_0_6px_var(--color-green)]" />
          online
        </div>
      </header>
      {children}
    </section>
  );
}
