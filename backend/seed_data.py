import asyncio
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.core.database import connect_to_mongo, close_mongo_connection
from app.services.seed_service import seed_database


async def main():
    print("Connecting to MongoDB...")
    await connect_to_mongo()
    print("Seeding database collections (careers, jobs, skills, demo user)...")
    await seed_database()
    print("Seeding completed successfully!")
    await close_mongo_connection()


if __name__ == "__main__":
    asyncio.run(main())
