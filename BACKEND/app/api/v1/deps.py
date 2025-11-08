from fastapi import Depends, HTTPException, Header
from app.core.jwt import verify

def get_current_user(authorization: str = Header(None)):
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=401, detail="missing token")
    token = authorization.split(" ", 1)[1]
    payload = verify(token)
    return payload  # {sub, roles, ...}
