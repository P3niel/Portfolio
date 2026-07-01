import { NextResponse } from "next/server";

interface LabEvent {
  time: string;
  level: "info" | "warn" | "error";
  message: string;
}

const TIMEOUT_MS = 2500;

function fallbackEvents(error?: string) {
  const now = Date.now();

  return {
    events: [
      { time: new Date(now).toISOString(), level: "info", message: "Demo control plane ready" },
      { time: new Date(now - 60000).toISOString(), level: "info", message: "Prediction probe completed on sample payload" },
      { time: new Date(now - 120000).toISOString(), level: "info", message: "Model local-iris-1.0.0 loaded" },
      { time: new Date(now - 180000).toISOString(), level: "warn", message: "Live Loki stream not configured" },
    ] satisfies LabEvent[],
    source: "demo",
    upstream: process.env.LOKI_URL ?? null,
    checked_at: new Date().toISOString(),
    error,
  };
}

async function fetchWithTimeout(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    return await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

export async function GET() {
  const LOKI_URL = process.env.LOKI_URL;

  if (LOKI_URL) {
    try {
      const end = Date.now() * 1e6;
      const start = end - 3600 * 1e9;
      const query = encodeURIComponent('{namespace="portfolio", app="api"}');
      const res = await fetchWithTimeout(
        `${LOKI_URL}/loki/api/v1/query_range?query=${query}&start=${start}&end=${end}&limit=10&direction=backward`
      );

      if (res.ok) {
        const data = await res.json();
        const events: LabEvent[] = (data.data?.result ?? [])
          .flatMap((stream: { values: [string, string][] }) =>
            stream.values.map(([ts, line]) => ({
              time: new Date(Number(ts) / 1e6).toISOString(),
              level: line.toLowerCase().includes("error") ? "error" as const
                : line.toLowerCase().includes("warn") ? "warn" as const
                : "info" as const,
              message: line.slice(0, 120),
            }))
          )
          .slice(0, 10);

        return NextResponse.json({
          events,
          source: "live",
          upstream: LOKI_URL,
          checked_at: new Date().toISOString(),
        });
      }
    } catch (error) {
      return NextResponse.json(
        fallbackEvents(error instanceof Error ? error.message : "loki unavailable")
      );
    }
  }

  return NextResponse.json(fallbackEvents("LOKI_URL not configured"));
}
