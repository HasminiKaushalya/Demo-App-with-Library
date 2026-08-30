from datetime import datetime, timezone
from fastapi import APIRouter
from app.core.database import get_database
from app.core.config import settings

router = APIRouter(prefix="/api/health", tags=["Health"])

START_TIME = datetime.now(timezone.utc)


@router.get("")
async def health_check():
    """System health check endpoint indicating API and Database status."""
    db = get_database()
    db_connected = False
    careers_count = 0
    jobs_count = 0

    if db is not None:
        try:
            await db.command("ping")
            db_connected = True
            careers_count = await db.careers.count_documents({})
            jobs_count = await db.jobs.count_documents({})
        except Exception:
            db_connected = False

    return {
        "status": "online",
        "app_name": settings.APP_NAME,
        "environment": settings.ENVIRONMENT,
        "database_connected": db_connected,
        "database_name": settings.DB_NAME if db_connected else None,
        "counts": {
            "careers": careers_count,
            "jobs": jobs_count
        },
        "started_at": START_TIME.isoformat(),
        "timestamp": datetime.now(timezone.utc).isoformat()
    }
