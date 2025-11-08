from fastapi import APIRouter, HTTPException
from app.domain.auth.service import AuthService
from app.schemas.api.auth import (
    LoginRequest,
    RefreshRequest,
    LoginResponse,
    RefreshResponse,
    LogoutResponse,
    ErrorResponse
)

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login", response_model=LoginResponse)
def login(body: LoginRequest):
    # ユーザー認証
    user = AuthService.authenticate_user(body)
    if not user:
        raise HTTPException(status_code=401, detail="invalid credentials")

    # トークン生成
    access_token, refresh_token, expires_in = AuthService.generate_tokens(
        user.email, user.roles
    )

    return LoginResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        expires_in=expires_in,
        user=user
    )

@router.post("/refresh", response_model=RefreshResponse)
def refresh(body: RefreshRequest):
    try:
        access_token, expires_in = AuthService.refresh_access_token(body)
        return RefreshResponse(
            access_token=access_token,
            expires_in=expires_in
        )
    except ValueError:
        raise HTTPException(status_code=401, detail="invalid refresh")

@router.post("/logout", response_model=LogoutResponse)
def logout():
    # ログアウト処理（トークンの無効化はクライアント側でCookieを削除）
    return LogoutResponse(message="Logged out successfully")
