from typing import Final, Dict, Any
from app.version import __version__

# Application params
APP_TITLE: Final[str] = "PSE"
APP_DESCRIPTION: Final[str] = ""

app_params:   Final[Dict[str, Any]] = {
    "title": APP_TITLE, 
    "description": APP_DESCRIPTION,
    "version": __version__,
    "swagger_ui_parameters": {"defaultModelsExpandDepth": -1},
    }

# Uvicorn params
HOST: Final = "0.0.0.0"
PORT: Final = 8000

uvicorn_params:   Final[Dict[str, Any]] = {
    "host": HOST, 
    "port": PORT
    }