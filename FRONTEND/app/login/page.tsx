"use client"

import React, { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { XIcon } from "@/shared/components/icons"
import { login } from "@/shared/api/auth"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const data = await login({ email, password })
      
      if (data.ok) {
        // ログイン成功 - AppShellでロール設定を行う
        console.log("Login successful, user data:", data.user)
        console.log("Full response data:", data)
        
        // メインアプリにリダイレクト
        window.location.href = "/"
      } else {
        // ログイン失敗 - エラーメッセージを表示
        alert(data.error || "ログインに失敗しました")
      }
    } catch (error) {
      console.error("Login error:", error)
      alert(error instanceof Error ? error.message : "ログインに失敗しました")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        {/* ヘッダー */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <XIcon className="h-16 w-16" style={{ color: 'var(--login-brand)' }} />
          </div>
        </div>
        {/* ログインフォーム */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                メールアドレス
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                placeholder="example@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                パスワード
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                placeholder="パスワードを入力"
              />
            </div>
          </div>

           <div>
             <Button
               type="submit"
               disabled={isLoading}
               className="w-full"
               style={{ backgroundColor: 'var(--login-brand)' }}
             >
               {isLoading ? "ログイン中..." : "ログイン"}
             </Button>
           </div>

            <div className="text-center">
              <a href="#" className="text-sm font-medium hover:bg-gray-50 w-full block py-2 rounded transition-colors" style={{ color: 'var(--login-brand)' }}>
                パスワードを忘れましたか？
              </a>
            </div>
        </form>
      </div>
    </div>
  )
}
