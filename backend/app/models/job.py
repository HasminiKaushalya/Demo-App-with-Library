from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field


class JobModel(BaseModel):
    id: int
    company: str
    position: str
    location: str
    salary: str
    color: str
    type: str  # Full-time, Contract, Part-time, Hybrid, Remote
    category: str  # engineering, design, data, marketing, product
    rating: float
    applicants: int
    tags: List[str]
    postedDays: int
    description: str
    requirements: List[str]
    isFeatured: Optional[bool] = False
    isSaved: Optional[bool] = False
    hasApplied: Optional[bool] = False


class JobResponse(JobModel):
    pass


class JobFilter(BaseModel):
    category: Optional[str] = None
    type: Optional[str] = None
    search: Optional[str] = None
    is_featured: Optional[bool] = None


class JobApplicationCreate(BaseModel):
    cover_note: Optional[str] = None
    portfolio_url: Optional[str] = None
    resume_url: Optional[str] = None
    phone: Optional[str] = None


class JobApplicationResponse(BaseModel):
    id: str
    user_id: str
    job_id: int
    job_title: str
    company: str
    applied_at: datetime
    status: str = "Submitted"
