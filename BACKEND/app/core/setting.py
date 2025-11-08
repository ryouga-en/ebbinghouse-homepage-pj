from pydantic_settings import BaseSettings
from dotenv import load_dotenv

# .envファイルを読み込み
load_dotenv()

class Settings(BaseSettings):
    app_base_url: str = "http://localhost:3000"
    jwt_secret: str = "CHANGE_ME"     # 本番は Secret Manager などで注入
    jwt_issuer: str = "elsia-demo"
    access_ttl: int = 1800            # 30min
    refresh_ttl: int = 60*60*24*30    # 30days

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()