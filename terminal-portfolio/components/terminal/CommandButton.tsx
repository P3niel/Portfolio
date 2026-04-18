import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

export function CommandButton({ label, className = "", ...rest }: Props) {
  return (
    <button
      type="button"
      className={
        "inline-flex cursor-pointer items-center gap-[6px] rounded-md border border-[color:var(--color-border-accent)] bg-transparent px-3 py-[6px] text-[13px] text-[color:var(--color-green)] transition-all duration-200 " +
        "hover:border-[color:var(--color-green)] hover:bg-[rgba(0,255,156,0.04)] hover:shadow-[0_0_0_1px_rgba(0,255,156,0.22),0_0_16px_rgba(0,255,156,0.15)] " +
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-green)] " +
        "active:translate-y-[1px] " +
        className
      }
      {...rest}
    >
      <span className="text-[color:var(--color-gray-dim)]">[</span>
      <span>{label}</span>
      <span className="text-[color:var(--color-gray-dim)]">]</span>
    </button>
  );
}
