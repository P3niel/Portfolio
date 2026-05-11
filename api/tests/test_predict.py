from fastapi.testclient import TestClient

from app.main import app


def test_predict_returns_iris_prediction() -> None:
    with TestClient(app) as client:
        response = client.post(
            "/predict",
            json={
                "features": {
                    "sepal_length": 5.1,
                    "sepal_width": 3.5,
                    "petal_length": 1.4,
                    "petal_width": 0.2,
                }
            },
        )

    assert response.status_code == 200

    payload = response.json()
    assert payload["prediction"] in {"setosa", "versicolor", "virginica"}
    assert 0.0 <= payload["confidence"] <= 1.0
    assert isinstance(payload["model_version"], str)
    assert payload["model_version"]


def test_predict_requires_all_features() -> None:
    with TestClient(app) as client:
        response = client.post(
            "/predict",
            json={
                "features": {
                    "sepal_length": 5.1,
                    "sepal_width": 3.5,
                    "petal_length": 1.4,
                }
            },
        )

    assert response.status_code == 422
    assert response.json() == {"detail": "missing required feature: petal_width"}
