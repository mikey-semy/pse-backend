from typing import List
from fastapi import APIRouter, Query, Depends
from sqlalchemy.orm import Session
from app.services.questions import QuestionService
from app.database.session import get_db_session
from app.schemas.questions import QuestionSchema

router = APIRouter()

@router.post("/")
async def post_question(
    question: QuestionSchema,
    session: Session = Depends(get_db_session)
):
    return QuestionService(session).add_question(question)

@router.get("/question", response_model=List[QuestionSchema])
async def get_question(
    question_id: int,
    session: Session = Depends(get_db_session)):
    return await QuestionService(session).get_question(question_id)

@router.get("/search", response_model=List[QuestionSchema])
async def search_questions(
    q: str = Query(..., min_length=3),
    session: Session = Depends(get_db_session)):
    return await QuestionService(session).search_questions(q)

@router.get("/questions", response_model=List[QuestionSchema])
async def get_questions(
    session: Session = Depends(get_db_session)
) -> List[QuestionSchema]:
    return await QuestionService(session).get_questions()
