# API Specification — Portfolio ML API

Interface contract between the FastAPI backend (Codex) and the Next.js frontend (Claude Code).

## Base URL

- Local dev: `http://localhost:8000`
- Production: `https://api.<domain>` (configured via `NEXT_PUBLIC_API_URL`)

---

## Endpoints

### `GET /health`

Returns API and model status.

**Response 200:**
```json
{
  "status": "ok",
  "model_version": "1.2.3",
  "uptime_seconds": 12345
}
```

**Error (503 — model not loaded):**
```json
{ "detail": "model not loaded" }
```

---

### `GET /metrics`

Prometheus exposition format (text/plain).

**Required metrics:**

```
# HELP http_requests_total Total HTTP requests
# TYPE http_requests_total counter
http_requests_total{method="POST",endpoint="/predict",status="200"} 1042

# HELP http_request_duration_seconds Request duration histogram
# TYPE http_request_duration_seconds histogram
http_request_duration_seconds_bucket{le="0.01",...} ...
http_request_duration_seconds_bucket{le="0.05",...} ...
http_request_duration_seconds_bucket{le="0.1",...} ...
http_request_duration_seconds_bucket{le="0.5",...} ...
http_request_duration_seconds_bucket{le="1.0",...} ...
http_request_duration_seconds_bucket{le="5.0",...} ...
http_request_duration_seconds_bucket{le="+Inf",...} ...
http_request_duration_seconds_sum{...} ...
http_request_duration_seconds_count{...} ...

# HELP model_version_info Current production model version
# TYPE model_version_info gauge
model_version_info{version="1.2.3"} 1

# HELP prediction_confidence_seconds Prediction confidence histogram
# TYPE prediction_confidence histogram
prediction_confidence_bucket{le="0.5",...} ...
```

---

### `POST /predict`

Run inference on tabular input.

**Request:**
```json
{
  "features": {
    "col1": 35,
    "col2": 50000,
    "col3": "value"
  }
}
```

**Response 200:**
```json
{
  "prediction": "class_label",
  "confidence": 0.87,
  "model_version": "1.2.3"
}
```

**Error 422 (validation):**
```json
{ "detail": "missing required feature: col1" }
```

**Error 503 (model unavailable):**
```json
{ "detail": "model not loaded" }
```

---

## MLflow REST API (used by Next.js proxy `/api/mlflow-status`)

The Next.js route `frontend/app/api/mlflow-status/route.ts` calls:

```
GET {MLFLOW_TRACKING_URI}/api/2.0/mlflow/registered-models/get?name=portfolio-model
GET {MLFLOW_TRACKING_URI}/api/2.0/mlflow/model-versions/search
    ?filter=name='portfolio-model'
    &order_by=['version_number DESC']
    &max_results=1
```

And returns to the frontend:
```json
{
  "model_name": "portfolio-model",
  "latest_version": "3",
  "stage": "Production",
  "last_updated": "2026-04-30T06:00:00Z"
}
```

---

## Model Domain

- **Type**: tabular binary or multiclass classification
- **Framework**: scikit-learn
- **Features**: structured tabular data (dataset TBD by Codex)
- **MLflow model name**: `portfolio-model`
- **Registered model stages**: `Staging`, `Production`

---

## CORS

The API must allow CORS from:
- `http://localhost:3000` (dev)
- `https://<vercel-domain>` (production — set via env var `ALLOWED_ORIGINS`)
