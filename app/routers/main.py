from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

from app.core.config import config

templates = Jinja2Templates(directory=str(config.paths.templates_path))

router = APIRouter()

@router.get("", response_class=HTMLResponse)
async def homepage(request: Request):
    context = {
        "title": "PSE",
        }
    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context=context
    )
