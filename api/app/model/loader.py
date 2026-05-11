from __future__ import annotations

import os
from dataclasses import dataclass
from typing import Any

from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier

FEATURE_NAMES = [
    "sepal_length",
    "sepal_width",
    "petal_length",
    "petal_width",
]

CLASS_NAMES = ["setosa", "versicolor", "virginica"]


@dataclass
class ModelBundle:
    model: Any
    version: str
    source: str


def _load_local_fallback_model() -> ModelBundle:
    dataset = load_iris()
    model = RandomForestClassifier(
        n_estimators=200,
        random_state=42,
    )
    model.fit(dataset.data, dataset.target)

    return ModelBundle(
        model=model,
        version="local-iris-1.0.0",
        source="local-fallback",
    )


def _load_from_mlflow(model_name: str) -> ModelBundle | None:
    try:
        import mlflow
        from mlflow.tracking import MlflowClient
    except ModuleNotFoundError:
        return None

    tracking_uri = os.getenv("MLFLOW_TRACKING_URI", "http://localhost:5000")
    mlflow.set_tracking_uri(tracking_uri)
    client = MlflowClient(tracking_uri=tracking_uri)

    try:
        versions = list(client.search_model_versions(f"name='{model_name}'"))
    except Exception:
        return None

    if not versions:
        return None

    preferred = sorted(
        versions,
        key=lambda version: (
            0 if version.current_stage == "Production" else 1,
            0 if version.current_stage == "Staging" else 1,
            -int(version.version),
        ),
    )[0]

    model_uri = f"models:/{model_name}/{preferred.version}"

    try:
        model = mlflow.sklearn.load_model(model_uri)
    except Exception:
        return None

    return ModelBundle(
        model=model,
        version=str(preferred.version),
        source=f"mlflow:{preferred.current_stage or 'unassigned'}",
    )


def load_model_bundle() -> ModelBundle:
    model_name = os.getenv("MODEL_NAME", "portfolio-model")
    bundle = _load_from_mlflow(model_name)
    if bundle is not None:
        return bundle
    return _load_local_fallback_model()


def label_from_prediction(prediction: Any) -> str:
    if isinstance(prediction, str):
        return prediction

    try:
        index = int(prediction)
    except (TypeError, ValueError):
        return str(prediction)

    if 0 <= index < len(CLASS_NAMES):
        return CLASS_NAMES[index]
    return str(prediction)
