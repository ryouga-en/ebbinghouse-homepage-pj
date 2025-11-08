/**
 * アプリケーション全体で使用する共通型定義
 */

export type View = "samplePageA" | "samplePageB" | "samplePageC"

export interface User {
  email: string
  roles: string[]
}
