/**
 * レイアウトコンポーネント関連の型定義
 */

export interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onToggleLeft: () => void
  onToggleRight: () => void
  onSettingsClick: () => void
  rightSidebarOpen: boolean
}

export interface SidebarProps {
  open: boolean
  onClose: () => void
  onOpen: () => void
}

export interface RightSidebarProps {
  onClose: () => void
  width?: number
  onWidthChange?: (width: number) => void
}
