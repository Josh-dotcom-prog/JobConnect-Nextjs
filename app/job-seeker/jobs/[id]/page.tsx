"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import { ArrowLeft, MapPin, Clock, Calendar, Building, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navigation/navbar"

interface JobDetailsPageProps {
    params: Promise<{ id: string }>
}

interface Job {
    id: string
    title: string
    company: string
    location: string
    jobType: string
    salary: string
    description: string
    postedDate: string
    skills: string[]
    logoUrl?: string
    isNew?: boolean
    fullDescription: string
    companySize?: string
    industry?: string
    companyDescription?: string
    requirements?: string[]
    originalData?: any
}

export default function JobDetailsPage({ params }: JobDetailsPageProps) {
    const [jobId, setJobId] = useState<string>("")
    const [job, setJob] = useState<Job | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        const getParams = async () => {
            try {
                const resolvedParams = await params
                setJobId(resolvedParams.id)

                // First try to get job details from localStorage
                const storedJobs = localStorage.getItem('jobsData')
                if (storedJobs) {
                    const jobs = JSON.parse(storedJobs)
                    const foundJob = jobs.find((j: any) => j.id === resolvedParams.id)
                    if (foundJob) {
                        setJob(foundJob)
                        setLoading(false)
                        return
                    }
                }

                // If not found in localStorage, fetch from API
                const response = await axios.get(`http://127.0.0.1:8000/Jobs/${resolvedParams.id}`, {
                    headers: { 'accept': 'application/json' }
                })

                const jobData = response.data

                // Map the API response to your Job interface
                const mappedJob: Job = {
                    id: jobData.id.toString(),
                    title: jobData.title,
                    company: `Company ${jobData.employer_id}`, // You might want to fetch actual company name
                    jobType: jobData.job_type.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
                    salary: `$${jobData.base_salary.toLocaleString()} per year`,
                    location: jobData.location,
                    description: jobData.description || jobData.title,
                    postedDate: jobData.created_at ? new Date(jobData.created_at).toLocaleDateString() : "Recently",
                    skills: jobData.skills || [], // Adjust based on your API structure
                    logoUrl: jobData.company_logo || undefined,
                    isNew: jobData.created_at ? (new Date().getTime() - new Date(jobData.created_at).getTime()) < 7 * 24 * 60 * 60 * 1000 : false,
                    fullDescription: jobData.description || `We are looking for a ${jobData.title} to join our team. This is a ${jobData.job_type.replace(/_/g, ' ').toLowerCase()} position based in ${jobData.location}.`,
                    companySize: jobData.company_size,
                    industry: jobData.industry,
                    companyDescription: jobData.company_description,
                    requirements: jobData.requirements || [],
                    originalData: jobData
                }

                setJob(mappedJob)
            } catch (error) {
                console.error("Failed to load job details:", error)
                setError("Failed to load job details. Please try again.")
            } finally {
                setLoading(false)
            }
        }

        getParams()
    }, [params])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar userType="jobSeeker" activePage="browse jobs" />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="animate-pulse space-y-6">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                                        <div className="space-y-2">
                                            <div className="h-6 bg-gray-200 rounded w-64"></div>
                                            <div className="h-4 bg-gray-200 rounded w-32"></div>
                                            <div className="h-4 bg-gray-200 rounded w-48"></div>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardContent className="space-y-4 pt-6">
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-32 bg-gray-200 rounded"></div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }

    if (error || !job) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar userType="jobSeeker" activePage="browse jobs" />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <p className="text-red-600 mb-4">{error || "Job not found"}</p>
                            <Button onClick={() => router.push("/job-seeker/browse-jobs")}>
                                Back to Job Listings
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar userType="jobSeeker" activePage="browse jobs" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back button */}
                <Link href="/job-seeker/browse-jobs" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to job listings
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Job header */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={job.logoUrl || "/placeholder.svg"}
                                            alt={`${job.company} logo`}
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />
                                        <div>
                                            <CardTitle className="text-2xl font-bold">{job.title}</CardTitle>
                                            <p className="text-lg text-gray-600 mt-1">{job.company}</p>
                                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                                <div className="flex items-center">
                                                    <MapPin className="w-4 h-4 mr-1" />
                                                    {job.location}
                                                </div>
                                                <div className="flex items-center">
                                                    <Clock className="w-4 h-4 mr-1" />
                                                    {job.jobType}
                                                </div>
                                                <div className="flex items-center">
                                                    <Calendar className="w-4 h-4 mr-1" />
                                                    Posted {job.postedDate}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {job.isNew && (
                                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                                            New
                                        </Badge>
                                    )}
                                </div>
                            </CardHeader>
                        </Card>

                        {/* Job description */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Job Description</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="prose max-w-none">
                                    <p className="text-gray-700 whitespace-pre-line">{job.fullDescription}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Skills */}
                        {job.skills && job.skills.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Required Skills</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {job.skills.map((skill, index) => (
                                            <Badge key={index} variant="outline">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Company description */}
                        {job.companyDescription && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>About the Company</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-700">{job.companyDescription}</p>
                                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                                        {job.companySize && (
                                            <div className="flex items-center">
                                                <Building className="w-4 h-4 mr-2 text-gray-400" />
                                                <span className="text-gray-600">Size: {job.companySize}</span>
                                            </div>
                                        )}
                                        {job.industry && (
                                            <div className="flex items-center">
                                                <span className="text-gray-600">Industry: {job.industry}</span>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Requirements */}
                        {job.requirements && job.requirements.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Requirements</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside space-y-1">
                                        {/* {job.requirements.map((requirement, index) => (
                                            <li key={index} className="text-gray-700">
                                                {requirement}
                                            </li>
                                        ))} */}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Apply button and job info */}
                        <Card>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex items-center text-sm text-gray-500 mb-1">
                                            <DollarSign className="w-4 h-4 mr-1" />
                                            Salary
                                        </div>
                                        <div className="font-semibold text-lg">{job.salary}</div>
                                    </div>

                                    <div>
                                        <div className="text-sm text-gray-500 mb-1">Job Type</div>
                                        <Badge variant="outline">{job.jobType}</Badge>
                                    </div>

                                    <div>
                                        <div className="text-sm text-gray-500 mb-1">Location</div>
                                        <div className="font-medium">{job.location}</div>
                                    </div>

                                    <Link href={`/job-seeker/jobs/${jobId}/apply`} className="block">
                                        <Button className="w-full bg-yellow-500 text-white hover:bg-yellow-600" size="lg">
                                            Apply Now
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Job stats */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Job Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Posted</span>
                                    <span className="text-sm font-medium">{job.postedDate}</span>
                                </div>
                                {/* <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Job ID</span>
                                    <span className="text-sm font-medium">#{job.id}</span>
                                </div> */}
                                {job.originalData?.employment_type && (
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Employment Type</span>
                                        <span className="text-sm font-medium">{job.originalData.employment_type}</span>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Similar jobs or other actions */}
                        <Card>
                            <CardContent className="pt-6">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => router.push("/job-seeker/browse-jobs")}
                                >
                                    Browse Similar Jobs
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
