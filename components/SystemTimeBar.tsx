"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

export default function SystemTimeBar() {
  const [dateTime, setDateTime] = useState<Date>(new Date())

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setDateTime(new Date())
    }, 1000)

    // Clean up on unmount
    return () => clearInterval(timer)
  }, [])

  // Format date as: Monday, May 22, 2025
  const formattedDate = dateTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Format time as: 3:22:45 PM
  const formattedTime = dateTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })

  return (
    <div className="fixed top-[64px] left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-end h-12 text-gray-600">
          <Clock className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">
            {formattedDate} | {formattedTime}
          </span>
        </div>
      </div>
    </div>
  )
}
