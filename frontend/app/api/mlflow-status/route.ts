import { NextResponse } from "next/server";

const MLFLOW_URI = process.env.MLFLOW_TRACKING_URI ?? "http://localhost:5000";
const MODEL_NAME = "portfolio-model";

export async function GET() {
  try {
    const [modelRes, versionRes] = await Promise.all([
      fetch(`${MLFLOW_URI}/api/2.0/mlflow/registered-models/get?name=${MODEL_NAME}`, {
        next: { revalidate: 60 },
      }),
      fetch(
        `${MLFLOW_URI}/api/2.0/mlflow/model-versions/search?filter=name%3D'${MODEL_NAME}'&order_by%5B%5D=version_number+DESC&max_results=1`,
        { next: { revalidate: 60 } }
      ),
    ]);

    if (!modelRes.ok || !versionRes.ok) {
      return NextResponse.json({ error: "mlflow unavailable" }, { status: 503 });
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
    });
  } catch {
    return NextResponse.json({ error: "mlflow unavailable" }, { status: 503 });
  }
}
