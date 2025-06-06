"use client"

import { useState } from "react"
import Navbar from "@/components/navigation/navbar"
import Image from "next/image"

// Mock data for applications
const APPLICATIONS = [
  {
    id: "1",
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    status: "Interview Scheduled",
    appliedDate: "May 12, 2023",
    interviewDate: "May 25, 2023",
    companyLogo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    jobTitle: "UI/UX Designer",
    company: "DesignHub Co.",
    location: "Remote",
    status: "Application Reviewed",
    appliedDate: "May 10, 2023",
    companyLogo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    jobTitle: "Data Scientist",
    company: "DataViz Analytics",
    location: "Boston, MA",
    status: "Pending",
    appliedDate: "May 5, 2023",
    companyLogo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    jobTitle: "DevOps Engineer",
    company: "CloudScale Solutions",
    location: "Austin, TX (Hybrid)",
    status: "Rejected",
    appliedDate: "April 15, 2023",
    rejectedDate: "May 1, 2023",
    companyLogo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    jobTitle: "Marketing Coordinator",
    company: "BrandBoost Marketing",
    location: "Chicago, IL",
    status: "Applied",
    appliedDate: "May 18, 2023",
    companyLogo: "/placeholder.svg?height=40&width=40",
  },
]

export default function Applications() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all-time")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  // Filter applications based on status, date, and search term
  const filteredApplications = APPLICATIONS.filter((app) => {
    // Status filter
    if (statusFilter !== "all" && app.status.toLowerCase() !== statusFilter.toLowerCase()) {
      return false
    }

    // Date filter (simplified for demo)
    if (dateFilter !== "all-time") {
      const today = new Date()
      const appDate = new Date(app.appliedDate)
      const diffTime = Math.abs(today.getTime() - appDate.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (dateFilter === "last-week" && diffDays > 7) return false
      if (dateFilter === "last-month" && diffDays > 30) return false
      if (dateFilter === "last-3-months" && diffDays > 90) return false
      if (dateFilter === "last-6-months" && diffDays > 180) return false
    }

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      return (
        app.jobTitle.toLowerCase().includes(term) ||
        app.company.toLowerCase().includes(term) ||
        app.location.toLowerCase().includes(term)
      )
    }

    return true
  })

  const openDetailsModal = (application: any) => {
    setSelectedApplication(application)
    setShowDetailsModal(true)
  }

  const closeDetailsModal = () => {
    setShowDetailsModal(false)
  }

  return (
    <div className="min-h-full">
      <Navbar userType="jobSeeker" activePage="my applications" />

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">My Applications</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            {/* Application Stats */}
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-4">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 p-3">
                      <i className="fas fa-file-alt text-blue-700"></i>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Applications</dt>
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
                      <i className="fas fa-hourglass-half text-yellow-400"></i>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">In Review</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">5</div>
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
                      <i className="fas fa-check-circle text-green-400"></i>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Interviews</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">3</div>
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
                      <i className="fas fa-times-circle text-red-500"></i>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Rejected</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">2</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="mt-6 bg-white shadow rounded-lg p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4">
                <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
                  <div>
                    <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      id="status-filter"
                      name="status-filter"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">All Applications</option>
                      <option value="applied">Applied</option>
                      <option value="in review">In Review</option>
                      <option value="interview">Interview</option>
                      <option value="offer">Offer</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700">
                      Date Range
                    </label>
                    <select
                      id="date-filter"
                      name="date-filter"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                    >
                      <option value="all-time">All Time</option>
                      <option value="last-week">Last Week</option>
                      <option value="last-month">Last Month</option>
                      <option value="last-3-months">Last 3 Months</option>
                      <option value="last-6-months">Last 6 Months</option>
                    </select>
                  </div>
                </div>
                <div className="mt-3 md:mt-0">
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-search text-gray-400"></i>
                    </div>
                    <input
                      type="text"
                      name="search"
                      id="search"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
                      placeholder="Search applications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Applications List */}
            <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((application) => (
                    <li key={application.id}>
                      <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12 rounded-md bg-gray-200 flex items-center justify-center">
                              <Image
                                className="h-10 w-10 rounded-md"
                                src={application.companyLogo || "/placeholder.svg"}
                                alt={`${application.company} logo`}
                                width={40}
                                height={40}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-blue-600">{application.jobTitle}</div>
                              <div className="text-sm text-gray-500">{application.company}</div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${application.status === "Interview Scheduled"
                                ? "bg-green-100 text-green-800"
                                : application.status === "Application Reviewed"
                                  ? "bg-blue-100 text-blue-800"
                                  : application.status === "Rejected"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                            >
                              {application.status}
                            </span>
                            <div className="text-sm text-gray-500 mt-1">Applied on {application.appliedDate}</div>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <div className="flex items-center text-sm text-gray-500">
                              <i className="fas fa-map-marker-alt flex-shrink-0 mr-1.5 text-gray-400"></i>
                              <p>{application.location}</p>
                            </div>
                            {application.interviewDate && (
                              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                <i className="fas fa-calendar flex-shrink-0 mr-1.5 text-gray-400"></i>
                                <p>
                                  Interview on{" "}
                                  <time dateTime={application.interviewDate}>{application.interviewDate}</time>
                                </p>
                              </div>
                            )}
                            {application.rejectedDate && (
                              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                <i className="fas fa-times-circle flex-shrink-0 mr-1.5 text-gray-400"></i>
                                <p>
                                  Rejected on{" "}
                                  <time dateTime={application.rejectedDate}>{application.rejectedDate}</time>
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-12 text-center">
                    <p className="text-gray-500">No applications found matching your criteria.</p>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </main>
      </div>

      {/* Application Details Modal */}
      {showDetailsModal && selectedApplication && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 rounded-md bg-gray-200 flex items-center justify-center">
                          <Image
                            className="h-10 w-10 rounded-md"
                            src={selectedApplication.companyLogo || "/placeholder.svg"}
                            alt={`${selectedApplication.company} logo`}
                            width={40}
                            height={40}
                          />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg leading-6 font-medium text-gray-900">
                            {selectedApplication.jobTitle}
                          </h3>
                          <div className="flex items-center">
                            <p className="text-sm font-medium text-gray-900">{selectedApplication.company}</p>
                            <span className="mx-2 text-gray-500">•</span>
                            <p className="text-sm text-gray-500">{selectedApplication.location}</p>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={closeDetailsModal}
                      >
                        <span className="sr-only">Close</span>
                        <i className="fas fa-times"></i>
                      </button>
                    </div>

                    <div className="mt-4 border-t border-gray-200 pt-4">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedApplication.status === "Interview Scheduled"
                            ? "bg-green-100 text-green-800"
                            : selectedApplication.status === "Application Reviewed"
                              ? "bg-blue-100 text-blue-800"
                              : selectedApplication.status === "Rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                        >
                          {selectedApplication.status}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <i className="fas fa-calendar-alt mr-1"></i>{" "}
                          <span>Applied on {selectedApplication.appliedDate}</span>
                        </span>
                      </div>

                      {/* Application Timeline */}
                      <div className="flow-root">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">Application Timeline</h4>
                        <ul className="-mb-8">
                          <li>
                            <div className="relative pb-8">
                              <span
                                className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                aria-hidden="true"
                              ></span>
                              <div className="relative flex space-x-3">
                                <div>
                                  <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                                    <i className="fas fa-check text-white"></i>
                                  </span>
                                </div>
                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                  <div>
                                    <p className="text-sm text-gray-500">Application submitted</p>
                                  </div>
                                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                    <time dateTime={selectedApplication.appliedDate}>
                                      {selectedApplication.appliedDate}
                                    </time>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          {selectedApplication.status !== "Applied" && (
                            <li>
                              <div className="relative pb-8">
                                <span
                                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                  aria-hidden="true"
                                ></span>
                                <div className="relative flex space-x-3">
                                  <div>
                                    <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                                      <i className="fas fa-check text-white"></i>
                                    </span>
                                  </div>
                                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                    <div>
                                      <p className="text-sm text-gray-500">Application reviewed by employer</p>
                                    </div>
                                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                      <time dateTime="2023-05-15">May 15, 2023</time>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          )}
                          {selectedApplication.status === "Interview Scheduled" && (
                            <>
                              <li>
                                <div className="relative pb-8">
                                  <span
                                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                    aria-hidden="true"
                                  ></span>
                                  <div className="relative flex space-x-3">
                                    <div>
                                      <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                                        <i className="fas fa-calendar-check text-white"></i>
                                      </span>
                                    </div>
                                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                      <div>
                                        <p className="text-sm text-gray-500">Interview scheduled</p>
                                      </div>
                                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                        <time dateTime="2023-05-20">May 20, 2023</time>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="relative">
                                  <div className="relative flex space-x-3">
                                    <div>
                                      <span className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
                                        <i className="fas fa-hourglass-half text-white"></i>
                                      </span>
                                    </div>
                                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                      <div>
                                        <p className="text-sm text-gray-500">Upcoming interview</p>
                                      </div>
                                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                        <time dateTime={selectedApplication.interviewDate}>
                                          {selectedApplication.interviewDate}
                                        </time>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </>
                          )}
                          {selectedApplication.status === "Rejected" && (
                            <li>
                              <div className="relative">
                                <div className="relative flex space-x-3">
                                  <div>
                                    <span className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center ring-8 ring-white">
                                      <i className="fas fa-times text-white"></i>
                                    </span>
                                  </div>
                                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                    <div>
                                      <p className="text-sm text-gray-500">Application rejected</p>
                                    </div>
                                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                      <time dateTime={selectedApplication.rejectedDate}>
                                        {selectedApplication.rejectedDate}
                                      </time>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          )}
                        </ul>
                      </div>

                      {/* Application Materials */}
                      <div className="mt-12">
                        <h4 className="text-lg font-medium text-gray-900 mb-2">Your Application Materials</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                            <div className="flex items-center">
                              <i className="fas fa-file-pdf text-red-500 text-lg mr-3"></i>
                              <span className="text-sm text-gray-900">Resume_John_Smith.pdf</span>
                            </div>
                            <button type="button" className="text-blue-600 hover:text-blue-500">
                              <i className="fas fa-download"></i>
                            </button>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                            <div className="flex items-center">
                              <i className="fas fa-file-alt text-blue-500 text-lg mr-3"></i>
                              <span className="text-sm text-gray-900">Cover_Letter_John_Smith.pdf</span>
                            </div>
                            <button type="button" className="text-blue-600 hover:text-blue-500">
                              <i className="fas fa-download"></i>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Job Description */}
                      <div className="mt-6">
                        <h4 className="text-lg font-medium text-gray-900 mb-2">Job Description</h4>
                        <div className="text-sm text-gray-500">
                          <p className="mb-2">
                            We're looking for an experienced Frontend Developer to join our team. You'll be responsible
                            for building responsive web applications using React, TypeScript, and modern CSS frameworks.
                          </p>
                          <p>
                            This role offers competitive compensation, flexible work arrangements, and opportunities for
                            professional growth in a collaborative environment.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Withdraw Application
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  <i className="fas fa-envelope mr-2"></i> Contact Employer
                </button>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
