"use client"

import type React from "react"
import AdminProtectedRoute from "@/components/admin-protected-route"
import SystemTimeBar from "@/components/SystemTimeBar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminProtectedRoute>
      <SystemTimeBar />
      {/* Add padding to account for the fixed secondary nav */}
      <div className="pt-[112px]">{children}</div>
    </AdminProtectedRoute>
  )
}
