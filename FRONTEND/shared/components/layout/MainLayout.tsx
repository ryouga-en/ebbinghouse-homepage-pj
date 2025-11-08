"use client"

import React, { useEffect } from "react"
import { useAtom } from "jotai"
import { Sidebar } from "@/shared/components/layout/Sidebar"
import { Header } from "@/shared/components/layout/Header"
import { RightSidebar } from "@/shared/components/layout/RightSidebar"
import {
  leftSidebarOpenAtom,
  rightSidebarOpenAtom,
  rightSidebarWidthAtom,
} from "@/atoms/appState"
import { useAuthStore, useAuthLoading } from "@/stores/authStore"

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [leftOpen, setLeftOpen] = useAtom(leftSidebarOpenAtom)
  const [rightOpen, setRightOpen] = useAtom(rightSidebarOpenAtom)
  const [rightSidebarWidth, setRightSidebarWidth] = useAtom(rightSidebarWidthAtom)
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
    <div className="h-screen flex overflow-hidden">
      <Sidebar
        open={leftOpen}
        onClose={() => setLeftOpen(false)}
        onOpen={() => setLeftOpen(true)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onToggleLeft={() => setLeftOpen(!leftOpen)}
          onToggleRight={() => setRightOpen(!rightOpen)}
          onSettingsClick={() => {}}
          rightSidebarOpen={rightOpen}
        />
        <main className="flex-1 overflow-hidden bg-white min-w-0">{children}</main>
      </div>
      <div
        className={`transition-all duration-300 ${rightOpen ? "" : "w-0"}`}
        style={{
          width: rightOpen
            ? `${Math.min(Math.max(rightSidebarWidth, 0), window.innerWidth / 2)}px`
            : "0px",
        }}
      >
        {rightOpen && (
          <RightSidebar
            onClose={() => setRightOpen(false)}
            width={rightSidebarWidth}
            onWidthChange={setRightSidebarWidth}
          />
        )}
      </div>
    </div>
  )
}
