"use client"

import { Search, User, LogOut } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { XIcon, PanelRightFilledIcon, PanelOutlineIcon } from "@/shared/components/icons"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/stores/authStore"
import { useLogoutMutation } from "@/shared/hooks/useAuth"
import type { HeaderProps } from "@/shared/types/layout"

export function Header({
  searchQuery,
  onSearchChange,
  onToggleLeft,
  onToggleRight,
  onSettingsClick,
  rightSidebarOpen,
}: HeaderProps) {
  const user = useUser()
  const logoutMutation = useLogoutMutation()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // ユーザーメニューの外側をクリックした時に閉じる
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleHomeClick = () => {
    router.push("/")
  }

  const handleLogout = async () => {
    setShowUserMenu(false)

    try {
      await logoutMutation.mutateAsync()
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
      alert("ログアウトに失敗しました")
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 ml-0 sticky top-0 z-50">
      <div className="w-[20%] flex items-center gap-3">
        <div
          className="cursor-pointer select-none hover:bg-gray-100 rounded-md p-1 transition-colors"
          title="ホームに戻る"
          onClick={handleHomeClick}
        >
          <XIcon className="h-12 w-12" style={{ color: 'var(--brand)' }} />
        </div>
      </div>

      <div className="w-[60%] flex justify-center px-8">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="検索..."
            className="pl-10 w-full bg-gray-50 border-gray-200"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="w-[20%] flex items-center justify-end gap-2 pr-4">
        <div
          className="w-8 h-8 p-0 cursor-pointer flex items-center justify-center rounded hover:bg-gray-100"
          onClick={onToggleRight}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {rightSidebarOpen ? (
            isHovering ? (
              <PanelOutlineIcon className="h-6 w-6" style={{ color: 'var(--brand)' }} />
            ) : (
              <PanelRightFilledIcon className="h-6 w-6" style={{ color: 'var(--brand)' }} />
            )
          ) : (
            isHovering ? (
              <PanelRightFilledIcon className="h-6 w-6 text-gray-600" />
            ) : (
              <PanelOutlineIcon className="h-6 w-6 text-gray-600" />
            )
          )}
        </div>
        
        <div className="relative" ref={userMenuRef}>
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-8 h-8 p-0 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--brand)' }} 
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <User className="h-4 w-4 text-white" />
          </Button>
          
          {showUserMenu && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <div className="py-2">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">ユーザー</p>
                  <p className="text-xs text-gray-500">{user?.email || "未ログイン"}</p>
                </div>
                <button
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <LogOut className="h-4 w-4" />
                  {logoutMutation.isPending ? "ログアウト中..." : "ログアウト"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}