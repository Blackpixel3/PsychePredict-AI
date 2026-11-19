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

# Locate and serve built frontend SPA if dist/ exists
import os
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

dist_candidates = [
    os.path.join(os.getcwd(), "dist"),
    os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "dist")),
]
DIST_DIR = None
for candidate in dist_candidates:
    if os.path.exists(candidate) and os.path.isdir(candidate):
        DIST_DIR = candidate
        break

if DIST_DIR and os.path.exists(os.path.join(DIST_DIR, "index.html")):
    assets_dir = os.path.join(DIST_DIR, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    @app.get("/{full_path:path}", tags=["Frontend"])
    async def serve_frontend(full_path: str):
        file_path = os.path.join(DIST_DIR, full_path)
        if full_path and os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(DIST_DIR, "index.html"))
else:
    @app.get("/", tags=["Root"])
    def root_info():
        return {
            "project": settings.PROJECT_NAME,
            "module": "Module 2: Python Backend & API Integration",
            "status": "Operational",
            "documentation": "/docs",
            "openapi": "/openapi.json",
        }
