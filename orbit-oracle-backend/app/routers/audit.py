from fastapi import APIRouter, Depends
from app.middleware.auth_middleware import get_current_user
from app.services.audit_service import get_audit_log

router = APIRouter(prefix="/api/audit", tags=["audit"])

@router.get("/log")
def audit_log(user=Depends(get_current_user)):
    return get_audit_log()