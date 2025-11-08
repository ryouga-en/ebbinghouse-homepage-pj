/**
 * 認証関連の型定義
 */

export interface LoginInput {
  email: string
  password: string
}

export interface LoginResponse {
  ok: boolean
  error?: string
  user?: {
    email: string
    roles: string[]
  }
}

export interface RefreshResponse {
  ok: boolean
  error?: string
  user?: {
    email: string
    roles: string[]
  }
}

export interface LogoutResponse {
  ok: boolean
}
