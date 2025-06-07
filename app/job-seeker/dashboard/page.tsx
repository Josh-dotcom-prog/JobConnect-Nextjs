"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import axios from "axios"
import Navbar from "@/components/navigation/navbar"
import JobCard from "@/components/jobs/job-card"

export default function JobSeekerDashboard() {
  const [recommendedJobs, setRecommendedJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch recommended jobs from backend
  useEffect(() => {
    const fetchRecommendedJobs = async () => {
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
          company: `Company ${job.employer_id}`, // fallback if no company name
          location: job.location,
          jobType: job.job_type.replace('_', ' '), // e.g., full_time → full time
          salary: `$${(job.base_salary / 1000).toFixed(0)}k/year`, // format as needed
          description: job.description,
          responsibilities: job.responsibilities,
          requirements: job.requirements,
          postedDate: formatDate(job.created_at),
          skills: ["Development", "Teamwork"], // fallback or fetch from backend
          logoUrl: "/placeholder.svg?height=40&width=40",
          isNew: false,
        }))

        // Show only top 3 jobs for dashboard
        setRecommendedJobs(mappedJobs.slice(0, 3))

      } catch (err) {
        console.error("Failed to load jobs:", err)
        setError("Could not load job recommendations.")
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendedJobs()
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

  return (
    <div className="bg-gray-50">
      <Navbar userType="jobSeeker" activePage="dashboard" />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="px-4 sm:px-0 mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Welcome back, Alex! Here's what's happening with your job search.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6 px-4 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3">
                  <i className="fas fa-search text-blue-600"></i>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Jobs Viewed</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">24</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3">
                  <i className="fas fa-paper-plane text-green-600"></i>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Applications Sent</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">12</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3">
                  <i className="fas fa-hourglass-half text-yellow-600"></i>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pending Responses</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">8</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3">
                  <i className="fas fa-user-check text-blue-600"></i>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Interview Invites</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">3</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="mt-8 px-4 sm:px-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Recommended Jobs</h2>
            <Link href="/job-seeker/browse-jobs" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              View all
            </Link>
          </div>

          {loading ? (
            <p>Loading recommended jobs...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : recommendedJobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recommendedJobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          ) : (
            <p>No recommended jobs found.</p>
          )}
        </div>

      </main>
    </div>
  )
}