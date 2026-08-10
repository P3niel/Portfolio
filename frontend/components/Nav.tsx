"use client";

import { useEffect, useState } from "react";
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
  const [theme, setTheme] = useState<"dark" | "light">(() =>
    typeof window === "undefined" ? "dark" : (localStorage.getItem("portfolio-theme") as "dark" | "light") || "dark"
  );

  useEffect(() => {
    document.body.classList.toggle("light", theme === "light");
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  return (
    <nav className="navbar" id="navbar">
      {links.map(({ href, label }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link key={href} href={href} className={`nav-link${active ? " active" : ""}`}>
            {label}
          </Link>
        );
      })}
      <Link href="/#contact" className="nav-cta">contact</Link>
      <button
        className="theme-switch"
        aria-label="toggle theme"
        onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      >
        <span className="theme-switch-track">
          <span className="theme-switch-thumb">
            <svg className="icon-sun" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
            <svg className="icon-moon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </span>
        </span>
      </button>
    </nav>
  );
}
