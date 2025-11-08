/**
 * HTTP通信用のユーティリティ関数
 */

/**
 * JSONレスポンスを返すfetchラッパー
 * エラーハンドリングを統一的に行う
 */
export async function fetchJson<T>(
  url: string,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(url, { cache: "no-store", ...init })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Request failed" }))
    throw new Error(error.error || `${response.status} ${await response.text()}`)
  }

  return response.json() as Promise<T>
}
