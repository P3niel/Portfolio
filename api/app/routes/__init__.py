from app.routes.health import router as health_router
from app.routes.metrics import router as metrics_router
from app.routes.predict import router as predict_router

__all__ = ["health_router", "metrics_router", "predict_router"]
