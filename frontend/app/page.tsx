"use client";

import { useEffect, useRef, useState, useCallback, type FormEvent } from "react";
import Link from "next/link";
import { cv, projects } from "@/lib/config";


const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

const projectPreviews: Record<string, string> = {
  "ai-obs": `[agent] ──event──> [trace]\n   └── quality gate: PASS\n       observability: ON`,
  neuraldbg: `trace_042.breakpoint()\n  neuron path: inspect\n  mystery level: -73%`,
  "devops-lab": `docker compose up -d\n  infra: reproducible\n  friday deploy: SAFE`,
  portfolio: `next build -> preview\n  content: config-driven\n  backend: DEMO MODE`,
  "toxic-ai": `signal ──> anomaly?\n  confidence: ███████░\n  model mood: curious`,
  "infra-terraform-preprod": `terraform plan\n  aws preprod: OFF\n  cloud bill: protected`,
  sentinelops: `cpu · ram · disk\n  anomalies: watching\n  sentinel status: READY`,
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function HomePage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const heroStageRef = useRef<HTMLDivElement>(null);
  const mfsRef = useRef<HTMLDivElement>(null);
  const csCardRef = useRef<HTMLDivElement>(null);
  const tScreenRef = useRef<HTMLDivElement>(null);
  const tCmdbarRef = useRef<HTMLDivElement>(null);
  const tInputRowRef = useRef<HTMLDivElement>(null);
  const tCliRef = useRef<HTMLInputElement>(null);
  const tTitleStatusRef = useRef<HTMLDivElement>(null);
  const tReopenFabRef = useRef<HTMLButtonElement>(null);
  const dotRedRef = useRef<HTMLSpanElement>(null);
  const dotYellowRef = useRef<HTMLSpanElement>(null);
  const dotGreenRef = useRef<HTMLSpanElement>(null);

  const termStateRef = useRef<"closed" | "minimized" | "expanded">("minimized");
  const scrollAccRef = useRef(0);
  const bootedRef = useRef(false);

  // ── theme ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const saved = (localStorage.getItem("portfolio-theme") || "dark") as "dark" | "light";
    setTheme(saved);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("light", theme === "light");
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  // ── hero scroll zoom-out ─────────────────────────────────────────────────
  useEffect(() => {
    const hero = document.getElementById("about");
    const stage = heroStageRef.current;
    if (!hero || !stage) return;
    let raf = 0;

    function updateHero() {
      raf = 0;
      const start = hero!.offsetTop;
      const scrollable = Math.max(1, hero!.offsetHeight - window.innerHeight);
      const scrolled = window.scrollY - start;
      const p = clamp01(scrolled / scrollable);
      const shadow = clamp01((p - 0.75) / 0.25);
      const surface = 1 - Math.pow(1 - p, 1.12);
      const surfaceOpacity = clamp01(1 - surface * 0.92);
      const nameLinger = window.innerHeight * 0.5;
      const nameFadeDistance = window.innerHeight * 0.45;
      const nameExit = clamp01((scrolled - scrollable - nameLinger) / nameFadeDistance);
      const nameProgress = Math.pow(p, 0.85);
      const megaNameProgress = Math.pow(p, 0.9);
      const nameFontSize = 11.5 + nameProgress * 2.6;
      const megaNameGrow = megaNameProgress * 118;
      stage!.style.setProperty("--p", p.toFixed(4));
      stage!.style.setProperty("--hero-copy-y", `${(-86 * surface).toFixed(2)}px`);
      stage!.style.setProperty("--hero-card-y", `${(-72 * surface).toFixed(2)}px`);
      stage!.style.setProperty("--hero-name-y", "0px");
      stage!.style.setProperty("--hero-name-progress", nameProgress.toFixed(4));
      stage!.style.setProperty("--hero-name-font-size", `${nameFontSize.toFixed(2)}px`);
      stage!.style.setProperty("--hero-megatext-grow", `${megaNameGrow.toFixed(2)}px`);
      stage!.style.setProperty("--hero-copy-opacity", surfaceOpacity.toFixed(4));
      stage!.style.setProperty("--hero-card-opacity", surfaceOpacity.toFixed(4));
      stage!.style.setProperty("--hero-name-opacity", clamp01(1 - nameExit).toFixed(4));
      stage!.classList.toggle("hero-surface-cleared", p >= 0.995);
      document.documentElement.style.setProperty("--hero-shadow", shadow.toFixed(4));
    }

    function scheduleHeroUpdate() {
      if (raf) return;
      raf = window.requestAnimationFrame(updateHero);
    }

    window.addEventListener("scroll", scheduleHeroUpdate, { passive: true });
    window.addEventListener("resize", scheduleHeroUpdate);
    scheduleHeroUpdate();
    return () => {
      window.removeEventListener("scroll", scheduleHeroUpdate);
      window.removeEventListener("resize", scheduleHeroUpdate);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  // ── navbar active state + motion-footer shadow ───────────────────────────
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav-link"));
    const navbar = document.getElementById("navbar");
    const mfs = mfsRef.current;
    let raf = 0;

    function updateScrollState() {
      raf = 0;
      const sy = window.scrollY;
      const navBottom = navbar?.getBoundingClientRect().bottom ?? 64;
      document.documentElement.style.setProperty("--scroll-shadow-edge", `${Math.round(navBottom)}px`);

      // active link
      let cur = "";
      const probe = sy + window.innerHeight * 0.35;
      sections.forEach((s) => { if (probe >= s.offsetTop) cur = s.id; });
      const nearBottom = sy + window.innerHeight >= document.documentElement.scrollHeight - 80;
      if (nearBottom && sections.length) cur = sections[sections.length - 1].id;
      navLinks.forEach((l) => { l.classList.toggle("active", l.getAttribute("href") === "#" + cur); });

      // per-section shadow
      sections.forEach((s) => {
        const rect = s.getBoundingClientRect();
        const progress = 1 - rect.bottom / (s.offsetHeight + window.innerHeight);
        const active = progress > 0.45;
        s.classList.toggle("shadow-active", active);
        if (active) {
          const depth = Math.min(1, (progress - 0.45) / 0.3);
          s.style.setProperty("--shadow-depth", String(depth));
        }
      });

      if (mfs) mfs.classList.toggle("visible", sy > 8);
    }

    function scheduleScrollStateUpdate() {
      if (raf) return;
      raf = window.requestAnimationFrame(updateScrollState);
    }

    window.addEventListener("scroll", scheduleScrollStateUpdate, { passive: true });
    window.addEventListener("resize", scheduleScrollStateUpdate);
    scheduleScrollStateUpdate();
    return () => {
      window.removeEventListener("scroll", scheduleScrollStateUpdate);
      window.removeEventListener("resize", scheduleScrollStateUpdate);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  // ── terminal helpers ─────────────────────────────────────────────────────
  const appendLine = useCallback((text: string, cls: string) => {
    const screen = tScreenRef.current;
    if (!screen) return;
    const el = document.createElement("div");
    el.className = "t-line " + (cls || "");
    el.textContent = text;
    screen.appendChild(el);
    screen.scrollTop = screen.scrollHeight;
  }, []);

  const appendHTML = useCallback((html: string) => {
    const screen = tScreenRef.current;
    if (!screen) return;
    const el = document.createElement("div");
    el.innerHTML = html;
    screen.appendChild(el);
    screen.scrollTop = screen.scrollHeight;
    return el;
  }, []);

  const echoCmd = useCallback((cmd: string) => {
    appendHTML(`<div class="t-line"><span class="t-prompt">peniel@devops:~$</span><span>&nbsp;${cmd}</span></div>`);
  }, [appendHTML]);

  const runCommand = useCallback((raw: string) => {
    const cmd = (raw || "").trim().toLowerCase();
    if (!cmd) return;
    echoCmd(cmd);

    if (cmd === "help") {
      appendHTML(`
        <div class="t-line t-muted">available commands:</div>
        <div class="t-line t-muted">&nbsp;&nbsp;<span class="t-accent-t">about</span>      — sys info + contact</div>
        <div class="t-line t-muted">&nbsp;&nbsp;<span class="t-accent-t">projects</span>   — list all projects</div>
        <div class="t-line t-muted">&nbsp;&nbsp;<span class="t-accent-t">open &lt;id&gt;</span>  — open a project page</div>
        <div class="t-line t-muted">&nbsp;&nbsp;<span class="t-accent-t">go &lt;page&gt;</span>  — home, cv, projects, lab or contact</div>
        <div class="t-line t-muted">&nbsp;&nbsp;<span class="t-accent-t">skills</span>     — skills from the CV</div>
        <div class="t-line t-muted">&nbsp;&nbsp;<span class="t-accent-t">metrics</span>    — open the observability lab</div>
        <div class="t-line t-muted">&nbsp;&nbsp;<span class="t-accent-t">contact</span>    — reach out</div>
        <div class="t-line t-muted">&nbsp;&nbsp;<span class="t-accent-t">clear</span>      — clear terminal</div>
      `);
    } else if (cmd === "about") {
      appendHTML(`
        <div class="t-line t-muted">whoami:</div>
        <div class="t-line">&nbsp;&nbsp;${cv.name} — ${cv.title}</div>
        <div class="t-line t-muted">status:</div>
        <div class="t-line">&nbsp;&nbsp;Étudiant en informatique · recherche une alternance</div>
        <div class="t-line t-muted">focus:</div>
        <div class="t-line">&nbsp;&nbsp;Backend · DevOps · IA · Observabilité</div>
        <div class="t-line t-muted">cat /etc/contact:</div>
        <div class="t-line">&nbsp;&nbsp;email: ${cv.contact.email}</div>
        <div class="t-line">&nbsp;&nbsp;gh:    github.com/P3niel</div>
      `);
    } else if (cmd === "projects") {
      const ids = projects.map((project) => project.slug);
      let html = `<div class="t-line t-muted">ls ~/projects/</div>`;
      ids.forEach((id, i) => {
        const p = projects.find((project) => project.slug === id)!;
        const prefix = i === ids.length - 1 ? "└──" : "├──";
        html += `<div class="t-line"><span class="t-ok">&nbsp;${prefix} <span class="t-accent-t pclink" data-open="${id}" style="cursor:pointer;text-decoration:underline">${id}/</span></span><span class="t-dim">&nbsp;&nbsp;# ${p.shortDescription}</span></div>`;
      });
      html += `<div class="t-line t-dim" style="margin-top:4px">&nbsp;→ type <span class="t-accent-t">open &lt;id&gt;</span> for full detail</div>`;
      const blk = appendHTML(html);
      blk?.querySelectorAll<HTMLElement>(".pclink").forEach((n) => {
        n.addEventListener("click", () => runCommand("open " + n.dataset.open));
      });
    } else if (cmd.startsWith("open ")) {
      const id = cmd.split(/\s+/)[1];
      const p = projects.find((project) => project.slug === id);
      if (!p) { appendHTML(`<div class="t-line t-err">no such project: ${id}</div>`); return; }
      appendHTML(`<div class="t-line t-ok">opening /projects/${p.slug} ...</div>`);
      window.location.href = `/projects/${p.slug}`;
    } else if (cmd.startsWith("go ")) {
      const page = cmd.split(/\s+/)[1];
      const routes: Record<string, string> = {
        home: "/", cv: "/cv", projects: "/projects", lab: "/lab", contact: "/#contact",
        about: "/#about", skills: "/#skills",
      };
      const destination = routes[page];
      if (!destination) {
        appendHTML(`<div class="t-line t-err">unknown page: ${page} — try home, cv, projects, lab or contact</div>`);
        return;
      }
      appendHTML(`<div class="t-line t-ok">opening ${destination} ...</div>`);
      window.location.href = destination;
    } else if (cmd === "skills") {
      appendHTML(cv.skills.map((group) => `
        <div class="t-line t-dim">## ${group.category.toLowerCase()}</div>
        <div class="t-line">&nbsp;&nbsp;<span class="t-ok">${group.items.join(" · ")}</span></div>
      `).join(""));
    } else if (cmd === "metrics") {
      appendHTML(`
        <div class="t-line t-dim">Runtime signals are exposed by the portfolio lab.</div>
        <div class="t-line t-ok">opening /lab ...</div>
      `);
      window.location.href = "/lab";
    } else if (cmd === "contact") {
      appendHTML(`
        <div class="t-line t-dim">cat /etc/peniel/contact.env</div>
        <div class="t-line">&nbsp;&nbsp;EMAIL=${cv.contact.email}</div>
        <div class="t-line">&nbsp;&nbsp;GITHUB=${cv.contact.github}</div>
        <div class="t-line">&nbsp;&nbsp;LINKEDIN=${cv.contact.linkedin}</div>
        <div class="t-line">&nbsp;&nbsp;CALENDAR=on_request</div>
        <div class="t-line">&nbsp;&nbsp;TIMEZONE=UTC+1 (Paris)</div>
        <div class="t-line">&nbsp;&nbsp;AVAILABILITY=open_to_work</div>
      `);
    } else if (cmd === "clear") {
      if (tScreenRef.current) tScreenRef.current.innerHTML = "";
      appendLine("> terminal cleared.", "t-dim");
      return;
    } else {
      appendHTML(`<div class="t-line t-err">command not found: ${cmd} — try <span class="t-accent-t">help</span></div>`);
    }

    if (tScreenRef.current) tScreenRef.current.scrollTop = tScreenRef.current.scrollHeight;
  }, [appendHTML, appendLine, echoCmd]);

  const handleContactSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const replyTo = String(formData.get("email") || "").trim();
    const subject = encodeURIComponent("Production systems inquiry");
    const body = encodeURIComponent(
      [
        "Hi Peniel,",
        "",
        "I would like to discuss a DevOps / MLOps system.",
        replyTo ? `Reply contact: ${replyTo}` : "",
      ].filter(Boolean).join("\n")
    );

    window.location.href = `mailto:${cv.contact.email}?subject=${subject}&body=${body}`;
  }, []);

  const bootSequence = useCallback(() => {
    if (bootedRef.current) return;
    bootedRef.current = true;
    const lines = [
      { t: "> booting peniel.portfolio...", cls: "t-dim" },
      { t: "> loading routes: [home, cv, projects, lab, contact]", cls: "t-dim" },
      { t: `> loading projects: [${projects.map((project) => project.slug).join(", ")}]`, cls: "t-dim" },
      { t: "> loading profile: backend, devops, ia, observability", cls: "t-dim" },
      { t: "> contact channels connected ... ok", cls: "t-dim" },
      { t: "> project pages connected ... ok", cls: "t-dim" },
      { t: "> portfolio context ready", cls: "t-dim" },
      { t: "─".repeat(52), cls: "t-dim" },
      { t: "> welcome, peniel. type help for commands.", cls: "t-ok" },
    ];
    let d = 80;
    lines.forEach((l, i) => {
      setTimeout(() => {
        appendLine(l.t, l.cls);
        if (i === lines.length - 1) appendLine("", "");
      }, d);
      d += i < 6 ? 220 : 120;
    });
  }, [appendLine]);

  // ── terminal state machine ───────────────────────────────────────────────
  const setDotState = useCallback((state: "closed" | "minimized" | "expanded") => {
    const red = dotRedRef.current;
    const yellow = dotYellowRef.current;
    const green = dotGreenRef.current;
    if (!red || !yellow || !green) return;
    red.classList.remove("disabled");
    yellow.classList.toggle("disabled", state === "closed" || state === "minimized");
    green.classList.toggle("disabled", state === "expanded");
    red.dataset.tip = "close";
    yellow.dataset.tip = state === "expanded" ? "minimize" : "minimized";
    green.dataset.tip = state === "expanded" ? "expanded" : "expand";
  }, []);

  const expandTerminal = useCallback(() => {
    termStateRef.current = "expanded";
    const card = csCardRef.current;
    if (!card) return;
    card.classList.add("expanded");
    card.classList.remove("closed");
    card.style.cursor = "default";
    card.style.transform = "";
    tScreenRef.current?.classList.add("expanded");
    if (tCmdbarRef.current) tCmdbarRef.current.style.display = "";
    if (tInputRowRef.current) tInputRowRef.current.style.display = "";
    if (tTitleStatusRef.current) tTitleStatusRef.current.textContent = "● running";
    document.body.style.paddingBottom = "42px";
    tReopenFabRef.current?.classList.remove("visible");
    setDotState("expanded");
    setTimeout(() => tCliRef.current?.focus(), 400);
    bootSequence();
  }, [setDotState, bootSequence]);

  const minimizeTerminal = useCallback(() => {
    termStateRef.current = "minimized";
    const card = csCardRef.current;
    if (!card) return;
    card.classList.remove("expanded");
    card.classList.remove("closed");
    card.style.cursor = "pointer";
    card.style.transform = "";
    tScreenRef.current?.classList.remove("expanded");
    if (tCmdbarRef.current) tCmdbarRef.current.style.display = "none";
    if (tInputRowRef.current) tInputRowRef.current.style.display = "none";
    if (tTitleStatusRef.current) tTitleStatusRef.current.textContent = "";
    document.body.style.paddingBottom = "42px";
    tReopenFabRef.current?.classList.remove("visible");
    setDotState("minimized");
  }, [setDotState]);

  const closeTerminal = useCallback(() => {
    termStateRef.current = "closed";
    const card = csCardRef.current;
    if (!card) return;
    card.classList.remove("expanded");
    card.classList.add("closed");
    card.style.transform = "";
    if (tCmdbarRef.current) tCmdbarRef.current.style.display = "none";
    if (tInputRowRef.current) tInputRowRef.current.style.display = "none";
    if (tTitleStatusRef.current) tTitleStatusRef.current.textContent = "";
    document.body.style.paddingBottom = "0";
    setDotState("closed");
    tReopenFabRef.current?.classList.add("visible");
  }, [setDotState]);

  // ── terminal event listeners ─────────────────────────────────────────────
  useEffect(() => {
    const card = csCardRef.current;
    const cli = tCliRef.current;
    const fab = tReopenFabRef.current;
    const dotRed = dotRedRef.current;
    const dotYellow = dotYellowRef.current;
    const dotGreen = dotGreenRef.current;
    if (!card || !cli || !fab || !dotRed || !dotYellow || !dotGreen) return;

    setDotState("minimized");

    const onCardClick = (e: MouseEvent) => {
      if (termStateRef.current !== "minimized") return;
      expandTerminal();
    };
    const onDotRed = (e: MouseEvent) => { e.stopPropagation(); if (termStateRef.current !== "closed") closeTerminal(); };
    const onDotYellow = (e: MouseEvent) => { e.stopPropagation(); if (termStateRef.current === "expanded") minimizeTerminal(); };
    const onDotGreen = (e: MouseEvent) => { e.stopPropagation(); if (termStateRef.current === "minimized") expandTerminal(); };
    const onFab = (e: MouseEvent) => { e.stopPropagation(); expandTerminal(); };
    const onCliKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") { const v = cli.value; cli.value = ""; runCommand(v); }
    };

    card.addEventListener("click", onCardClick);
    dotRed.addEventListener("click", onDotRed);
    dotYellow.addEventListener("click", onDotYellow);
    dotGreen.addEventListener("click", onDotGreen);
    fab.addEventListener("click", onFab);
    cli.addEventListener("keydown", onCliKey);

    // cmd bar
    const cmdBar = tCmdbarRef.current;
    const onCmdBar = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>("[data-cmd]");
      if (btn?.dataset.cmd) runCommand(btn.dataset.cmd);
    };
    cmdBar?.addEventListener("click", onCmdBar);

    // terminal zone focus click
    const zone = document.querySelector<HTMLElement>(".terminal-zone");
    const onZoneClick = (e: MouseEvent) => {
      if (termStateRef.current === "expanded" && !(e.target as HTMLElement).closest("input") && !(e.target as HTMLElement).closest("button")) {
        cli.focus();
      }
    };
    zone?.addEventListener("click", onZoneClick);

    return () => {
      card.removeEventListener("click", onCardClick);
      dotRed.removeEventListener("click", onDotRed);
      dotYellow.removeEventListener("click", onDotYellow);
      dotGreen.removeEventListener("click", onDotGreen);
      fab.removeEventListener("click", onFab);
      cli.removeEventListener("keydown", onCliKey);
      cmdBar?.removeEventListener("click", onCmdBar);
      zone?.removeEventListener("click", onZoneClick);
    };
  }, [closeTerminal, expandTerminal, minimizeTerminal, runCommand, setDotState]);

  // ── scroll-linked terminal collapse ──────────────────────────────────────
  useEffect(() => {
    const SCROLL_TO_MINIMIZE = 180;

    function applyScrollProgress(p: number) {
      const card = csCardRef.current;
      if (!card || p <= 0 || p >= 1) return;
      const cardH = card.offsetHeight;
      const peekH = 108;
      const maxTranslate = cardH - peekH;
      const translateY = p * maxTranslate;
      const rotateX = p * 14;
      card.style.transition = "none";
      card.style.transform = `translateY(${translateY}px) rotateX(${rotateX}deg)`;
    }

    const onWheel = (e: WheelEvent) => {
      if (termStateRef.current !== "expanded") return;
      const screen = tScreenRef.current;
      if (screen && (e.target as HTMLElement).closest("#t-screen")) return;

      if (e.deltaY > 0) {
        scrollAccRef.current = Math.min(SCROLL_TO_MINIMIZE, scrollAccRef.current + Math.abs(e.deltaY));
      } else {
        scrollAccRef.current = Math.max(0, scrollAccRef.current - Math.abs(e.deltaY) * 1.5);
      }

      const p = scrollAccRef.current / SCROLL_TO_MINIMIZE;
      applyScrollProgress(p);

      if (p >= 1) {
        scrollAccRef.current = 0;
        const card = csCardRef.current;
        if (card) card.style.transition = "";
        minimizeTerminal();
      } else if (p <= 0) {
        const card = csCardRef.current;
        if (card) { card.style.transition = ""; card.style.transform = ""; }
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [minimizeTerminal]);

  // ─── render ───────────────────────────────────────────────────────────────
  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar" id="navbar">
        <a href="#about" className="nav-link active">about</a>
        <a href="#projects" className="nav-link">projects</a>
        <a href="#skills" className="nav-link">skills</a>
        <a href="#method" className="nav-link">method</a>
        <a href="#metrics" className="nav-link">metrics</a>
        <a href="#contact" className="nav-link">contact</a>
        <button
          className="theme-switch"
          aria-label="toggle theme"
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        >
          <span className="theme-switch-track">
            <span className="theme-switch-thumb">
              <svg className="icon-sun" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
              </svg>
              <svg className="icon-moon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            </span>
          </span>
        </button>
      </nav>

      {/* MOTION FOOTER SHADOW */}
      <div className="motion-footer-shadow" ref={mfsRef}></div>

      {/* HERO */}
      <section id="about" className="hero">
        <div className="hero-stage" ref={heroStageRef} id="heroStage">
          <div className="hero-grid" aria-hidden="true"></div>
          <div className="hero-vignette" aria-hidden="true"></div>
          <div className="hero-megatext" aria-hidden="true">
            <span className="megatext-line">PENIEL</span>
          </div>
          <div className="hero-portrait-wrap" aria-hidden="true">
            <div className="hero-portrait">
              <svg viewBox="0 0 500 1100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMin meet">
                <defs>
                  <radialGradient id="head-shade" cx="40%" cy="35%">
                    <stop offset="0%" stopColor="#1a1a1a"/>
                    <stop offset="60%" stopColor="#0a0a0a"/>
                    <stop offset="100%" stopColor="#000000"/>
                  </radialGradient>
                  <linearGradient id="body-shade" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#000000"/>
                    <stop offset="40%" stopColor="#0e0e0e"/>
                    <stop offset="60%" stopColor="#161616"/>
                    <stop offset="100%" stopColor="#050505"/>
                  </linearGradient>
                  <radialGradient id="ambient" cx="50%" cy="20%">
                    <stop offset="0%" stopColor="rgba(255,255,255,.05)"/>
                    <stop offset="100%" stopColor="transparent"/>
                  </radialGradient>
                </defs>
                <ellipse cx="250" cy="170" rx="220" ry="240" fill="url(#ambient)"/>
                <g>
                  <ellipse cx="250" cy="130" rx="80" ry="105" fill="url(#head-shade)"/>
                  <path fill="#0a0a0a" d="M 215 215 L 285 215 L 290 270 L 210 270 Z"/>
                  <path fill="url(#body-shade)" d="M 200 250 C 130 265, 88 320, 78 410 L 62 580 C 56 630, 65 680, 92 700 L 118 740 L 130 800 L 140 870 L 150 1100 L 215 1100 L 225 870 L 235 780 L 250 730 L 265 780 L 275 870 L 285 1100 L 350 1100 L 360 870 L 370 800 L 382 740 L 408 700 C 435 680, 444 630, 438 580 L 422 410 C 412 320, 370 265, 300 250 L 285 270 L 250 280 L 215 270 Z"/>
                  <path fill="rgba(255,255,255,.04)" d="M 210 268 C 230 290, 270 290, 290 268 L 295 280 L 250 295 L 205 280 Z"/>
                </g>
              </svg>
            </div>
          </div>
          <div className="hero-floor" aria-hidden="true"></div>
          <div className="hero-hud-top">
            <div className="hud-corner right"><span>STATUS</span><span className="hud-status">● ONLINE</span></div>
          </div>
          <div className="hero-nameplate"><span>{cv.name}</span></div>
          <div className="hero-headline-wrap">
            <div className="hero-label">&#47;&#47; backend · devops · ai observability</div>
            <h1 className="hero-headline">
              I build software systems<br/>
              designed for <em>real constraints.</em>
            </h1>
            <p className="hero-bio">
              From backend code to delivery workflows.
              <br />
              Observable, documented, and built to be validated.
              <br />
              <br />
              Computer science student focused on Python, DevOps, and AI observability, currently looking for a work-study opportunity.
            </p>
            <div className="hero-cta-row">
              <Link href="/projects" className="hero-cta primary">
                <span>Projects</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/lab" className="hero-cta">Lab</Link>
              <Link href="/cv" className="hero-cta">CV</Link>
              <Link href="/projects/ai-obs" className="hero-cta">Voir AI-Obs</Link>
              <button className="hero-preview-card hero-video-cta" type="button">
                <span className="preview-thumb">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </span>
                <span className="preview-text">
                  <span className="preview-eyebrow">WATCH</span>
                  <span className="preview-title">3-min video</span>
                </span>
              </button>
            </div>
          </div>
          <div className="hero-spec-card">
            <div className="spec-header">
              <span className="spec-label">MODEL</span>
              <span className="spec-code">PNL — 2026</span>
            </div>
            <div className="spec-body">
              <div className="spec-row"><span>STACK</span><span>PYTHON · API · DOCKER · TERRAFORM</span></div>
              <div className="spec-row"><span>FOCUS</span><span>BACKEND · DEVOPS · OBSERVABILITÉ IA</span></div>
              <div className="spec-row"><span>PARCOURS</span><span>ÉTUDIANT EN INFORMATIQUE</span></div>
              <div className="spec-row"><span>BASE</span><span>FRANCE</span></div>
              <div className="spec-row"><span>STATUS</span><span className="ok">RECHERCHE UNE ALTERNANCE</span></div>
            </div>
          </div>
          <div className="hero-bottom-strip">
            <span>PORTFOLIO MODE: FRONTEND PUBLIC</span>
            <span className="scroll-cue">SCROLL TO ENTER INFRA LAYER <span className="cue-arrow">↓</span></span>
          </div>
        </div>
      </section>

      {/* /03 SELECTED WORK */}
      <section id="projects" className="brutal-section">
        <div className="brutal-frame">
          <div className="brutal-header">
            <div className="brutal-num">/03</div>
            <div className="brutal-title">SELECTED WORK</div>
            <div className="brutal-meta">{String(projects.length).padStart(2, "0")} · PROJECTS</div>
          </div>
          <div className="proj-grid">
            {projects.filter((project) => project.featured).map((project) => (
              <Link className="proj-cell" href={`/projects/${project.slug}`} key={project.slug}>
                <div className="proj-thumb">
                  <div className="thumb-overlay"></div>
                  <div className="thumb-content">
                    <pre className="thumb-code">{`> ${project.name}\n─────────────\n${projectPreviews[project.slug] ?? "system ready"}`}</pre>
                  </div>
                  <div className="thumb-grid"></div>
                </div>
                <div className="proj-meta">
                  <div className="proj-name">{project.name.toUpperCase()}</div>
                  <div className="proj-sub">{project.tags.slice(0, 2).join(" · ").toUpperCase()}</div>
                  <div className="proj-arrow">↗</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* /02 CORE STACK */}
      <section id="skills" className="brutal-section">
        <div className="brutal-frame">
          <div className="brutal-header">
            <div className="brutal-num">/02</div>
            <div className="brutal-title">CORE STACK</div>
            <div className="brutal-meta">06 DOMAINS</div>
          </div>
          <div className="skill-grid">
            {[
              { title: "INFRA", desc: "Kubernetes, Terraform, Helm. Clusters as code, no snowflakes.", icon: (<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="4" y="4" width="24" height="24"/><line x1="4" y1="12" x2="28" y2="12"/><line x1="12" y1="4" x2="12" y2="28"/><circle cx="20" cy="20" r="2.5" fill="currentColor"/></svg>) },
              { title: "MLOPS", desc: "MLflow, Airflow, Kubeflow, BentoML. Reproducible from notebook to prod.", icon: (<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M4 24 L12 16 L18 20 L28 8"/><circle cx="12" cy="16" r="2" fill="currentColor"/><circle cx="18" cy="20" r="2" fill="currentColor"/><line x1="4" y1="28" x2="28" y2="28"/></svg>) },
              { title: "LANGUAGES", desc: "Python, Go, Bash, TypeScript. Right tool for the right blast radius.", icon: (<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.4"><polyline points="10,8 4,16 10,24"/><polyline points="22,8 28,16 22,24"/><line x1="18" y1="6" x2="14" y2="26"/></svg>) },
              { title: "OBSERVE", desc: "Prometheus, Grafana, Loki, OpenTelemetry. Pages stay quiet on weekends.", icon: (<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="16" cy="16" r="10"/><circle cx="16" cy="16" r="3" fill="currentColor"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="16" y1="26" x2="16" y2="30"/><line x1="2" y1="16" x2="6" y2="16"/><line x1="26" y1="16" x2="30" y2="16"/></svg>) },
              { title: "CI / CD", desc: "GitHub Actions, ArgoCD, Tekton. Ship safely, often, with rollback.", icon: (<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M8 6 L24 6 L28 12 L28 26 L4 26 L4 12 Z"/><line x1="4" y1="12" x2="28" y2="12"/><circle cx="16" cy="19" r="3.5"/></svg>) },
              { title: "CONTAINERS", desc: "Docker, containerd, BuildKit. Sealed, reproducible, multi-arch.", icon: (<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="6" y="6" width="20" height="20"/><rect x="10" y="10" width="12" height="12"/><line x1="6" y1="14" x2="26" y2="14"/><line x1="6" y1="22" x2="26" y2="22"/></svg>) },
            ].map((s) => (
              <div className="skill-cell" key={s.title}>
                <div className="skill-icon">{s.icon}</div>
                <div className="skill-title">{s.title}</div>
                <div className="skill-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* /04 OPERATING MODEL */}
      <section id="method" className="brutal-section">
        <div className="brutal-frame">
          <div className="brutal-header">
            <div className="brutal-num">/04</div>
            <div className="brutal-title">OPERATING MODEL</div>
            <div className="brutal-meta">FROM IDEA TO RUNBOOK</div>
          </div>
          <div className="method-grid">
            {[
              {
                step: "01",
                title: "Frame constraints",
                body: "Clarify runtime target, failure modes, data freshness, security boundaries, and what must be visible on day one.",
                signal: "inputs -> risk map",
              },
              {
                step: "02",
                title: "Ship a narrow path",
                body: "Build the smallest deployable slice with health checks, typed config, rollback points, and a boring release path.",
                signal: "commit -> deploy",
              },
              {
                step: "03",
                title: "Instrument behavior",
                body: "Expose metrics, logs, traces, and model signals so the system can be judged from production evidence.",
                signal: "runtime -> dashboard",
              },
              {
                step: "04",
                title: "Automate the handoff",
                body: "Turn repeat work into CI/CD, scheduled jobs, runbooks, promotion gates, and dashboards a team can reuse.",
                signal: "ops -> repeatable",
              },
            ].map((item) => (
              <div className="method-cell" key={item.step}>
                <div className="method-step">{item.step}</div>
                <div className="method-title">{item.title}</div>
                <p className="method-body">{item.body}</p>
                <div className="method-signal">{item.signal}</div>
              </div>
            ))}
          </div>
          <Link href="/projects" className="method-proof method-roof" aria-label="View project case studies">
            <span className="method-proof-label">OUTPUT</span>
            <strong>deployable service · observable runtime · documented failure path</strong>
            <span className="method-cta">
              <span className="method-cta-text">case studies</span>
              <span className="method-cta-arrow" aria-hidden="true">↗</span>
            </span>
          </Link>
        </div>
      </section>

      <div className="hatched-band" aria-hidden="true"></div>

      {/* /05 PORTFOLIO FEATURES */}
      <section id="metrics" className="brutal-section">
        <div className="brutal-frame">
          <div className="brutal-header">
            <div className="brutal-num">/05</div>
            <div className="brutal-title">PORTFOLIO FEATURES</div>
            <div className="brutal-meta">IMPLEMENTED · VERIFIABLE</div>
          </div>
          <div className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Interactive terminal", "Keyboard-friendly commands provide an optional discovery layer without replacing standard navigation."],
              ["Config-driven content", "CV data, project cards and case studies share one typed source of truth."],
              ["Project case studies", "Dedicated routes expose problems, architecture decisions, responsibilities and proof points."],
              ["Controlled Runtime Lab", "Next.js proxies support live services while defaulting to clearly labelled sample payloads."],
              ["Responsive frontend", "The portfolio adapts across mobile and desktop with accessible navigation and reduced-motion support."],
              ["CI and previews", "GitHub Actions validates code while Vercel publishes a preview for every pull request."],
            ].map(([title, description]) => (
              <article className="min-w-0 bg-bg p-5" key={title}>
                <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-accent">{title}</h2>
                <p className="text-xs leading-6 text-ink-2">{description}</p>
              </article>
            ))}
          </div>
          <Link href="/projects/portfolio" className="method-proof method-roof" aria-label="Open the Portfolio case study">
            <span className="method-proof-label">CASE STUDY</span>
            <strong>frontend public · backend demo mode · infrastructure as code preserved</strong>
            <span className="method-cta"><span className="method-cta-text">inspect portfolio</span><span className="method-cta-arrow" aria-hidden="true">↗</span></span>
          </Link>
        </div>
      </section>

      {/* /06 OPEN A CHANNEL */}
      <section id="contact" className="brutal-section">
        <div className="brutal-frame">
          <div className="brutal-header">
            <div className="brutal-num">/06</div>
            <div className="brutal-title">OPEN A CHANNEL</div>
            <div className="brutal-meta">RESP. &lt; 48H</div>
          </div>
          <div className="contact-block">
            <div className="contact-col">
              <p className="contact-lead">Drop a line, a brief, or a shipping problem. Async-first, replies within 48h.</p>
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <input type="email" name="email" placeholder="ENTER YOUR EMAIL" />
                <button type="submit">SEND <span className="btn-arrow">↗</span></button>
              </form>
              <div className="contact-tags">
                <span className="contact-tag">● OPEN TO WORK</span>
                <span className="contact-tag">● REMOTE / EU</span>
                <span className="contact-tag">● UTC+1</span>
              </div>
            </div>
            <div className="contact-col">
              <div className="contact-channels">
                <a className="contact-channel" href={`mailto:${cv.contact.email}`}>
                  <span className="ch-label">EMAIL</span>
                  <span className="ch-val">{cv.contact.email}</span>
                  <span className="ch-arrow">↗</span>
                </a>
                <a className="contact-channel" href={cv.contact.github} target="_blank" rel="noopener noreferrer">
                  <span className="ch-label">GITHUB</span>
                  <span className="ch-val">github.com/P3niel</span>
                  <span className="ch-arrow">↗</span>
                </a>
                <a className="contact-channel" href={cv.contact.linkedin} target="_blank" rel="noopener noreferrer">
                  <span className="ch-label">LINKEDIN</span>
                  <span className="ch-val">Péniel Teko-Agbo</span>
                  <span className="ch-arrow">↗</span>
                </a>
                <a className="contact-channel" href="/cv">
                  <span className="ch-label">CV</span>
                  <span className="ch-val">profile, skills, experience</span>
                  <span className="ch-arrow">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="hatched-band tall" aria-hidden="true"></div>

      <footer className="site-footer">
        <div className="footer-row">
          <span>● PENIEL.DEV</span>
          <span>© 2026 · ALL RIGHTS RESERVED</span>
          <span>BUILT WITH CARE</span>
        </div>
      </footer>

      {/* FAB reopen button */}
      <button className="t-reopen-fab" ref={tReopenFabRef} type="button">open terminal</button>

      {/* TERMINAL — docked fixed bottom */}
      <div className="terminal-zone">
        <div className="cs-wrapper">
          <div className="cs-card" ref={csCardRef}>
            <div className="t-titlebar">
              <div className="t-dots">
                <span className="t-dot red" ref={dotRedRef} data-tip="close"></span>
                <span className="t-dot yellow" ref={dotYellowRef} data-tip="minimize"></span>
                <span className="t-dot green" ref={dotGreenRef} data-tip="expand"></span>
              </div>
              <div className="t-title">
                <b>peniel.dev</b> — terminal <span className="zsh-badge">zsh</span>
              </div>
              <div ref={tTitleStatusRef} style={{ fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", fontSize: "11px", color: "var(--t-gray-dim)" }}></div>
            </div>
            <div className="t-screen" ref={tScreenRef} id="t-screen"></div>
            <div className="t-cmdbar" ref={tCmdbarRef} style={{ display: "none" }}>
              {["about","projects","go cv","go lab","contact","help","clear"].map((cmd) => (
                <button key={cmd} className="t-cbtn" data-cmd={cmd}>
                  <span className="sq">[</span>{cmd}<span className="sq">]</span>
                </button>
              ))}
            </div>
            <div className="t-input-row" ref={tInputRowRef} style={{ display: "none" }}>
              <span className="t-prompt">peniel@devops:~$</span>
              <input ref={tCliRef} autoComplete="off" spellCheck={false} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
