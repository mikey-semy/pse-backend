from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

class PathSettings(BaseSettings):
    

    env_file: Path = Path('.env')

    # Folder names
    app_folder_name:        Path    =   Path('app')
    templates_folder_name:  Path    =   Path('templates')
    static_folder_name:     Path    =   Path('static')

    # Paths
    main_path:              Path    =   Path(__file__).resolve().parents[2]
    env_path:               Path    =   main_path
    app_path:               Path    =   app_folder_name
    templates_path:         Path    =   app_folder_name / templates_folder_name
    static_path:            Path    =   templates_path / static_folder_name
    

class Settings(BaseSettings):
    paths: PathSettings = PathSettings()

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        env_nested_delimiter="__",
    )

config = Settings()
