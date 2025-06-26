"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { API_BASE_URL } from "@/app/env"
import { useAuth } from "@/contexts/auth-context"
import { AlertCircle, Loader2, ImageIcon } from "lucide-react"
import { ensureScmAccessExists } from "@/lib/scm-sync"
import { LogoSelector } from "./logo-selector"
import { Button } from "@/components/ui/button"

interface ContestFormProps {
  isAdmin?: boolean
}

export default function ContestForm({ isAdmin = false }: ContestFormProps) {
  const { user, member, token } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [scmAccessId, setScmAccessId] = useState<number | null>(null)
  const [scmAccessData, setScmAccessData] = useState<{ id: number; memberid: string } | null>(null)

  // Form state - removed entry_deadline completely
  const [formData, setFormData] = useState({
    contest_name: "",
    slug: "",
    description: "",
    contest_rules: "",
    prizes: "",
    logo_url: "",
    poster_url: "",
    start_time: "",
    end_time: "",
    max_entries_per_user: "1",
    visibility: "public",
    status: "upcoming",
  })

  // Fetch SCM access ID on component mount
  useEffect(() => {
    const fetchScmAccessId = async () => {
      if (user?.email) {
        try {
          // First ensure the user has an SCM access record
          const normalizedEmail = user.email.toLowerCase().trim()

          // Prepare user data for SCM access
          const userData = {
            email: normalizedEmail,
            name: user.name,
            memberid: member?.memberid || member?.id || "",
            role: member?.membertype || "agent",
            full_name: user.name,
          }

          // Ensure SCM access exists
          await ensureScmAccessExists(normalizedEmail, userData)

          // Now fetch the SCM access ID
          const response = await fetch(`/api/scm/access/find-by-email/${encodeURIComponent(normalizedEmail)}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
          })

          if (response.ok) {
            const data = await response.json()
            if (data.success && data.data && data.data.id) {
              console.log("Found SCM access ID:", data.data.id)
              setScmAccessId(data.data.id)

              // Store both id and memberid from scm_access
              setScmAccessData({
                id: data.data.id,
                memberid: data.data.memberid || "",
              })
            } else {
              console.error("SCM access record found but no ID in response:", data)
            }
          } else {
            console.error("Failed to fetch SCM access ID:", response.status)
          }
        } catch (error) {
          console.error("Error fetching SCM access ID:", error)
        }
      }
    }

    fetchScmAccessId()
  }, [user, member])

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    // If name is contest_name, also generate a slug
    if (name === "contest_name") {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")

      setFormData({
        ...formData,
        [name]: value,
        slug: slug,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  // Function to convert date from form to database format (24-hour)
  const formatDateForDatabase = (dateString: string): string => {
    if (!dateString) return ""

    try {
      // Parse the date from the input
      const date = new Date(dateString)

      // Format the date in YYYY-MM-DD HH:MM:SS format with 24-hour time
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const day = String(date.getDate()).padStart(2, "0")
      const hours = String(date.getHours()).padStart(2, "0") // This ensures 24-hour format
      const minutes = String(date.getMinutes()).padStart(2, "0")
      const seconds = "00" // Default seconds

      // Return in MySQL datetime format
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    } catch (error) {
      console.error("Error formatting date for database:", error, dateString)
      return ""
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      // Check if we have a valid SCM access ID
      if (!scmAccessId) {
        // Try to fetch it one more time
        try {
          const normalizedEmail = user?.email?.toLowerCase().trim() || ""
          const response = await fetch(`/api/scm/access/find-by-email/${encodeURIComponent(normalizedEmail)}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
          })

          if (response.ok) {
            const data = await response.json()
            if (data.success && data.data && data.data.id) {
              console.log("Found SCM access ID on submit:", data.data.id)
              setScmAccessId(data.data.id)

              // Store both id and memberid from scm_access
              setScmAccessData({
                id: data.data.id,
                memberid: data.data.memberid || "",
              })
            } else {
              throw new Error("SCM access record found but no ID in response")
            }
          } else {
            throw new Error(`Failed to fetch SCM access ID: ${response.status}`)
          }
        } catch (error) {
          console.error("Error fetching SCM access ID on submit:", error)
          setError(
            "Unable to create contest: Your user account is not properly set up in the system. Please contact support.",
          )
          setIsSubmitting(false)
          return
        }
      }

      // Format dates for database using our new function
      const formattedStartTime = formatDateForDatabase(formData.start_time)
      const formattedEndTime = formatDateForDatabase(formData.end_time)

      // Log the original and formatted dates for debugging
      console.log("Original start_time:", formData.start_time)
      console.log("Formatted start_time:", formattedStartTime)
      console.log("Original end_time:", formData.end_time)
      console.log("Formatted end_time:", formattedEndTime)

      // Use end_time for both end_time and entry_deadline
      const contestData = {
        ...formData,
        start_time: formattedStartTime,
        end_time: formattedEndTime,
        entry_deadline: formattedEndTime, // Use end_time for entry_deadline
        max_entries_per_user: Number.parseInt(formData.max_entries_per_user) || 1,
        memberid: scmAccessData?.memberid || "",
        created_by: scmAccessData?.id || null,
      }

      console.log("Submitting contest data:", contestData)

      // Send the request to create a contest
      const response = await fetch(`${API_BASE_URL}/scm/contests/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(contestData),
      })

      // Check if the response is OK
      if (!response.ok) {
        // Try to get error details from response
        let errorMessage = `Failed to create contest: ${response.status}`
        try {
          const errorData = await response.json()
          if (errorData.message) {
            errorMessage += ` - ${errorData.message}`
          }
        } catch (e) {
          // If we can't parse the error, just use the status code
        }
        throw new Error(errorMessage)
      }

      // Parse the response
      const data = await response.json()

      // Check if the API indicates success
      if (!data.success) {
        throw new Error(data.message || "Failed to create contest")
      }

      setSuccess("Contest created successfully!")

      // Reset form - removed entry_deadline from reset
      setFormData({
        contest_name: "",
        slug: "",
        description: "",
        contest_rules: "",
        prizes: "",
        logo_url: "",
        poster_url: "",
        start_time: "",
        end_time: "",
        max_entries_per_user: "1",
        visibility: "public",
        status: "upcoming",
      })

      // Redirect after a short delay
      setTimeout(() => {
        if (isAdmin) {
          router.push("/admin/contests")
        } else {
          router.push("/user/contests")
        }
        router.refresh()
      }, 2000)
    } catch (error) {
      console.error("Error creating contest:", error)
      setError(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Create New Contest</h2>

      {error && (
        <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-200">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 rounded-md bg-green-50 border border-green-200">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
            <p className="text-green-700">{success}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="contest_name" className="block text-sm font-medium text-realty-text mb-2">
              Contest Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="contest_name"
              name="contest_name"
              value={formData.contest_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-realty-primary"
              required
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-realty-text mb-2">
              Slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-realty-primary"
              required
            />
            <p className="text-xs text-gray-500 mt-1">URL-friendly name (auto-generated from contest name)</p>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-realty-text mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-realty-primary"
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="contest_rules" className="block text-sm font-medium text-realty-text mb-2">
              Contest Rules
            </label>
            <textarea
              id="contest_rules"
              name="contest_rules"
              value={formData.contest_rules}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-realty-primary"
            ></textarea>
          </div>

          <div>
            <label htmlFor="prizes" className="block text-sm font-medium text-realty-text mb-2">
              Prizes
            </label>
            <textarea
              id="prizes"
              name="prizes"
              value={formData.prizes}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-realty-primary"
            ></textarea>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="logo_url" className="block text-sm font-medium text-realty-text mb-2">
              Logo URL
            </label>
            <div className="flex gap-2 mb-2">
              <LogoSelector type="company" onSelectLogo={(url) => setFormData({ ...formData, logo_url: url })} />
              {/* Team logo selector will be implemented later */}
              <Button type="button" variant="outline" className="flex items-center gap-2" disabled>
                <ImageIcon className="h-4 w-4" />
                Team Logo
              </Button>
            </div>
            <input
              type="url"
              id="logo_url"
              name="logo_url"
              value={formData.logo_url}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-realty-primary"
              placeholder="https://example.com/logo.png"
            />
          </div>

          <div>
            <label htmlFor="poster_url" className="block text-sm font-medium text-realty-text mb-2">
              Poster URL
            </label>
            <input
              type="url"
              id="poster_url"
              name="poster_url"
              value={formData.poster_url}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-realty-primary"
              placeholder="https://example.com/poster.png"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="start_time" className="block text-sm font-medium text-realty-text mb-2">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              id="start_time"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-realty-primary"
              required
            />
          </div>

          <div>
            <label htmlFor="end_time" className="block text-sm font-medium text-realty-text mb-2">
              End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              id="end_time"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-realty-primary"
              required
            />
            <p className="text-xs text-gray-500 mt-1">This is when the contest will end and submissions will close.</p>
          </div>
        </div>

        <div className="text-sm text-gray-500 mt-2">
          <p>All dates and times are in your local timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="max_entries_per_user" className="block text-sm font-medium text-realty-text mb-2">
              Max Entries Per User
            </label>
            <input
              type="number"
              id="max_entries_per_user"
              name="max_entries_per_user"
              value={formData.max_entries_per_user}
              onChange={handleChange}
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-realty-primary"
            />
          </div>

          <div>
            <label htmlFor="visibility" className="block text-sm font-medium text-realty-text mb-2">
              Visibility
            </label>
            <select
              id="visibility"
              name="visibility"
              value={formData.visibility}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-realty-primary"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-realty-text mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-realty-primary"
            >
              <option value="upcoming">Upcoming</option>
              <option value="active">Active</option>
              <option value="ended">Ended</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-realty-primary hover:bg-realty-secondary text-white px-6 py-3 rounded-md font-medium transition-colors duration-300 disabled:opacity-50 flex items-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Creating...
              </>
            ) : (
              "Create Contest"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
