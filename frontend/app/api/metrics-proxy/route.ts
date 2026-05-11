import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

interface ParsedMetrics {
  requestRate: number | null;
  latencyP99: number | null;
  errorRate: number | null;
  modelVersion: string | null;
}

function parsePrometheusText(text: string): ParsedMetrics {
  const result: ParsedMetrics = {
    requestRate: null,
    latencyP99: null,
    errorRate: null,
    modelVersion: null,
  };

  const lines = text.split("\n").filter((l) => !l.startsWith("#") && l.trim());

  let totalRequests = 0;
  let errorRequests = 0;

  for (const line of lines) {
    const [metric, rawValue] = line.split(" ").filter(Boolean);
    if (!metric || rawValue === undefined) continue;
    const value = parseFloat(rawValue);
    if (isNaN(value)) continue;

    if (metric.startsWith("http_requests_total")) {
      totalRequests += value;
      if (metric.includes('status="5')) errorRequests += value;
    }

    if (metric.startsWith("model_version_info{")) {
      const match = metric.match(/version="([^"]+)"/);
      if (match) result.modelVersion = match[1];
    }

    if (metric.startsWith("http_request_duration_seconds_sum")) {
      result.latencyP99 = value > 0 ? value / Math.max(totalRequests, 1) : 0;
    }
  }

  result.requestRate = totalRequests > 0 ? totalRequests / 60 : 0;
  result.errorRate = totalRequests > 0 ? errorRequests / totalRequests : 0;

  return result;
}

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/metrics`, {
      next: { revalidate: 0 },
      headers: { Accept: "text/plain" },
    });

    if (!res.ok) return NextResponse.json({ error: "api unavailable" }, { status: 503 });

    const text = await res.text();
    return NextResponse.json(parsePrometheusText(text));
  } catch {
    return NextResponse.json({ error: "api unavailable" }, { status: 503 });
  }
}
