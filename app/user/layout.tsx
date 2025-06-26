"use client"

import type React from "react"
import UserProtectedRoute from "@/components/user-protected-route"
import SystemTimeBar from "@/components/SystemTimeBar"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserProtectedRoute>
      <SystemTimeBar />
      {/* Add padding to account for the fixed secondary nav */}
      <div className="pt-[112px]">{children}</div>
    </UserProtectedRoute>
  )
}
