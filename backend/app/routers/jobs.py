from typing import List, Optional
from fastapi import APIRouter, Depends, Query, status
from app.models.job import JobResponse, JobApplicationCreate, JobApplicationResponse
from app.services.job_service import (
    list_jobs,
    get_job_by_id,
    toggle_save_job,
    apply_to_job,
    get_saved_jobs,
    get_applied_jobs
)
from app.core.security import get_current_user, get_optional_current_user

router = APIRouter(prefix="/api/jobs", tags=["Jobs"])


@router.get("", response_model=List[JobResponse])
async def get_jobs(
    category: Optional[str] = Query(None, description="Filter by category: engineering, design, data, marketing"),
    type: Optional[str] = Query(None, description="Filter by employment type: Full-time, Contract, Hybrid, Remote"),
    search: Optional[str] = Query(None, description="Search term for position, company, location, or tags"),
    is_featured: Optional[bool] = Query(None, description="Filter only featured jobs"),
    current_user: Optional[dict] = Depends(get_optional_current_user)
):
    """Retrieve job listings with optional filters and bookmark status for logged-in user."""
    user_id = current_user["_id"] if current_user else None
    return await list_jobs(
        category=category,
        job_type=type,
        search=search,
        is_featured=is_featured,
        user_id=user_id
    )


@router.get("/saved", response_model=List[JobResponse])
async def get_my_saved_jobs(current_user: dict = Depends(get_current_user)):
    """Retrieve all jobs bookmarked by the current user."""
    return await get_saved_jobs(current_user["_id"])


@router.get("/applied", response_model=List[JobApplicationResponse])
async def get_my_applied_jobs(current_user: dict = Depends(get_current_user)):
    """Retrieve all job applications submitted by the current user."""
    return await get_applied_jobs(current_user["_id"])


@router.get("/{job_id}", response_model=JobResponse)
async def get_job(
    job_id: int,
    current_user: Optional[dict] = Depends(get_optional_current_user)
):
    """Retrieve detailed information about a single job opening."""
    user_id = current_user["_id"] if current_user else None
    return await get_job_by_id(job_id, user_id=user_id)


@router.post("/{job_id}/save")
async def toggle_save(
    job_id: int,
    current_user: dict = Depends(get_current_user)
):
    """Toggle bookmark / save status for a job opening."""
    return await toggle_save_job(current_user["_id"], job_id)


@router.post("/{job_id}/apply", response_model=JobApplicationResponse, status_code=status.HTTP_201_CREATED)
async def apply(
    job_id: int,
    application: JobApplicationCreate,
    current_user: dict = Depends(get_current_user)
):
    """Submit a job application."""
    return await apply_to_job(current_user["_id"], job_id, application)
