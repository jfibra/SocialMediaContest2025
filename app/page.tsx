"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, Clock, Search, Users, UserCheck, UserX } from "lucide-react"
import Image from "next/image"

interface CountdownEntry {
  id: number
  first_name: string
  last_name: string
  phone_number?: string
  whatsapp_number?: string
  leuterio_email?: string
  facebook_profile?: string
  status: "Pending" | "Verified" | "Disqualified"
  created_at: string
  updated_at: string
  updated_by?: string
}

const API_BASE_URL = "https://api.leuteriorealty.com/ares/v1/public/api"

export default function AresCountdownDashboard() {
  const [entries, setEntries] = useState<CountdownEntry[]>([])
  const [filteredEntries, setFilteredEntries] = useState<CountdownEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    fetchEntries()
  }, [])

  useEffect(() => {
    filterEntries()
  }, [entries, searchTerm, statusFilter, activeTab])

  const fetchEntries = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/countdown-entries`)
      const data = await response.json()
      if (data.success) {
        setEntries(data.data)
      }
    } catch (error) {
      console.error("Error fetching entries:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateEntryStatus = async (id: number, status: "Verified" | "Disqualified") => {
    try {
      const response = await fetch(`${API_BASE_URL}/countdown-entries/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        setEntries(entries.map((entry) => (entry.id === id ? { ...entry, status } : entry)))
      }
    } catch (error) {
      console.error("Error updating entry status:", error)
    }
  }

  const filterEntries = () => {
    let filtered = entries

    // Filter by tab
    if (activeTab !== "all") {
      filtered = filtered.filter((entry) => entry.status.toLowerCase() === activeTab)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (entry) =>
          `${entry.first_name} ${entry.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.leuterio_email?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredEntries(filtered)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "Verified":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        )
      case "Disqualified":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            Disqualified
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusCounts = () => {
    return {
      total: entries.length,
      pending: entries.filter((e) => e.status === "Pending").length,
      verified: entries.filter((e) => e.status === "Verified").length,
      disqualified: entries.filter((e) => e.status === "Disqualified").length,
    }
  }

  const statusCounts = getStatusCounts()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-purple-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image src="/images/ares-logo.png" alt="ARES Logo" width={120} height={80} className="object-contain" />
              <div>
                <h1 className="text-2xl font-bold text-purple-900">Contest Dashboard</h1>
                <p className="text-purple-600">Manage agent countdown entries</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-600">Total Entries</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">{statusCounts.total}</div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-600">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-700">{statusCounts.pending}</div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-600">Verified</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">{statusCounts.verified}</div>
            </CardContent>
          </Card>

          <Card className="border-red-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-600">Disqualified</CardTitle>
              <UserX className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-700">{statusCounts.disqualified}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-900">Agent Submissions</CardTitle>
            <CardDescription>Review and manage countdown contest entries</CardDescription>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-purple-200 focus:border-purple-400"
                />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-purple-50">
                <TabsTrigger value="all" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                  All ({statusCounts.total})
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white"
                >
                  Pending ({statusCounts.pending})
                </TabsTrigger>
                <TabsTrigger
                  value="verified"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  Verified ({statusCounts.verified})
                </TabsTrigger>
                <TabsTrigger
                  value="disqualified"
                  className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
                >
                  Disqualified ({statusCounts.disqualified})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                <div className="rounded-md border border-purple-200">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-purple-50">
                        <TableHead className="text-purple-900 font-semibold">Agent Name</TableHead>
                        <TableHead className="text-purple-900 font-semibold">Contact Info</TableHead>
                        <TableHead className="text-purple-900 font-semibold">Status</TableHead>
                        <TableHead className="text-purple-900 font-semibold">Submitted</TableHead>
                        <TableHead className="text-purple-900 font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEntries.map((entry) => (
                        <TableRow key={entry.id} className="hover:bg-purple-25">
                          <TableCell className="font-medium">
                            {entry.first_name} {entry.last_name}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1 text-sm">
                              {entry.leuterio_email && <div className="text-gray-600">{entry.leuterio_email}</div>}
                              {entry.phone_number && <div className="text-gray-600">📞 {entry.phone_number}</div>}
                              {entry.whatsapp_number && <div className="text-gray-600">💬 {entry.whatsapp_number}</div>}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(entry.status)}</TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {new Date(entry.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              {entry.status === "Pending" && (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => updateEntryStatus(entry.id, "Verified")}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateEntryStatus(entry.id, "Disqualified")}
                                    className="border-red-200 text-red-600 hover:bg-red-50"
                                  >
                                    <XCircle className="w-4 h-4 mr-1" />
                                    Reject
                                  </Button>
                                </>
                              )}
                              {entry.status === "Verified" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateEntryStatus(entry.id, "Disqualified")}
                                  className="border-red-200 text-red-600 hover:bg-red-50"
                                >
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Reject
                                </Button>
                              )}
                              {entry.status === "Disqualified" && (
                                <Button
                                  size="sm"
                                  onClick={() => updateEntryStatus(entry.id, "Verified")}
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Approve
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {filteredEntries.length === 0 && (
                    <div className="text-center py-8 text-gray-500">No entries found matching your criteria.</div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
