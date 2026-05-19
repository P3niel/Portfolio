"use client";

import Nav from "@/components/Nav";
import useSWR from "swr";
import { useRef, useState } from "react";
import StatusBadge from "@/components/lab/StatusBadge";
import MetricCard from "@/components/lab/MetricCard";
import ApiHealthPanel from "@/components/lab/ApiHealthPanel";
import MetricsChart from "@/components/lab/MetricsChart";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface HealthData {
  status: string;
  model_version: string;
  uptime_seconds: number;
}

interface MetricsData {
  requestRate: number | null;
  latencyP99: number | null;
  errorRate: number | null;
  modelVersion: string | null;
  error?: string;
}

interface MlflowData {
  model_name: string;
  latest_version: string | null;
  stage: string | null;
  last_updated: string | null;
  error?: string;
}

interface LabEvent {
  time: string;
  level: "info" | "warn" | "error";
  message: string;
}

const LEVEL_COLORS = {
  info: "text-ink-2",
  warn: "text-yellow-400",
  error: "text-red-400",
};

const MAX_CHART_POINTS = 20;

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

  const { data: events } = useSWR<LabEvent[]>(
    "/api/lab-events",
    fetcher,
    { refreshInterval: 30000, shouldRetryOnError: false }
  );

  const chartRef = useRef<{ time: string; latency: number }[]>([]);
  const [chartData, setChartData] = useState<{ time: string; latency: number }[]>([]);

  // Accumulate latency points for the chart
  if (metrics?.latencyP99 != null) {
    const point = {
      time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      latency: Math.round(metrics.latencyP99 * 1000),
    };
    const last = chartRef.current[chartRef.current.length - 1];
    if (!last || last.time !== point.time) {
      chartRef.current = [...chartRef.current.slice(-MAX_CHART_POINTS + 1), point];
      if (chartData.length !== chartRef.current.length) {
        setChartData([...chartRef.current]);
      }
    }
  }

  const apiStatus = healthLoading ? "loading" : health?.status === "ok" ? "ok" : "offline";
  const uptime = health?.uptime_seconds
    ? `${Math.floor(health.uptime_seconds / 3600)}h ${Math.floor((health.uptime_seconds % 3600) / 60)}m`
    : null;

  return (
    <div className="min-h-screen px-6 py-24">
      <Nav />
      <div className="max-w-2xl mx-auto">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-accent text-xs mb-2">
              <span className="text-ink-3">~/</span>lab
            </p>
            <h1 className="text-2xl font-bold text-ink">Lab</h1>
            <p className="text-ink-2 text-sm mt-1">Statut live de la plateforme MLOps.</p>
          </div>
          <StatusBadge status={apiStatus} />
        </header>

        {/* Row 1 — Metric cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <MetricCard
            label="API Status"
            value={health?.status ?? (healthLoading ? null : "offline")}
          />
          <MetricCard
            label="Model version"
            value={mlflow?.latest_version ?? health?.model_version ?? null}
            sub={mlflow?.stage ?? undefined}
          />
          <MetricCard
            label="Uptime"
            value={uptime}
          />
        </div>

        {/* Row 2 — Health panel + chart */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <ApiHealthPanel
            requestRate={metrics?.requestRate ?? null}
            latencyP99={metrics?.latencyP99 ?? null}
            errorRate={metrics?.errorRate ?? null}
          />
          <MetricsChart data={chartData} />
        </div>

        {/* Row 3 — Events */}
        <div className="p-4 rounded border border-rule bg-surface">
          <h3 className="text-xs text-accent uppercase tracking-widest mb-3">Events récents</h3>
          {events && events.length > 0 ? (
            <ul className="space-y-1">
              {events.map((ev, i) => (
                <li key={i} className="flex gap-3 text-xs font-mono">
                  <span className="text-ink-3 shrink-0">
                    {new Date(ev.time).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  <span className={LEVEL_COLORS[ev.level]}>{ev.message}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-ink-3 text-xs">Aucun événement.</p>
          )}
        </div>

        <p className="text-ink-3 text-xs mt-6 text-center">
          Rafraîchissement auto toutes les 15s{" "}
          <span className="text-accent">·</span>{" "}
          <a href="/projects/mlops-platform" className="hover:text-accent transition-colors underline underline-offset-4">
            voir le projet →
          </a>
        </p>
      </div>
    </div>
  );
}
