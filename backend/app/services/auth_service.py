import uuid
from datetime import datetime, timezone
from typing import Optional
from fastapi import HTTPException, status
from app.core.database import get_database
from app.core.security import get_password_hash, verify_password, create_access_token
from app.models.user import UserCreate, UserLogin, UserResponse, UserProfileUpdate, Token


async def register_user(user_in: UserCreate) -> Token:
    """Register a new user, validate unique email, hash password, and return JWT token."""
    db = get_database()
    if db is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database service temporarily unavailable",
        )

    # Check for existing email
    existing_user = await db.users.find_one({"email": user_in.email.lower()})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email address already exists",
        )

    user_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc)
    hashed_pwd = get_password_hash(user_in.password)

    user_doc = {
        "_id": user_id,
        "email": user_in.email.lower(),
        "name": user_in.name.strip(),
        "hashed_password": hashed_pwd,
        "title": "Career Explorer",
        "bio": "",
        "location": "Sri Lanka",
        "skills": user_in.skills or [],
        "interests": user_in.interests or [],
        "experience_level": user_in.experience_level or "Beginner",
        "created_at": now
    }

    await db.users.insert_one(user_doc)

    # Create JWT
    token = create_access_token({"sub": user_id, "email": user_doc["email"]})
    user_response = UserResponse(
        _id=user_id,
        email=user_doc["email"],
        name=user_doc["name"],
        title=user_doc["title"],
        bio=user_doc["bio"],
        location=user_doc["location"],
        skills=user_doc["skills"],
        interests=user_doc["interests"],
        experience_level=user_doc["experience_level"],
        created_at=user_doc["created_at"],
        saved_jobs_count=0,
        applied_jobs_count=0
    )

    return Token(access_token=token, token_type="bearer", user=user_response)


async def authenticate_user(login_in: UserLogin) -> Token:
    """Authenticate user with email and password, returning JWT token."""
    db = get_database()
    if db is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database service temporarily unavailable",
        )

    user = await db.users.find_one({"email": login_in.email.lower()})
    if not user or not verify_password(login_in.password, user.get("hashed_password", "")):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    # Get counts of saved & applied jobs
    user_id = user["_id"]
    saved_count = await db.saved_jobs.count_documents({"user_id": user_id})
    applied_count = await db.applications.count_documents({"user_id": user_id})

    token = create_access_token({"sub": user_id, "email": user["email"]})
    user_response = UserResponse(
        _id=user_id,
        email=user["email"],
        name=user["name"],
        title=user.get("title", "Career Explorer"),
        bio=user.get("bio", ""),
        location=user.get("location", "Sri Lanka"),
        skills=user.get("skills", []),
        interests=user.get("interests", []),
        experience_level=user.get("experience_level", "Beginner"),
        created_at=user.get("created_at"),
        saved_jobs_count=saved_count,
        applied_jobs_count=applied_count
    )

    return Token(access_token=token, token_type="bearer", user=user_response)


async def get_user_profile(user: dict) -> UserResponse:
    """Get the full user profile including saved and applied job counts."""
    db = get_database()
    user_id = user["_id"]
    saved_count = 0
    applied_count = 0
    if db is not None:
        saved_count = await db.saved_jobs.count_documents({"user_id": user_id})
        applied_count = await db.applications.count_documents({"user_id": user_id})

    return UserResponse(
        _id=user_id,
        email=user["email"],
        name=user["name"],
        title=user.get("title", "Career Explorer"),
        bio=user.get("bio", ""),
        location=user.get("location", "Sri Lanka"),
        skills=user.get("skills", []),
        interests=user.get("interests", []),
        experience_level=user.get("experience_level", "Beginner"),
        created_at=user.get("created_at"),
        saved_jobs_count=saved_count,
        applied_jobs_count=applied_count
    )


async def update_user_profile(user_id: str, profile_update: UserProfileUpdate) -> UserResponse:
    """Update user profile fields."""
    db = get_database()
    if db is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database service unavailable",
        )

    update_dict = {k: v for k, v in profile_update.model_dump().items() if v is not None}
    if update_dict:
        await db.users.update_one({"_id": user_id}, {"$set": update_dict})

    updated_user = await db.users.find_one({"_id": user_id})
    if not updated_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    return await get_user_profile(updated_user)
