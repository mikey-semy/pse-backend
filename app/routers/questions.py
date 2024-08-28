from typing import List
from fastapi import APIRouter, Query, Depends
from sqlalchemy.orm import Session
from app.services.questions import QuestionService
from app.database.session import get_db_session


router = APIRouter()

@router.get("/search/", response_model=List[dict])
async def search_questions(
    q: str = Query(..., min_length=3),
    session: Session = Depends(get_db_session)):
    return QuestionService(session).get_questions(q)
