from fastapi.testclient import TestClient

from app.main import app


def test_health_returns_required_fields() -> None:
    with TestClient(app) as client:
        response = client.get("/health")

    assert response.status_code == 200

    payload = response.json()
    assert payload["status"] == "ok"
    assert isinstance(payload["model_version"], str)
    assert payload["model_version"]
    assert isinstance(payload["uptime_seconds"], int)
