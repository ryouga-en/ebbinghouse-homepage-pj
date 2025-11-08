import type React from "react"
import AppShell from "@/shared/components/layout/MainLayout"

export default function SPALayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AppShell>{children}</AppShell>
}