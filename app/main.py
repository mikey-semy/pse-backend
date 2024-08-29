import uvicorn
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.const import app_params, uvicorn_params
from app.routers import main, questions
from app.core.config import config

static = StaticFiles(directory=config.paths.static_path)

app = FastAPI(**app_params)
app.mount("/static", static, name="static")

app.include_router(main.router)
app.include_router(questions.router)

if __name__ == "__main__":
    uvicorn.run(app, **uvicorn_params)
