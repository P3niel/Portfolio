from __future__ import annotations

import os
import time
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from app.model.loader import load_model_bundle
from app.routes import health_router, metrics_router, predict_router
from app.telemetry import record_http_request, set_model_version_metric


def _build_allowed_origins() -> list[str]:
    configured = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000")
    origins = [origin.strip() for origin in configured.split(",") if origin.strip()]
    if "http://localhost:3000" not in origins:
        origins.append("http://localhost:3000")
    return origins


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.started_at = time.time()
    app.state.model_bundle = load_model_bundle()
    if app.state.model_bundle is not None:
        set_model_version_metric(app.state.model_bundle.version)
    yield


def create_app() -> FastAPI:
    app = FastAPI(
        title="Portfolio ML API",
        version="1.0.0",
        lifespan=lifespan,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=_build_allowed_origins(),
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.middleware("http")
    async def prometheus_middleware(request: Request, call_next):
        started = time.perf_counter()
        status_code = 500

        try:
            response = await call_next(request)
            status_code = response.status_code
            return response
        finally:
            duration = time.perf_counter() - started
            record_http_request(
                method=request.method,
                endpoint=request.url.path,
                status_code=status_code,
                duration_seconds=duration,
            )

    app.include_router(health_router)
    app.include_router(predict_router)
    app.include_router(metrics_router)

    return app


app = create_app()
