import Link from "next/link"
import Navbar from "@/components/navigation/navbar"
import JobCard from "@/components/jobs/job-card"

// Mock data for recommended jobs
const RECOMMENDED_JOBS = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA (Remote)",
    jobType: "Full-time",
    salary: "$80,000 - $100,000",
    description:
      "We're looking for a talented Frontend Developer to join our team. You'll be responsible for building responsive web applications using modern frameworks.",
    postedDate: "2 days ago",
    skills: ["React", "JavaScript", "CSS"],
    logoUrl: "/placeholder.svg?height=40&width=40",
    isNew: true,
  },
  {
    id: "2",
    title: "UX/UI Designer",
    company: "DesignHub Co.",
    location: "New York, NY",
    jobType: "Full-time",
    salary: "$70,000 - $90,000",
    description:
      "Join our creative team as a UX/UI Designer. You'll create beautiful, intuitive interfaces for our clients across various industries.",
    postedDate: "1 week ago",
    skills: ["Figma", "Adobe XD", "Sketch"],
    logoUrl: "/placeholder.svg?height=40&width=40",
    isFeatured: true,
  },
  {
    id: "3",
    title: "Data Analyst Intern",
    company: "DataViz Analytics",
    location: "Chicago, IL (Hybrid)",
    jobType: "Internship",
    salary: "$20 - $25/hour",
    description:
      "Great opportunity for students to gain hands-on experience in data analysis. You'll work with our team to analyze data and create insightful reports.",
    postedDate: "3 days ago",
    skills: ["SQL", "Excel", "Python"],
    logoUrl: "/placeholder.svg?height=40&width=40",
  },
]

export default function JobSeekerDashboard() {
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RECOMMENDED_JOBS.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        {/* <div className="mt-8 px-4 sm:px-0">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              <li>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <i className="fas fa-check-circle text-green-500 text-lg"></i>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          Application for <span className="text-blue-600">Frontend Developer</span> at TechCorp Inc.
                          was submitted
                        </p>
                        <p className="text-sm text-gray-500">2 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <i className="fas fa-eye text-blue-500 text-lg"></i>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          You viewed <span className="text-blue-600">UX/UI Designer</span> at DesignHub Co.
                        </p>
                        <p className="text-sm text-gray-500">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <i className="fas fa-calendar-check text-purple-500 text-lg"></i>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          Interview scheduled for <span className="text-blue-600">Data Analyst</span> at DataViz
                          Analytics
                        </p>
                        <p className="text-sm text-gray-500">1 week ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div> */}
      </main>
    </div>
  )
}
