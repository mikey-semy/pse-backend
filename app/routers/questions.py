from fastapi import APIRouter, Request
from app.data.questions import Questions
from app.core.config import config
from urllib.parse import unquote

router = APIRouter()

questions: list[str, list] = Questions().questions

@router.get("/questions")
async def get_all_questions():
    return questions

@router.get("/question/{question_text}")
async def get_one_question(question_text: str):
    decoded_question_text = unquote(question_text)
    print(decoded_question_text)
    for question in questions:
        for key, value in question.items():
            print(key)
            # if value["question_text"] == decoded_question_text:
            #     return value
    return "Not found"

################# in app
# from fastapi import FastAPI, Query
# from typing import List
# from app.data.questions import questions

# app = FastAPI()

# @app.get("/search/", response_model=List[dict])
# async def search_questions(q: str = Query(..., min_length=3)):
#     results = [
#         question for question in questions
#         if q.lower() in question["question_text"].lower()
#     ]
#     return results
################# in db
# from sqlalchemy.orm import Session
# from sqlalchemy import select
# from app.models import Question

# @app.get("/search/", response_model=List[dict])
# async def search_questions(q: str = Query(..., min_length=3), db: Session = Depends(get_db)):
#     query = select(Question).where(Question.question_text.ilike(f"%{q}%"))
#     results = db.execute(query).scalars().all()
#     return results


# В предоставленном контексте кода действительно нет конструкции @router.get("/question/{question_text}"). Текст вопроса (question_text) обычно не используется напрямую в URL пути.

# Вместо этого, более распространенный подход - это:

# Использовать идентификатор вопроса в URL, например: @router.get("/question/{question_id}")

# Реализовать поисковый эндпоинт, который принимает текст вопроса как параметр запроса, например:

# @router.get("/search")
# async def search_questions(q: str = Query(..., min_length=3)):
#     # Здесь логика поиска вопросов по тексту
#     pass

# В этом случае запрос будет выглядеть так: GET /search?q=текст_вопроса

# Такой подход позволяет более гибко искать вопросы, не ограничиваясь точным совпадением текста в URL.