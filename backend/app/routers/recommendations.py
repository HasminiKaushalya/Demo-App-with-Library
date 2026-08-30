from typing import Optional
from fastapi import APIRouter, Depends
from app.models.recommendation import RecommendationRequest, RecommendationResponse
from app.services.recommendation_service import evaluate_recommendations
from app.core.security import get_optional_current_user, get_current_user

router = APIRouter(prefix="/api/recommendations", tags=["Recommendations"])


@router.post("/evaluate", response_model=RecommendationResponse)
async def evaluate_user_recommendations(
    request: RecommendationRequest,
    current_user: Optional[dict] = Depends(get_optional_current_user)
):
    """
    Evaluate user skills, experience level, and interests against all career paths and job postings.
    Returns ranked matches, percentage scores, matched skills, skill gap analysis, and growth advice.
    """
    # If user has profile skills and passed empty skills, use user profile skills
    if not request.skills and current_user:
        request.skills = current_user.get("skills", [])
        if not request.interests:
            request.interests = current_user.get("interests", [])
        if not request.experience_level:
            request.experience_level = current_user.get("experience_level", "Beginner")

    return await evaluate_recommendations(request)


@router.get("/my", response_model=RecommendationResponse)
async def get_my_recommendations(current_user: dict = Depends(get_current_user)):
    """
    Generate tailored career and job recommendations based directly on the authenticated user's profile.
    """
    request = RecommendationRequest(
        skills=current_user.get("skills", ["JavaScript", "React"]),
        experience_level=current_user.get("experience_level", "Beginner"),
        interests=current_user.get("interests", ["engineering"])
    )
    return await evaluate_recommendations(request)
