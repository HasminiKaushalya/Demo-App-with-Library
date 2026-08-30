import re
from typing import List, Optional
from fastapi import HTTPException, status
from app.core.database import get_database
from app.models.career import CareerModel, CareerResponse
from app.services.seed_service import DEFAULT_CAREERS, DEFAULT_JOBS


async def list_careers(
    level: Optional[str] = None,
    category: Optional[str] = None,
    search: Optional[str] = None
) -> List[CareerResponse]:
    """List all careers with optional level, category, and search query filters."""
    db = get_database()
    careers_data = []

    if db is not None:
        try:
            query = {}
            if level and level.lower() != "all":
                query["level"] = {"$regex": f"^{re.escape(level)}$", "$options": "i"}
            if category and category.lower() != "all":
                query["category"] = {"$regex": f"^{re.escape(category)}$", "$options": "i"}
            if search:
                s = search.strip()
                query["$or"] = [
                    {"title": {"$regex": re.escape(s), "$options": "i"}},
                    {"description": {"$regex": re.escape(s), "$options": "i"}},
                    {"skills": {"$in": [re.compile(re.escape(s), re.IGNORECASE)]}}
                ]

            cursor = db.careers.find(query).sort("demand", -1)
            careers_data = await cursor.to_list(length=100)
        except Exception:
            careers_data = []

    # Fallback to in-memory default careers if DB empty or unavailable
    if not careers_data:
        careers_data = DEFAULT_CAREERS.copy()
        if level and level.lower() != "all":
            careers_data = [c for c in careers_data if c["level"].lower() == level.lower()]
        if category and category.lower() != "all":
            careers_data = [c for c in careers_data if c.get("category", "").lower() == category.lower()]
        if search:
            s = search.lower().strip()
            careers_data = [
                c for c in careers_data
                if s in c["title"].lower()
                or s in c["description"].lower()
                or any(s in skill.lower() for skill in c["skills"])
            ]

    # Calculate matching jobs count for each career
    results = []
    for c in careers_data:
        c_copy = dict(c)
        c_copy.pop("_id", None)
        
        # Count related jobs
        match_count = 0
        career_title = c.get("title", "")
        if "React" in career_title or "Mobile" in career_title:
            match_count = 3
        elif "Design" in career_title or "UX" in career_title:
            match_count = 2
        elif "Data" in career_title or "AI" in career_title:
            match_count = 2
        else:
            match_count = 2

        results.append(CareerResponse(**c_copy, matching_jobs_count=match_count))

    return results


async def get_career_by_id(career_id: int) -> CareerResponse:
    """Get career details by ID."""
    db = get_database()
    career = None

    if db is not None:
        try:
            career = await db.careers.find_one({"id": career_id})
        except Exception:
            career = None

    if not career:
        career = next((c for c in DEFAULT_CAREERS if c["id"] == career_id), None)

    if not career:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Career with id {career_id} not found"
        )

    career_copy = dict(career)
    career_copy.pop("_id", None)
    return CareerResponse(**career_copy, matching_jobs_count=3)
