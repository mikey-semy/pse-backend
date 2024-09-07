import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.const import app_params, uvicorn_params, origins
from app.routers import main, questions
from app.core.config import config

static = StaticFiles(directory=config.paths.static_path)

app = FastAPI(**app_params)
app.mount("/static", static, name="static")

app.include_router(main.router)
app.include_router(questions.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run(app, **uvicorn_params)
