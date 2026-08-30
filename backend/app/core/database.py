import logging
from typing import Optional
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from app.core.config import settings

logger = logging.getLogger("careerplus.database")

class Database:
    client: Optional[AsyncIOMotorClient] = None
    db: Optional[AsyncIOMotorDatabase] = None

db_instance = Database()


async def connect_to_mongo():
    """Connect to MongoDB on application startup."""
    try:
        logger.info(f"Connecting to MongoDB at {settings.MONGO_URI}...")
        db_instance.client = AsyncIOMotorClient(
            settings.MONGO_URI,
            serverSelectionTimeoutMS=4000
        )
        db_instance.db = db_instance.client[settings.DB_NAME]
        
        # Ping the server to verify connection
        await db_instance.client.admin.command('ping')
        logger.info("Successfully connected to MongoDB.")

        # Initialize collections and indexes
        await init_db_indexes(db_instance.db)

    except Exception as e:
        logger.warning(f"MongoDB connection warning: {e}. App will start, but database queries will return service unavailable until MongoDB is ready.")


async def close_mongo_connection():
    """Close MongoDB connection on shutdown."""
    if db_instance.client is not None:
        logger.info("Closing MongoDB connection...")
        db_instance.client.close()
        logger.info("MongoDB connection closed.")


def get_database() -> Optional[AsyncIOMotorDatabase]:
    """Get the active database instance."""
    return db_instance.db


async def init_db_indexes(db: AsyncIOMotorDatabase):
    """Create essential MongoDB indexes."""
    try:
        # Users collection indexes
        await db.users.create_index("email", unique=True)
        
        # Careers collection indexes
        await db.careers.create_index("id", unique=True)
        await db.careers.create_index("level")
        await db.careers.create_index("title")

        # Jobs collection indexes
        await db.jobs.create_index("id", unique=True)
        await db.jobs.create_index("category")
        await db.jobs.create_index("type")
        await db.jobs.create_index([("position", "text"), ("company", "text"), ("location", "text")])

        # Saved jobs & applications indexes
        await db.saved_jobs.create_index([("user_id", 1), ("job_id", 1)], unique=True)
        await db.applications.create_index([("user_id", 1), ("job_id", 1)])
        
        logger.info("MongoDB indexes verified/created successfully.")
    except Exception as e:
        logger.warning(f"Index creation warning: {e}")
