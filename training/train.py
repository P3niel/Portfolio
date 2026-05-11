from __future__ import annotations

import os

import mlflow
import mlflow.sklearn
from mlflow.models import infer_signature
from mlflow.tracking import MlflowClient
from mlflow.exceptions import MlflowException
from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split

MODEL_NAME = os.getenv("MODEL_NAME", "portfolio-model")
MLFLOW_TRACKING_URI = os.getenv("MLFLOW_TRACKING_URI", "http://localhost:5000")
EXPERIMENT_NAME = os.getenv("MLFLOW_EXPERIMENT_NAME", "portfolio-ml")


def main() -> None:
    mlflow.set_tracking_uri(MLFLOW_TRACKING_URI)
    mlflow.set_experiment(EXPERIMENT_NAME)

    dataset = load_iris(as_frame=True)
    features = dataset.data.rename(
        columns={
            "sepal length (cm)": "sepal_length",
            "sepal width (cm)": "sepal_width",
            "petal length (cm)": "petal_length",
            "petal width (cm)": "petal_width",
        }
    )
    target = dataset.target

    x_train, x_test, y_train, y_test = train_test_split(
        features,
        target,
        test_size=0.2,
        random_state=42,
        stratify=target,
    )

    model = RandomForestClassifier(
        n_estimators=200,
        random_state=42,
    )
    model.fit(x_train, y_train)

    predictions = model.predict(x_test)
    accuracy = accuracy_score(y_test, predictions)
    signature = infer_signature(x_train, model.predict(x_train))
    input_example = x_test.head(3)

    with mlflow.start_run() as run:
        mlflow.log_param("model_name", MODEL_NAME)
        mlflow.log_param("model_type", "RandomForestClassifier")
        mlflow.log_param("n_estimators", 200)
        mlflow.log_param("random_state", 42)
        mlflow.log_param("test_size", 0.2)
        mlflow.log_metric("accuracy", accuracy)

        mlflow.sklearn.log_model(
            sk_model=model,
            artifact_path="model",
            signature=signature,
            input_example=input_example,
        )

        run_id = run.info.run_id

    client = MlflowClient(tracking_uri=MLFLOW_TRACKING_URI)
    try:
        client.get_registered_model(MODEL_NAME)
    except MlflowException:
        client.create_registered_model(MODEL_NAME)

    model_uri = f"runs:/{run_id}/model"
    registered_model = mlflow.register_model(
        model_uri=model_uri,
        name=MODEL_NAME,
        await_registration_for=60,
    )

    client.set_model_version_tag(
        name=MODEL_NAME,
        version=registered_model.version,
        key="accuracy",
        value=f"{accuracy:.6f}",
    )
    client.set_model_version_tag(
        name=MODEL_NAME,
        version=registered_model.version,
        key="dataset",
        value="iris",
    )
    client.transition_model_version_stage(
        name=MODEL_NAME,
        version=registered_model.version,
        stage="Staging",
        archive_existing_versions=False,
    )

    print(
        f"Registered {MODEL_NAME} version {registered_model.version} "
        f"with accuracy={accuracy:.4f} and stage=Staging"
    )


if __name__ == "__main__":
    main()
