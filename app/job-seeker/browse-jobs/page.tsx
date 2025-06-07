"use client"
import type React from "react"
import { useState, useEffect } from "react"
import axios from 'axios'
import Navbar from "@/components/navigation/navbar"
import JobFilter from "@/components/jobs/job-filter"
import JobCard from "@/components/jobs/job-card"
import Pagination from "@/components/ui/pagination"

export default function BrowseJobs() {
  const [filteredJobs, setFilteredJobs] = useState<any[]>([])
  const [sortBy, setSortBy] = useState("relevance")
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const jobsPerPage = 5

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/Jobs/all', {
          headers: {
            'accept': 'application/json'
          }
        })

        // Map backend data to frontend format expected by JobCard
        const mappedJobs = response.data.map((job: any) => ({
          id: job.id.toString(),
          title: job.title,
          company: `Company ${job.employer_id}`, // fallback if no company name in backend
          jobType: job.job_type.replace('_', ' '), // e.g., full_time → full time
          salary: `$${job.base_salary.toLocaleString()} per year`,
          description: job.description,
          responsibilities: job.responsibilities,
          requirements: job.requirements,
          location: job.location,
          postedDate: formatDate(job.created_at),
          isNew: false,
          logoUrl: "https://tailwindui.com/img/logos/workflow-mark-blue-600.svg",  // fallback
          skills: ["Development", "Teamwork"] // fallback or fetch from backend if available
        }))

        setFilteredJobs(mappedJobs)

      } catch (error) {
        console.error("Failed to load jobs from backend:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  // Format date as "X days ago"
  const formatDate = (dateString: string): string => {
    const now = new Date()
    const jobDate = new Date(dateString)
    const diffDays = Math.floor((now.getTime() - jobDate.getTime()) / (1000 * 3600 * 24))

    if (diffDays === 0) return "today"
    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    const weeks = Math.floor(diffDays / 7)
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`
  }

  // Handle filtering logic
  const handleFilter = (filters: any) => {
    console.log("Applying filters:", filters)

    let filtered = [...filteredJobs]

    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase()
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(keyword) ||
          job.company?.toLowerCase().includes(keyword) ||
          job.description.toLowerCase().includes(keyword) ||
          job.skills?.some((skill: string) => skill.toLowerCase().includes(keyword))
      )
    }

    if (filters.location) {
      const location = filters.location.toLowerCase()
      filtered = filtered.filter((job) => job.location.toLowerCase().includes(location))
    }

    if (filters.jobType) {
      filtered = filtered.filter((job) => job.jobType.toLowerCase() === filters.jobType.toLowerCase())
    }

    setFilteredJobs(filtered)
    setCurrentPage(1)
  }

  // Sort change handler
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSortBy(value)

    let sorted = [...filteredJobs]

    switch (value) {
      case "recent":
        sorted.sort((a, b) => {
          if (a.postedDate.includes("today")) return -1
          if (b.postedDate.includes("today")) return 1
          if (a.postedDate.includes("day") && b.postedDate.includes("week")) return -1
          if (a.postedDate.includes("week") && b.postedDate.includes("day")) return 1
          return 0
        })
        break
      case "salary-high":
        sorted.sort((a, b) => Number(b.salary.replace(/[^0-9]/g, '')) - Number(a.salary.replace(/[^0-9]/g, '')))
        break
      case "salary-low":
        sorted.sort((a, b) => Number(a.salary.replace(/[^0-9]/g, '')) - Number(b.salary.replace(/[^0-9]/g, '')))
        break
      default:
        sorted = [...filteredJobs]
    }

    setFilteredJobs(sorted)
  }

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage
  const indexOfFirstJob = indexOfLastJob - jobsPerPage
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob)
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="min-h-full">
      <Navbar userType="jobSeeker" activePage="browse jobs" />

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Browse Jobs</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            {/* Search and Filter Section */}
            <JobFilter onFilter={handleFilter} />

            {/* Search Results */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Search Results</h2>
                  <p className="text-sm text-gray-500">{loading ? 'Loading...' : `Showing ${filteredJobs.length} jobs`}</p>
                </div>
                <div className="flex items-center">
                  <label htmlFor="sort-by" className="sr-only">Sort by</label>
                  <select
                    id="sort-by"
                    name="sort-by"
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                    value={sortBy}
                    onChange={handleSortChange}
                  >
                    <option value="relevance">Most Relevant</option>
                    <option value="recent">Most Recent</option>
                    <option value="salary-high">Highest Salary</option>
                    <option value="salary-low">Lowest Salary</option>
                  </select>
                </div>
              </div>

              {/* Job Listings */}
              <ul className="divide-y divide-gray-200">
                {loading ? (
                  <li className="px-6 py-10 text-center">
                    <p className="text-gray-500">Loading jobs...</p>
                  </li>
                ) : currentJobs.length > 0 ? (
                  currentJobs.map((job) => (
                    <li key={job.id} className="job-listing">
                      <JobCard {...job} />
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-12 text-center">
                    <p className="text-gray-500">No jobs found matching your criteria.</p>
                    <button
                      onClick={() => handleFilter({})}
                      className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                    >
                      Clear filters
                    </button>
                  </li>
                )}
              </ul>

              {/* Pagination */}
              {filteredJobs.length > 0 && !loading && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={filteredJobs.length}
                  itemsPerPage={jobsPerPage}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}