from __future__ import annotations

import time

from fastapi import APIRouter, HTTPException, Request

from app.schemas import HealthResponse

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
def health(request: Request) -> HealthResponse:
    model_bundle = getattr(request.app.state, "model_bundle", None)
    if model_bundle is None:
        raise HTTPException(status_code=503, detail="model not loaded")

    started_at = getattr(request.app.state, "started_at", time.time())
    uptime_seconds = max(0, int(time.time() - started_at))

    return HealthResponse(
        status="ok",
        model_version=model_bundle.version,
        uptime_seconds=uptime_seconds,
    )
