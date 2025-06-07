"use client"
import { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"
import Navbar from "@/components/navigation/navbar"

// Helper function to process backend data
const processBackendData = (data: any) => {
  const applicants = data.applicants || []

  // Calculate stats
  const totalApplications = applicants.length
  const jobViews = Math.floor(Math.random() * 2000) + 500 // Simulated since not in your data
  const interviewsScheduled = Math.floor(Math.random() * 15) + 5 // Simulated

  // Group applications by job ID to count applicants per job
  const jobApplicantCountMap = applicants.reduce((acc: Record<number, number>, app: any) => {
    acc[app.job.id] = (acc[app.job.id] || 0) + 1
    return acc
  }, {})

  // Format job type
  const formatJobType = (type: string) => {
    switch (type) {
      case 'full_time': return 'Full-time'
      case 'part_time': return 'Part-time'
      case 'contract': return 'Contract'
      default: return type
    }
  }

  // Format salary (assuming it's in Uganda Shillings)
  const formatSalary = (salary: number) => {
    return `UGX ${(salary / 1000000).toFixed(1)}M`
  }

  // Get job icon based on title
  const getJobIcon = (title: string) => {
    const lowerTitle = title.toLowerCase()
    if (lowerTitle.includes('engineer') || lowerTitle.includes('developer')) return 'fa-code'
    if (lowerTitle.includes('designer') || lowerTitle.includes('ui')) return 'fa-paint-brush'
    if (lowerTitle.includes('data') || lowerTitle.includes('analyst')) return 'fa-chart-bar'
    if (lowerTitle.includes('writer')) return 'fa-pen'
    if (lowerTitle.includes('support') || lowerTitle.includes('it')) return 'fa-tools'
    return 'fa-briefcase'
  }

  // Process jobs from unique job objects in applicants
  const jobsMap = new Map<number, any>()
  applicants.forEach((app: any) => {
    const job = app.job
    if (!jobsMap.has(job.id)) {
      jobsMap.set(job.id, {
        id: job.id,
        title: job.title,
        type: formatJobType(job.job_type),
        location: job.location,
        salary: formatSalary(job.base_salary),
        status: 'active',
        createdAt: job.created_at,
        applicantCount: jobApplicantCountMap[job.id],
        icon: getJobIcon(job.title)
      })
    }
  })

  const recentJobs = Array.from(jobsMap.values()).slice(0, 5)

  // Process applications
  const recentApplications = applicants.slice(-10).map((app: { id: any; jobseeker: { first_name: any; last_name: any; education_level: any; work_experience: string }; job: { title: any }; status: any; created_at: any }, index: number) => ({
    id: app.id,
    name: `${app.jobseeker.first_name} ${app.jobseeker.last_name}`,
    jobTitle: app.job.title,
    status: app.status,
    education: app.jobseeker.education_level,
    experience: app.jobseeker.work_experience.split('.')[0], // First sentence only
    appliedAt: app.created_at,
    avatar: `https://images.unsplash.com/photo-${1472099645785  + index}?w=40&h=40&fit=crop&crop=face&auto=format`
  }))

  return {
    companyName: "Passions Hotel",
    stats: {
      activeJobs: recentJobs.length,
      totalApplications,
      jobViews,
      interviewsScheduled
    },
    recentJobs,
    recentApplications
  }
}

export default function EmployerDashboard() {
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch real data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/company/applicants", {
          params: {
            user_id: 1 // Replace with dynamic value as needed
          }
        })
        const processedData = processBackendData(response.data)
        setDashboardData(processedData)
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
        setError("Failed to load dashboard data.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Navbar userType="employer" activePage="dashboard" />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  if (error || !dashboardData) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Navbar userType="employer" activePage="dashboard" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading dashboard</h3>
                <p className="mt-1 text-sm text-red-700">{error || "No data available."}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50">
      <Navbar userType="employer" activePage="dashboard" />
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold leading-tight text-gray-900">Employer Dashboard</h1>
                <p className="mt-1 text-sm text-gray-600">Welcome back, {dashboardData.companyName || 'Passions Hotel'}.</p>
              </div>
              <div className="mt-4 flex md:mt-0 md:ml-4">
                <Link href="/employer/company-profile">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-yellow-400 rounded-md shadow-sm text-sm font-medium text-yellow-400 bg-white hover:bg-yellow-50"
                  >
                    Edit Profile
                  </button>
                </Link>
                <Link href="/employer/job-postings/new">
                  <button
                    type="button"
                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700"
                  >
                    <i className="fas fa-plus mr-2"></i> Post New Job
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            {/* Stats */}
            <div className="mt-8">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 p-3">
                        <i className="fas fa-briefcase text-blue-700"></i>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Active Job Postings</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">
                              {dashboardData.stats.activeJobs}
                            </div>
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
                        <i className="fas fa-users text-green-600"></i>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Applications</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">
                              {dashboardData.stats.totalApplications}
                            </div>
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
                        <i className="fas fa-eye text-yellow-400"></i>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Job Views</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">
                              {dashboardData.stats.jobViews.toLocaleString()}
                            </div>
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
                          <dt className="text-sm font-medium text-gray-500 truncate">Interviews Scheduled</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">
                              {dashboardData.stats.interviewsScheduled}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Jobs */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Recent Job Postings</h2>
                <Link href="/employer/job-postings" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  View all
                </Link>
              </div>
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {dashboardData.recentJobs.length > 0 ? (
                    dashboardData.recentJobs.map((job: any) => (
                      <li key={job.id}>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-100">
                                  <i className={`fas ${job.icon || 'fa-briefcase'} text-blue-600`}></i>
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-blue-600">{job.title}</div>
                                <div className="text-sm text-gray-500">
                                  {job.type} • {job.location} • {job.salary}
                                </div>
                              </div>
                            </div>
                            <div className="ml-2 flex-shrink-0 flex">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                job.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {job.status}
                              </span>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <div className="flex items-center text-sm text-gray-500">
                                <i className="fas fa-calendar mr-1.5 text-gray-400"></i>
                                Posted on {new Date(job.createdAt).toLocaleDateString()}
                              </div>
                              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                <i className="fas fa-users mr-1.5 text-gray-400"></i>
                                {job.applicantCount} applicants
                              </div>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                              <Link href={`/employer/job-postings/${job.id}`} className="text-blue-600 hover:text-blue-500">
                                View Details
                              </Link>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-8 text-center text-gray-500">
                      No job postings found
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Recent Applications */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Recent Applications</h2>
                <Link href="/employer/applications" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  View all
                </Link>
              </div>
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {dashboardData.recentApplications.length > 0 ? (
                    dashboardData.recentApplications.map((application: any) => (
                      <li key={application.id}>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={application.avatar || "/placeholder.svg?height=40&width=40"}
                                  alt="Applicant"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{application.name}</div>
                                <div className="text-sm text-gray-500">Applied for {application.jobTitle}</div>
                              </div>
                            </div>
                            <div className="ml-2 flex-shrink-0 flex">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                application.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : application.status === 'approved'
                                    ? 'bg-green-100 text-green-800'
                                    : application.status === 'rejected'
                                      ? 'bg-red-100 text-red-800'
                                      : 'bg-gray-100 text-gray-800'
                              }`}>
                                {application.status}
                              </span>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <div className="flex items-center text-sm text-gray-500">
                                <i className="fas fa-graduation-cap mr-1.5 text-gray-400"></i>
                                {application.education}
                              </div>
                              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                <i className="fas fa-briefcase mr-1.5 text-gray-400"></i>
                                {application.experience}
                              </div>
                              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                <i className="fas fa-calendar mr-1.5 text-gray-400"></i>
                                Applied {new Date(application.appliedAt).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                              <Link href={`/employer/applications/${application.id}`} className="text-blue-600 hover:text-blue-500">
                                View Profile
                              </Link>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-8 text-center text-gray-500">
                      No applications found
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}