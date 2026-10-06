from app.database.supabase_client import get_supabase
from datetime import datetime

def write_audit(user_id: str, user_name: str, question: str,
                answer_title: str, confidence: int,
                sources_count: int, session_id: str):
    try:
        sb = get_supabase()
        sb.table("audit_log").insert({
            "id":            session_id,
            "user_id":       user_id,
            "user_name":     user_name,
            "question":      question,
            "answer_title":  answer_title,
            "confidence":    confidence,
            "sources_count": sources_count,
            "created_at":    datetime.utcnow().isoformat(),
        }).execute()
    except Exception as e:
        print(f"Audit write failed (non-fatal): {e}")

def write_feedback(session_id: str, rating: str):
    try:
        sb = get_supabase()
        sb.table("audit_log").update({"rating": rating}).eq("id", session_id).execute()
    except Exception as e:
        print(f"Feedback write failed (non-fatal): {e}")

def get_audit_log(limit: int = 50):
    try:
        sb = get_supabase()
        res = sb.table("audit_log").select("*").order("created_at", desc=True).limit(limit).execute()
        return res.data
    except Exception as e:
        print(f"Audit read failed: {e}")
        return []