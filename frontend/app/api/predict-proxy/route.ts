import { NextResponse } from "next/server";
import { DEMO_RUNTIME_REASON, isDemoRuntime } from "@/lib/runtime-mode";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const TIMEOUT_MS = 2500;

const SAMPLE_PAYLOAD = {
  features: {
    sepal_length: 5.1,
    sepal_width: 3.5,
    petal_length: 1.4,
    petal_width: 0.2,
  },
};

function demoPrediction(error?: string) {
  return {
    prediction: "setosa",
    confidence: 0.972,
    model_version: "local-iris-1.0.0",
    sample: SAMPLE_PAYLOAD,
    source: "demo",
    upstream: null,
    checked_at: new Date().toISOString(),
    error,
  };
}

async function fetchWithTimeout(url: string, init: RequestInit) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

export async function GET() {
  if (isDemoRuntime()) return NextResponse.json(demoPrediction(DEMO_RUNTIME_REASON));

  try {
    const res = await fetchWithTimeout(`${API_URL}/predict`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(SAMPLE_PAYLOAD),
    });

    if (!res.ok) {
      return NextResponse.json(demoPrediction(`upstream status ${res.status}`));
    }

    const data = await res.json();
    return NextResponse.json({
      ...data,
      sample: SAMPLE_PAYLOAD,
      source: "live",
      upstream: `${API_URL}/predict`,
      checked_at: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      demoPrediction(error instanceof Error ? error.message : "api unavailable")
    );
  }
}
