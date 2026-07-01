import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const TIMEOUT_MS = 2500;

function demoHealth(error?: string) {
  return {
    status: "demo",
    model_version: "local-iris-1.0.0",
    uptime_seconds: 21600,
    source: "demo",
    upstream: `${API_URL}/health`,
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

export async function GET() {
  try {
    const res = await fetchWithTimeout(`${API_URL}/health`, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json(demoHealth(`upstream status ${res.status}`));
    }

    const data = await res.json();
    return NextResponse.json({
      ...data,
      source: "live",
      upstream: `${API_URL}/health`,
      checked_at: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      demoHealth(error instanceof Error ? error.message : "api unavailable")
    );
  }
}
