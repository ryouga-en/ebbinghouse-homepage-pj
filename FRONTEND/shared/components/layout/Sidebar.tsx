"use client"
import { ChevronRight, ChevronLeft, User } from "lucide-react"
import { cn } from "@/shared/utils"
import { useState } from "react"
import { XIcon } from "@/shared/components/icons"
import { useRouter } from "next/navigation"
import { useUser } from "@/stores/authStore"
import type { SidebarProps } from "@/shared/types/layout"

export function Sidebar({ open, onClose, onOpen }: SidebarProps) {
  const [showHoverIcon, setShowHoverIcon] = useState(false)
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)
  const router = useRouter()
  const user = useUser()

  const handlePageSelect = (page: string) => {
    switch (page) {
      case "A":
        router.push("/")
        break
      case "B":
        router.push("/sample-page-b")
        break
      case "C":
        router.push("/sample-page-c")
        break
      default:
        router.push("/")
    }
    console.log(`Selected page: ${page}`)
  }

  return (
    <div
      className={cn(
        "text-white h-screen flex flex-col transition-all duration-300 ease-in-out relative flex-shrink-0",
        open ? "w-64" : "w-16",
      )}
      style={{ backgroundColor: 'var(--brand)' }}
    >
      <div className="flex items-center justify-center border-b border-white/10 h-16 sticky top-0 z-10" style={{ backgroundColor: 'var(--brand)' }}>
        {!open ? (
          <div 
            className="w-16 h-16 rounded-sm flex items-center justify-center cursor-pointer hover:bg-white/10" 
            onClick={onOpen}
            onMouseEnter={() => setShowHoverIcon(true)}
            onMouseLeave={() => setShowHoverIcon(false)}
          >
            {showHoverIcon ? (
              <ChevronRight className="h-6 w-6 text-white" />
            ) : (
              <XIcon className="w-12 h-12 text-white" />
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between w-full">
            <div
              className="w-16 h-16 rounded-sm flex items-center justify-center cursor-pointer hover:bg-white/10"
              onClick={() => router.push("/")}
              title="ホームに戻る"
            >
              <XIcon className="w-12 h-12 text-white" />
            </div>
            <div
              onClick={() => {
                onClose();
                setShowHoverIcon(false);
              }} 
              className="w-16 h-16 rounded-sm flex items-center justify-center cursor-pointer hover:bg-white/10"
            >
              <ChevronLeft className="h-6 w-6" />
            </div>
          </div>
        )}
      </div>

      <div className="overflow-hidden">
        <div
          className="w-full h-16 text-white hover:bg-white/10 flex items-center justify-start px-0 relative group cursor-pointer"
          onClick={() => handlePageSelect("A")}
          onMouseEnter={() => setHoveredButton("pageA")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          {/* 左側の縦線 - ホバー時 */}
          <div className={cn(
            "absolute left-0 top-0 bottom-0 w-1 bg-white transition-opacity",
            hoveredButton === "pageA" ? "opacity-100" : "opacity-0"
          )}></div>
          {/* 右側の三角形 - ホバー時 */}
          <div className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 transition-opacity",
            hoveredButton === "pageA" ? "opacity-100" : "opacity-0"
          )}>
            <span style={{
              display: 'block',
              width: 0,
              height: 0,
              borderTop: '8px solid transparent',
              borderBottom: '8px solid transparent',
              borderRight: '8px solid #fff',
            }} />
          </div>
          
          <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
            <XIcon className={cn(
              "w-8 h-8",
              hoveredButton === "pageA" ? "text-white" : "text-white"
            )} />
          </div>
          {open && <span className="text-left flex-1 text-base truncate">サンプルページA</span>}
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="w-full h-16 text-white hover:bg-white/10 flex items-center justify-start px-0 relative group cursor-pointer"
          onClick={() => handlePageSelect("B")}
          onMouseEnter={() => setHoveredButton("pageB")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          {/* 左側の縦線 - ホバー時 */}
          <div className={cn(
            "absolute left-0 top-0 bottom-0 w-1 bg-white transition-opacity",
            hoveredButton === "pageB" ? "opacity-100" : "opacity-0"
          )}></div>
          {/* 右側の三角形 - ホバー時 */}
          <div className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 transition-opacity",
            hoveredButton === "pageB" ? "opacity-100" : "opacity-0"
          )}>
            <span style={{
              display: 'block',
              width: 0,
              height: 0,
              borderTop: '8px solid transparent',
              borderBottom: '8px solid transparent',
              borderRight: '8px solid #fff',
            }} />
          </div>
          
          <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
            <XIcon className={cn(
              "w-8 h-8",
              hoveredButton === "pageB" ? "text-white" : "text-white"
            )} />
          </div>
          {open && <span className="text-left flex-1 text-base truncate">サンプルページB</span>}
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="w-full h-16 text-white hover:bg-white/10 flex items-center justify-start px-0 relative group cursor-pointer"
          onClick={() => handlePageSelect("C")}
          onMouseEnter={() => setHoveredButton("pageC")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          {/* 左側の縦線 - ホバー時 */}
          <div className={cn(
            "absolute left-0 top-0 bottom-0 w-1 bg-white transition-opacity",
            hoveredButton === "pageC" ? "opacity-100" : "opacity-0"
          )}></div>
          {/* 右側の三角形 - ホバー時 */}
          <div className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 transition-opacity",
            hoveredButton === "pageC" ? "opacity-100" : "opacity-0"
          )}>
            <span style={{
              display: 'block',
              width: 0,
              height: 0,
              borderTop: '8px solid transparent',
              borderBottom: '8px solid transparent',
              borderRight: '8px solid #fff',
            }} />
          </div>
          
          <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
            <XIcon className={cn(
              "w-8 h-8",
              hoveredButton === "pageC" ? "text-white" : "text-white"
            )} />
          </div>
          {open && <span className="text-left flex-1 text-base truncate">サンプルページC</span>}
        </div>
      </div>

      <div className="mt-auto overflow-hidden">
        <div className="w-full h-16 flex items-center text-white/80 justify-start px-0">
          <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <User className="h-4 w-4" style={{ color: 'var(--brand)' }} />
            </div>
          </div>
          {open && <span className="text-base flex-1 truncate">{user?.email || "未ログイン"}</span>}
        </div>
      </div>
    </div>
  )
}