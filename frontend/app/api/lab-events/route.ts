import { NextResponse } from "next/server";

interface LabEvent {
  time: string;
  level: "info" | "warn" | "error";
  message: string;
}

const FALLBACK_EVENTS: LabEvent[] = [
  { time: new Date().toISOString(), level: "info", message: "API service started" },
  { time: new Date(Date.now() - 60000).toISOString(), level: "info", message: "Model v1.0.0 loaded from MLflow registry" },
  { time: new Date(Date.now() - 120000).toISOString(), level: "info", message: "Health check passed" },
];

export async function GET() {
  const LOKI_URL = process.env.LOKI_URL;

  if (LOKI_URL) {
    try {
      const end = Date.now() * 1e6;
      const start = end - 3600 * 1e9;
      const query = encodeURIComponent('{namespace="portfolio", app="api"}');
      const res = await fetch(
        `${LOKI_URL}/loki/api/v1/query_range?query=${query}&start=${start}&end=${end}&limit=10&direction=backward`,
        { next: { revalidate: 0 } }
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

        return NextResponse.json(events);
      }
    } catch {
      // fall through to static fallback
    }
  }

  return NextResponse.json(FALLBACK_EVENTS);
}
