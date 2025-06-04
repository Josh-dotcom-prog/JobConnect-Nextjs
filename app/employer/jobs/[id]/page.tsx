import { notFound } from "next/navigation"
import Link from "next/link"
import {
    ArrowLeft,
    MapPin,
    Clock,
    Calendar,
    Users,
    Eye,
    Edit,
    Share2,
    BarChart3,
    TrendingUp,
    Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navigation/navbar"

// Mock data - in a real app, this would come from an API
const MOCK_JOBS = [
    {
        id: "1",
        title: "Senior Frontend Developer",
        department: "Engineering",
        type: "Full-time",
        location: "Remote",
        salaryMin: "$100k",
        salaryMax: "$130k",
        description:
            "We are seeking a talented Senior Frontend Developer to join our growing engineering team. You will be responsible for developing and maintaining high-quality web applications using modern technologies.",
        requirements:
            "5+ years of experience with React, TypeScript, and modern frontend technologies. Strong understanding of web performance optimization and responsive design.",
        status: "active",
        postedDate: "2023-01-15",
        applicants: 42,
        views: 328,
        skills: ["React", "TypeScript", "JavaScript", "CSS", "HTML"],
        benefits: ["Health Insurance", "Remote Work", "Flexible Hours", "Professional Development"],
        viewsData: [
            { date: "2024-01-01", views: 15 },
            { date: "2024-01-02", views: 23 },
            { date: "2024-01-03", views: 18 },
            { date: "2024-01-04", views: 31 },
            { date: "2024-01-05", views: 28 },
            { date: "2024-01-06", views: 35 },
            { date: "2024-01-07", views: 42 },
        ],
        applicantsData: [
            { date: "2024-01-01", applicants: 2 },
            { date: "2024-01-02", applicants: 5 },
            { date: "2024-01-03", applicants: 3 },
            { date: "2024-01-04", applicants: 8 },
            { date: "2024-01-05", applicants: 6 },
            { date: "2024-01-06", applicants: 9 },
            { date: "2024-01-07", applicants: 9 },
        ],
    },
]

const MOCK_APPLICANTS = [
    {
        id: "1",
        name: "John Smith",
        email: "john.smith@email.com",
        appliedDate: "2024-01-07",
        status: "new",
        experience: "5 years",
        location: "San Francisco, CA",
        resumeUrl: "/resume-john-smith.pdf",
        coverLetter: "I am excited to apply for the Senior Frontend Developer position...",
        skills: ["React", "TypeScript", "Node.js"],
        avatar: "https://images.unsplash.com/photo-1472099103004-8b4350e481a5?w=150&h=150&fit=crop&crop=face",
    },
    // {
    //     id: "2",
    //     name: "Sarah Johnson",
    //     email: "sarah.johnson@email.com",
    //     appliedDate: "2024-01-06",
    //     status: "reviewed",
    //     experience: "7 years",
    //     location: "New York, NY",
    //     resumeUrl: "/resume-sarah-johnson.pdf",
    //     coverLetter: "With over 7 years of frontend development experience...",
    //     skills: ["React", "Vue.js", "TypeScript", "GraphQL"],
    //     avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    // },
    // {
    //     id: "3",
    //     name: "Michael Chen",
    //     email: "michael.chen@email.com",
    //     appliedDate: "2024-01-05",
    //     status: "interview",
    //     experience: "6 years",
    //     location: "Seattle, WA",
    //     resumeUrl: "/resume-michael-chen.pdf",
    //     coverLetter: "I am passionate about creating exceptional user experiences...",
    //     skills: ["React", "TypeScript", "Next.js", "AWS"],
    //     avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    // },
]

interface JobDetailsPageProps {
    params: Promise<{ id: string }>
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
    const { id } = await params
    const job = MOCK_JOBS.find((j) => j.id === id)

    if (!job) {
        notFound()
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return <Badge className="bg-green-100 text-green-800">Active</Badge>
            case "draft":
                return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>
            case "closed":
                return <Badge className="bg-gray-100 text-gray-800">Closed</Badge>
            case "expired":
                return <Badge className="bg-red-100 text-red-800">Expired</Badge>
            default:
                return <Badge>{status}</Badge>
        }
    }

    const getApplicantStatusBadge = (status: string) => {
        switch (status) {
            case "new":
                return <Badge className="bg-blue-100 text-blue-800">New</Badge>
            case "reviewed":
                return <Badge className="bg-yellow-100 text-yellow-800">Reviewed</Badge>
            case "interview":
                return <Badge className="bg-purple-100 text-purple-800">Interview</Badge>
            case "hired":
                return <Badge className="bg-green-100 text-green-800">Hired</Badge>
            case "rejected":
                return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
            default:
                return <Badge>{status}</Badge>
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar userType="employer" activePage="jobPostings" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back button */}
                <Link href="/employer/jobs" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to job postings
                </Link>

                {/* Job header */}
                <Card className="mb-8">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                    <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                                    {getStatusBadge(job.status)}
                                </div>
                                <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                                    <div className="flex items-center">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        {job.location}
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-1" />
                                        {job.type}
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        Posted {new Date(job.postedDate).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className="flex items-center space-x-6">
                                    <div className="flex items-center text-lg font-semibold text-gray-900">
                                        <Users className="w-5 h-5 mr-2 text-blue-600" />
                                        {job.applicants} Applicants
                                    </div>
                                    <div className="flex items-center text-lg font-semibold text-gray-900">
                                        <Eye className="w-5 h-5 mr-2 text-green-600" />
                                        {job.views} Views
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-3">
                                <Button variant="outline">
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Share
                                </Button>
                                <Link href={`/employer/jobs/${job.id}/edit`}>
                                    <Button>
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit Job
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="applicants">Applicants ({job.applicants})</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Main content */}
                            <div className="lg:col-span-2 space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Job Description</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Requirements</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-700 whitespace-pre-line">{job.requirements}</p>
                                    </CardContent>
                                </Card>

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
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Job Details</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">Department</span>
                                            <span className="font-medium">{job.department}</span>
                                        </div>
                                        <Separator />
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">Salary Range</span>
                                            <span className="font-medium">
                                                {job.salaryMin} - {job.salaryMax}
                                            </span>
                                        </div>
                                        <Separator />
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">Job Type</span>
                                            <span className="font-medium">{job.type}</span>
                                        </div>
                                        <Separator />
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">Location</span>
                                            <span className="font-medium">{job.location}</span>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Quick Stats</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">Total Views</span>
                                            <span className="font-medium text-lg">{job.views}</span>
                                        </div>
                                        <Separator />
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">Total Applicants</span>
                                            <span className="font-medium text-lg">{job.applicants}</span>
                                        </div>
                                        <Separator />
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">Conversion Rate</span>
                                            <span className="font-medium text-lg">{((job.applicants / job.views) * 100).toFixed(1)}%</span>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Benefits</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {job.benefits.map((benefit, index) => (
                                                <li key={index} className="flex items-center">
                                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                                                    <span className="text-sm text-gray-700">{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="applicants" className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Applicants</h2>
                            <Button variant="outline">
                                <Download className="w-4 h-4 mr-2" />
                                Export CSV
                            </Button>
                        </div>

                        <Card>
                            <CardContent className="p-0">
                                <div className="divide-y divide-gray-200">
                                    {MOCK_APPLICANTS.map((applicant) => (
                                        <div key={applicant.id} className="p-6">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-start space-x-4">
                                                    <img
                                                        src={applicant.avatar || "/placeholder.svg"}
                                                        alt={applicant.name}
                                                        className="w-12 h-12 rounded-full"
                                                    />
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-medium text-gray-900">{applicant.name}</h3>
                                                        <p className="text-sm text-gray-500">{applicant.email}</p>
                                                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                                            <span>{applicant.experience} experience</span>
                                                            <span>•</span>
                                                            <span>{applicant.location}</span>
                                                            <span>•</span>
                                                            <span>Applied {new Date(applicant.appliedDate).toLocaleDateString()}</span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2 mt-3">
                                                            {applicant.skills.map((skill, index) => (
                                                                <Badge key={index} variant="outline" className="text-xs">
                                                                    {skill}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    {getApplicantStatusBadge(applicant.status)}
                                                    <Button variant="outline" size="sm">
                                                        View Profile
                                                    </Button>
                                                    <Button size="sm">Contact</Button>
                                                </div>
                                            </div>
                                            {applicant.coverLetter && (
                                                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                                    <p className="text-sm text-gray-700 line-clamp-3">{applicant.coverLetter}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="analytics" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-600">Total Views</p>
                                            <p className="text-2xl font-bold text-gray-900">{job.views}</p>
                                        </div>
                                        <div className="p-3 bg-blue-100 rounded-full">
                                            <Eye className="w-6 h-6 text-blue-600" />
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center text-sm">
                                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                                        <span className="text-green-500">+12%</span>
                                        <span className="text-gray-500 ml-1">from last week</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-600">Applications</p>
                                            <p className="text-2xl font-bold text-gray-900">{job.applicants}</p>
                                        </div>
                                        <div className="p-3 bg-green-100 rounded-full">
                                            <Users className="w-6 h-6 text-green-600" />
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center text-sm">
                                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                                        <span className="text-green-500">+8%</span>
                                        <span className="text-gray-500 ml-1">from last week</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                                            <p className="text-2xl font-bold text-gray-900">
                                                {((job.applicants / job.views) * 100).toFixed(1)}%
                                            </p>
                                        </div>
                                        <div className="p-3 bg-purple-100 rounded-full">
                                            <BarChart3 className="w-6 h-6 text-purple-600" />
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center text-sm">
                                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                                        <span className="text-green-500">+2.1%</span>
                                        <span className="text-gray-500 ml-1">from last week</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-600">Avg. Time to Apply</p>
                                            <p className="text-2xl font-bold text-gray-900">2.3 days</p>
                                        </div>
                                        <div className="p-3 bg-orange-100 rounded-full">
                                            <Clock className="w-6 h-6 text-orange-600" />
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center text-sm">
                                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                                        <span className="text-green-500">-0.5 days</span>
                                        <span className="text-gray-500 ml-1">from last week</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Views & Applications Over Time</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-64 flex items-center justify-center text-gray-500">
                                    <p>Chart visualization would go here</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="settings" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Job Status</CardTitle>
                                <p className="text-sm text-gray-600">Manage the visibility and status of this job posting</p>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Current Status</p>
                                        <p className="text-sm text-gray-500">This job is currently {job.status}</p>
                                    </div>
                                    {getStatusBadge(job.status)}
                                </div>
                                <div className="flex space-x-3">
                                    {job.status === "active" && <Button variant="outline">Pause Job</Button>}
                                    {job.status === "draft" && <Button>Publish Job</Button>}
                                    <Button variant="destructive">Close Job</Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Danger Zone</CardTitle>
                                <p className="text-sm text-gray-600">Irreversible actions for this job posting</p>
                            </CardHeader>
                            <CardContent>
                                <Button variant="destructive">Delete Job Posting</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
