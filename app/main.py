import uvicorn
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.const import app_params, uvicorn_params, static_path
from app.core.config import cors_params
from app.routers import main, questions

static = StaticFiles(directory=static_path)

app = FastAPI(**app_params)
app.mount("/static", static, name="static")

app.include_router(main.router)
app.include_router(questions.router)

app.add_middleware(**cors_params)

if __name__ == "__main__":
    uvicorn.run(app, **uvicorn_params)
