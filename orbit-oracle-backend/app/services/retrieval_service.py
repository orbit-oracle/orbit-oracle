from app.database.chroma_client import get_collection
from app.models.copilot import Source
from typing import List, Tuple
import re

COLLECTIONS = ["mission_logs", "telemetry", "procedures", "incident_history"]
TYPE_LABELS = {
    "mission_logs":     "log",
    "telemetry":        "telemetry",
    "procedures":       "procedure",
    "incident_history": "incident",
}

def retrieve(question: str, n_results: int = 5) -> List[dict]:
    results = []
    for col_name in COLLECTIONS:
        col = get_collection(col_name)
        try:
            res = col.query(query_texts=[question], n_results=n_results)
            for i, doc_id in enumerate(res["ids"][0]):
                meta = res["metadatas"][0][i]
                doc  = res["documents"][0][i]
                dist = res["distances"][0][i]
                results.append({
                    "id":        meta.get("source_id", doc_id),
                    "type":      TYPE_LABELS.get(col_name, col_name),
                    "time":      meta.get("time", "—"),
                    "title":     meta.get("title", ""),
                    "excerpt":   doc[:300],
                    "score":     1 - dist,
                })
        except Exception:
            pass
    results.sort(key=lambda x: x["score"], reverse=True)
    return results[:12]

def to_source_objects(items: List[dict]) -> List[Source]:
    return [Source(**{k: v for k, v in it.items() if k != "score"}) for it in items]

def build_context(items: List[dict]) -> str:
    lines = []
    for it in items:
        lines.append(
            f"[{it['id']}] ({it['type']}) {it['title']} — {it['time']}\n{it['excerpt']}"
        )
    return "\n\n".join(lines)