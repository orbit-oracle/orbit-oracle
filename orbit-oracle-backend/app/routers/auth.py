from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from app.models.user import UserRegister, UserLogin, UserOut, TokenOut
from app.services.auth_service import hash_password, verify_password, create_access_token
from app.database.supabase_client import get_supabase_admin
from app.middleware.auth_middleware import get_current_user
import uuid

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/register", response_model=TokenOut)
def register(body: UserRegister):
    sb = get_supabase_admin()

    # 1. Check if email already exists
    try:
        existing = sb.table("users").select("id").eq("email", body.email).execute()
    except Exception as e:
        print(f"[REGISTER] Supabase select failed: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

    if existing.data:
        raise HTTPException(status_code=400, detail="Email already registered.")

    # 2. Hash the password and insert the user
    user_id = str(uuid.uuid4())
    hashed = hash_password(body.password)

    print(f"[REGISTER] Inserting user: {body.email} | role: {body.role}")

    try:
        result = sb.table("users").insert({
            "id":       user_id,
            "name":     body.name,
            "email":    body.email,
            "password": hashed,
            "role":     body.role,
        }).execute()
        print(f"[REGISTER] Insert result: {result.data}")
    except Exception as e:
        print(f"[REGISTER] Supabase insert failed: {e}")
        raise HTTPException(status_code=500, detail=f"Could not create user: {str(e)}")

    if not result.data:
        print("[REGISTER] Insert returned no data — check Supabase RLS or table schema.")
        raise HTTPException(
            status_code=500,
            detail="User was not saved. Check that the users table exists and RLS is disabled."
        )

    # 3. Issue JWT
    token = create_access_token({
        "sub":   user_id,
        "name":  body.name,
        "email": body.email,
        "role":  body.role,
    })
    print(f"[REGISTER] Success: {body.email}")
    return TokenOut(
        access_token=token,
        user=UserOut(id=user_id, name=body.name, email=body.email, role=body.role)
    )


@router.post("/login", response_model=TokenOut)
def login(body: UserLogin):
    sb = get_supabase_admin()

    print(f"[LOGIN] Attempt: {body.email}")

    # 1. Look up user by email
    try:
        res = sb.table("users").select("*").eq("email", body.email).execute()
    except Exception as e:
        print(f"[LOGIN] Supabase select failed: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

    print(f"[LOGIN] Supabase returned {len(res.data)} row(s)")

    if not res.data:
        raise HTTPException(status_code=401, detail="Invalid credentials.")

    user = res.data[0]

    # 2. Verify password against the stored bcrypt hash
    stored_hash = user.get("password", "")
    print(f"[LOGIN] Stored hash starts with: {stored_hash[:10] if stored_hash else 'EMPTY'}")

    if not stored_hash.startswith("$2"):
        # Password is stored as plain text — this user was registered when
        # the backend was broken. Reject and ask them to re-register.
        print(f"[LOGIN] PLAIN TEXT password detected for {body.email}")
        raise HTTPException(
            status_code=401,
            detail="Your account has a corrupted password. Please register again with a new email or contact the admin."
        )

    if not verify_password(body.password, stored_hash):
        print(f"[LOGIN] Wrong password for {body.email}")
        raise HTTPException(status_code=401, detail="Invalid credentials.")

    # 3. Issue JWT
    token = create_access_token({
        "sub":   user["id"],
        "name":  user["name"],
        "email": user["email"],
        "role":  user["role"],
    })
    print(f"[LOGIN] Success: {body.email}")
    return TokenOut(
        access_token=token,
        user=UserOut(
            id=user["id"],
            name=user["name"],
            email=user["email"],
            role=user["role"]
        )
    )


@router.get("/me", response_model=UserOut)
def me(user=Depends(get_current_user)):
    return UserOut(**user)


class ChangePasswordBody(BaseModel):
    currentPassword: str
    newPassword: str


@router.post("/change-password")
def change_password(body: ChangePasswordBody, user=Depends(get_current_user)):
    sb = get_supabase_admin()
    res = sb.table("users").select("password").eq("id", user["id"]).execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="User not found.")
    stored_hash = res.data[0]["password"]
    if not verify_password(body.currentPassword, stored_hash):
        raise HTTPException(status_code=400, detail="Current password is incorrect.")
    new_hash = hash_password(body.newPassword)
    sb.table("users").update({"password": new_hash}).eq("id", user["id"]).execute()
    return {"status": "password updated"}