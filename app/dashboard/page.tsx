"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  Plus,
  Filter,
  ArrowUpDown,
  Edit2,
  Trash2,
  ExternalLink,
  MoreHorizontal,
  ChevronRight,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import StatsCard from "@/components/stats-card"
import ReferralModal from "@/components/referral-modal"
import DeleteConfirmModal from "@/components/delete-confirm-modal"

export default function DashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [referrals, setReferrals] = useState([
    {
      id: "1",
      name: "Dropbox",
      category: "Tech",
      url: "https://refstack.me/dropbox",
      clicks: 12,
      conversions: 2,
      status: "active",
      dateCreated: "2025-04-15",
      logoColor: "bg-blue-500",
    },
    {
      id: "2",
      name: "Coinbase",
      category: "Crypto",
      url: "https://refstack.me/coinbase",
      clicks: 34,
      conversions: 5,
      status: "active",
      dateCreated: "2025-04-10",
      logoColor: "bg-blue-500",
    },
    {
      id: "3",
      name: "RefStack",
      category: "Finance",
      url: "https://refstack.me/refstack",
      clicks: 8,
      conversions: 1,
      status: "active",
      dateCreated: "2025-04-05",
      logoColor: "bg-teal-400",
    },
    {
      id: "4",
      name: "Robinhood",
      category: "Finance",
      url: "https://refstack.me/robinhood",
      clicks: 19,
      conversions: 3,
      status: "active",
      dateCreated: "2025-03-28",
      logoColor: "bg-teal-400",
    },
    {
      id: "5",
      name: "Notion",
      category: "Productivity",
      url: "https://refstack.me/notion",
      clicks: 7,
      conversions: 0,
      status: "inactive",
      dateCreated: "2025-03-15",
      logoColor: "bg-gray-500",
    },
  ])
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [currentReferral, setCurrentReferral] = useState(null)
  const [sortField, setSortField] = useState("dateCreated")
  const [sortDirection, setSortDirection] = useState("desc")
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    // Simulate checking authentication status
    const checkAuth = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, we'll assume the user is authenticated
      // In a real app, you would check if the user is logged in
      setIsAuthenticated(true)
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  // If still loading or not authenticated, show loading state
  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-950 via-indigo-950 to-purple-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-200">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // Calculate stats
  const totalClicks = referrals.reduce((sum, ref) => sum + ref.clicks, 0)
  const totalConversions = referrals.reduce((sum, ref) => sum + ref.conversions, 0)
  const conversionRate = totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(1) : "0.0"

  // Handle adding a new referral
  const handleAddReferral = (newReferral) => {
    const referralWithId = {
      ...newReferral,
      id: (referrals.length + 1).toString(),
      dateCreated: new Date().toISOString().split("T")[0],
      clicks: 0,
      conversions: 0,
    }
    setReferrals([...referrals, referralWithId])
    setIsAddModalOpen(false)
  }

  // Handle editing a referral
  const handleEditReferral = (updatedReferral) => {
    setReferrals(referrals.map((ref) => (ref.id === updatedReferral.id ? updatedReferral : ref)))
    setIsEditModalOpen(false)
    setCurrentReferral(null)
  }

  // Handle deleting a referral
  const handleDeleteReferral = () => {
    setReferrals(referrals.filter((ref) => ref.id !== currentReferral.id))
    setIsDeleteModalOpen(false)
    setCurrentReferral(null)
  }

  // Open edit modal with selected referral
  const openEditModal = (referral) => {
    setCurrentReferral(referral)
    setIsEditModalOpen(true)
  }

  // Open delete confirmation modal
  const openDeleteModal = (referral) => {
    setCurrentReferral(referral)
    setIsDeleteModalOpen(true)
  }

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Filter and sort referrals
  const filteredAndSortedReferrals = referrals
    .filter((ref) => {
      // Apply search filter
      const matchesSearch =
        ref.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ref.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ref.url.toLowerCase().includes(searchQuery.toLowerCase())

      // Apply status filter
      const matchesStatus = filterStatus === "all" || ref.status === filterStatus

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      // Apply sorting
      if (a[sortField] < b[sortField]) {
        return sortDirection === "asc" ? -1 : 1
      }
      if (a[sortField] > b[sortField]) {
        return sortDirection === "asc" ? 1 : -1
      }
      return 0
    })

  const handleLogout = () => {
    // In a real app, you would clear auth tokens, cookies, etc.
    setIsAuthenticated(false)
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-indigo-950 to-purple-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-blue-950/30 backdrop-blur-md border border-blue-800/30 rounded-3xl mb-8 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
          <Link href="/">
            <div className="flex items-center space-x-2 bg-blue-900/70 backdrop-blur-md rounded-full py-2 px-4 border border-blue-700/50 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
              <div className="bg-blue-600 rounded-full p-1 flex items-center justify-center">
                <span className="text-white text-lg">▶</span>
              </div>
              <span className="font-bold text-lg">RefStack.me</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/public-stack"
              className="flex items-center gap-2 bg-blue-950/40 backdrop-blur-md rounded-full py-2 px-4 border border-blue-800/30 hover:bg-blue-900/40 transition-colors"
            >
              <span className="text-sm font-medium">Public Stack</span>
              <ChevronRight className="h-4 w-4 text-blue-400" />
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full bg-blue-600 p-0">
                  <span className="font-semibold text-white">AB</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-blue-950 border-blue-800/50 w-56">
                <div className="flex items-center justify-start gap-2 p-2 border-b border-blue-800/30">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium text-white">abuckmaster94</p>
                    <p className="text-xs text-blue-300">user@example.com</p>
                  </div>
                </div>
                <DropdownMenuItem
                  className="text-white hover:bg-blue-900/50 cursor-pointer"
                  onClick={() => router.push("/settings")}
                >
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-blue-900/50 cursor-pointer" onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Referral Dashboard
          </h1>
          <p className="text-lg text-blue-200/80">Manage and optimize your referral links</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatsCard title="Total Clicks" value={totalClicks.toString()} />
          <StatsCard title="Total Conversions" value={totalConversions.toString()} />
          <StatsCard title="Conversion Rate" value={`${conversionRate}%`} />
        </div>

        {/* Controls Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 h-4 w-4" />
            <Input
              placeholder="Search referrals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-blue-950/40 border-blue-800/50 text-white placeholder:text-blue-300/50 focus-visible:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-blue-800/50 text-white">
                  <Filter className="h-4 w-4 mr-2" />
                  {filterStatus === "all" ? "All Status" : filterStatus === "active" ? "Active Only" : "Inactive Only"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-blue-950 border-blue-800/50">
                <DropdownMenuItem onClick={() => setFilterStatus("all")} className="text-white hover:bg-blue-900/50">
                  All Status
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("active")} className="text-white hover:bg-blue-900/50">
                  Active Only
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFilterStatus("inactive")}
                  className="text-white hover:bg-blue-900/50"
                >
                  Inactive Only
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_10px_rgba(59,130,246,0.3)] border border-blue-500/50"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Referral
            </Button>
          </div>
        </div>

        {/* Referrals Table */}
        <div className="relative mb-8">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-md"></div>

          <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-3xl overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-blue-800/50">
                    <th className="px-6 py-4 text-left text-sm font-medium text-blue-200">
                      <button className="flex items-center" onClick={() => handleSort("name")}>
                        Name
                        <ArrowUpDown
                          className={`ml-2 h-4 w-4 ${sortField === "name" ? "text-blue-400" : "text-blue-300/50"}`}
                        />
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-blue-200">
                      <button className="flex items-center" onClick={() => handleSort("category")}>
                        Category
                        <ArrowUpDown
                          className={`ml-2 h-4 w-4 ${sortField === "category" ? "text-blue-400" : "text-blue-300/50"}`}
                        />
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-blue-200">URL</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-blue-200">
                      <button className="flex items-center" onClick={() => handleSort("clicks")}>
                        Clicks
                        <ArrowUpDown
                          className={`ml-2 h-4 w-4 ${sortField === "clicks" ? "text-blue-400" : "text-blue-300/50"}`}
                        />
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-blue-200">
                      <button className="flex items-center" onClick={() => handleSort("status")}>
                        Status
                        <ArrowUpDown
                          className={`ml-2 h-4 w-4 ${sortField === "status" ? "text-blue-400" : "text-blue-300/50"}`}
                        />
                      </button>
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-blue-200">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedReferrals.length > 0 ? (
                    filteredAndSortedReferrals.map((referral) => (
                      <tr key={referral.id} className="border-b border-blue-800/30 hover:bg-blue-900/20">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div
                              className={`${referral.logoColor} w-8 h-8 rounded-full flex items-center justify-center mr-3`}
                            >
                              <span className="text-white font-bold">{referral.name.charAt(0)}</span>
                            </div>
                            <span className="font-medium">{referral.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                            {referral.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-blue-200">
                          <div className="flex items-center">
                            <span className="truncate max-w-[150px]">{referral.url}</span>
                            <ExternalLink className="ml-2 h-4 w-4 text-blue-300" />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="font-medium">{referral.clicks}</span>
                            <span className="ml-2 text-xs text-blue-300">({referral.conversions} conv.)</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                              referral.status === "active"
                                ? "bg-green-900/30 text-green-400 border border-green-500/30"
                                : "bg-gray-800/30 text-gray-400 border border-gray-500/30"
                            }`}
                          >
                            {referral.status === "active" ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-blue-300 hover:text-blue-100 hover:bg-blue-900/30"
                              onClick={() => openEditModal(referral)}
                            >
                              <Edit2 className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-blue-300 hover:text-red-400 hover:bg-red-900/20"
                              onClick={() => openDeleteModal(referral)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-blue-300 hover:text-blue-100 hover:bg-blue-900/30"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">More</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-blue-950 border-blue-800/50">
                                <DropdownMenuItem
                                  className="text-white hover:bg-blue-900/50"
                                  onClick={() => {
                                    navigator.clipboard.writeText(referral.url)
                                  }}
                                >
                                  Copy Link
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-white hover:bg-blue-900/50"
                                  onClick={() => {
                                    const updatedReferral = {
                                      ...referral,
                                      status: referral.status === "active" ? "inactive" : "active",
                                    }
                                    handleEditReferral(updatedReferral)
                                  }}
                                >
                                  Toggle Status
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-blue-200">
                        {searchQuery || filterStatus !== "all" ? (
                          <div>
                            <p className="text-lg font-medium">No matching referrals found</p>
                            <p className="text-sm text-blue-300/70 mt-1">Try adjusting your search or filters</p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-lg font-medium">No referrals yet</p>
                            <p className="text-sm text-blue-300/70 mt-1">
                              Click "Add Referral" to create your first referral link
                            </p>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add Referral Modal */}
      <ReferralModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddReferral}
        title="Add New Referral"
      />

      {/* Edit Referral Modal */}
      {currentReferral && (
        <ReferralModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setCurrentReferral(null)
          }}
          onSave={handleEditReferral}
          title="Edit Referral"
          referral={currentReferral}
        />
      )}

      {/* Delete Confirmation Modal */}
      {currentReferral && (
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false)
            setCurrentReferral(null)
          }}
          onConfirm={handleDeleteReferral}
          referralName={currentReferral.name}
        />
      )}
    </div>
  )
}
