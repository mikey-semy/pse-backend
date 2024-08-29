from typing import Final, Dict, Any
from app.version import __version__

# Application params
app_title: Final[str] = "PSE"
app_description: Final[str] = ""

app_params:   Final[Dict[str, Any]] = {
    "title": app_title, 
    "description": app_description,
    "version": __version__,
    "swagger_ui_parameters": {"defaultModelsExpandDepth": -1},
    }

# Uvicorn params
host: Final = "0.0.0.0"
port: Final = 8000

uvicorn_params:   Final[Dict[str, Any]] = {
    "host": host, 
    "port": port
    }