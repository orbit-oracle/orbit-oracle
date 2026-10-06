from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import auth, copilot, audit, sources

app = FastAPI(
    title="Orbit Oracle API",
    description="Evidence-grounded Mission Operations Copilot",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        settings.frontend_url,
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(copilot.router)
app.include_router(audit.router)
app.include_router(sources.router)


@app.get("/")
def root():
    return {"status": "Orbit Oracle API online", "version": "1.0.0"}


@app.get("/health")
def health():
    return {"status": "ok"}