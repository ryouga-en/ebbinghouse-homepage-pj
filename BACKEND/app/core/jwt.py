import time
import jwt
from app.core.setting import settings

def sign_access(sub: str, roles: list[str]) -> tuple[str, int]:
    exp = int(time.time()) + settings.access_ttl
    token = jwt.encode({"sub": sub, "roles": roles, "iss": settings.jwt_issuer, "exp": exp}, settings.jwt_secret, algorithm="HS256")
    return token, settings.access_ttl

def sign_refresh(sub: str) -> str:
    exp = int(time.time()) + settings.refresh_ttl
    return jwt.encode({"sub": sub, "typ": "refresh", "iss": settings.jwt_issuer, "exp": exp}, settings.jwt_secret, algorithm="HS256")

def verify(token: str) -> dict:
    return jwt.decode(token, settings.jwt_secret, algorithms=["HS256"], options={"require": ["exp","iss"]}, issuer=settings.jwt_issuer)
