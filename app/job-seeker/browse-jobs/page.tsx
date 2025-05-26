"use client"

import type React from "react"

import { useState } from "react"
import Navbar from "@/components/navigation/navbar"
import JobFilter from "@/components/jobs/job-filter"
import JobCard from "@/components/jobs/job-card"
import Pagination from "@/components/ui/pagination"

// Mock data for jobs
const MOCK_JOBS = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    jobType: "Full-time",
    salary: "$120,000 - $150,000 per year",
    description:
      "We're looking for an experienced Frontend Developer to join our team. You'll be responsible for building responsive web applications using React, TypeScript, and modern CSS frameworks.",
    postedDate: "2 days ago",
    skills: ["React", "TypeScript", "Tailwind CSS", "Redux"],
    logoUrl: "https://tailwindui.com/img/logos/workflow-mark-blue-600.svg",
    isNew: true,
  },
  {
    id: "2",
    title: "Data Scientist",
    company: "DataViz Analytics",
    location: "Remote",
    jobType: "Full-time",
    salary: "$110,000 - $140,000 per year",
    description:
      "Join our data science team to analyze large datasets and build predictive models. You'll work with cutting-edge ML technologies to solve complex business problems.",
    postedDate: "1 week ago",
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
    logoUrl: "https://tailwindui.com/img/logos/workflow-mark-blue-600.svg",
  },
  {
    id: "3",
    title: "UX/UI Designer",
    company: "CreativeMinds Studio",
    location: "New York, NY",
    jobType: "Contract",
    salary: "$80 - $100 per hour",
    description:
      "We're seeking a talented UX/UI Designer to create beautiful, intuitive interfaces for our clients. You'll collaborate with product managers and developers to deliver exceptional user experiences.",
    postedDate: "today",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    logoUrl: "https://tailwindui.com/img/logos/workflow-mark-green-600.svg",
    isNew: true,
    isFeatured: true,
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "CloudScale Solutions",
    location: "Austin, TX (Hybrid)",
    jobType: "Full-time",
    salary: "$130,000 - $160,000 per year",
    description:
      "Join our DevOps team to build and maintain our cloud infrastructure. You'll automate deployment processes, optimize system performance, and ensure high availability of our services.",
    postedDate: "3 days ago",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    logoUrl: "https://tailwindui.com/img/logos/workflow-mark-purple-600.svg",
  },
  {
    id: "5",
    title: "Marketing Coordinator",
    company: "BrandBoost Marketing",
    location: "Chicago, IL",
    jobType: "Part-time",
    salary: "$25 - $30 per hour",
    description:
      "We're looking for a Marketing Coordinator to assist with our digital marketing campaigns. You'll help manage social media, email marketing, and content creation for our clients.",
    postedDate: "1 week ago",
    skills: ["Social Media", "Content Creation", "Email Marketing", "Analytics"],
    logoUrl: "https://tailwindui.com/img/logos/workflow-mark-red-600.svg",
  },
]

export default function BrowseJobs() {
  const [filteredJobs, setFilteredJobs] = useState(MOCK_JOBS)
  const [sortBy, setSortBy] = useState("relevance")
  const [currentPage, setCurrentPage] = useState(1)
  const jobsPerPage = 5

  const handleFilter = (filters: any) => {
    // In a real app, this would call an API with the filters
    // For now, we'll just simulate filtering with our mock data
    console.log("Applying filters:", filters)

    // Simple filtering logic for demonstration
    let filtered = [...MOCK_JOBS]

    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase()
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(keyword) ||
          job.company.toLowerCase().includes(keyword) ||
          job.description.toLowerCase().includes(keyword) ||
          job.skills.some((skill) => skill.toLowerCase().includes(keyword)),
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
    setCurrentPage(1) // Reset to first page when filtering
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSortBy(value)

    let sorted = [...filteredJobs]

    switch (value) {
      case "recent":
        // Sort by most recent (this is simplified)
        sorted = sorted.sort((a, b) => {
          if (a.postedDate.includes("today")) return -1
          if (b.postedDate.includes("today")) return 1
          if (a.postedDate.includes("day") && b.postedDate.includes("week")) return -1
          if (a.postedDate.includes("week") && b.postedDate.includes("day")) return 1
          return 0
        })
        break
      case "salary-high":
        // Sort by highest salary (this is simplified)
        sorted = sorted.sort((a, b) => {
          const aValue = Number.parseInt(a.salary.replace(/[^0-9]/g, ""))
          const bValue = Number.parseInt(b.salary.replace(/[^0-9]/g, ""))
          return bValue - aValue
        })
        break
      case "salary-low":
        // Sort by lowest salary (this is simplified)
        sorted = sorted.sort((a, b) => {
          const aValue = Number.parseInt(a.salary.replace(/[^0-9]/g, ""))
          const bValue = Number.parseInt(b.salary.replace(/[^0-9]/g, ""))
          return aValue - bValue
        })
        break
      default:
        // Default is relevance, which is the original order
        sorted = MOCK_JOBS.filter((job) => filteredJobs.includes(job))
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
                  <p className="text-sm text-gray-500">Showing {filteredJobs.length} jobs</p>
                </div>
                <div className="flex items-center">
                  <label htmlFor="sort-by" className="sr-only">
                    Sort by
                  </label>
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
                {currentJobs.length > 0 ? (
                  currentJobs.map((job) => (
                    <li key={job.id} className="job-listing">
                      <JobCard {...job} />
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-12 text-center">
                    <p className="text-gray-500">No jobs found matching your criteria.</p>
                    <p className="mt-2 text-sm text-gray-500">Try adjusting your search filters.</p>
                  </li>
                )}
              </ul>

              {/* Pagination */}
              {filteredJobs.length > 0 && (
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
