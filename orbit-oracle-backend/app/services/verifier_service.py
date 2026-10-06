from typing import List

def verify(ai_response: dict, retrieved_ids: List[str]) -> dict:
    """
    Remove or flag any citations that were not in the retrieved set.
    Also removes statements that have no valid citations left.
    """
    valid = set(retrieved_ids)

    def clean(statements):
        cleaned = []
        for stmt in statements:
            good_cites = [c for c in stmt.get("cites", []) if c in valid]
            if good_cites:
                stmt["cites"] = good_cites
                cleaned.append(stmt)
        return cleaned

    ai_response["obs"] = clean(ai_response.get("obs", []))
    ai_response["rec"] = clean(ai_response.get("rec", []))

    # Clean timeline sources
    ai_response["timeline"] = [
        e for e in ai_response.get("timeline", [])
        if e.get("source") in valid
    ]

    # If no valid obs statements remain, mark as insufficient
    if not ai_response["obs"]:
        ai_response["title"] = "Insufficient evidence to answer this reliably."
        ai_response["confidence"] = 10
        ai_response["obs"] = [{"text": "No matching evidence was found for this question.", "cites": []}]
        ai_response["rec"] = [{"text": "Try a subsystem name, a time window or an alert code.", "cites": []}]
        ai_response["insights"] = ["Nothing was invented. When evidence is missing, the copilot says so."]
        ai_response["timeline"] = []

    return ai_response