/**
 * レイアウトコンポーネント関連の型定義
 */

export interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export interface FooterProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}
