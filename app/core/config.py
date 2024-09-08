from typing import Dict, Optional, Any
import pprint
import urllib.parse
from pydantic import BaseModel, SecretStr, Field
from pydantic_settings import (
    BaseSettings,
    SettingsConfigDict,
)
from app.const import env_path
class EngineModel(BaseModel):

    echo:   bool = True

    @property
    def params(self) -> Dict[str, bool]:
        return {"echo": self.echo}

class SessionModel(BaseModel):

    autocommit:         bool = False
    autoflush:          bool = False
    expire_on_commit:   bool = False

    @property
    def params(self) -> Dict[str, bool]:
        return {
            "autocommit": self.autocommit,
            "autoflush": self.autoflush,
            "expire_on_commit": self.expire_on_commit
        }
class DatabaseModel(BaseModel):

    engine: EngineModel = EngineModel()
    session: SessionModel = SessionModel()

    env: str = Field(default="dev")
    dialect: str = Field(default="sqlite")
    drivername: str = Field(default="aiosqlite")
    username: Optional[str] = None
    password: Optional[SecretStr] = None
    host: Optional[str] = None
    port: Optional[int] = None
    name: str = Field(default="./database_pse.db")

    @property
    def params(self) -> Dict[str, str]:
        if self.env == "dev":
            return {
                "drivername": f"{self.dialect}+{self.drivername}",
                "database": self.name
            }
        elif self.env == "prod":
            return {
                "drivername": f"{self.dialect}+{self.drivername}",
                "username": self.username,
                "password": urllib.parse.quote_plus(self.password.get_secret_value()),
                "host": self.host,
                "port": self.port,
                "database": self.name
            }

class Settings(BaseSettings):

    db: DatabaseModel = DatabaseModel()
    flat_params: Dict[str, Any] = Field(default_factory=dict)
    model_config = SettingsConfigDict(

        env_file=env_path,
        env_file_encoding="utf-8",
        env_nested_delimiter="__",

        extra='allow'
    )
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.flat_params = {k: v for k, v in self.model_dump().items() if not isinstance(v, dict)}
config = Settings()
db = {k: v for k, v in config.model_dump().items() if not isinstance(v, dict)}

print("=============SETTINGS=============")
pp = pprint.PrettyPrinter(indent=4)
pp.pprint(Settings().model_dump())
print(f"============={Settings().db.env}=============")
pp.pprint({k: v for k, v in config.model_dump().items() if not isinstance(v, dict)})
pp.pprint(Settings().model_config)
print("==================================")