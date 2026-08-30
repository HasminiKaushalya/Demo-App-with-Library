from typing import List, Optional
from pydantic import BaseModel, Field


class CareerModel(BaseModel):
    id: int
    title: str
    emoji: str
    color: str
    level: str  # Beginner, Intermediate, Advanced
    duration: str
    salaryRange: str
    demand: int
    skills: List[str]
    description: str
    roadmap: List[str]
    category: Optional[str] = "engineering"


class CareerResponse(CareerModel):
    matching_jobs_count: Optional[int] = 0


class CareerFilter(BaseModel):
    level: Optional[str] = None
    category: Optional[str] = None
    search: Optional[str] = None
