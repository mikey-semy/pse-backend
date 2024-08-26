from fastapi import APIRouter, Query, Depends
from typing import List
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models import Question
from app.database import get_db_session
from app.core.config import config

router = APIRouter()

@router.get("/search/", response_model=List[dict])
async def search_questions(
    q: str = Query(..., min_length=3),
    db: Session = Depends(get_db_session)):
    # query = select(Question).where(Question.question_text.ilike(f"%{q}%"))
    # results = db.execute(query).scalars().all()
    return results
