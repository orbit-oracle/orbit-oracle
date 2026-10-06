from supabase import create_client, Client
from app.config import settings

def get_supabase() -> Client:
    return create_client(settings.supabase_url, settings.supabase_key)

def get_supabase_admin() -> Client:
    return create_client(settings.supabase_url, settings.supabase_service_key)