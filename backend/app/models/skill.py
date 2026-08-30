from typing import List, Optional
from pydantic import BaseModel


class SkillModel(BaseModel):
    id: str
    name: str
    category: str
    demand_score: int  # 1-100
    popular_careers: List[str] = []


class SkillCategoryModel(BaseModel):
    key: str
    title: str
    icon: str
    skills: List[str]
