import { ReactNode } from "react";

type Variant = "default" | "dim" | "gray" | "accent" | "error" | "ok";

const variantClass: Record<Variant, string> = {
  default: "text-[color:var(--color-green)]",
  dim: "text-[color:var(--color-gray-dim)]",
  gray: "text-[color:var(--color-gray)]",
  accent: "text-[color:var(--color-yellow)]",
  error: "text-[color:var(--color-red)]",
  ok: "text-[color:var(--color-green)]",
};

type Props = {
  prompt?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

export function TerminalLine({
  prompt,
  children,
  variant = "default",
  className = "",
}: Props) {
  return (
    <div
      className={`fade-in flex gap-[10px] whitespace-pre-wrap ${variantClass[variant]} ${className}`}
    >
      {prompt && (
        <span className="shrink-0 select-none text-[color:var(--color-green-dim)]">
          {prompt}
        </span>
      )}
      <span>{children}</span>
    </div>
  );
}
