from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

from app.data.questions import Questions
from app.core.config import config

templates = Jinja2Templates(directory=str(config.paths.templates_path))

router = APIRouter()

questions = Questions().questions

@router.get("/", response_class=HTMLResponse)
async def homepage(request: Request):
    context = {
        "title": "PSE",
        }
    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context=context
    )

@router.get("/questions")
async def get_all_questions():
    return questions

@router.get("/questions/{question_text}")
async def get_one_question(question_text: str):
    if question_text in questions:
        return questions[answer]
    else:
        return "Not found"