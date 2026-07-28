"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import useSWR from "swr";
import Nav from "@/components/Nav";
import StatusBadge from "@/components/lab/StatusBadge";
import MetricCard from "@/components/lab/MetricCard";
import MetricsChart from "@/components/lab/MetricsChart";
import { labConfig } from "@/lib/config";

const fetcher = (url: string) => fetch(url).then((r) => r.json());
const MAX_CHART_POINTS = 20;

type Source = "live" | "demo";
type LabStatus = "ok" | "demo" | "offline" | "loading";

interface SourceMeta {
  source?: Source;
  upstream?: string | null;
  checked_at?: string;
  error?: string;
}

interface HealthData extends SourceMeta {
  status: string;
  model_version: string;
  uptime_seconds: number;
}

interface MetricsData extends SourceMeta {
  requestRate: number | null;
  latencyP99: number | null;
  errorRate: number | null;
  modelVersion: string | null;
}

interface MlflowData extends SourceMeta {
  model_name: string;
  latest_version: string | null;
  stage: string | null;
  last_updated: string | null;
}

interface PredictionData extends SourceMeta {
  prediction: string;
  confidence: number;
  model_version: string;
  sample: {
    features: Record<string, number>;
  };
}

interface LabEvent {
  time: string;
  level: "info" | "warn" | "error";
  message: string;
}

interface EventsData extends SourceMeta {
  events: LabEvent[];
}

const LEVEL_COLORS = {
  info: "text-ink-2",
  warn: "text-yellow-300",
  error: "text-red-400",
};

function SourcePill({ source }: { source?: Source }) {
  const label = source === "live" ? "live" : source === "demo" ? "demo" : "pending";
  const styles = source === "live"
    ? "border-accent/30 bg-accent/10 text-accent"
    : source === "demo"
      ? "border-yellow-400/30 bg-yellow-400/10 text-yellow-300"
      : "border-rule bg-surface text-ink-3";

  return (
    <span className={`inline-flex border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] ${styles}`}>
      {label}
    </span>
  );
}

function Panel({
  title,
  source,
  children,
}: {
  title: string;
  source?: Source;
  children: ReactNode;
}) {
  return (
    <div className="border border-rule bg-surface/60 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-accent">{title}</h3>
        <SourcePill source={source} />
      </div>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-rule py-2 last:border-0">
      <span className="text-xs text-ink-3">{label}</span>
      <span className="text-right font-mono text-xs text-ink">{value}</span>
    </div>
  );
}

function formatTime(value?: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function formatUptime(seconds?: number) {
  if (!seconds) return null;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

export default function LabPage() {
  const { data: health, isLoading: healthLoading } = useSWR<HealthData>(
    "/api/health-proxy",
    fetcher,
    { refreshInterval: 15000, shouldRetryOnError: false }
  );

  const { data: metrics } = useSWR<MetricsData>(
    "/api/metrics-proxy",
    fetcher,
    { refreshInterval: 15000, shouldRetryOnError: false }
  );

  const { data: mlflow } = useSWR<MlflowData>(
    "/api/mlflow-status",
    fetcher,
    { refreshInterval: 60000, shouldRetryOnError: false }
  );

  const { data: prediction } = useSWR<PredictionData>(
    "/api/predict-proxy",
    fetcher,
    { refreshInterval: 20000, shouldRetryOnError: false }
  );

  const { data: eventStream } = useSWR<EventsData>(
    "/api/lab-events",
    fetcher,
    { refreshInterval: 30000, shouldRetryOnError: false }
  );

  const [chartData, setChartData] = useState<{ time: string; latency: number }[]>([]);

  useEffect(() => {
    if (metrics?.latencyP99 == null) return;

    const point = {
      time: formatTime(metrics.checked_at) ?? new Date().toLocaleTimeString("fr-FR"),
      latency: Math.round(metrics.latencyP99 * 1000),
    };

    setChartData((current) => {
      const last = current[current.length - 1];
      if (last?.time === point.time) return current;
      return [...current.slice(-MAX_CHART_POINTS + 1), point];
    });
  }, [metrics?.checked_at, metrics?.latencyP99]);

  const sources = useMemo(
    () => [health?.source, metrics?.source, mlflow?.source, prediction?.source, eventStream?.source].filter(Boolean) as Source[],
    [eventStream?.source, health?.source, metrics?.source, mlflow?.source, prediction?.source]
  );

  const mode: LabStatus = healthLoading
    ? "loading"
    : sources.length > 0 && sources.every((source) => source === "live")
      ? "ok"
      : sources.includes("demo")
        ? "demo"
        : "offline";

  const liveCount = sources.filter((source) => source === "live").length;
  const demoCount = sources.filter((source) => source === "demo").length;
  const lastChecked = [health, metrics, mlflow, prediction, eventStream]
    .map((item) => item?.checked_at)
    .filter(Boolean)
    .sort()
    .at(-1);

  const modeLabel = mode === "ok" ? "live" : mode === "demo" ? "demo controlled" : mode === "loading" ? "loading" : "offline";
  const modelVersion = mlflow?.latest_version ?? health?.model_version ?? metrics?.modelVersion ?? null;
  const latencyMs = metrics?.latencyP99 != null ? `${Math.round(metrics.latencyP99 * 1000)}` : null;
  const confidence = prediction?.confidence != null ? `${Math.round(prediction.confidence * 100)}%` : null;
  const events = eventStream?.events ?? [];

  return (
    <main className="min-h-screen px-6 py-24">
      <Nav />
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 border border-rule bg-surface/40 p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="mb-2 font-mono text-xs text-accent">
                <span className="text-ink-3">~/</span>lab
              </p>
              <h1 className="text-3xl font-bold text-ink">Runtime Lab</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-2">
                Controlled demonstration of API, metrics, model registry, event stream, and inference contracts.
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <StatusBadge status={mode} />
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
                live {liveCount} / demo {demoCount}
              </span>
            </div>
          </div>
        </header>

        {mode === "demo" && (
          <div className="mb-6 border border-yellow-400/40 bg-yellow-400/10 p-4">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-yellow-300">Demo mode · backend intentionally offline</p>
            <p className="mt-2 text-xs leading-6 text-ink-2">
              k3s, MLflow, Prometheus, Grafana and Loki are intentionally stopped to control infrastructure costs. The panels below use explicit sample payloads and do not represent live production metrics.
            </p>
          </div>
        )}

        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard label="Mode" value={modeLabel} sub={`checked ${formatTime(lastChecked) ?? "pending"}`} />
          <MetricCard label="Model" value={modelVersion} sub={mlflow?.stage ?? undefined} />
          <MetricCard label="P99 latency" value={latencyMs} unit="ms" sub={metrics?.source ?? undefined} />
          <MetricCard label="Prediction" value={prediction?.prediction ?? null} sub={confidence ? `confidence ${confidence}` : undefined} />
        </div>

        <div className="mb-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.7fr)]">
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Panel title="API metrics" source={metrics?.source}>
                <Row
                  label="Request rate"
                  value={metrics?.requestRate != null ? `${metrics.requestRate.toFixed(2)} req/s` : "-"}
                />
                <Row
                  label="Latency P99"
                  value={metrics?.latencyP99 != null ? `${Math.round(metrics.latencyP99 * 1000)} ms` : "-"}
                />
                <Row
                  label="Error rate"
                  value={metrics?.errorRate != null ? `${(metrics.errorRate * 100).toFixed(1)}%` : "-"}
                />
                <Row label="Upstream" value={metrics?.upstream ?? `${labConfig.apiUrl}/metrics`} />
              </Panel>

              <Panel title="Inference probe" source={prediction?.source}>
                <Row label="Endpoint" value={prediction?.upstream ?? `${labConfig.apiUrl}/predict`} />
                <Row label="Prediction" value={prediction?.prediction ?? "-"} />
                <Row label="Confidence" value={confidence ?? "-"} />
                <Row label="Version" value={prediction?.model_version ?? "-"} />
                {prediction?.sample && (
                  <div className="mt-3 border border-rule bg-bg p-3 font-mono text-[11px] leading-5 text-ink-2">
                    {Object.entries(prediction.sample.features).map(([key, value]) => (
                      <div key={key} className="flex justify-between gap-3">
                        <span className="text-ink-3">{key}</span>
                        <span className="text-accent">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Panel>
            </div>

            <Panel title="Latency trace" source={metrics?.source}>
              <MetricsChart data={chartData} bare />
            </Panel>
          </div>

          <div className="grid gap-4">
            <Panel title="Health" source={health?.source}>
              <Row label="Status" value={health?.status ?? (healthLoading ? "loading" : "-")} />
              <Row label="Model" value={health?.model_version ?? "-"} />
              <Row label="Uptime" value={formatUptime(health?.uptime_seconds) ?? "-"} />
              <Row label="Upstream" value={health?.upstream ?? `${labConfig.apiUrl}/health`} />
            </Panel>

            <Panel title="Model registry" source={mlflow?.source}>
              <Row label="Name" value={mlflow?.model_name ?? "portfolio-model"} />
              <Row label="Latest" value={mlflow?.latest_version ?? "-"} />
              <Row label="Stage" value={mlflow?.stage ?? "-"} />
              <Row label="Updated" value={formatTime(mlflow?.last_updated) ?? "-"} />
            </Panel>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <Panel title="Recent events" source={eventStream?.source}>
            {events.length > 0 ? (
              <ul className="space-y-1">
                {events.map((event, index) => (
                  <li key={`${event.time}-${index}`} className="flex gap-3 font-mono text-xs">
                    <span className="shrink-0 text-ink-3">{formatTime(event.time) ?? "--:--"}</span>
                    <span className={LEVEL_COLORS[event.level]}>{event.message}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-ink-3">No event yet.</p>
            )}
          </Panel>

          <Panel title="Connection contract" source={sources.includes("live") ? "live" : "demo"}>
            <div className="grid gap-2 font-mono text-xs">
              <Row label="NEXT_PUBLIC_API_URL" value={labConfig.apiUrl} />
              <Row label="/health" value={health?.upstream ?? `${labConfig.apiUrl}/health`} />
              <Row label="/metrics" value={metrics?.upstream ?? `${labConfig.apiUrl}/metrics`} />
              <Row label="/predict" value={prediction?.upstream ?? `${labConfig.apiUrl}/predict`} />
              <Row label="MLflow" value={mlflow?.upstream ?? labConfig.mlflowUrl} />
              <Row label="Grafana" value={labConfig.grafanaUrl} />
              <Row label="Loki" value={eventStream?.upstream ?? labConfig.lokiUrl} />
            </div>
          </Panel>
        </div>

        <p className="mt-6 text-center text-xs text-ink-3">
          Demo refresh 15s <span className="text-accent">·</span>{" "}
          <Link href="/projects/portfolio" className="underline underline-offset-4 transition-colors hover:text-accent">
            inspect portfolio case study
          </Link>
        </p>
      </div>
    </main>
  );
}
