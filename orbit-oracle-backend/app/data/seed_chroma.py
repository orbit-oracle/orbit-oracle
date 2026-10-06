"""
Run this once to load sample data into ChromaDB.
Usage: python -m app.data.seed_chroma
"""
import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from app.database.chroma_client import get_collection
from app.data.sample_data import MISSION_LOGS, TELEMETRY, PROCEDURES, INCIDENTS

def seed():
    collections = {
        "mission_logs":   MISSION_LOGS,
        "telemetry":      TELEMETRY,
        "procedures":     PROCEDURES,
        "incident_history": INCIDENTS,
    }
    for name, items in collections.items():
        col = get_collection(name)
        existing = col.get()["ids"]
        for item in items:
            if item["id"] not in existing:
                col.add(
                    ids=[item["id"]],
                    documents=[item["text"]],
                    metadatas=[{
                        "source_id":  item["id"],
                        "time":       item["time"],
                        "subsystem":  item["subsystem"],
                        "title":      item["title"],
                        "source_type": name,
                    }]
                )
        print(f"  {name}: {len(items)} items loaded")
    print("Seeding complete.")

if __name__ == "__main__":
    seed()