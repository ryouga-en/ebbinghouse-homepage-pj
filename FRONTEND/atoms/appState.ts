import { atomWithStorage } from "jotai/utils"

/**
 * 左サイドバーの開閉状態
 */
export const leftSidebarOpenAtom = atomWithStorage<boolean>(
  "elsia_left_open",
  true
)

/**
 * 右サイドバーの開閉状態
 */
export const rightSidebarOpenAtom = atomWithStorage<boolean>(
  "elsia_right_open",
  true
)

/**
 * 右サイドバーの幅
 */
export const rightSidebarWidthAtom = atomWithStorage<number>(
  "elsia_right_sidebar_width",
  typeof window !== "undefined" ? Math.floor(window.innerWidth / 3) : 0
)
