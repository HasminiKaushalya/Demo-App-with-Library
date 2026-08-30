from typing import List, Optional
from fastapi import APIRouter, Query
from app.models.career import CareerResponse
from app.services.career_service import list_careers, get_career_by_id

router = APIRouter(prefix="/api/careers", tags=["Careers"])


@router.get("", response_model=List[CareerResponse])
async def get_careers(
    level: Optional[str] = Query(None, description="Filter by level: Beginner, Intermediate, Advanced"),
    category: Optional[str] = Query(None, description="Filter by category: engineering, design, data, marketing"),
    search: Optional[str] = Query(None, description="Search term for title, skills, or description")
):
    """Retrieve list of career paths with optional level, category, or search filters."""
    return await list_careers(level=level, category=category, search=search)


@router.get("/{career_id}", response_model=CareerResponse)
async def get_career(career_id: int):
    """Retrieve detailed information about a specific career path."""
    return await get_career_by_id(career_id)
