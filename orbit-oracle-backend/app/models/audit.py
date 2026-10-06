from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AuditEntry(BaseModel):
    id: Optional[str] = None
    user_id: str
    user_name: str
    question: str
    answer_title: str
    confidence: int
    sources_count: int
    rating: Optional[str] = None
    created_at: Optional[datetime] = None