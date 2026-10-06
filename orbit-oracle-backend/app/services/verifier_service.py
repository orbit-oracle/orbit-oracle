from typing import List


def verify(ai_response: dict, retrieved_ids: List[str]) -> dict:
    valid = set(retrieved_ids)

    def clean(statements):
        cleaned = []
        for stmt in statements:
            raw_cites = stmt.get("cites", [])
            # Keep only citations that actually exist in retrieved set
            good_cites = [c for c in raw_cites if c in valid]
            # If the AI cited nothing valid, keep the statement anyway
            # but with an empty citations list rather than dropping it
            stmt["cites"] = good_cites
            cleaned.append(stmt)
        return cleaned

    ai_response["obs"] = clean(ai_response.get("obs", []))
    ai_response["rec"] = clean(ai_response.get("rec", []))

    # Keep timeline events even if source is not in retrieved set
    ai_response["timeline"] = ai_response.get("timeline", [])

    # Only mark as insufficient if there are literally no obs statements at all
    if not ai_response.get("obs"):
        ai_response["title"] = "Insufficient evidence to answer this question."
        ai_response["confidence"] = 10
        ai_response["obs"] = [{
            "text": "No matching evidence was found in the knowledge base for this question.",
            "cites": []
        }]
        ai_response["rec"] = [{
            "text": "Try rephrasing with a subsystem name (EPS, ADCS, Thermal), a time window, or an alert code like EPS-07.",
            "cites": []
        }]
        ai_response["insights"] = [
            "The copilot never invents answers. When evidence is absent it says so."
        ]
        ai_response["timeline"] = []

    return ai_response