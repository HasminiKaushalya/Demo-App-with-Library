from fastapi import APIRouter, Depends, HTTPException, status
from app.models.user import UserCreate, UserLogin, UserResponse, UserProfileUpdate, Token
from app.services.auth_service import register_user, authenticate_user, get_user_profile, update_user_profile
from app.core.security import get_current_user

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
async def register(user_in: UserCreate):
    """Register a new user account."""
    return await register_user(user_in)


@router.post("/login", response_model=Token)
async def login(login_in: UserLogin):
    """Authenticate with email and password."""
    return await authenticate_user(login_in)


@router.get("/me", response_model=UserResponse)
async def get_me(current_user: dict = Depends(get_current_user)):
    """Get the current authenticated user profile."""
    return await get_user_profile(current_user)


@router.put("/profile", response_model=UserResponse)
async def update_profile(
    profile_update: UserProfileUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update current user profile information."""
    return await update_user_profile(current_user["_id"], profile_update)
