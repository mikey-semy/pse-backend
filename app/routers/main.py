from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

from app.const import templates_path

templates = Jinja2Templates(directory=str(templates_path))

router = APIRouter()

nav_items = [
        {"route": "manual_search", "icon": "🔍", "title": "Ручной поиск"},
        {"route": "auto_search", "icon": "🚀", "title": "Автоматический поиск"}
    ]

@router.get("/", response_class=HTMLResponse)
async def homepage(request: Request):
    context = {
        "title": "PSE",
        "nav_items": nav_items
    }

    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context=context
    )

@router.get("/auto_search", response_class=HTMLResponse)
async def auto_search(request: Request):
    context = {
        "title": "Автоматический поиск",
        "nav_items": nav_items
    }
    return templates.TemplateResponse(
        request=request,
        name="auto_search.html",
        context=context
    )

@router.get("/manual_search", response_class=HTMLResponse)
async def manual_search(request: Request):
    context = {
        "title": "Ручной поиск",
        "nav_items": nav_items
    }
    return templates.TemplateResponse(
        request=request,
        name="manual_search.html",
        context=context
    )
