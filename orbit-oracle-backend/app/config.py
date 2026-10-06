from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    supabase_url: str
    supabase_key: str
    supabase_service_key: str
    jwt_secret: str
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 10080
    gemini_api_key: str = ""
    groq_api_key: str = ""
    ai_provider: str = "gemini"
    chroma_path: str = "./chroma_db"
    frontend_url: str = "http://localhost:5173"

    class Config:
        env_file = ".env"

settings = Settings()