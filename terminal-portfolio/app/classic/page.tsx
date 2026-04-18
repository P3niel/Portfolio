"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  bootLines,
  mockToxicScore,
  projects,
  projectsById,
  skills,
} from "@/lib/projects";
import { TerminalFrame } from "@/components/terminal/TerminalFrame";
import { CommandButton } from "@/components/terminal/CommandButton";
import { TerminalLine } from "@/components/terminal/TerminalLine";

type Block =
  | { kind: "line"; prompt?: string; variant?: "dim" | "gray" | "accent" | "default" | "error"; text: string }
  | { kind: "tree"; items: { id: string; tag: string }[] }
  | { kind: "project"; id: string }
  | { kind: "run"; id: string };

const PROMPT = "peniel@devops:~$";

export default function ClassicPage() {
  const [booted, setBooted] = useState(false);
  const [bootIdx, setBootIdx] = useState(0);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histCursor, setHistCursor] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Boot sequence
  useEffect(() => {
    if (bootIdx < bootLines.length) {
      const t = setTimeout(() => setBootIdx((i) => i + 1), 380);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setBooted(true), 350);
    return () => clearTimeout(t);
  }, [bootIdx]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [blocks, bootIdx, booted]);

  useEffect(() => {
    if (booted) inputRef.current?.focus();
  }, [booted]);

  function push(b: Block) {
    setBlocks((prev) => [...prev, b]);
  }

  function echo(cmd: string) {
    push({ kind: "line", prompt: PROMPT, text: cmd });
  }

  function runCommand(raw: string) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    echo(cmd);
    setHistory((h) => [...h, cmd]);
    setHistCursor(-1);

    if (cmd === "help") {
      push({ kind: "line", variant: "gray", text: "available commands:" });
      push({ kind: "line", variant: "gray", text: "  about      — who I am" });
      push({ kind: "line", variant: "gray", text: "  projects   — explore projects" });
      push({ kind: "line", variant: "gray", text: "  skills     — stack & tools" });
      push({ kind: "line", variant: "gray", text: "  metrics    — live service metrics" });
      push({ kind: "line", variant: "gray", text: "  contact    — get in touch" });
      push({ kind: "line", variant: "gray", text: "  clear      — clear terminal" });
      return;
    }
    if (cmd === "about") {
      push({ kind: "line", text: "peniel — DevOps / MLOps engineer." });
      push({ kind: "line", variant: "gray", text: "I design reproducible ML pipelines and keep them boring in production." });
      push({ kind: "line", variant: "dim", text: "based: remote · stack: k8s, terraform, python, go" });
      return;
    }
    if (cmd === "skills") {
      push({ kind: "line", variant: "gray", text: `infra:    ${skills.infra.join(" · ")}` });
      push({ kind: "line", variant: "gray", text: `mlops:    ${skills.mlops.join(" · ")}` });
      push({ kind: "line", variant: "gray", text: `lang:     ${skills.languages.join(" · ")}` });
      push({ kind: "line", variant: "gray", text: `observe:  ${skills.observe.join(" · ")}` });
      return;
    }
    if (cmd === "projects") {
      push({
        kind: "tree",
        items: projects.map((p) => ({ id: p.id, tag: p.tags.slice(0, 2).join(" · ") })),
      });
      return;
    }
    if (cmd === "metrics") {
      push({ kind: "line", variant: "gray", text: "API status: online" });
      push({ kind: "line", variant: "gray", text: "requests:   1,240" });
      push({ kind: "line", variant: "gray", text: "latency:    120 ms" });
      push({ kind: "line", variant: "gray", text: "errors:     0.2%" });
      return;
    }
    if (cmd === "contact") {
      push({ kind: "line", variant: "gray", text: "email:   hi@peniel.dev" });
      push({ kind: "line", variant: "gray", text: "github:  github.com/peniel" });
      push({ kind: "line", variant: "gray", text: "li:      linkedin.com/in/peniel" });
      return;
    }
    if (cmd.startsWith("open ") || cmd.startsWith("cd ")) {
      const p = cmd.split(/\s+/)[1];
      if (projectsById[p]) push({ kind: "project", id: p });
      else push({ kind: "line", variant: "error", text: `no such project: ${p}` });
      return;
    }
    if (cmd.startsWith("run ")) {
      const p = cmd.split(/\s+/)[1];
      if (projectsById[p]) push({ kind: "run", id: p });
      else push({ kind: "line", variant: "error", text: `cannot run: ${p}` });
      return;
    }
    if (cmd === "clear") {
      setBlocks([]);
      return;
    }
    push({ kind: "line", variant: "error", text: `command not found: ${cmd} — try help` });
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next = histCursor < 0 ? history.length - 1 : Math.max(0, histCursor - 1);
      setHistCursor(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histCursor < 0) return;
      const next = histCursor + 1;
      if (next >= history.length) {
        setHistCursor(-1);
        setInput("");
      } else {
        setHistCursor(next);
        setInput(history[next]);
      }
    }
  }

  return (
    <main
      className="flex min-h-screen items-center justify-center px-4 py-10"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="w-full max-w-[1120px]">
        <div className="mb-3 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-gray-dim)]">
          <Link href="/" className="hover:text-[color:var(--color-green)]">
            ← all samples
          </Link>
          <span>sample 01 · classic</span>
        </div>

        <TerminalFrame title="peniel.dev — terminal" badge="zsh">
          <div
            ref={scrollRef}
            className="glow-soft flex min-h-[540px] flex-col gap-[6px] overflow-y-auto px-6 py-5 text-[14px] leading-[1.65]"
          >
            {/* Boot lines */}
            {bootLines.slice(0, bootIdx).map((l, i) => (
              <TerminalLine
                key={"boot" + i}
                variant={i === bootLines.length - 1 ? "accent" : "dim"}
              >
                {l}
              </TerminalLine>
            ))}

            {/* After boot */}
            {booted && (
              <>
                <div className="my-3 h-px bg-[color:var(--color-border)]" />
                <div className="glow-strong text-[20px] font-medium text-[#eafff5]">
                  welcome
                </div>
                <div className="text-[12.5px] text-[color:var(--color-gray)]">
                  Click a command or type{" "}
                  <span className="text-[color:var(--color-yellow)]">help</span>{" "}
                  to begin.{" "}
                  <span className="text-[color:var(--color-gray-dim)]">
                    (new here? try clicking <b>about</b>)
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-[10px]">
                  {["about", "projects", "skills", "metrics", "contact"].map((c) => (
                    <CommandButton key={c} label={c} onClick={() => runCommand(c)} />
                  ))}
                </div>

                {blocks.map((b, i) => renderBlock(b, i, runCommand))}
              </>
            )}
          </div>

          <div className="flex items-center gap-[10px] border-t border-[color:var(--color-border)] bg-[#0e0e0e] px-6 py-[10px]">
            <span className="text-[color:var(--color-green-dim)]">{PROMPT}</span>
            <input
              ref={inputRef}
              aria-label="terminal input"
              value={input}
              spellCheck={false}
              autoComplete="off"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              className="flex-1 bg-transparent text-[14px] text-[color:var(--color-green)] caret-[color:var(--color-green)] outline-none"
            />
            <span className="cursor-blink" aria-hidden />
          </div>
        </TerminalFrame>
      </div>
    </main>
  );
}

function renderBlock(
  b: Block,
  i: number,
  run: (c: string) => void,
): React.ReactNode {
  if (b.kind === "line") {
    return (
      <TerminalLine
        key={i}
        prompt={b.prompt}
        variant={b.variant ?? "default"}
      >
        {b.text}
      </TerminalLine>
    );
  }
  if (b.kind === "tree") {
    return (
      <div key={i} className="fade-in my-1 text-[13.5px] leading-[1.9]">
        <div className="text-[color:var(--color-green)]">projects/</div>
        {b.items.map((p, idx) => (
          <div key={p.id} className="text-[color:var(--color-gray)]">
            {" "}
            {idx === b.items.length - 1 ? "└──" : "├──"}{" "}
            <button
              onClick={() => run(`open ${p.id}`)}
              className="cursor-pointer rounded-sm px-1 text-[#d8ffe9] hover:bg-[color:var(--color-green)] hover:text-[color:var(--color-bg)]"
            >
              {p.id}
            </button>
            <span className="ml-[10px] text-[12px] text-[color:var(--color-gray-dim)]">
              {p.tag}
            </span>
          </div>
        ))}
      </div>
    );
  }
  if (b.kind === "project") {
    return <ProjectPanel key={i} id={b.id} onRun={() => run(`run ${b.id}`)} />;
  }
  if (b.kind === "run") {
    return <RunPanel key={i} id={b.id} />;
  }
  return null;
}

function ProjectPanel({ id, onRun }: { id: string; onRun: () => void }) {
  const p = projectsById[id];
  if (!p) return null;
  return (
    <div className="fade-in mt-3 rounded-[8px] border border-[color:var(--color-border-accent)] bg-gradient-to-b from-[rgba(0,255,156,0.04)] to-[rgba(0,255,156,0.01)] p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-semibold text-[#eafff5]">{p.title}</h3>
        <span className="text-[11px] text-[color:var(--color-gray-dim)]">
          [ esc ]
        </span>
      </div>
      <p className="mt-2 text-[13px] leading-[1.6] text-[color:var(--color-gray)]">
        {p.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-[6px]">
        {p.tags.map((t) => (
          <span
            key={t}
            className="rounded-sm border border-[rgba(255,209,102,0.3)] bg-[rgba(255,209,102,0.04)] px-2 py-[2px] text-[11.5px] text-[color:var(--color-yellow)]"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-[8px]">
        <CommandButton label="run" onClick={onRun} />
        <CommandButton label="github" onClick={() => window.open(`https://${p.github}`, "_blank")} />
        <CommandButton label="architecture" onClick={() => alert(p.architecture)} />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-[10px] md:grid-cols-3">
        <Metric k="requests served" v={p.metrics.requests} />
        <Metric k="latency (p95)" v={p.metrics.latency} accent />
        <Metric k="uptime (30d)" v={p.metrics.uptime} />
      </div>
    </div>
  );
}

function Metric({ k, v, accent = false }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="rounded-md border border-[color:var(--color-border)] bg-[rgba(255,255,255,0.015)] p-3">
      <div className="text-[11px] uppercase tracking-[0.06em] text-[color:var(--color-gray-dim)]">
        {k}
      </div>
      <div
        className={`mt-[2px] text-[18px] ${
          accent ? "text-[color:var(--color-yellow)]" : "text-[color:var(--color-green)]"
        }`}
      >
        {v}
      </div>
    </div>
  );
}

function RunPanel({ id }: { id: string }) {
  const [text, setText] = useState("");
  const [result, setResult] = useState<{ toxic: boolean; score: number } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { inputRef.current?.focus(); }, []);

  return (
    <div className="fade-in mt-3 rounded-md border border-dashed border-[color:var(--color-border-accent)] p-3">
      <div className="mb-1 text-[12px] text-[color:var(--color-gray)]">
        run {id} → Enter text:
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[color:var(--color-green-dim)]">&gt;</span>
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && text.trim()) {
              const s = mockToxicScore(text.trim());
              setResult({ toxic: s > 0.5, score: s });
            }
          }}
          placeholder="type a message and press enter..."
          className="flex-1 bg-transparent text-[14px] text-[color:var(--color-green)] caret-[color:var(--color-green)] outline-none"
        />
      </div>
      {result && (
        <div className="mt-2 text-[13px] text-[color:var(--color-gray)]">
          prediction:{" "}
          <b className="text-[color:var(--color-yellow)]">
            {result.toxic ? "toxic" : "non-toxic"}
          </b>
          <span
            className={`ml-2 inline-block rounded-sm border px-2 py-[1px] text-[11.5px] ${
              result.toxic
                ? "border-[rgba(255,107,107,0.25)] bg-[rgba(255,107,107,0.1)] text-[#ff8a8a]"
                : "border-[rgba(0,255,156,0.25)] bg-[rgba(0,255,156,0.08)] text-[color:var(--color-green)]"
            }`}
          >
            {result.score.toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
}
