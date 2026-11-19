from fastapi import APIRouter
from .health import router as health_router
from .assessment import router as assessment_router
from .predict import router as predict_router

api_router = APIRouter(prefix="/api")
api_router.include_router(health_router)
api_router.include_router(assessment_router)
api_router.include_router(predict_router)

__all__ = ["api_router"]
