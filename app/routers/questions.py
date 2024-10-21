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
) -> QuestionSchema:
    try:
        return await QuestionService(session).add_question(question)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
        
@router.post("/add_all")
async def add_all_questions(
    session: Session = Depends(get_db_session)
) -> None:
    await QuestionService(session).add_all_questions()

@router.put("/question")
async def update_question_by_text(
    question: QuestionSchema,
    q: str = Query(..., min_length=3),
    session: Session = Depends(get_db_session)
) -> QuestionSchema:
    return await QuestionService(session).update_question_by_text(q, question)

@router.put("/{question_id}")
async def update_question(
    question_id: int,
    question: QuestionSchema,
    session: Session = Depends(get_db_session)
) -> QuestionSchema:
    return await QuestionService(session).update_question(question_id, question)

@router.get("/question/{question_id}", response_model=QuestionSchema | None)
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

@router.get("/quantity", response_model=int)
async def get_quantity(
    session: Session = Depends(get_db_session)
) -> int:
    return await QuestionService(session).get_quantity()

@router.get("/duplicates_count", response_model=int)
async def get_duplicates(
    session: Session = Depends(get_db_session)
) -> int:
    return await QuestionService(session).get_duplicates()