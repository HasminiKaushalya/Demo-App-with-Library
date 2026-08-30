import pytest
from starlette.testclient import TestClient
import sys
import os
import random

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.main import app


@pytest.fixture(scope="module")
def client():
    with TestClient(app) as c:
        yield c


def test_health_endpoint(client):
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "online"
    assert data["database_connected"] is True


def test_get_careers(client):
    response = client.get("/api/careers")
    assert response.status_code == 200
    careers = response.json()
    assert len(careers) >= 4
    assert any(c["title"] == "React Native Developer" for c in careers)
    assert any(c["title"] == "UI/UX Designer" for c in careers)


def test_get_jobs(client):
    response = client.get("/api/jobs")
    assert response.status_code == 200
    jobs = response.json()
    assert len(jobs) >= 6
    assert any(j["company"] == "Google" for j in jobs)
    assert any(j["company"] == "Microsoft" for j in jobs)


def test_get_skills(client):
    response = client.get("/api/skills")
    assert response.status_code == 200
    skills = response.json()
    assert len(skills) >= 10
    assert any(s["name"] == "React Native" for s in skills)


def test_auth_and_recommendation_and_job_flow(client):
    # 1. Register test user
    rand_id = random.randint(10000, 99999)
    test_email = f"tester_{rand_id}@example.com"

    reg_payload = {
        "email": test_email,
        "name": "Integration Tester",
        "password": "SecurePassword123!",
        "skills": ["JavaScript", "React", "React Native", "TypeScript"],
        "interests": ["engineering"],
        "experience_level": "Intermediate"
    }
    reg_res = client.post("/api/auth/register", json=reg_payload)
    assert reg_res.status_code == 201, f"Reg failed: {reg_res.text}"
    auth_data = reg_res.json()
    token = auth_data["access_token"]
    assert token is not None
    assert auth_data["user"]["email"] == test_email

    # 2. Login
    login_res = client.post("/api/auth/login", json={"email": test_email, "password": "SecurePassword123!"})
    assert login_res.status_code == 200
    login_token = login_res.json()["access_token"]

    headers = {"Authorization": f"Bearer {login_token}"}

    # 3. Get Me
    me_res = client.get("/api/auth/me", headers=headers)
    assert me_res.status_code == 200
    assert me_res.json()["email"] == test_email

    # 4. Update Profile
    update_res = client.put("/api/auth/profile", json={"title": "Senior Mobile Engineer", "bio": "Building fast React Native apps."}, headers=headers)
    assert update_res.status_code == 200
    assert update_res.json()["title"] == "Senior Mobile Engineer"

    # 5. Rule-based recommendation evaluation
    rec_payload = {
        "skills": ["React Native", "JavaScript", "TypeScript", "React"],
        "experience_level": "Intermediate",
        "interests": ["engineering"]
    }
    rec_res = client.post("/api/recommendations/evaluate", json=rec_payload, headers=headers)
    assert rec_res.status_code == 200
    rec_data = rec_res.json()
    assert len(rec_data["top_careers"]) > 0
    top_career = rec_data["top_careers"][0]
    # React Native developer should score highest
    assert "React" in top_career["career"]["title"] or top_career["match_percentage"] > 70
    assert len(top_career["matched_skills"]) > 0
    assert len(rec_data["top_jobs"]) > 0

    # 6. Save job (bookmark)
    save_res = client.post("/api/jobs/1/save", headers=headers)
    assert save_res.status_code == 200
    assert save_res.json()["saved"] is True

    # 7. Check Saved list
    saved_list_res = client.get("/api/jobs/saved", headers=headers)
    assert saved_list_res.status_code == 200
    assert any(j["id"] == 1 for j in saved_list_res.json())

    # 8. Apply to job
    apply_payload = {
        "cover_note": "I love this product and have extensive experience in mobile engineering.",
        "phone": "+94771234567"
    }
    apply_res = client.post("/api/jobs/1/apply", json=apply_payload, headers=headers)
    assert apply_res.status_code == 201
    assert apply_res.json()["status"] == "Submitted"

    # 9. Check Applied list
    applied_list_res = client.get("/api/jobs/applied", headers=headers)
    assert applied_list_res.status_code == 200
    assert any(app_item["job_id"] == 1 for app_item in applied_list_res.json())
