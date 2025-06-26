import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

export function getDateRange(startDate: string, endDate: string): string {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`
}

/**
 * Converts a database datetime string to a local datetime string for input fields
 */
export function dbDateToLocalInputFormat(dbDateString: string | null | undefined): string {
  if (!dbDateString) return ""
  try {
    // Check if the date string already has a 'T' (ISO format)
    if (dbDateString.includes("T")) {
      const date = new Date(dbDateString)
      return date.toISOString().slice(0, 16) // Format: YYYY-MM-DDThh:mm
    }

    // Handle MySQL datetime format (YYYY-MM-DD HH:MM:SS)
    // Convert to ISO format by replacing space with T and adding Z for UTC
    const utcDate = new Date(dbDateString.replace(" ", "T") + "Z")

    // Convert to local timezone for the input
    const localISOString = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000).toISOString()
    return localISOString.slice(0, 16) // Format: YYYY-MM-DDThh:mm
  } catch (e) {
    console.error("Error converting DB date to local format:", e, dbDateString)
    return ""
  }
}

/**
 * Converts a local datetime input value to a database datetime string
 */
export function localInputToDbDateFormat(inputDateString: string): string {
  if (!inputDateString) return ""
  try {
    // Input date is in local timezone in format: YYYY-MM-DDThh:mm
    const localDate = new Date(inputDateString)

    // Format as YYYY-MM-DD HH:MM:SS in 24-hour format
    const year = localDate.getFullYear()
    const month = String(localDate.getMonth() + 1).padStart(2, "0")
    const day = String(localDate.getDate()).padStart(2, "0")
    const hours = String(localDate.getHours()).padStart(2, "0") // 24-hour format
    const minutes = String(localDate.getMinutes()).padStart(2, "0")
    const seconds = "00" // Default seconds to 00

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  } catch (e) {
    console.error("Error converting local date to DB format:", e, inputDateString)
    return ""
  }
}

/**
 * Formats a date for display with timezone information
 */
export function formatDateWithTimezone(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  }).format(date)
}
