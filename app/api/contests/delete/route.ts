import { type NextRequest, NextResponse } from "next/server"
import { API_BASE_URL } from "@/app/env"

export async function POST(request: NextRequest) {
  try {
    const { contestId, scmAccessId } = await request.json()

    if (!contestId) {
      return NextResponse.json({ success: false, message: "Contest ID is required" }, { status: 400 })
    }

    if (!scmAccessId) {
      return NextResponse.json({ success: false, message: "SCM Access ID is required" }, { status: 400 })
    }

    // Get the token from the request headers
    const authHeader = request.headers.get("authorization")
    const token = authHeader ? authHeader.replace("Bearer ", "") : null

    if (!token) {
      return NextResponse.json({ success: false, message: "Authentication token is required" }, { status: 401 })
    }

    // Log the request for debugging
    console.log("Deleting contest with params:", { contestId, performed_by_id: scmAccessId })

    // Create the request body with multiple variations of the parameter to ensure one works
    const requestBody = {
      performed_by: scmAccessId,
      performed_by_id: scmAccessId,
      performedBy: scmAccessId,
      performedById: scmAccessId,
      performer_id: scmAccessId,
      user_id: scmAccessId,
      scm_access_id: scmAccessId,
    }

    console.log("Request body:", JSON.stringify(requestBody))

    // Make the request to the API to delete the contest
    const response = await fetch(`${API_BASE_URL}/scm/contests/${contestId}/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    })

    // Log the response for debugging
    const responseText = await response.text()
    console.log("API response:", responseText)

    if (!response.ok) {
      console.error("API error response:", responseText)
      return NextResponse.json(
        { success: false, message: `Failed to delete contest: ${responseText}` },
        { status: response.status },
      )
    }

    let data
    try {
      data = JSON.parse(responseText)
    } catch (e) {
      console.log("Response is not JSON:", responseText)
      data = { message: "Success (non-JSON response)" }
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error deleting contest:", error)
    return NextResponse.json({ success: false, message: `An unexpected error occurred: ${error}` }, { status: 500 })
  }
}
