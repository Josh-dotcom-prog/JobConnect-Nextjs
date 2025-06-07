"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"
import Navbar from "@/components/navigation/navbar"
import { useToast } from "@/hooks/use-toast"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card"
import {
  Badge
} from "@/components/ui/badge"
import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from "@/components/ui/avatar"

// Types
interface Application {
  id: number
  name: string
  position: string
  jobId: number
  status: "new" | "review" | "interview" | "offer" | "hired" | "rejected"
  jobType: string
  image: string
  education: string
  experience: string
  appliedDate: string
  email: string
  phone: string
  location: string
  skills: string[]
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const userId = 1 // Replace with authenticated user ID

  // Fetch applicants from backend
  useEffect(() => {
    async function fetchApplicants() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/company/applicants`, {
          params: {
            user_id: userId
          },
          headers: {
            'accept': 'application/json'
          }
        })

        const processed = response.data.applicants.map((applicant: { id: any; jobseeker: { first_name: any; last_name: any; id: any; education_level: any; work_experience: string; user_id: any; phone_number: any }; job: { title: any; id: any; job_type: string; location: any }; status: string; created_at: string | number | Date }) => ({
          id: applicant.id,
          name: `${applicant.jobseeker.first_name} ${applicant.jobseeker.last_name}`,
          position: applicant.job.title,
          jobId: applicant.job.id,
          status: applicant.status === 'pending' ? 'new' : applicant.status,
          jobType: mapJobType(applicant.job.job_type),
          image: `https://i.pravatar.cc/150?img=${applicant.jobseeker.id}`,
          education: applicant.jobseeker.education_level,
          experience: applicant.jobseeker.work_experience.split('.')[0],
          appliedDate: new Date(applicant.created_at).toLocaleDateString(),
          email: `${applicant.jobseeker.user_id}@example.com`,
          phone: applicant.jobseeker.phone_number,
          location: applicant.job.location,
          skills: extractSkillsFromExperience(applicant.jobseeker.work_experience)
        }))

        setApplications(processed)
      } catch (err) {
        console.error("Error fetching applicants:", err)
        setError("Failed to load job applicants.")
      } finally {
        setLoading(false)
      }
    }

    fetchApplicants()
  }, [])

  // Map backend job type to category used in UI
  function mapJobType(jobType: string): string {
    switch (jobType) {
      case 'full_time':
      case 'part_time':
        return 'frontend'
      case 'contract':
        return 'devops'
      case 'remote':
        return 'data'
      default:
        return 'ui-ux'
    }
  }

  // Extract basic skills from work experience
  function extractSkillsFromExperience(experience: string): string[] {
    const keywords = ["Python", "React", "SQL", "Django", "JavaScript", "UI", "UX", "Design", "Backend", "Frontend"]
    return keywords.filter(skill =>
      experience.toLowerCase().includes(skill.toLowerCase())
    )
  }

  // Handle status update (stub - replace with actual API call later)
  const handleStatusChange = (id: number, newStatus: Application["status"]) => {
    alert(`Changing application ${id} to status: ${newStatus}`)
  }

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Navbar userType="employer" activePage="applications" />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Navbar userType="employer" activePage="applications" />
        <div className="max-w-7xl mx-auto px-4 py-10 text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar userType="employer" activePage="applications" />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Job Applications</h1>
        </div>

        {/* Render Application List */}
        <div className="space-y-6">
          {applications.length > 0 ? (
            applications.map((app) => (
              <Card key={app.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={app.image} alt={app.name} />
                        <AvatarFallback>{app.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{app.name}</h3>
                        <p className="text-sm text-gray-500">{app.position} • {app.location}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {app.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Education</p>
                      <p className="text-sm">{app.education}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Experience</p>
                      <p className="text-sm">{app.experience}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm">{app.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm">{app.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Skills</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {app.skills.length > 0 ? (
                          app.skills.map((skill) => (
                            <span key={skill} className="text-xs bg-gray-100 px-2 py-1 rounded-md">
                              {skill}
                            </span>
                          ))
                        ) : (
                          <p className="text-xs text-gray-400">No specific skills listed</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <Link href={`/employer/applications/${app.id}`}>
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        View Profile
                      </button>
                    </Link>
                    <button
                      onClick={() => handleStatusChange(app.id, 'review')}
                      className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-md"
                    >
                      Review
                    </button>
                    <button
                      onClick={() => handleStatusChange(app.id, 'rejected')}
                      className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded-md"
                    >
                      Reject
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center py-10 text-gray-500">No applications found.</p>
          )}
        </div>
      </main>
    </div>
  )
}