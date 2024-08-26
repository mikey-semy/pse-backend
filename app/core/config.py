from typing import Dict
from pathlib import Path
import urllib.parse
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import SecretStr

class DatabaseSettings(BaseSettings):

    DIALECT:             str
    DRIVERNAME:          str
    USERNAME:            str
    PASSWORD:            SecretStr
    HOST:                str
    PORT:                int
    NAME:                str


    @property
    def params(self) -> Dict[str, str]:
        return {
            "drivername": f"{self.DIALECT}+{self.DRIVERNAME}",
            "username": self.USERNAME,
            "password": urllib.parse.quote_plus(self.PASSWORD.get_secret_value()),
            "host": self.HOST,
            "port": self.PORT,
            "database": self.NAME
        }

class EngineSettings(BaseSettings):

    ECHO: bool = True

    @property
    def params(self) -> Dict[str, bool]:
        return {"echo": self.ECHO}
    
class SessionSettings(BaseSettings):

    AUTOCOMMIT: bool = False
    AUTOFLUSH: bool = False
    EXPIRE_ON_COMMIT: bool = False

    @property
    def params(self) -> Dict[str, bool]:
        return {
            "autocommit": self.AUTOCOMMIT,
            "autoflush": self.AUTOFLUSH,
            "expire_on_commit": self.EXPIRE_ON_COMMIT
        }

class PathSettings(BaseSettings):

    # File names
    env_file_name:          Path    =   Path('.env')
    
    # Folder names
    app_folder_name:        Path    =   Path('app')
    templates_folder_name:  Path    =   Path('templates')
    static_folder_name:     Path    =   Path('static')

    # Paths
    main_path:              Path    =   Path(__file__).resolve().parents[2]
    env_path:               Path    =   main_path / env_file_name
    app_path:               Path    =   app_folder_name
    templates_path:         Path    =   app_folder_name / templates_folder_name
    static_path:            Path    =   app_folder_name / static_folder_name


class Settings(BaseSettings):
    
    db: DatabaseSettings = DatabaseSettings()
    engine: EngineSettings = EngineSettings()
    session: SessionSettings = SessionSettings()
    paths: PathSettings = PathSettings()

    model_config = SettingsConfigDict(
        env_file=paths.env_path,
        env_file_encoding="utf-8",
        env_nested_delimiter="__",
    )

config = Settings()