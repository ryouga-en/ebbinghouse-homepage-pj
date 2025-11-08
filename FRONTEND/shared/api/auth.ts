import { fetchJson } from "@/shared/utils/http"
import type {
  LoginInput,
  LoginResponse,
  RefreshResponse,
  LogoutResponse,
} from "@/shared/types/auth"

const BASE = "/api/auth" // 認証用BFF

export const login = (input: LoginInput) =>
  fetchJson<LoginResponse>(`${BASE}/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  })

export const refresh = () =>
  fetchJson<RefreshResponse>(`${BASE}/refresh`, {
    method: "POST",
  })

export const logout = () =>
  fetchJson<LogoutResponse>(`${BASE}/logout`, {
    method: "POST",
  })
