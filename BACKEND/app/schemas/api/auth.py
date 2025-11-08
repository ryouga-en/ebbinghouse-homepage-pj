from pydantic import BaseModel, EmailStr
from typing import List, Optional

class LoginRequest(BaseModel):
    """ログインリクエストのスキーマ"""
    email: EmailStr
    password: str

class RefreshRequest(BaseModel):
    """リフレッシュトークンリクエストのスキーマ"""
    refresh_token: str

class UserResponse(BaseModel):
    """ユーザー情報レスポンスのスキーマ"""
    email: str
    roles: List[str]

class LoginResponse(BaseModel):
    """ログインレスポンスのスキーマ"""
    access_token: str
    refresh_token: str
    expires_in: int
    user: UserResponse

class RefreshResponse(BaseModel):
    """リフレッシュレスポンスのスキーマ"""
    access_token: str
    expires_in: int

class LogoutResponse(BaseModel):
    """ログアウトレスポンスのスキーマ"""
    message: str

class ErrorResponse(BaseModel):
    """エラーレスポンスのスキーマ"""
    detail: str
