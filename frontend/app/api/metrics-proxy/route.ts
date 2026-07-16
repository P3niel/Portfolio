import { NextResponse } from "next/server";
import { DEMO_RUNTIME_REASON, isDemoRuntime } from "@/lib/runtime-mode";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const TIMEOUT_MS = 2500;

interface ParsedMetrics {
  requestRate: number | null;
  latencyP99: number | null;
  errorRate: number | null;
  modelVersion: string | null;
}

function demoMetrics(error?: string) {
  return {
    requestRate: 14.2,
    latencyP99: 0.118,
    errorRate: 0.002,
    modelVersion: "local-iris-1.0.0",
    source: "demo",
    upstream: null,
    checked_at: new Date().toISOString(),
    error,
  };
}

async function fetchWithTimeout(url: string, init?: RequestInit) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
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
  let durationCount = 0;
  let p99Bucket: number | null = null;
  const durationBuckets: { le: number; value: number }[] = [];

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

    if (metric.startsWith("http_request_duration_seconds_count")) {
      durationCount = value;
    }

    if (metric.startsWith("http_request_duration_seconds_bucket")) {
      const match = metric.match(/le="([^"]+)"/);
      if (match && match[1] !== "+Inf") {
        durationBuckets.push({ le: Number(match[1]), value });
      }
    }
  }

  if (durationCount > 0 && durationBuckets.length > 0) {
    const target = durationCount * 0.99;
    p99Bucket = durationBuckets
      .sort((a, b) => a.le - b.le)
      .find((bucket) => bucket.value >= target)?.le ?? null;
  }

  result.latencyP99 = p99Bucket;
  result.requestRate = totalRequests > 0 ? totalRequests / 60 : 0;
  result.errorRate = totalRequests > 0 ? errorRequests / totalRequests : 0;

  return result;
}

export async function GET() {
  if (isDemoRuntime()) return NextResponse.json(demoMetrics(DEMO_RUNTIME_REASON));

  try {
    const res = await fetchWithTimeout(`${API_URL}/metrics`, {
      cache: "no-store",
      headers: { Accept: "text/plain" },
    });

    if (!res.ok) {
      return NextResponse.json(demoMetrics(`upstream status ${res.status}`));
    }

    const text = await res.text();
    return NextResponse.json({
      ...parsePrometheusText(text),
      source: "live",
      upstream: `${API_URL}/metrics`,
      checked_at: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      demoMetrics(error instanceof Error ? error.message : "api unavailable")
    );
  }
}
