import { create } from "zustand"
import type { User } from "@/shared/types/app"
import { getUserFromCookie, setRoleAttribute } from "@/shared/utils/auth"
import * as authApi from "@/shared/api/auth"

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

interface AuthActions {
  // 初期化
  initialize: () => void
  // ログイン
  login: (email: string, password: string) => Promise<void>
  // ログアウト
  logout: () => Promise<void>
  // リフレッシュ
  refresh: () => Promise<void>
  // ユーザー設定
  setUser: (user: User | null) => void
  // エラークリア
  clearError: () => void
}

type AuthStore = AuthState & AuthActions

export const useAuthStore = create<AuthStore>((set, get) => ({
  // State
  user: null,
  isLoading: true,
  error: null,

  // Actions
  initialize: () => {
    const user = getUserFromCookie()
    const role = user?.roles?.includes("admin") ? "admin" : "standard"
    setRoleAttribute(role)
    set({ user, isLoading: false })
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await authApi.login({ email, password })
      if (response.ok && response.user) {
        const role = response.user.roles?.includes("admin") ? "admin" : "standard"
        setRoleAttribute(role)
        set({ user: response.user, isLoading: false })
      } else {
        set({ error: response.error || "Login failed", isLoading: false })
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Login failed",
        isLoading: false
      })
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null })
    try {
      await authApi.logout()
      setRoleAttribute("standard")
      set({ user: null, isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Logout failed",
        isLoading: false
      })
    }
  },

  refresh: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await authApi.refresh()
      if (response.ok && response.user) {
        const role = response.user.roles?.includes("admin") ? "admin" : "standard"
        setRoleAttribute(role)
        set({ user: response.user, isLoading: false })
      } else {
        set({ error: response.error || "Refresh failed", isLoading: false })
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Refresh failed",
        isLoading: false
      })
    }
  },

  setUser: (user: User | null) => {
    const role = user?.roles?.includes("admin") ? "admin" : "standard"
    setRoleAttribute(role)
    set({ user })
  },

  clearError: () => {
    set({ error: null })
  },
}))

// Selectors
export const useUser = () => useAuthStore((state) => state.user)
export const useUserRole = () => {
  const user = useAuthStore((state) => state.user)
  return user?.roles?.includes("admin") ? "admin" : "standard"
}
export const useAuthLoading = () => useAuthStore((state) => state.isLoading)
export const useAuthError = () => useAuthStore((state) => state.error)
