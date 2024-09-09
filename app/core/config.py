
import pprint
from pydantic import BaseModel, Field
from pydantic_settings import (
    BaseSettings,
    SettingsConfigDict,
)
from app.const import env_path

class DatabaseModel(BaseModel):

    dsn: str = Field(default=None)

class Settings(BaseSettings):

    db: DatabaseModel

    model_config = SettingsConfigDict(
        env_file=env_path,
        env_file_encoding="utf-8",
        env_nested_delimiter="__",
        extra='allow'
    )

config = Settings()

print("=============DB_SETTINGS=============")
pp = pprint.PrettyPrinter(indent=4)
pp.pprint(config.model_dump())
print("==================================")