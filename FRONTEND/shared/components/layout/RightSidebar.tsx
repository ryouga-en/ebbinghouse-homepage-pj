"use client"

import React, { useState } from "react"
import { X } from "lucide-react"
import type { RightSidebarProps } from "@/shared/types/layout"

export function RightSidebar({ onClose, width = 320, onWidthChange }: RightSidebarProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [isResizing, setIsResizing] = useState(false)

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return
    
    const newWidth = window.innerWidth - e.clientX
    const minWidth = 0
    const maxWidth = window.innerWidth / 2
    
    const clampedWidth = Math.min(Math.max(newWidth, minWidth), maxWidth)
    onWidthChange?.(clampedWidth)
  }

  const handleMouseUp = () => {
    setIsResizing(false)
  }

  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
    }
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.body.style.cursor = ''
        document.body.style.userSelect = ''
      }
  }, [isResizing])

  return (
      <div
      className="w-full bg-slate-100 border-l border-gray-200 h-screen flex flex-col relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      >
      {/* ヘッダー部分 */}
      <div className="px-4 py-3 border-b border-gray-200 bg-slate-100 h-16 flex items-center justify-between sticky top-0 z-10">
        <div className="flex-1 min-w-0 mr-4">
          <div className="inline-block bg-gray-200 rounded-md px-2 py-1 text-sm font-medium max-w-full" style={{ color: 'var(--brand)' }}>
            <div className="line-clamp-2 leading-tight">
              サイドバー
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="p-1 hover:bg-gray-200 rounded" onClick={onClose}>
            <X className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>


      

      {/* リサイズハンドル */}
      <div
        className={`absolute left-0 top-0 w-2 h-full cursor-col-resize transition-colors ${
          isHovering || isResizing ? '' : 'bg-transparent'
        }`}
        style={{ 
          backgroundColor: isHovering || isResizing ? 'var(--brand)' : 'transparent',
          zIndex: 20
        } as React.CSSProperties}
        onMouseDown={handleMouseDown}
      />
      </div>
  )
}