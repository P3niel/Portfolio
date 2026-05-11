"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "~/home" },
  { href: "/cv", label: "cv" },
  { href: "/projects", label: "projects" },
  { href: "/lab", label: "lab ↗" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 px-3 py-2 rounded-full border border-rule bg-surface/90 backdrop-blur-sm text-xs">
        {links.map(({ href, label }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={[
                "px-3 py-1 rounded-full transition-colors",
                active
                  ? "bg-accent text-bg font-medium"
                  : "text-ink-2 hover:text-ink hover:bg-white/5",
              ].join(" ")}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
