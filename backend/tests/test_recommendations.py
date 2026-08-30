import pytest
from app.services.recommendation_service import (
    calculate_skill_overlap,
    normalize_skill,
    evaluate_career_match,
    evaluate_job_match,
)
from app.models.recommendation import RecommendationRequest


def test_normalize_skill():
    """Verify skill string normalization."""
    assert normalize_skill("  React Native  ") == "react native"
    assert normalize_skill("React.js") == "reactjs"
    assert normalize_skill("Type-Script") == "type script"
    assert normalize_skill("JavaScript") == "javascript"


def test_calculate_skill_overlap_full():
    """Verify full match when all target skills are present in user skills."""
    user_skills = {"JavaScript", "React", "TypeScript"}
    target_skills = ["React", "JavaScript"]

    matched, missing, ratio = calculate_skill_overlap(user_skills, target_skills)
    assert ratio == 1.0
    assert len(matched) == 2
    assert len(missing) == 0


def test_calculate_skill_overlap_partial():
    """Verify partial match and missing skill gap detection."""
    user_skills = {"Python", "SQL"}
    target_skills = ["Python", "SQL", "Machine Learning", "FastAPI"]

    matched, missing, ratio = calculate_skill_overlap(user_skills, target_skills)
    assert ratio == 0.5
    assert "Python" in matched
    assert "SQL" in matched
    assert "Machine Learning" in missing
    assert "FastAPI" in missing


def test_evaluate_career_match_rule_scoring():
    """Verify rule-based career match calculation and advice."""
    career_dict = {
        "id": 1,
        "title": "React Native Developer",
        "emoji": "📱",
        "color": "#53B8FF",
        "level": "Intermediate",
        "duration": "4-6 months",
        "salaryRange": "$1.8k - $4.5k",
        "demand": 94,
        "category": "engineering",
        "skills": ["JavaScript", "React", "React Native"],
        "description": "Build mobile apps.",
        "roadmap": ["Learn JS", "Learn React", "Build RN Apps"]
    }

    req = RecommendationRequest(
        skills=["JavaScript", "React", "React Native"],
        experience_level="Intermediate",
        interests=["engineering"]
    )

    result = evaluate_career_match(career_dict, req)
    assert result.match_percentage >= 90
    assert len(result.missing_skills) == 0
    assert len(result.matched_skills) == 3
