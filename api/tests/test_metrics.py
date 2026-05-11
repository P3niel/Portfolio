from fastapi.testclient import TestClient

from app.main import app


def test_metrics_exposes_required_prometheus_series() -> None:
    with TestClient(app) as client:
        client.get("/health")
        client.post(
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

        response = client.get("/metrics")

    assert response.status_code == 200
    payload = response.text
    assert "http_requests_total" in payload
    assert "http_request_duration_seconds_bucket" in payload
    assert "http_request_duration_seconds_sum" in payload
    assert "http_request_duration_seconds_count" in payload
    assert "model_version_info" in payload
    assert "prediction_confidence_bucket" in payload
