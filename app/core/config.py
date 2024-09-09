from pydantic import Field
from pydantic_settings import (
    BaseSettings,
    SettingsConfigDict,
)
from app.const import env_path

class Settings(BaseSettings):

    dsn: str = Field(default="sqlite+aiosqlite:///./database_pse.db")
    
    model_config = SettingsConfigDict(
        env_file=env_path,
        env_file_encoding="utf-8",
        env_nested_delimiter="__",
        extra='allow'
    )

config = Settings()
