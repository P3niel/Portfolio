from __future__ import annotations

import os

from mlflow.tracking import MlflowClient

MODEL_NAME = os.getenv("MODEL_NAME", "portfolio-model")
MLFLOW_TRACKING_URI = os.getenv("MLFLOW_TRACKING_URI", "http://localhost:5000")


def _latest_version_for_stage(client: MlflowClient, stage: str):
    versions = [
        version
        for version in client.search_model_versions(f"name='{MODEL_NAME}'")
        if version.current_stage == stage
    ]
    if not versions:
        return None
    return sorted(versions, key=lambda version: int(version.version), reverse=True)[0]


def _accuracy_for_version(client: MlflowClient, version) -> float:
    run = client.get_run(version.run_id)
    accuracy = run.data.metrics.get("accuracy")
    if accuracy is None:
        raise RuntimeError(
            f"Missing accuracy metric for model version {version.version}"
        )
    return float(accuracy)


def main() -> None:
    client = MlflowClient(tracking_uri=MLFLOW_TRACKING_URI)

    staging_version = _latest_version_for_stage(client, "Staging")
    if staging_version is None:
        raise RuntimeError("No Staging model version available")

    production_version = _latest_version_for_stage(client, "Production")
    staging_accuracy = _accuracy_for_version(client, staging_version)

    if production_version is None:
        client.transition_model_version_stage(
            name=MODEL_NAME,
            version=staging_version.version,
            stage="Production",
            archive_existing_versions=True,
        )
        print(
            f"Promoted Staging version {staging_version.version} to Production "
            f"(no existing Production version)"
        )
        return

    production_accuracy = _accuracy_for_version(client, production_version)

    if staging_accuracy > production_accuracy:
        client.transition_model_version_stage(
            name=MODEL_NAME,
            version=staging_version.version,
            stage="Production",
            archive_existing_versions=True,
        )
        print(
            f"Promoted version {staging_version.version} to Production "
            f"({staging_accuracy:.4f} > {production_accuracy:.4f})"
        )
        return

    print(
        f"Kept Production version {production_version.version} "
        f"({production_accuracy:.4f} >= {staging_accuracy:.4f})"
    )


if __name__ == "__main__":
    main()
