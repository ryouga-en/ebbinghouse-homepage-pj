"use client"

import React, { useEffect } from "react"
import { Footer } from "@/shared/components/layout/Footer"
import { useAuthStore, useAuthLoading } from "@/stores/authStore"

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const initialize = useAuthStore((state) => state.initialize)
  const isLoading = useAuthLoading()

  // 初期化：ユーザー情報をCookieから取得
  useEffect(() => {
    if (typeof window === "undefined") return
    initialize()
  }, [initialize])

  // ローディング画面
  if (isLoading) {
    return (
      <div className="h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto"
            style={{ borderBottomColor: "var(--brand)" }}
          ></div>
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <main className="flex-1 overflow-auto bg-white">{children}</main>
      <Footer
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
    </div>
  )
}
