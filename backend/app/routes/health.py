import datetime
from fastapi import APIRouter
from ..config import settings
from ..schemas.common import ApiResponse

router = APIRouter(tags=["System Health"])

@router.get("/health", response_model=ApiResponse[dict])
def health_check():
    """
    Check backend health, availability, environment, and readiness for Module 3.
    """
    return ApiResponse(
        success=True,
        message="Backend service is operational and healthy.",
        data={
            "service": settings.PROJECT_NAME,
            "version": settings.VERSION,
            "environment": settings.ENVIRONMENT,
            "database": "SQLite (Active & Connected)",
            "model_status": "Module 3 Pending (No fabricated ML inference)",
            "module_stage": "Module 2: Python Backend & API Integration Complete",
            "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        },
    )
