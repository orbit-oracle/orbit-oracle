from pydantic import BaseModel
from typing import List, Optional

class AskRequest(BaseModel):
    question: str

class Source(BaseModel):
    id: str
    type: str
    time: str
    title: str
    excerpt: str

class Statement(BaseModel):
    text: str
    cites: List[str]
    sources: List[Source]

class TimelineEvent(BaseModel):
    time: str
    event: str
    source: str

class AskResponse(BaseModel):
    title: str
    confidence: int
    obs: List[Statement]
    rec: List[Statement]
    insights: List[str]
    timeline: List[TimelineEvent]
    session_id: str

class FeedbackRequest(BaseModel):
    session_id: str
    rating: str

class SourceRequest(BaseModel):
    source_id: str