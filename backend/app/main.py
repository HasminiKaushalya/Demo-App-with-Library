import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.core.config import settings
from app.core.database import connect_to_mongo, close_mongo_connection
from app.services.seed_service import seed_database
from app.routers import (
    auth,
    careers,
    jobs,
    skills,
    recommendations,
    health
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("careerplus.main")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan context manager for startup and shutdown hooks."""
    logger.info("Initializing CareerPlus Backend Application...")
    # 1. Connect to MongoDB
    await connect_to_mongo()
    # 2. Automatically Seed initial realistic dataset
    await seed_database()
    logger.info("CareerPlus Backend ready to accept requests.")
    
    yield
    
    # Shutdown
    logger.info("Shutting down CareerPlus Backend Application...")
    await close_mongo_connection()


app = FastAPI(
    title=settings.APP_NAME,
    description="CareerPlus Mobile Full-Stack Backend API - Careers, Jobs, Skills, Authentication, and Rule-Based Recommendations",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS for Mobile and Web
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Global unhandled exception handler ensuring consistent error responses."""
    logger.error(f"Global unhandled error at {request.url}: {exc}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An unexpected internal server error occurred. Please try again later."}
    )


# Register API Routers
app.include_router(health.router)
app.include_router(auth.router)
app.include_router(careers.router)
app.include_router(jobs.router)
app.include_router(skills.router)
app.include_router(recommendations.router)


@app.get("/")
async def root():
    """Root entry endpoint."""
    return {
        "message": "Welcome to CareerPlus Full-Stack API",
        "version": "1.0.0",
        "documentation": "/docs",
        "health": "/api/health"
    }
