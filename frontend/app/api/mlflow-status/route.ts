import { NextResponse } from "next/server";

const MLFLOW_URI = process.env.MLFLOW_TRACKING_URI ?? "http://localhost:5000";
const MODEL_NAME = "portfolio-model";
const TIMEOUT_MS = 2500;

function demoMlflow(error?: string) {
  return {
    model_name: MODEL_NAME,
    latest_version: "local-iris-1.0.0",
    stage: "Demo",
    last_updated: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    source: "demo",
    upstream: MLFLOW_URI,
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
  try {
    const [modelRes, versionRes] = await Promise.all([
      fetchWithTimeout(`${MLFLOW_URI}/api/2.0/mlflow/registered-models/get?name=${MODEL_NAME}`),
      fetchWithTimeout(
        `${MLFLOW_URI}/api/2.0/mlflow/model-versions/search?filter=name%3D'${MODEL_NAME}'&order_by%5B%5D=version_number+DESC&max_results=1`
      ),
    ]);

    if (!modelRes.ok || !versionRes.ok) {
      return NextResponse.json(
        demoMlflow(`upstream status ${modelRes.status}/${versionRes.status}`)
      );
    }

    const versionData = await versionRes.json();
    const latest = versionData.model_versions?.[0];

    return NextResponse.json({
      model_name: MODEL_NAME,
      latest_version: latest?.version ?? null,
      stage: latest?.current_stage ?? null,
      last_updated: latest?.last_updated_timestamp
        ? new Date(Number(latest.last_updated_timestamp)).toISOString()
        : null,
      source: "live",
      upstream: MLFLOW_URI,
      checked_at: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      demoMlflow(error instanceof Error ? error.message : "mlflow unavailable")
    );
  }
}
