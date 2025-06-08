"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import { ArrowLeft, Upload, FileText, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Navbar from "@/components/navigation/navbar"

interface JobApplicationPageProps {
    params: Promise<{ id: string }>
}

interface ApplicationData {
    firstName: string
    lastName: string
    email: string
    phone: string
    coverLetter: string
    resume: File | null
}

export default function JobApplicationPage({ params }: JobApplicationPageProps) {
    const [jobId, setJobId] = useState<string>("")
    const [job, setJob] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [resumeFile, setResumeFile] = useState<File | null>(null)
    const router = useRouter()

    const [formData, setFormData] = useState<ApplicationData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        coverLetter: '',
        resume: null
    })

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
                const mappedJob = {
                    id: jobData.id.toString(),
                    title: jobData.title,
                    company: `Company ${jobData.employer_id}`,
                    jobType: jobData.job_type.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
                    salary: `$${jobData.base_salary.toLocaleString()} per year`,
                    location: jobData.location,
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        setResumeFile(file)
        setFormData(prev => ({
            ...prev,
            resume: file
        }))
    }

    const validateForm = (): boolean => {
        if (!formData.firstName.trim()) {
            setError("First name is required")
            return false
        }
        if (!formData.lastName.trim()) {
            setError("Last name is required")
            return false
        }
        if (!formData.email.trim()) {
            setError("Email is required")
            return false
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError("Please enter a valid email address")
            return false
        }
        if (!formData.phone.trim()) {
            setError("Phone number is required")
            return false
        }
        if (!formData.coverLetter.trim()) {
            setError("Cover letter is required")
            return false
        }
        if (!resumeFile) {
            setError("Please upload your resume")
            return false
        }

        setError(null)
        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setSubmitting(true)
        setError(null)

        try {
            // Create FormData for file upload
            const applicationData = new FormData()
            applicationData.append('jobId', jobId)
            applicationData.append('firstName', formData.firstName)
            applicationData.append('lastName', formData.lastName)
            applicationData.append('email', formData.email)
            applicationData.append('phone', formData.phone)
            applicationData.append('coverLetter', formData.coverLetter)
            if (resumeFile) {
                applicationData.append('resume', resumeFile)
            }

            // For now, we'll simulate the API call since you might not have an applications endpoint yet
            // Replace this with actual API call when available
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Uncomment and modify this when you have an applications API endpoint
            // const response = await axios.post('http://127.0.0.1:8000/Applications/create', applicationData, {
            //   headers: {
            //     'accept': 'application/json',
            //     'Content-Type': 'multipart/form-data'
            //   }
            // })

            // Store application in localStorage for now
            const applications = JSON.parse(localStorage.getItem('myApplications') || '[]')
            const newApplication = {
                id: Date.now().toString(),
                jobId: jobId,
                jobTitle: job?.title,
                company: job?.company,
                appliedDate: new Date().toISOString(),
                status: 'submitted',
                ...formData,
                resumeFileName: resumeFile?.name
            }
            applications.push(newApplication)
            localStorage.setItem('myApplications', JSON.stringify(applications))

            setSubmitted(true)

            // Redirect after 3 seconds
            setTimeout(() => {
                router.push("/job-seeker/browse-jobs")
            }, 3000)

        } catch (error: any) {
            console.error("Failed to submit application:", error)
            setError("Failed to submit application. Please try again.")
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar userType="jobSeeker" activePage="browse jobs" />
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="animate-pulse space-y-6">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                        <Card>
                            <CardHeader>
                                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
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

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar userType="jobSeeker" activePage="browse jobs" />
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
                            <p className="text-gray-600 mb-6">
                                Thank you for applying to <strong>{job?.title}</strong> at <strong>{job?.company}</strong>.
                                We&apos;ll review your application and get back to you soon.
                            </p>
                            <div className="space-y-3">
                                <Button
                                    onClick={() => router.push("/job-seeker/browse-jobs")}
                                    className="w-full bg-yellow-500 text-white hover:bg-yellow-600"
                                >
                                    Browse More Jobs
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => router.push("/job-seeker/dashboard")}
                                    className="w-full"
                                >
                                    Go to Dashboard
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar userType="jobSeeker" activePage="browse jobs" />
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back button */}
                <Link href={`/job-seeker/jobs/${jobId}`} className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to job details
                </Link>

                {/* Job info */}
                {job && (
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Applying for: {job.title}</CardTitle>
                            <p className="text-gray-600">{job.company} • {job.location}</p>
                            <p className="text-sm text-green-600 font-medium">{job.salary}</p>
                        </CardHeader>
                    </Card>
                )}

                {/* Error message */}
                {error && (
                    <Card className="mb-6 border-red-200">
                        <CardContent className="pt-6">
                            <p className="text-red-600 text-sm">{error}</p>
                        </CardContent>
                    </Card>
                )}

                {/* Application form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Job Application</CardTitle>
                        <p className="text-sm text-gray-600">
                            Please fill out all required fields to submit your application.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="firstName">First Name *</Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="lastName">Last Name *</Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="email">Email Address *</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <Label htmlFor="phone">Phone Number *</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <Label htmlFor="coverLetter">Cover Letter *</Label>
                                <Textarea
                                    id="coverLetter"
                                    name="coverLetter"
                                    rows={6}
                                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                                    value={formData.coverLetter}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    {formData.coverLetter.length}/1000 characters
                                </p>
                            </div>

                            <div>
                                <Label htmlFor="resume">Resume *</Label>
                                <div className="mt-1">
                                    {resumeFile ? (
                                        <div className="flex items-center justify-between p-4 border-2 border-green-300 border-dashed rounded-md bg-green-50">
                                            <div className="flex items-center">
                                                <FileText className="h-8 w-8 text-green-600 mr-3" />
                                                <div>
                                                    <p className="text-sm font-medium text-green-900">{resumeFile.name}</p>
                                                    <p className="text-xs text-green-700">
                                                        {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    setResumeFile(null)
                                                    setFormData(prev => ({ ...prev, resume: null }))
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
                                            <div className="space-y-1 text-center">
                                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                                <div className="flex text-sm text-gray-600">
                                                    <label htmlFor="resume" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                                        <span>Upload a file</span>
                                                        <input
                                                            id="resume"
                                                            name="resume"
                                                            type="file"
                                                            className="sr-only"
                                                            accept=".pdf,.doc,.docx"
                                                            onChange={handleFileChange}
                                                        />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-md">
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Application Summary</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Position: {job?.title}</li>
                                    <li>• Company: {job?.company}</li>
                                    <li>• Location: {job?.location}</li>
                                    <li>• Salary: {job?.salary}</li>
                                </ul>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Button
                                    type="submit"
                                    className="flex-1 bg-yellow-500 text-white hover:bg-yellow-600"
                                    size="lg"
                                    disabled={submitting}
                                >
                                    {submitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Submitting...
                                        </>
                                    ) : (
                                        "Submit Application"
                                    )}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="lg"
                                    onClick={() => router.back()}
                                    disabled={submitting}
                                    className="sm:w-auto"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Tips for a successful application */}
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle className="text-lg">Tips for a Successful Application</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start">
                                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span>Tailor your cover letter to highlight relevant experience for this specific role</span>
                            </li>
                            <li className="flex items-start">
                                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span>Ensure your resume is up-to-date and matches the job requirements</span>
                            </li>
                            <li className="flex items-start">
                                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span>Double-check your contact information for accuracy</span>
                            </li>
                            <li className="flex items-start">
                                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span>Review your application before submitting</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
