"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser, useAuthLoading } from "@/stores/authStore"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = useUser()
  const isLoading = useAuthLoading()
  const router = useRouter()

  // 管理者かどうかを判定
  const isAdmin = user?.roles?.includes("admin")

  // 認証チェック
  useEffect(() => {
    // ローディング中は何もしない
    if (isLoading) return

    // 未ログインまたはadminでない場合はログインページにリダイレクト
    if (!user || !isAdmin) {
      router.push("/login")
    }
  }, [user, isAdmin, isLoading, router])

  // ローディング中またはアクセス権限がない場合はローディング表示
  if (isLoading || !user || !isAdmin) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto"
            style={{ borderBottomColor: "var(--brand)" }}
          ></div>
          <p className="mt-4 text-gray-600">認証確認中...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
