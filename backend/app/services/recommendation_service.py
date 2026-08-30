from typing import List, Set
from app.models.recommendation import (
    RecommendationRequest,
    CareerRecommendation,
    JobRecommendation,
    RecommendationResponse
)
from app.models.career import CareerModel
from app.models.job import JobModel
from app.services.seed_service import DEFAULT_CAREERS, DEFAULT_JOBS
from app.core.database import get_database


def normalize_skill(skill: str) -> str:
    """Normalize skill string for case-insensitive matching."""
    return skill.strip().lower().replace("-", " ").replace(".", "")


def calculate_skill_overlap(user_skills: Set[str], target_skills: List[str]) -> (List[str], List[str], float):
    """
    Calculate matched and missing skills between user skills and target skills.
    Returns: (matched_list, missing_list, match_ratio)
    """
    matched = []
    missing = []

    user_normalized = {normalize_skill(s) for s in user_skills}

    for skill in target_skills:
        s_norm = normalize_skill(skill)
        # Check direct or substring match
        if any(s_norm in u or u in s_norm for u in user_normalized):
            matched.append(skill)
        else:
            missing.append(skill)

    ratio = len(matched) / len(target_skills) if target_skills else 0.0
    return matched, missing, ratio


def evaluate_career_match(career_dict: dict, request: RecommendationRequest) -> CareerRecommendation:
    """
    Rule-based scoring for a Career path:
    1. Skill Overlap (60% weight)
    2. Category / Interest Alignment (20% weight)
    3. Experience Level Alignment (20% weight)
    """
    user_skills_set = set(request.skills)
    career_skills = career_dict.get("skills", [])
    matched_skills, missing_skills, skill_ratio = calculate_skill_overlap(user_skills_set, career_skills)

    skill_score = skill_ratio * 60

    # Category / Interest match
    interest_score = 0
    match_reasons = []

    user_interests = [i.lower() for i in (request.interests or [])]
    career_cat = career_dict.get("category", "").lower()
    if not user_interests or career_cat in user_interests:
        interest_score = 20
        if career_cat:
            match_reasons.append(f"Aligns with your interest in {career_cat.title()}")
    else:
        interest_score = 5

    # Level match
    level_score = 0
    user_level = (request.experience_level or "Beginner").lower()
    career_level = career_dict.get("level", "Beginner").lower()

    level_hierarchy = {"beginner": 1, "intermediate": 2, "advanced": 3}
    user_lvl_num = level_hierarchy.get(user_level, 1)
    career_lvl_num = level_hierarchy.get(career_level, 1)

    if user_lvl_num == career_lvl_num:
        level_score = 20
        match_reasons.append(f"Perfect fit for your {career_dict.get('level')} experience level")
    elif user_lvl_num > career_lvl_num:
        level_score = 18
        match_reasons.append(f"Strong foundation for this {career_dict.get('level')} role")
    else:
        level_score = max(5, 20 - (career_lvl_num - user_lvl_num) * 8)

    if matched_skills:
        match_reasons.insert(0, f"You possess {len(matched_skills)}/{len(career_skills)} required core skills ({', '.join(matched_skills[:3])})")
    else:
        match_reasons.insert(0, f"High-demand path with {career_dict.get('demand', 90)}% market growth rate")

    total_score = int(round(min(100, skill_score + interest_score + level_score)))

    # Determine recommended next step
    roadmap = career_dict.get("roadmap", [])
    if missing_skills:
        suggested_step = f"Focus on learning {missing_skills[0]}: {roadmap[0] if roadmap else 'Start foundational modules'}"
    else:
        suggested_step = roadmap[-1] if roadmap else "Build a production-grade portfolio project"

    career_model = CareerModel(**career_dict)

    return CareerRecommendation(
        career=career_model,
        match_percentage=total_score,
        matched_skills=matched_skills,
        missing_skills=missing_skills,
        match_reasons=match_reasons,
        suggested_next_step=suggested_step
    )


def evaluate_job_match(job_dict: dict, request: RecommendationRequest) -> JobRecommendation:
    """
    Rule-based scoring for a Job opening:
    1. Tag / Skills match (65% weight)
    2. Category interest match (20% weight)
    3. Rating / Market quality bonus (15% weight)
    """
    user_skills_set = set(request.skills)
    job_tags = job_dict.get("tags", [])
    matched_tags, missing_tags, tag_ratio = calculate_skill_overlap(user_skills_set, job_tags)

    tag_score = tag_ratio * 65

    interest_score = 0
    match_reasons = []

    user_interests = [i.lower() for i in (request.interests or [])]
    job_cat = job_dict.get("category", "").lower()
    if not user_interests or job_cat in user_interests:
        interest_score = 20
        match_reasons.append(f"Role in your preferred domain ({job_dict.get('category', '').title()})")
    else:
        interest_score = 8

    # Company rating & feature weight
    quality_score = min(15, int(job_dict.get("rating", 4.5) * 3))
    if job_dict.get("isFeatured"):
        quality_score += 2

    if matched_tags:
        match_reasons.insert(0, f"Direct match on key skills: {', '.join(matched_tags)}")
    else:
        match_reasons.insert(0, f"Top-rated company ({job_dict.get('company')}) with active hiring")

    total_score = int(round(min(100, tag_score + interest_score + quality_score)))

    job_model = JobModel(**job_dict)

    return JobRecommendation(
        job=job_model,
        match_percentage=total_score,
        matched_tags=matched_tags,
        missing_tags=missing_tags,
        match_reasons=match_reasons
    )


async def evaluate_recommendations(request: RecommendationRequest) -> RecommendationResponse:
    """
    Run full rule-based recommendation engine on careers and jobs.
    """
    db = get_database()
    careers_data = []
    jobs_data = []

    if db is not None:
        try:
            careers_data = await db.careers.find({}).to_list(length=100)
            jobs_data = await db.jobs.find({}).to_list(length=100)
        except Exception:
            pass

    if not careers_data:
        careers_data = DEFAULT_CAREERS
    if not jobs_data:
        jobs_data = DEFAULT_JOBS

    # Clean Mongo _id
    careers_list = []
    for c in careers_data:
        c_copy = dict(c)
        c_copy.pop("_id", None)
        careers_list.append(c_copy)

    jobs_list = []
    for j in jobs_data:
        j_copy = dict(j)
        j_copy.pop("_id", None)
        jobs_list.append(j_copy)

    # Evaluate all careers
    career_evaluations = [evaluate_career_match(c, request) for c in careers_list]
    # Sort descending by match percentage
    career_evaluations.sort(key=lambda x: x.match_percentage, reverse=True)

    # Evaluate all jobs
    job_evaluations = [evaluate_job_match(j, request) for j in jobs_list]
    # Sort descending by match percentage
    job_evaluations.sort(key=lambda x: x.match_percentage, reverse=True)

    top_score = career_evaluations[0].match_percentage if career_evaluations else 50
    if top_score >= 80:
        readiness = "High"
        advice = "You have strong skill alignment! You are ready to start applying to open positions and finalizing your portfolio."
    elif top_score >= 60:
        readiness = "Moderate"
        advice = "Solid foundation! Bridging 1-2 missing key skills will dramatically boost your job placement opportunities."
    else:
        readiness = "Developing"
        advice = "Great start on your journey. Follow our step-by-step roadmap to acquire foundational skills and build projects."

    return RecommendationResponse(
        top_careers=career_evaluations,
        top_jobs=job_evaluations,
        total_evaluated_careers=len(career_evaluations),
        total_evaluated_jobs=len(job_evaluations),
        user_skill_count=len(request.skills),
        readiness_level=readiness,
        growth_advice=advice
    )
