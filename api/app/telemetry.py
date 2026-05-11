from __future__ import annotations

from prometheus_client import Counter, Gauge, Histogram

HTTP_REQUESTS_TOTAL = Counter(
    "http_requests_total",
    "Total HTTP requests",
    labelnames=("method", "endpoint", "status"),
)

HTTP_REQUEST_DURATION_SECONDS = Histogram(
    "http_request_duration_seconds",
    "Request duration histogram",
    buckets=(0.01, 0.05, 0.1, 0.5, 1.0, 5.0),
)

PREDICTION_CONFIDENCE = Histogram(
    "prediction_confidence",
    "Prediction confidence histogram",
    buckets=(0.5, 0.7, 0.8, 0.9, 0.95, 0.99, 1.0),
)

MODEL_VERSION_INFO = Gauge(
    "model_version_info",
    "Current production model version",
    labelnames=("version",),
)

_current_version: str | None = None


def record_http_request(
    *,
    method: str,
    endpoint: str,
    status_code: int,
    duration_seconds: float,
) -> None:
    labels = {
        "method": method,
        "endpoint": endpoint,
        "status": str(status_code),
    }
    HTTP_REQUESTS_TOTAL.labels(**labels).inc()
    HTTP_REQUEST_DURATION_SECONDS.observe(duration_seconds)


def record_prediction_confidence(confidence: float) -> None:
    PREDICTION_CONFIDENCE.observe(confidence)


def set_model_version_metric(version: str) -> None:
    global _current_version

    if _current_version and _current_version != version:
        MODEL_VERSION_INFO.labels(version=_current_version).set(0)

    MODEL_VERSION_INFO.labels(version=version).set(1)
    _current_version = version
