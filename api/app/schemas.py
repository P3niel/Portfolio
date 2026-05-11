from __future__ import annotations

from typing import Any

from pydantic import BaseModel, Field


class PredictRequest(BaseModel):
    features: dict[str, Any] = Field(
        ...,
        description="Feature payload used for prediction.",
    )


class PredictResponse(BaseModel):
    prediction: str
    confidence: float
    model_version: str


class HealthResponse(BaseModel):
    status: str
    model_version: str
    uptime_seconds: int
