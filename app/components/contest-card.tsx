import Image from "next/image"
import Link from "next/link"
import type { Contest } from "@/types/contest"
import { getDateRange } from "@/lib/utils"
import { Calendar } from "lucide-react"

interface ContestCardProps {
  contest: Contest
  featured?: boolean
  className?: string
}

export default function ContestCard({ contest, featured = false, className = "" }: ContestCardProps) {
  // Determine status badge color
  const statusColor =
    {
      active: "bg-green-500",
      upcoming: "bg-realty-highlight",
      ended: "bg-gray-500",
      canceled: "bg-red-500",
    }[contest.status] || "bg-realty-highlight"

  // Determine status label
  const statusLabel =
    {
      active: "Active",
      upcoming: "Upcoming",
      ended: "Ended",
      canceled: "Canceled",
    }[contest.status] || "Unknown"

  return (
    <div className={`contest-card ${className} ${featured ? "md:col-span-2" : ""}`}>
      <Link href={`/contests/${contest.slug}`}>
        <div className="relative h-40 sm:h-48 md:h-64 w-full overflow-hidden">
          <Image
            src={contest.posterUrl || "/placeholder.svg?height=400&width=600&query=real+estate+contest"}
            alt={contest.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
          <div
            className={`absolute top-3 right-3 md:top-4 md:right-4 ${statusColor} text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium`}
          >
            {statusLabel}
          </div>
        </div>
        <div className="p-3 md:p-4 bg-white">
          <div className="flex items-center space-x-2 mb-1 md:mb-2">
            <Calendar className="h-3 w-3 md:h-4 md:w-4 text-realty-secondary" />
            <span className="text-xs md:text-sm text-realty-secondary">
              {getDateRange(contest.startDate, contest.endDate)}
            </span>
          </div>
          <h3
            className={`${featured ? "text-xl md:text-2xl" : "text-lg md:text-xl"} font-bold mb-1 md:mb-2 line-clamp-2`}
          >
            {contest.name}
          </h3>
          <p className="text-sm md:text-base text-realty-text line-clamp-2">{contest.description}</p>
        </div>
      </Link>
    </div>
  )
}
