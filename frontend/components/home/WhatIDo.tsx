import Link from "next/link";
import { whatIDo } from "@/lib/config";

const methodSteps = [
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
];

export default function WhatIDo() {
  return (
    <section id="what-i-do" className="brutal-section">
      <div className="brutal-frame">
        <div className="brutal-header">
          <div className="brutal-num">/02</div>
          <div className="brutal-title">WHAT I DO</div>
          <div className="brutal-meta">{String(whatIDo.length).padStart(2, "0")} · AREAS</div>
        </div>

        <p className="mb-4 max-w-2xl text-sm leading-6 text-ink-2">
          <strong className="font-semibold text-ink">AI Systems Engineer with a forward-deployed mindset.</strong>{" "}
          I enjoy working where product, engineering, and AI meet — not just writing code, but understanding
          problems, designing complete solutions, deploying them, and improving them through observability and
          feedback.
        </p>
        <div className="mb-6 flex flex-wrap gap-2">
          {["Product Thinking", "AI Engineering", "Software Architecture", "DevOps", "Cloud Infrastructure", "Observability"].map((tag) => (
            <span key={tag} className="contact-tag">{tag.toUpperCase()}</span>
          ))}
        </div>

        <div className="whatido-grid mb-6">
          {whatIDo.map((area) => (
            <div className="whatido-cell" key={area.title}>
              <div className="whatido-title">{area.title}</div>
              <p className="whatido-body">{area.body}</p>
            </div>
          ))}
        </div>

        <div className="method-grid">
          {methodSteps.map((item) => (
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
  );
}
