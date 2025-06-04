import Link from "next/link"
import Navbar from "@/components/navigation/navbar"

export default function EmployerDashboard() {
  return (
    <div className="bg-gray-50">
      <Navbar userType="employer" activePage="dashboard" />

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold leading-tight text-gray-900">Employer Dashboard</h1>
                <p className="mt-1 text-sm text-gray-600">Welcome back, Passions Hotel.</p>
              </div>
              <div className="mt-4 flex md:mt-0 md:ml-4">
                <Link href="/employer/company-profile">
                  {/* <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-yellow-400 rounded-md shadow-sm text-sm font-medium text-yellow-400 bg-white hover:bg-yellow-50"
                  >
                    Edit Profile
                  </button> */}
                </Link>
                <Link href="/employer/job-postings/new">
                  {/* <button
                    type="button"
                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700"
                  >
                    <i className="fas fa-plus mr-2"></i> Post New Job
                  </button> */}
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
                        <i className="fas fa-users text-green-600"></i>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Applications</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">147</div>
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
                            <div className="text-2xl font-semibold text-gray-900">1,284</div>
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
                            <div className="text-2xl font-semibold text-gray-900">12</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Management */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Recent Job Postings</h2>
                <Link href="/employer/job-postings" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  View all
                </Link>
              </div>
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  <li>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-100">
                              <i className="fas fa-code text-blue-600"></i>
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-blue-600">Senior Frontend Developer</div>
                            <div className="text-sm text-gray-500">Full-time • Remote • $100k - $130k</div>
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <div className="flex items-center text-sm text-gray-500">
                            <i className="fas fa-calendar mr-1.5 text-gray-400"></i>
                            Posted on Jan 15, 2023
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            <i className="fas fa-users mr-1.5 text-gray-400"></i>
                            42 applicants
                          </div>
                        </div>
                        {/* <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <Link href="/employer/jobPostings/1" className="text-blue-600 hover:text-blue-500">
                            View Details
                          </Link>
                        </div> */}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-purple-100">
                              <i className="fas fa-paint-brush text-purple-600"></i>
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-blue-600">UI/UX Designer</div>
                            <div className="text-sm text-gray-500">Full-time • On-site • $80k - $100k</div>
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <div className="flex items-center text-sm text-gray-500">
                            <i className="fas fa-calendar mr-1.5 text-gray-400"></i>
                            Posted on Jan 10, 2023
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            <i className="fas fa-users mr-1.5 text-gray-400"></i>
                            28 applicants
                          </div>
                        </div>
                        {/* <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <Link href="/employer/job-postings/2" className="text-blue-600 hover:text-blue-500">
                            View Details
                          </Link>
                        </div> */}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-100">
                              <i className="fas fa-database text-blue-600"></i>
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-blue-600">Data Scientist</div>
                            <div className="text-sm text-gray-500">Full-time • Hybrid • $120k - $150k</div>
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Draft
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <div className="flex items-center text-sm text-gray-500">
                            <i className="fas fa-calendar mr-1.5 text-gray-400"></i>
                            Created on Jan 5, 2023
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            <i className="fas fa-users mr-1.5 text-gray-400"></i>
                            Not published
                          </div>
                        </div>
                        {/* <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <Link href="/employer/job-postings/3" className="text-blue-600 hover:text-blue-500">
                            View Details
                          </Link>
                        </div> */}
                      </div>
                    </div>
                  </li>
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
                  <li>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src="/placeholder.svg?height=40&width=40"
                              alt="Applicant"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Michael Johnson</div>
                            <div className="text-sm text-gray-500">Applied for Senior Frontend Developer</div>
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            New
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <div className="flex items-center text-sm text-gray-500">
                            <i className="fas fa-graduation-cap mr-1.5 text-gray-400"></i>
                            Stanford University
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            <i className="fas fa-briefcase mr-1.5 text-gray-400"></i>5 years experience
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            <i className="fas fa-calendar mr-1.5 text-gray-400"></i>
                            Applied Jan 20, 2023
                          </div>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <Link href="/employer/applications/1" className="text-blue-600 hover:text-blue-500">
                            View Profile
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src="/placeholder.svg?height=40&width=40"
                              alt="Applicant"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Sarah Williams</div>
                            <div className="text-sm text-gray-500">Applied for UI/UX Designer</div>
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            In Review
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <div className="flex items-center text-sm text-gray-500">
                            <i className="fas fa-graduation-cap mr-1.5 text-gray-400"></i>
                            Rhode Island School of Design
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            <i className="fas fa-briefcase mr-1.5 text-gray-400"></i>3 years experience
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            <i className="fas fa-calendar mr-1.5 text-gray-400"></i>
                            Applied Jan 18, 2023
                          </div>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <Link href="/employer/applications/2" className="text-blue-600 hover:text-blue-500">
                            View Profile
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
