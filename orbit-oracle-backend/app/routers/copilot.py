from fastapi import APIRouter, Depends, HTTPException
from app.models.copilot import AskRequest, AskResponse, FeedbackRequest
from app.middleware.auth_middleware import get_current_user
from app.services.retrieval_service import retrieve, to_source_objects, build_context
from app.services.ai_service import call_ai
from app.services.verifier_service import verify
from app.services.timeline_service import sort_timeline
from app.services.audit_service import write_audit, write_feedback
import uuid

router = APIRouter(prefix="/api/copilot", tags=["copilot"])

@router.post("/ask", response_model=AskResponse)
async def ask(body: AskRequest, user=Depends(get_current_user)):
    if not body.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty.")

    # 1. Retrieve
    retrieved = retrieve(body.question)
    retrieved_ids = [r["id"] for r in retrieved]
    context = build_context(retrieved)

    # 2. AI call
    try:
        ai_raw = await call_ai(body.question, context)
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"AI service error: {str(e)}")

    # 3. Verify citations
    verified = verify(ai_raw, retrieved_ids)

    # 4. Sort timeline
    verified["timeline"] = sort_timeline(verified.get("timeline", []))

    # 5. Attach source objects to each statement
    source_map = {r["id"]: r for r in retrieved}

    def enrich(stmts):
        out = []
        for s in stmts:
            sources = [source_map[c] for c in s["cites"] if c in source_map]
            out.append({**s, "sources": sources})
        return out

    obs = enrich(verified.get("obs", []))
    rec = enrich(verified.get("rec", []))

    # 6. Build session and write audit
    session_id = str(uuid.uuid4())
    write_audit(
        user_id=user["id"],
        user_name=user["name"],
        question=body.question,
        answer_title=verified["title"],
        confidence=verified["confidence"],
        sources_count=len(retrieved_ids),
        session_id=session_id,
    )

    return AskResponse(
        title=verified["title"],
        confidence=verified["confidence"],
        obs=obs,
        rec=rec,
        insights=verified.get("insights", []),
        timeline=verified.get("timeline", []),
        session_id=session_id,
    )

@router.post("/feedback")
def feedback(body: FeedbackRequest, user=Depends(get_current_user)):
    if body.rating not in ("useful", "wrong"):
        raise HTTPException(status_code=400, detail="Rating must be 'useful' or 'wrong'.")
    write_feedback(body.session_id, body.rating)
    return {"status": "saved"}