from typing import List

def sort_timeline(events: List[dict]) -> List[dict]:
    """Sort timeline events by time string. Handles HH:MM UTC format."""
    def sort_key(e):
        t = e.get("time", "00:00")
        t = t.replace(" UTC", "").strip()
        parts = t.split(":")
        try:
            return int(parts[0]) * 60 + int(parts[1])
        except Exception:
            return 0
    return sorted(events, key=sort_key)