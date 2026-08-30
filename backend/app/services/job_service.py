import re
import uuid
from datetime import datetime, timezone
from typing import List, Optional
from fastapi import HTTPException, status
from app.core.database import get_database
from app.models.job import JobModel, JobResponse, JobApplicationCreate, JobApplicationResponse
from app.services.seed_service import DEFAULT_JOBS


async def list_jobs(
    category: Optional[str] = None,
    job_type: Optional[str] = None,
    search: Optional[str] = None,
    is_featured: Optional[bool] = None,
    user_id: Optional[str] = None
) -> List[JobResponse]:
    """List jobs with filters and user-specific saved/applied status."""
    db = get_database()
    jobs_data = []

    # Get user's saved jobs and applications if authenticated
    user_saved_ids = set()
    user_applied_ids = set()

    if db is not None and user_id:
        try:
            saved_docs = await db.saved_jobs.find({"user_id": user_id}).to_list(length=200)
            user_saved_ids = {doc["job_id"] for doc in saved_docs}

            applied_docs = await db.applications.find({"user_id": user_id}).to_list(length=200)
            user_applied_ids = {doc["job_id"] for doc in applied_docs}
        except Exception:
            pass

    if db is not None:
        try:
            query = {}
            if category and category.lower() != "all":
                query["category"] = {"$regex": f"^{re.escape(category)}$", "$options": "i"}
            if job_type and job_type.lower() != "all":
                query["type"] = {"$regex": f"^{re.escape(job_type)}$", "$options": "i"}
            if is_featured is not None:
                query["isFeatured"] = is_featured
            if search:
                s = search.strip()
                query["$or"] = [
                    {"position": {"$regex": re.escape(s), "$options": "i"}},
                    {"company": {"$regex": re.escape(s), "$options": "i"}},
                    {"location": {"$regex": re.escape(s), "$options": "i"}},
                    {"tags": {"$in": [re.compile(re.escape(s), re.IGNORECASE)]}}
                ]

            cursor = db.jobs.find(query).sort("postedDays", 1)
            jobs_data = await cursor.to_list(length=100)
        except Exception:
            jobs_data = []

    # Fallback to in-memory if DB empty or down
    if not jobs_data:
        jobs_data = DEFAULT_JOBS.copy()
        if category and category.lower() != "all":
            jobs_data = [j for j in jobs_data if j.get("category", "").lower() == category.lower()]
        if job_type and job_type.lower() != "all":
            jobs_data = [j for j in jobs_data if j.get("type", "").lower() == job_type.lower()]
        if is_featured is not None:
            jobs_data = [j for j in jobs_data if j.get("isFeatured") == is_featured]
        if search:
            s = search.lower().strip()
            jobs_data = [
                j for j in jobs_data
                if s in j["position"].lower()
                or s in j["company"].lower()
                or s in j["location"].lower()
                or any(s in tag.lower() for tag in j["tags"])
            ]

    results = []
    for j in jobs_data:
        j_copy = dict(j)
        j_copy.pop("_id", None)
        job_id = j_copy["id"]
        
        # Override saved and applied status if authenticated
        if user_id:
            j_copy["isSaved"] = job_id in user_saved_ids
            j_copy["hasApplied"] = job_id in user_applied_ids

        results.append(JobResponse(**j_copy))

    return results


async def get_job_by_id(job_id: int, user_id: Optional[str] = None) -> JobResponse:
    """Get single job details by ID."""
    db = get_database()
    job = None

    if db is not None:
        try:
            job = await db.jobs.find_one({"id": job_id})
        except Exception:
            job = None

    if not job:
        job = next((j for j in DEFAULT_JOBS if j["id"] == job_id), None)

    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Job with id {job_id} not found"
        )

    job_copy = dict(job)
    job_copy.pop("_id", None)

    if user_id and db is not None:
        is_saved = await db.saved_jobs.find_one({"user_id": user_id, "job_id": job_id}) is not None
        has_applied = await db.applications.find_one({"user_id": user_id, "job_id": job_id}) is not None
        job_copy["isSaved"] = is_saved
        job_copy["hasApplied"] = has_applied

    return JobResponse(**job_copy)


async def toggle_save_job(user_id: str, job_id: int) -> dict:
    """Toggle saving/bookmarking a job for a user."""
    db = get_database()
    if db is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database service unavailable",
        )

    # Check if currently saved
    existing = await db.saved_jobs.find_one({"user_id": user_id, "job_id": job_id})
    if existing:
        await db.saved_jobs.delete_one({"user_id": user_id, "job_id": job_id})
        return {"saved": False, "message": "Job removed from saved list", "job_id": job_id}
    else:
        await db.saved_jobs.insert_one({
            "user_id": user_id,
            "job_id": job_id,
            "saved_at": datetime.now(timezone.utc)
        })
        return {"saved": True, "message": "Job saved successfully", "job_id": job_id}


async def apply_to_job(user_id: str, job_id: int, app_in: JobApplicationCreate) -> JobApplicationResponse:
    """Submit an application for a job."""
    db = get_database()
    if db is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database service unavailable",
        )

    job = await db.jobs.find_one({"id": job_id})
    if not job:
        job = next((j for j in DEFAULT_JOBS if j["id"] == job_id), None)
        if not job:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")

    # Increment applicant count
    try:
        await db.jobs.update_one({"id": job_id}, {"$inc": {"applicants": 1}})
    except Exception:
        pass

    app_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc)

    application_doc = {
        "_id": app_id,
        "user_id": user_id,
        "job_id": job_id,
        "job_title": job["position"],
        "company": job["company"],
        "cover_note": app_in.cover_note,
        "portfolio_url": app_in.portfolio_url,
        "resume_url": app_in.resume_url,
        "phone": app_in.phone,
        "applied_at": now,
        "status": "Submitted"
    }

    # Upsert application
    await db.applications.update_one(
        {"user_id": user_id, "job_id": job_id},
        {"$set": application_doc},
        upsert=True
    )

    return JobApplicationResponse(
        id=app_id,
        user_id=user_id,
        job_id=job_id,
        job_title=job["position"],
        company=job["company"],
        applied_at=now,
        status="Submitted"
    )


async def get_saved_jobs(user_id: str) -> List[JobResponse]:
    """Get all jobs saved by the user."""
    db = get_database()
    if db is None:
        # Return default saved jobs
        return [JobResponse(**j, isSaved=True) for j in DEFAULT_JOBS if j.get("isSaved")]

    saved_cursor = db.saved_jobs.find({"user_id": user_id}).sort("saved_at", -1)
    saved_docs = await saved_cursor.to_list(length=200)
    saved_ids = [doc["job_id"] for doc in saved_docs]

    if not saved_ids:
        return []

    jobs_cursor = db.jobs.find({"id": {"$in": saved_ids}})
    jobs_docs = await jobs_cursor.to_list(length=200)

    # Map preserving saved_ids order
    job_map = {j["id"]: j for j in jobs_docs}
    results = []
    for j_id in saved_ids:
        if j_id in job_map:
            doc = dict(job_map[j_id])
            doc.pop("_id", None)
            doc["isSaved"] = True
            results.append(JobResponse(**doc))
        else:
            fallback = next((j for j in DEFAULT_JOBS if j["id"] == j_id), None)
            if fallback:
                f_copy = dict(fallback)
                f_copy["isSaved"] = True
                results.append(JobResponse(**f_copy))

    return results


async def get_applied_jobs(user_id: str) -> List[JobApplicationResponse]:
    """Get list of jobs the user has applied to."""
    db = get_database()
    if db is None:
        return []

    cursor = db.applications.find({"user_id": user_id}).sort("applied_at", -1)
    docs = await cursor.to_list(length=200)

    return [
        JobApplicationResponse(
            id=doc["_id"],
            user_id=doc["user_id"],
            job_id=doc["job_id"],
            job_title=doc["job_title"],
            company=doc["company"],
            applied_at=doc["applied_at"],
            status=doc.get("status", "Submitted")
        )
        for doc in docs
    ]
