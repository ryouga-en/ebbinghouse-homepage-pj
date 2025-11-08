/**
 * 認証関連のユーティリティ関数
 */

import type { User } from "@/shared/types/app"

/**
 * Cookieからユーザー情報を取得する
 */
export function getUserFromCookie(): User | null {
  if (typeof window === "undefined") return null

  try {
    console.log("All cookies:", document.cookie)

    const userInfoCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user_info="))

    console.log("user_info cookie:", userInfoCookie)

    if (!userInfoCookie) {
      console.log("No user info found in cookie")
      return null
    }

    const userInfo = JSON.parse(
      decodeURIComponent(userInfoCookie.split("=")[1])
    ) as User

    console.log("User info from cookie:", userInfo)
    return userInfo
  } catch (error) {
    console.warn("Failed to get user from cookie:", error)
    return null
  }
}

/**
 * HTMLのdata-role属性を設定する
 */
export function setRoleAttribute(role: "admin" | "standard"): void {
  if (typeof window === "undefined") return
  document.documentElement.setAttribute("data-role", role)
  console.log(`HTML data-role attribute set to: ${role}`)
}
