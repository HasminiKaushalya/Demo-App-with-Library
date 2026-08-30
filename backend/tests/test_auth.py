import pytest
from datetime import timedelta
import jwt
from app.core.security import (
    get_password_hash,
    verify_password,
    create_access_token,
    decode_access_token,
)
from app.core.config import settings


def test_password_hashing_and_verification():
    """Verify that bcrypt hashes passwords securely and verifies correctly."""
    plain = "secure_password_123"
    hashed = get_password_hash(plain)

    # Hash must be distinct from plaintext
    assert hashed != plain
    assert hashed.startswith("$2b$") or hashed.startswith("$2a$")

    # Correct password verifies
    assert verify_password(plain, hashed) is True

    # Incorrect password fails
    assert verify_password("wrong_password", hashed) is False
    assert verify_password("", hashed) is False
    assert verify_password(plain, "") is False


def test_jwt_token_lifecycle():
    """Verify JWT access token generation, payload encoding, and decoding."""
    user_id = "test-user-uuid-1234"
    email = "test@careerplus.com"
    token = create_access_token({"sub": user_id, "email": email})

    assert isinstance(token, str)
    assert len(token) > 20

    payload = decode_access_token(token)
    assert payload is not None
    assert payload.get("sub") == user_id
    assert payload.get("email") == email
    assert "exp" in payload
    assert "iat" in payload


def test_jwt_invalid_and_expired_token():
    """Verify that tampered or expired tokens return None."""
    # Invalid token signature
    invalid_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalid.signature"
    assert decode_access_token(invalid_token) is None

    # Expired token
    expired_token = create_access_token(
        {"sub": "expired-user"},
        expires_delta=timedelta(seconds=-10)
    )
    assert decode_access_token(expired_token) is None
