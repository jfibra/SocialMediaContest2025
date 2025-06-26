import { API_BASE_URL } from "@/app/env"
import type { Contest, ContestResponse, ContestsResponse } from "@/types/contest"

// Function to fetch a specific contest by slug
export async function getContestBySlug(slug: string): Promise<Contest | null> {
  try {
    console.log(`Fetching contest with slug: ${slug}`)

    // Instead of trying to fetch by slug directly, get all contests and filter
    const allContests = await getAllContests(true) // Include private contests

    // Find the contest with the matching slug
    const contest = allContests.find((c) => c.slug === slug)

    if (!contest) {
      console.log(`No contest found with slug: ${slug}`)
      return null
    }

    console.log(`Found contest by slug: ${contest.name} (visibility: ${contest.visibility})`)
    return contest
  } catch (error) {
    console.error(`Error fetching contest by slug ${slug}:`, error)
    return null
  }
}

export async function getActiveContest(includePrivate = false): Promise<Contest | null> {
  try {
    console.log(`Fetching active contest (includePrivate: ${includePrivate})`)
    // Add cache-busting query parameter to prevent caching
    const timestamp = new Date().getTime()
    const response = await fetch(`${API_BASE_URL}/scm/contests/active?t=${timestamp}`, {
      cache: "no-store", // Disable caching
      next: { revalidate: 0 }, // Disable revalidation
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch active contest: ${response.status}`)
    }

    const data: ContestResponse = await response.json()

    if (!data.success || !data["0"] || data["0"].length === 0) {
      console.error("No active contest found or API error")
      return null
    }

    // Filter contests based on visibility parameter
    const contests = data["0"]
      .filter((contest) => includePrivate || contest.visibility === "public")
      .map((contest) => ({
        ...contest,
        name: contest.contest_name,
        startDate: contest.start_time,
        endDate: contest.end_time,
        logoUrl: contest.logo_url,
        posterUrl: contest.poster_url,
        rules: contest.contest_rules, // Map new field
        prizes: contest.prizes, // Map new field
      }))

    console.log(`Found ${contests.length} contests after filtering (includePrivate: ${includePrivate})`)

    // First try to find an active contest
    let selectedContest = contests.find((contest) => contest.status === "active")

    // If no active contest, try to find an upcoming contest
    if (!selectedContest) {
      selectedContest = contests.find((contest) => contest.status === "upcoming")
    }

    // If still no contest found, return null
    if (!selectedContest) {
      return null
    }

    return selectedContest as unknown as Contest
  } catch (error) {
    console.error("Error fetching active contest:", error)
    return null
  }
}

export async function getAllContests(includePrivate = false): Promise<Contest[]> {
  try {
    console.log(`Fetching all contests (includePrivate: ${includePrivate})`)
    // Add cache-busting query parameter to prevent caching
    const timestamp = new Date().getTime()
    const response = await fetch(`${API_BASE_URL}/scm/contests/active?t=${timestamp}`, {
      cache: "no-store", // Disable caching
      next: { revalidate: 0 }, // Disable revalidation
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch contests: ${response.status}`)
    }

    const data: ContestsResponse = await response.json()

    if (!data.success || !data["0"]) {
      console.error("No contests found or API error")
      return []
    }

    // Log the raw data for debugging
    console.log(`Raw contests data: ${data["0"].length} contests found`)

    // Log each contest for debugging
    data["0"].forEach((contest, index) => {
      console.log(`Contest ${index}: ${contest.contest_name}, slug: ${contest.slug}, visibility: ${contest.visibility}`)
    })

    // Filter contests based on visibility parameter
    const filteredContests = data["0"]
      .filter((contest) => {
        const include = includePrivate || contest.visibility === "public"
        if (!include) {
          console.log(`Filtering out private contest: ${contest.contest_name} (${contest.slug})`)
        }
        return include
      })
      .map((contest) => ({
        ...contest,
        name: contest.contest_name,
        startDate: contest.start_time,
        endDate: contest.end_time,
        logoUrl: contest.logo_url,
        posterUrl: contest.poster_url,
        rules: contest.contest_rules, // Map new field
        prizes: contest.prizes, // Map new field
      })) as unknown as Contest[]

    console.log(`Returning ${filteredContests.length} contests after filtering (includePrivate: ${includePrivate})`)
    return filteredContests
  } catch (error) {
    console.error("Error fetching contests:", error)
    return []
  }
}

// Helper function to check if a contest is currently accepting submissions
export function isContestAcceptingSubmissions(contest: Contest): boolean {
  if (!contest) return false

  const now = new Date()
  const startDate = new Date(contest.startDate || contest.start_time)

  // Use entry_deadline instead of end_time for submission cutoff
  const deadlineDate = contest.entry_deadline
    ? new Date(contest.entry_deadline)
    : new Date(contest.endDate || contest.end_time)

  console.log(`Checking if contest is accepting submissions:`)
  console.log(`- Current time: ${now.toISOString()}`)
  console.log(`- Start time: ${startDate.toISOString()}`)
  console.log(`- Deadline: ${deadlineDate.toISOString()}`)
  console.log(`- Status: ${contest.status}`)

  // If contest is canceled, it's not accepting submissions
  if (contest.status === "canceled") {
    console.log(`Contest is canceled, not accepting submissions`)
    return false
  }

  // If contest is ended, it's not accepting submissions
  if (contest.status === "ended") {
    console.log(`Contest is ended, not accepting submissions`)
    return false
  }

  // Check if current time is between start date and deadline
  const isWithinTimeframe = now >= startDate && now <= deadlineDate
  console.log(`Is within timeframe: ${isWithinTimeframe}`)

  // Contest is accepting submissions if:
  // 1. It's active AND within the timeframe, OR
  // 2. It's upcoming but the current time is already within the timeframe
  const isAccepting =
    (contest.status === "active" && isWithinTimeframe) || (contest.status === "upcoming" && isWithinTimeframe)

  console.log(`Final decision - Is accepting submissions: ${isAccepting}`)
  return isAccepting
}
