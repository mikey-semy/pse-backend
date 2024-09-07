import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.const import app_params, uvicorn_params, origins
from app.routers import main, questions
from app.core.config import config
from fastapi.openapi.docs import get_swagger_ui_html
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

@app.get("/docs", include_in_schema=False)
async def custom_swagger_ui_html(req: Request):
    root_path = req.scope.get("root_path", "").rstrip("/")
    openapi_url = root_path + app.openapi_url
    return get_swagger_ui_html(
        openapi_url=openapi_url,
        title="API",
    )
    
if __name__ == "__main__":
    uvicorn.run(app, **uvicorn_params)
