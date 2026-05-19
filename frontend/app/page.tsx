"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { cv } from "@/lib/config";

// ─── Terminal project data ────────────────────────────────────────────────────

const termProjects: Record<string, {
  title: string; desc: string; tags: string[];
  metrics: { requests: string; latency: string; uptime: string; errors: string };
  arch: string; docker: string; env: string; git: string;
}> = {
  "toxic-ai": {
    title: "toxic-ai",
    desc: "Real-time toxic comment classifier served via FastAPI. PyTorch backbone trained on Jigsaw dataset.",
    tags: ["FastAPI 0.111", "PyTorch 2.3", "Docker 26", "MLflow 2.13", "GH Actions"],
    metrics: { requests: "12,480", latency: "120ms", uptime: "99.94%", errors: "0.2%" },
    arch: `ingress:443 ──▶ fastapi:8000 ──▶ torchserve:7070\n                  │               │\n             prometheus:9090  postgres:5432\n                  │\n             grafana:3000`,
    docker: `docker pull ghcr.io/peniel/toxic-ai:latest\ndocker run -p 8000:8000 \\\n  -e MODEL_URI=mlflow://models/toxic-ai/prod \\\n  -e PROMETHEUS_PORT=9090 \\\n  ghcr.io/peniel/toxic-ai:latest`,
    env: `MODEL_URI=mlflow://models/toxic-ai/prod\nDB_URL=postgresql://user:***@pg:5432/toxicai\nPROMETHEUS_PORT=9090\nLOG_LEVEL=info\nDEVICE=cuda`,
    git: `d3f1a2c feat: add confidence threshold env var\nb8e09f1 fix: memory leak in batch inference\na77c3e0 ci: add GPU smoke test to pipeline`,
  },
  "fraud-detection": {
    title: "fraud-detection",
    desc: "Streaming fraud detection pipeline. Kafka + Spark Structured Streaming. XGBoost re-trained nightly with Airflow.",
    tags: ["Kafka 3.7", "Spark 3.5", "XGBoost 2.1", "Airflow 2.9", "Terraform 1.8"],
    metrics: { requests: "4.2M/day", latency: "38ms", uptime: "99.99%", errors: "0.04%" },
    arch: `events ──▶ kafka:9092 ──▶ spark-streaming\n                          │\n                   feature-store:6566\n                          │\n                 xgboost-serving:8080 ──▶ postgres\n                          │\n                        s3://fraud-features`,
    docker: `docker pull ghcr.io/peniel/fraud-detection:latest\ndocker run -p 8080:8080 \\\n  -e KAFKA_BROKERS=kafka:9092 \\\n  -e FEATURE_STORE_URI=redis://fs:6379 \\\n  -e MODEL_PATH=/models/xgb_v12.ubj \\\n  ghcr.io/peniel/fraud-detection:latest`,
    env: `KAFKA_BROKERS=kafka:9092\nSPARK_MASTER=spark://master:7077\nFEATURE_STORE_URI=redis://fs:6379\nMODEL_PATH=/models/xgb_v12.ubj\nALERT_THRESHOLD=0.82`,
    git: `f91bc3a feat: bump model to v12, F1 0.97\nc3d02e1 ops: terraform add spot node group\n77aa81f fix: dedup key collision in feature store`,
  },
  "air-quality": {
    title: "air-quality",
    desc: "IoT air-quality forecaster (LSTM) with geospatial features. Edge inference on k3s Raspberry Pi clusters.",
    tags: ["TensorFlow 2.16", "MQTT 5", "Grafana 11", "K3s 1.30", "Helm 3.15"],
    metrics: { requests: "820/min", latency: "64ms", uptime: "99.7%", errors: "0.1%" },
    arch: `sensors ──▶ mqtt:1883 ──▶ k3s-edge (rpi-cluster)\n                   │            │\n            influxdb:8086   lstm-serving:8501\n                   │\n             grafana:3000 ──▶ dashboard`,
    docker: `# edge node (ARM64)\ndocker pull ghcr.io/peniel/air-quality-edge:latest-arm64\ndocker run --device /dev/ttyUSB0 \\\n  -e MQTT_BROKER=mqtt:1883 \\\n  -e INFLUX_URL=http://influxdb:8086 \\\n  ghcr.io/peniel/air-quality-edge:latest-arm64`,
    env: `MQTT_BROKER=mqtt:1883\nINFLUX_URL=http://influxdb:8086\nINFLUX_TOKEN=***\nLSTM_MODEL_PATH=/models/air_quality_v3.h5\nFORECAST_HORIZON=24h`,
    git: `e2b9f31 feat: LSTM v3 — MAE -18% on PM2.5\nd190c82 ops: helm chart for k3s edge deploy\nb3a14cc fix: mqtt reconnect backoff on network drop`,
  },
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

    function updateHero() {
      const rect = hero!.getBoundingClientRect();
      const scrollable = hero!.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / scrollable));
      stage!.style.setProperty("--p", p.toFixed(4));
    }

    window.addEventListener("scroll", updateHero, { passive: true });
    window.addEventListener("resize", updateHero);
    updateHero();
    return () => {
      window.removeEventListener("scroll", updateHero);
      window.removeEventListener("resize", updateHero);
    };
  }, []);

  // ── navbar active state + motion-footer shadow ───────────────────────────
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav-link"));
    const mfs = mfsRef.current;

    function onScroll() {
      const sy = window.scrollY;

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

      if (mfs) mfs.classList.toggle("visible", sy > 80);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
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
        <div class="t-line t-muted">&nbsp;&nbsp;<span class="t-accent-t">open &lt;id&gt;</span>  — project detail + docker + env + git</div>
        <div class="t-line t-muted">&nbsp;&nbsp;<span class="t-accent-t">skills</span>     — full stack + versions</div>
        <div class="t-line t-muted">&nbsp;&nbsp;<span class="t-accent-t">metrics</span>    — live service metrics</div>
        <div class="t-line t-muted">&nbsp;&nbsp;<span class="t-accent-t">contact</span>    — reach out</div>
        <div class="t-line t-muted">&nbsp;&nbsp;<span class="t-accent-t">clear</span>      — clear terminal</div>
      `);
    } else if (cmd === "about") {
      appendHTML(`
        <div class="t-line t-muted">whoami:</div>
        <div class="t-line">&nbsp;&nbsp;${cv.name} — ${cv.title}</div>
        <div class="t-line t-muted">uname -a:</div>
        <div class="t-line">&nbsp;&nbsp;Linux devops 6.6.32 #1 SMP x86_64 GNU/Linux</div>
        <div class="t-line t-muted">uptime:</div>
        <div class="t-line">&nbsp;&nbsp;6 years experience, currently: remote</div>
        <div class="t-line t-muted">env | grep STACK:</div>
        <div class="t-line">&nbsp;&nbsp;PRIMARY=kubernetes,terraform,python,go</div>
        <div class="t-line">&nbsp;&nbsp;CLOUD=aws,gcp</div>
        <div class="t-line">&nbsp;&nbsp;MLOPS=mlflow,kubeflow,airflow,bentoml</div>
        <div class="t-line t-muted">cat /etc/contact:</div>
        <div class="t-line">&nbsp;&nbsp;email: ${cv.contact.email}</div>
        <div class="t-line">&nbsp;&nbsp;gh:    github.com/peniel</div>
      `);
    } else if (cmd === "projects") {
      const ids = Object.keys(termProjects);
      let html = `<div class="t-line t-muted">ls ~/projects/</div>`;
      ids.forEach((id, i) => {
        const p = termProjects[id];
        const prefix = i === ids.length - 1 ? "└──" : "├──";
        html += `<div class="t-line"><span class="t-ok">&nbsp;${prefix} <span class="t-accent-t pclink" data-open="${id}" style="cursor:pointer;text-decoration:underline">${id}/</span></span><span class="t-dim">&nbsp;&nbsp;# ${p.desc.split(".")[0]}</span></div>`;
      });
      html += `<div class="t-line t-dim" style="margin-top:4px">&nbsp;→ type <span class="t-accent-t">open &lt;id&gt;</span> for full detail</div>`;
      const blk = appendHTML(html);
      blk?.querySelectorAll<HTMLElement>(".pclink").forEach((n) => {
        n.addEventListener("click", () => runCommand("open " + n.dataset.open));
      });
    } else if (cmd.startsWith("open ")) {
      const id = cmd.split(/\s+/)[1];
      const p = termProjects[id];
      if (!p) { appendHTML(`<div class="t-line t-err">no such project: ${id}</div>`); return; }
      appendHTML(`
        <div class="t-line"><span class="t-section">══ ${p.title} ══</span></div>
        <div class="t-line t-muted"># ${p.desc}</div>
        <div class="t-spacer"></div>
        <div class="t-line t-dim">## tags</div>
        <div class="t-line">&nbsp;&nbsp;${p.tags.map((t) => `<span class="t-accent-t">${t}</span>`).join(" &nbsp;·&nbsp; ")}</div>
        <div class="t-spacer"></div>
        <div class="t-line t-dim">## metrics</div>
        <div class="t-line">&nbsp;&nbsp;requests: <span class="t-ok">${p.metrics.requests}</span>&nbsp;&nbsp;latency: <span class="t-ok">${p.metrics.latency}</span>&nbsp;&nbsp;uptime: <span class="t-ok">${p.metrics.uptime}</span>&nbsp;&nbsp;errors: <span class="t-accent-t">${p.metrics.errors}</span></div>
        <div class="t-spacer"></div>
        <div class="t-line t-dim">## architecture</div>
        <div style="font-family:var(--font-mono,'JetBrains Mono',monospace);font-size:12px;color:var(--t-gray);white-space:pre;padding:6px 16px;border-left:2px solid var(--t-border-strong);margin:4px 0">${p.arch}</div>
        <div class="t-spacer"></div>
        <div class="t-line t-dim">## docker</div>
        <div style="font-family:var(--font-mono,'JetBrains Mono',monospace);font-size:12px;color:var(--t-green);white-space:pre;padding:6px 16px;background:rgba(0,255,156,.03);border-radius:4px;margin:4px 0">${p.docker}</div>
        <div class="t-spacer"></div>
        <div class="t-line t-dim">## env vars</div>
        <div style="font-family:var(--font-mono,'JetBrains Mono',monospace);font-size:12px;color:var(--t-gray);white-space:pre;padding:6px 16px;border-left:2px solid var(--t-border);margin:4px 0">${p.env}</div>
        <div class="t-spacer"></div>
        <div class="t-line t-dim">## git log --oneline -3</div>
        <div style="font-family:var(--font-mono,'JetBrains Mono',monospace);font-size:12px;color:var(--t-gray);white-space:pre;padding:6px 16px;margin:4px 0">${p.git}</div>
      `);
    } else if (cmd === "skills") {
      appendHTML(`
        <div class="t-line t-dim">## infra</div>
        <div class="t-line">&nbsp;&nbsp;<span class="t-ok">kubernetes 1.30 · terraform 1.8 · aws · gcp · helm 3.15 · argo-cd 2.11</span></div>
        <div class="t-line t-dim">## mlops</div>
        <div class="t-line">&nbsp;&nbsp;<span class="t-ok">mlflow 2.13 · kubeflow 1.9 · airflow 2.9 · dvc 3.5 · bentoml 1.3 · feast 0.40</span></div>
        <div class="t-line t-dim">## languages</div>
        <div class="t-line">&nbsp;&nbsp;<span class="t-ok">python 3.12 · go 1.22 · bash 5.2 · typescript 5.4</span></div>
        <div class="t-line t-dim">## observability</div>
        <div class="t-line">&nbsp;&nbsp;<span class="t-ok">prometheus 2.52 · grafana 11.0 · loki 3.0 · opentelemetry 0.51</span></div>
        <div class="t-line t-dim">## containers</div>
        <div class="t-line">&nbsp;&nbsp;<span class="t-ok">docker 26 · containerd 1.7 · buildkit 0.14 · kaniko 1.23</span></div>
      `);
    } else if (cmd === "metrics") {
      const now = new Date().toISOString().replace("T", " ").slice(0, 19);
      appendHTML(`
        <div class="t-line t-dim">## kubectl top pods --all-namespaces  (${now})</div>
        <div class="t-line"><span class="t-muted">NAMESPACE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NAME&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CPU&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MEMORY</span></div>
        <div class="t-line"><span class="t-ok">mlops&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;toxic-ai-6d9f4-xhk2p&nbsp;&nbsp;&nbsp;142m&nbsp;&nbsp;&nbsp;&nbsp;812Mi</span></div>
        <div class="t-line"><span class="t-ok">mlops&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fraud-det-79c8b-n2kq7&nbsp;&nbsp;384m&nbsp;&nbsp;&nbsp;&nbsp;1.2Gi</span></div>
        <div class="t-line"><span class="t-ok">iot&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;air-quality-rpi-0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;61m&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;256Mi</span></div>
        <div class="t-spacer"></div>
        <div class="t-line t-dim">## prometheus query: avg(rate(http_requests_total[5m]))</div>
        <div class="t-line">&nbsp;&nbsp;toxic-ai:        <span class="t-ok">14.2 req/s</span></div>
        <div class="t-line">&nbsp;&nbsp;fraud-detection: <span class="t-ok">48.6 req/s</span></div>
        <div class="t-line">&nbsp;&nbsp;air-quality:     <span class="t-ok">13.7 req/s</span></div>
      `);
    } else if (cmd === "contact") {
      appendHTML(`
        <div class="t-line t-dim">cat /etc/peniel/contact.env</div>
        <div class="t-line">&nbsp;&nbsp;EMAIL=${cv.contact.email}</div>
        <div class="t-line">&nbsp;&nbsp;GITHUB=${cv.contact.github}</div>
        <div class="t-line">&nbsp;&nbsp;LINKEDIN=${cv.contact.linkedin}</div>
        <div class="t-line">&nbsp;&nbsp;CALENDAR=cal.com/peniel</div>
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

  const bootSequence = useCallback(() => {
    if (bootedRef.current) return;
    bootedRef.current = true;
    const lines = [
      { t: "> booting peniel@devops...", cls: "t-dim" },
      { t: "> kernel: Linux 6.6.32-k8s #1 SMP x86_64", cls: "t-dim" },
      { t: "> loading modules: [kubelet, containerd, mlflow, prometheus]", cls: "t-dim" },
      { t: "> mount: /dev/models → /mnt/mlflow ... ok", cls: "t-dim" },
      { t: "> ssh tunnel established: 10.0.0.4:22 ↔ devops-cluster", cls: "t-dim" },
      { t: "> env: KUBECONFIG=/home/peniel/.kube/config", cls: "t-dim" },
      { t: "> context: k3s_prod-cluster_portfolio", cls: "t-dim" },
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

      if (e.deltaY < 0) {
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
            <div className="hud-corner"><span className="hud-mark">●</span><span>FIG. 01 — PENIEL</span></div>
            <div className="hud-corner right"><span>STATUS</span><span className="hud-status">● ONLINE</span></div>
          </div>
          <div className="hero-headline-wrap">
            <div className="hero-label">&#47;&#47; model — devops engineer</div>
            <h1 className="hero-headline">
              DevOps &amp;<br/>
              MLOps <em>engineer.</em>
            </h1>
            <p className="hero-bio">
              I design reproducible ML pipelines and keep them boring in production.
              Six years shipping models from notebook to cluster.
            </p>
            <div className="hero-cta-row">
              <a href="#projects" className="hero-cta primary">
                <span>See work</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </a>
              <a href="#contact" className="hero-cta">Get in touch</a>
            </div>
          </div>
          <div className="hero-spec-card">
            <div className="spec-header">
              <span className="spec-label">MODEL</span>
              <span className="spec-code">PNL — 2024</span>
            </div>
            <div className="spec-body">
              <div className="spec-row"><span>STACK</span><span>K8S · TF · PY · GO</span></div>
              <div className="spec-row"><span>FOCUS</span><span>ML INFRA</span></div>
              <div className="spec-row"><span>YEARS</span><span>6+</span></div>
              <div className="spec-row"><span>BASE</span><span>REMOTE / EU</span></div>
              <div className="spec-row"><span>STATUS</span><span className="ok">OPEN TO WORK</span></div>
            </div>
            <div className="spec-footer"><span>↳ updated 12.05.2026</span></div>
          </div>
          <div className="hero-preview-card">
            <div className="preview-thumb">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <div className="preview-text">
              <div className="preview-eyebrow">WATCH</div>
              <div className="preview-title">3-min intro</div>
            </div>
          </div>
          <div className="hero-bottom-strip">
            <span>● 6+ YEARS EXP</span>
            <span>● BASED IN EU</span>
            <span className="scroll-cue">SCROLL TO ZOOM OUT <span className="cue-arrow">↓</span></span>
          </div>
        </div>
      </section>

      {/* /03 SELECTED WORK */}
      <section id="projects" className="brutal-section">
        <div className="brutal-frame">
          <div className="brutal-header">
            <div className="brutal-num">/03</div>
            <div className="brutal-title">SELECTED WORK</div>
            <div className="brutal-meta">03 · ACTIVE</div>
          </div>
          <div className="proj-grid">
            <a className="proj-cell" href="#">
              <div className="proj-thumb">
                <div className="thumb-overlay"></div>
                <div className="thumb-content">
                  <pre className="thumb-code">{`> POST /classify
{ "text": "..." }
─────────────
prediction: `}<span className="thumb-warn">toxic</span>{`
score: 0.94
latency: 118ms`}</pre>
                </div>
                <div className="thumb-grid"></div>
              </div>
              <div className="proj-meta">
                <div className="proj-name">TOXIC_AI</div>
                <div className="proj-sub">NLP · FASTAPI</div>
                <div className="proj-arrow">↗</div>
              </div>
            </a>
            <a className="proj-cell" href="#">
              <div className="proj-thumb">
                <div className="thumb-overlay"></div>
                <div className="thumb-content">
                  <svg className="thumb-chart" viewBox="0 0 200 100" preserveAspectRatio="none">
                    <polyline points="0,80 20,60 35,75 50,40 65,55 80,30 100,45 115,20 130,38 150,15 170,28 200,10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                    <polyline points="0,90 20,82 35,85 50,70 65,75 80,60 100,68 115,55 130,62 150,48 170,55 200,42" fill="none" stroke="currentColor" strokeWidth="1" opacity=".4"/>
                    <circle cx="80" cy="30" r="2.5" fill="currentColor"/>
                    <circle cx="115" cy="20" r="2.5" fill="currentColor"/>
                    <circle cx="150" cy="15" r="2.5" fill="currentColor"/>
                  </svg>
                  <div className="thumb-stat"><span>EVENTS/D</span><span className="thumb-stat-val">4.2M</span></div>
                </div>
                <div className="thumb-grid"></div>
              </div>
              <div className="proj-meta">
                <div className="proj-name">FRAUD_DETECTION</div>
                <div className="proj-sub">STREAMING · XGB</div>
                <div className="proj-arrow">↗</div>
              </div>
            </a>
            <a className="proj-cell" href="#">
              <div className="proj-thumb">
                <div className="thumb-overlay"></div>
                <div className="thumb-content">
                  <div className="thumb-nodes">
                    <span className="node" style={{top:"18%",left:"24%"}}></span>
                    <span className="node" style={{top:"34%",left:"62%"}}></span>
                    <span className="node" style={{top:"52%",left:"38%"}}></span>
                    <span className="node" style={{top:"68%",left:"78%"}}></span>
                    <span className="node" style={{top:"42%",left:"14%"}}></span>
                    <span className="node alert" style={{top:"24%",left:"80%"}}></span>
                    <svg className="node-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <line x1="24" y1="18" x2="62" y2="34"/><line x1="62" y1="34" x2="38" y2="52"/>
                      <line x1="38" y1="52" x2="78" y2="68"/><line x1="14" y1="42" x2="38" y2="52"/>
                      <line x1="62" y1="34" x2="80" y2="24"/>
                    </svg>
                  </div>
                  <div className="thumb-stat"><span>EDGE NODES</span><span className="thumb-stat-val">42</span></div>
                </div>
                <div className="thumb-grid"></div>
              </div>
              <div className="proj-meta">
                <div className="proj-name">AIR_QUALITY</div>
                <div className="proj-sub">IoT · LSTM</div>
                <div className="proj-arrow">↗</div>
              </div>
            </a>
            <a className="proj-cell" href="#">
              <div className="proj-thumb">
                <div className="thumb-overlay"></div>
                <div className="thumb-content">
                  <div className="thumb-mark">
                    <svg viewBox="0 0 100 100" width="64" height="64">
                      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1"/>
                      <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4"/>
                      <circle cx="50" cy="50" r="14" fill="currentColor"/>
                      <line x1="2" y1="50" x2="20" y2="50" stroke="currentColor"/>
                      <line x1="80" y1="50" x2="98" y2="50" stroke="currentColor"/>
                      <line x1="50" y1="2" x2="50" y2="20" stroke="currentColor"/>
                      <line x1="50" y1="80" x2="50" y2="98" stroke="currentColor"/>
                    </svg>
                  </div>
                  <div className="thumb-stat"><span>OS · LAB</span><span className="thumb-stat-val">v0.4</span></div>
                </div>
                <div className="thumb-grid"></div>
              </div>
              <div className="proj-meta">
                <div className="proj-name">DEVOPS_LAB</div>
                <div className="proj-sub">OPEN SOURCE · CLI</div>
                <div className="proj-arrow">↗</div>
              </div>
            </a>
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

      <div className="hatched-band" aria-hidden="true"></div>

      {/* /05 SYSTEM STATUS */}
      <section id="metrics" className="brutal-section">
        <div className="brutal-frame">
          <div className="brutal-header">
            <div className="brutal-num">/05</div>
            <div className="brutal-title">SYSTEM STATUS</div>
            <div className="brutal-meta">LIVE · UTC+1</div>
          </div>
          <div className="status-block">
            {[
              { label: "REQUESTS_SERVED", w: "84%", val: "17.2M", ok: false },
              { label: "AVG_LATENCY_P95", w: "32%", val: "74 MS", ok: false },
              { label: "UPTIME_30D",      w: "99%", val: "99.88%", ok: false },
              { label: "MODELS_IN_PROD",  w: "50%", val: "03 / 06", ok: false },
              { label: "CICD_PIPELINES",  w: "67%", val: "08", ok: false },
              { label: "INFRA_AS_CODE",   w: "100%", val: "100%", ok: false },
              { label: "NETWORK",         w: "100%", val: "SECURE", ok: true },
            ].map((r) => (
              <div className="status-row" key={r.label}>
                <span className="status-label">{r.label}</span>
                <div className="status-bar"><div className="status-fill" style={{ width: r.w }}></div></div>
                <span className={`status-value${r.ok ? " ok" : ""}`}>{r.val}</span>
              </div>
            ))}
          </div>
          <div className="status-banner">
            <span className="banner-bar"></span>
            <span className="banner-text">● ALL SYSTEMS OPERATIONAL</span>
            <span className="banner-bar"></span>
          </div>
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
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="ENTER YOUR EMAIL" />
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
                  <span className="ch-val">github.com/peniel</span>
                  <span className="ch-arrow">↗</span>
                </a>
                <a className="contact-channel" href={cv.contact.linkedin} target="_blank" rel="noopener noreferrer">
                  <span className="ch-label">LINKEDIN</span>
                  <span className="ch-val">linkedin.com/in/peniel</span>
                  <span className="ch-arrow">↗</span>
                </a>
                <a className="contact-channel" href="#">
                  <span className="ch-label">CAL</span>
                  <span className="ch-val">cal.com/peniel</span>
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
              {["about","projects","skills","metrics","contact","help","clear"].map((cmd) => (
                <button key={cmd} className="t-cbtn" data-cmd={cmd}>
                  <span className="sq">[</span>{cmd}<span className="sq">]</span>
                </button>
              ))}
            </div>
            <div className="t-input-row" ref={tInputRowRef} style={{ display: "none" }}>
              <span className="t-prompt">peniel@devops:~$</span>
              <input ref={tCliRef} autoComplete="off" spellCheck={false} />
              <span className="t-cursor"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
