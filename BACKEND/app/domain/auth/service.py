from typing import List, Optional, Tuple
from app.core.jwt import sign_access, sign_refresh, verify
from app.schemas.api.auth import UserResponse, LoginRequest, RefreshRequest

class AuthService:
    """認証関連のビジネスロジックを管理するドメインサービス"""

    # デモ用ユーザー（本番はDB）
    USERS = {
        "admin@example.com": {"password": "adminpass", "roles": ["admin"]},
        "user@example.com": {"password": "userpass", "roles": ["standard"]},
    }

    @classmethod
    def authenticate_user(cls, login_request: LoginRequest) -> Optional[UserResponse]:
        """
        ユーザー認証を行う

        Args:
            login_request: ログインリクエストオブジェクト

        Returns:
            認証成功時: UserResponse オブジェクト
            認証失敗時: None
        """
        user = cls.USERS.get(login_request.email)
        if not user or login_request.password != user["password"]:
            return None

        return UserResponse(
            email=login_request.email,
            roles=user["roles"]
        )

    @classmethod
    def generate_tokens(cls, email: str, roles: List[str]) -> Tuple[str, str, int]:
        """
        JWTトークンを生成する

        Args:
            email: ユーザーのメールアドレス
            roles: ユーザーのロール一覧

        Returns:
            (access_token, refresh_token, expires_in)
        """
        access_token, ttl = sign_access(sub=email, roles=roles)
        refresh_token = sign_refresh(sub=email)

        return access_token, refresh_token, ttl

    @classmethod
    def refresh_access_token(cls, refresh_request: RefreshRequest) -> Tuple[str, int]:
        """
        リフレッシュトークンから新しいアクセストークンを生成する

        Args:
            refresh_request: リフレッシュリクエストオブジェクト

        Returns:
            (access_token, expires_in)
        """
        payload = verify(refresh_request.refresh_token)
        if payload.get("typ") != "refresh":
            raise ValueError("Invalid refresh token")

        # ユーザーのロールを再取得
        user = cls.USERS.get(payload["sub"])
        roles = user["roles"] if user else []

        access_token, ttl = sign_access(sub=payload["sub"], roles=roles)
        return access_token, ttl

    @classmethod
    def get_user_by_email(cls, email: str) -> Optional[UserResponse]:
        """
        メールアドレスでユーザー情報を取得する

        Args:
            email: ユーザーのメールアドレス

        Returns:
            UserResponse オブジェクト、存在しない場合はNone
        """
        user = cls.USERS.get(email)
        if not user:
            return None

        return UserResponse(
            email=email,
            roles=user["roles"]
        )
