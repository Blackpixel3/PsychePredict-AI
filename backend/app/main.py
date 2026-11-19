from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from .config import settings
from .core.database import init_db
from .routes import api_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize SQLite database on startup
    init_db()
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description=(
        "Backend REST API for MCA Project: Deep Learning Based Multi-Class "
        "Prediction of Psychological Disorders Using Patient Assessment Data. "
        "Module 2: Python Backend Core & Frontend API Integration."
    ),
    lifespan=lifespan,
)

# Configure CORS
origins = settings.cors_origins_list
if "*" not in origins:
    # Ensure standard Vite & localhost development ports are permitted
    origins.extend([
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
    ])

app.add_middleware(
    CORSMiddleware,
    allow_origins=list(set(origins)),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Custom validation exception handler for structured JSON responses
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = []
    for error in exc.errors():
        field = ".".join([str(loc) for loc in error.get("loc", []) if loc != "body"])
        errors.append({
            "field": field,
            "message": error.get("msg", "Invalid input value"),
            "type": error.get("type", "value_error"),
        })

    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "success": False,
            "error": "Validation Error: Request payload failed schema constraints.",
            "details": errors,
        },
    )

# Include API Router
app.include_router(api_router)

@app.get("/", tags=["Root"])
def root_info():
    return {
        "project": settings.PROJECT_NAME,
        "module": "Module 2: Python Backend & API Integration",
        "status": "Operational",
        "documentation": "/docs",
        "openapi": "/openapi.json",
    }
