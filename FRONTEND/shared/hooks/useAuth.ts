import { useMutation, useQueryClient } from "@tanstack/react-query"
import * as authApi from "@/shared/api/auth"
import type { LoginInput } from "@/shared/types/auth"
import { useAuthStore } from "@/stores/authStore"

/**
 * ログインミューテーション
 */
export function useLoginMutation() {
  const queryClient = useQueryClient()
  const { setUser, clearError } = useAuthStore()

  return useMutation({
    mutationFn: (input: LoginInput) => authApi.login(input),
    onSuccess: (data) => {
      if (data.ok && data.user) {
        setUser(data.user)
        clearError()
        // 将来的にユーザークエリがある場合は無効化
        // queryClient.invalidateQueries({ queryKey: ["user"] })
      }
    },
    onError: (error) => {
      console.error("Login failed:", error)
    },
  })
}

/**
 * ログアウトミューテーション
 */
export function useLogoutMutation() {
  const queryClient = useQueryClient()
  const { setUser, clearError } = useAuthStore()

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      setUser(null)
      clearError()
      // キャッシュをクリア
      queryClient.clear()
    },
    onError: (error) => {
      console.error("Logout failed:", error)
    },
  })
}

/**
 * トークンリフレッシュミューテーション
 */
export function useRefreshMutation() {
  const queryClient = useQueryClient()
  const { setUser, clearError } = useAuthStore()

  return useMutation({
    mutationFn: () => authApi.refresh(),
    onSuccess: (data) => {
      if (data.ok && data.user) {
        setUser(data.user)
        clearError()
        // 将来的にユーザークエリがある場合は無効化
        // queryClient.invalidateQueries({ queryKey: ["user"] })
      }
    },
    onError: (error) => {
      console.error("Refresh failed:", error)
    },
  })
}

// 将来的にユーザー情報取得エンドポイント (/api/auth/me) が追加された場合の実装例
// export function useUserQuery() {
//   return useQuery({
//     queryKey: ["user"],
//     queryFn: () => authApi.me(),
//     staleTime: 1000 * 60 * 5, // 5分間はキャッシュを使用
//     retry: false,
//   })
// }
