from typing import Dict
from pathlib import Path
from pydantic_settings import (
    BaseSettings,
    SettingsConfigDict,
)
from pydantic import str

class DatabaseSettings(BaseSettings):

    DSN:    str

class EngineSettings(BaseSettings):

    echo:   bool = True

    @property
    def params(self) -> Dict[str, bool]:
        return {"echo": self.echo}

class SessionSettings(BaseSettings):

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

    postgres_user: str
    postgres_password: str
    postgres_db: str

    model_config = SettingsConfigDict(
        env_file=paths.env_path,
        env_file_encoding="utf-8",
        env_nested_delimiter="__",
    )

config = Settings()
