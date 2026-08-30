from typing import List, Optional
from pydantic import BaseModel
from app.models.career import CareerModel
from app.models.job import JobModel


class RecommendationRequest(BaseModel):
    skills: List[str]
    experience_level: Optional[str] = "Beginner"  # Beginner, Intermediate, Advanced
    interests: Optional[List[str]] = []
    preferred_locations: Optional[List[str]] = []
    target_role: Optional[str] = None


class CareerRecommendation(BaseModel):
    career: CareerModel
    match_percentage: int  # 0 - 100
    matched_skills: List[str]
    missing_skills: List[str]
    match_reasons: List[str]
    suggested_next_step: str


class JobRecommendation(BaseModel):
    job: JobModel
    match_percentage: int  # 0 - 100
    matched_tags: List[str]
    missing_tags: List[str]
    match_reasons: List[str]


class RecommendationResponse(BaseModel):
    top_careers: List[CareerRecommendation]
    top_jobs: List[JobRecommendation]
    total_evaluated_careers: int
    total_evaluated_jobs: int
    user_skill_count: int
    readiness_level: str  # High, Moderate, Developing
    growth_advice: str
