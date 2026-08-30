from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    email: EmailStr
    name: str = Field(..., min_length=2, max_length=100)


class UserCreate(UserBase):
    password: str = Field(..., min_length=6, max_length=128)
    skills: Optional[List[str]] = Field(default_factory=list)
    interests: Optional[List[str]] = Field(default_factory=list)
    experience_level: Optional[str] = "Beginner"  # Beginner, Intermediate, Advanced


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserProfileUpdate(BaseModel):
    name: Optional[str] = None
    title: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    skills: Optional[List[str]] = None
    interests: Optional[List[str]] = None
    experience_level: Optional[str] = None
    phone: Optional[str] = None


class UserResponse(BaseModel):
    id: str = Field(..., alias="_id")
    email: EmailStr
    name: str
    title: Optional[str] = "Career Explorer"
    bio: Optional[str] = ""
    location: Optional[str] = "Sri Lanka"
    skills: List[str] = Field(default_factory=list)
    interests: List[str] = Field(default_factory=list)
    experience_level: str = "Beginner"
    created_at: Optional[datetime] = None
    saved_jobs_count: Optional[int] = 0
    applied_jobs_count: Optional[int] = 0

    model_config = {
        "populate_by_name": True,
        "from_attributes": True
    }


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


class TokenData(BaseModel):
    user_id: Optional[str] = None
