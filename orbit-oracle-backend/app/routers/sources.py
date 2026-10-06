from fastapi import APIRouter, HTTPException, Depends
from app.middleware.auth_middleware import get_current_user
from app.database.chroma_client import get_collection

router = APIRouter(prefix="/api/sources", tags=["sources"])

COLLECTIONS = ["mission_logs", "telemetry", "procedures", "incident_history"]

@router.get("/{source_id}")
def get_source(source_id: str, user=Depends(get_current_user)):
    for col_name in COLLECTIONS:
        col = get_collection(col_name)
        try:
            res = col.get(ids=[source_id])
            if res["ids"]:
                meta = res["metadatas"][0]
                doc  = res["documents"][0]
                return {
                    "id":       source_id,
                    "type":     meta.get("source_type"),
                    "title":    meta.get("title"),
                    "time":     meta.get("time"),
                    "subsystem":meta.get("subsystem"),
                    "full_text":doc,
                }
        except Exception:
            continue
    raise HTTPException(status_code=404, detail=f"Source {source_id} not found.")