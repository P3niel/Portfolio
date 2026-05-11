from __future__ import annotations

from typing import Any

from fastapi import APIRouter, HTTPException, Request

from app.model.loader import FEATURE_NAMES, label_from_prediction
from app.schemas import PredictRequest, PredictResponse
from app.telemetry import record_prediction_confidence

router = APIRouter()


def _build_feature_vector(features: dict[str, Any]) -> list[float]:
    vector: list[float] = []

    for feature_name in FEATURE_NAMES:
        if feature_name not in features:
            raise HTTPException(
                status_code=422,
                detail=f"missing required feature: {feature_name}",
            )

        try:
            vector.append(float(features[feature_name]))
        except (TypeError, ValueError) as exc:
            raise HTTPException(
                status_code=422,
                detail=f"feature must be numeric: {feature_name}",
            ) from exc

    return vector


def _extract_confidence(model: Any, vector: list[float]) -> float:
    if hasattr(model, "predict_proba"):
        probabilities = model.predict_proba([vector])[0]
        return round(float(max(probabilities)), 4)

    return 1.0


@router.post("/predict", response_model=PredictResponse)
def predict(payload: PredictRequest, request: Request) -> PredictResponse:
    model_bundle = getattr(request.app.state, "model_bundle", None)
    if model_bundle is None:
        raise HTTPException(status_code=503, detail="model not loaded")

    vector = _build_feature_vector(payload.features)
    raw_prediction = model_bundle.model.predict([vector])[0]
    prediction = label_from_prediction(raw_prediction)
    confidence = _extract_confidence(model_bundle.model, vector)

    record_prediction_confidence(confidence)

    return PredictResponse(
        prediction=prediction,
        confidence=confidence,
        model_version=model_bundle.version,
    )
