from typing import List
from fastapi import APIRouter
from app.models.skill import SkillModel, SkillCategoryModel
from app.services.seed_service import DEFAULT_SKILLS, DEFAULT_CATEGORIES
from app.core.database import get_database

router = APIRouter(prefix="/api/skills", tags=["Skills"])


@router.get("", response_model=List[SkillModel])
async def get_skills():
    """Get all available skills with demand scores."""
    db = get_database()
    if db is not None:
        try:
            docs = await db.skills.find({}).to_list(length=200)
            if docs:
                results = []
                for d in docs:
                    d_copy = dict(d)
                    d_copy.pop("_id", None)
                    results.append(SkillModel(**d_copy))
                return results
        except Exception:
            pass

    return [SkillModel(**s) for s in DEFAULT_SKILLS]


@router.get("/categories", response_model=List[SkillCategoryModel])
async def get_skill_categories():
    """Get categorized skill groups."""
    return [SkillCategoryModel(**c) for c in DEFAULT_CATEGORIES if c["key"] != "all"]
