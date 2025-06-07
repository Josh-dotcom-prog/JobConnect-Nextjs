"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navigation/navbar"
import Link from "next/link"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import {
    Search,
    Plus,
    Calendar,
    Users,
    Eye,
    Code,
    Palette,
    Database,
    Server,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"

interface JobPosting {
    id: string
    title: string
    department: string
    type: string
    location: string
    salaryMin: string
    salaryMax: string
    description: string
    requirements: string
    status: "active" | "draft" | "closed" | "expired"
    postedDate: string
    applicants: number
    views: number
    icon: React.ReactNode
}

const JobPostingsPage = () => {
    const { toast } = useToast()
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [sortBy, setSortBy] = useState("newest")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [jobPostings, setJobPostings] = useState<JobPosting[]>([
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
            icon: <Code className="h-5 w-5 text-blue-600" />,
        },
    ])

    const [newJob, setNewJob] = useState({
        title: "",
        department: "",
        type: "",
        location: "",
        salaryMin: "",
        salaryMax: "",
        description: "",
        requirements: "",
    })

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

    const filteredAndSortedJobs = jobPostings
        .filter((job) => {
            const matchesSearch =
                job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.department.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesStatus = statusFilter === "all" || job.status === statusFilter
            return matchesSearch && matchesStatus
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "newest":
                    return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
                case "oldest":
                    return new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime()
                case "applicants-high":
                    return b.applicants - a.applicants
                case "applicants-low":
                    return a.applicants - b.applicants
                default:
                    return 0
            }
        })

    const handleJobAction = (jobId: string, action: string) => {
        const job = jobPostings.find((j) => j.id === jobId)
        if (!job) return

        switch (action) {
            case "close":
                if (confirm(`Are you sure you want to close the job posting for: ${job.title}?`)) {
                    setJobPostings((prev) => prev.map((j) => (j.id === jobId ? { ...j, status: "closed" as const } : j)))
                    toast({
                        title: "Job Closed",
                        description: `${job.title} has been closed`,
                    })
                }
                break
            case "publish":
                setJobPostings((prev) => prev.map((j) => (j.id === jobId ? { ...j, status: "active" as const } : j)))
                toast({
                    title: "Job Published",
                    description: `${job.title} has been published`,
                })
                break
            case "duplicate":
                toast({
                    title: "Job Duplicated",
                    description: `A copy of ${job.title} has been created as a draft`,
                })
                break
            case "renew":
                setJobPostings((prev) => prev.map((j) => (j.id === jobId ? { ...j, status: "active" as const } : j)))
                toast({
                    title: "Job Renewed",
                    description: `${job.title} has been renewed and is now active`,
                })
                break
        }
    }

    const handleSaveJob = (isDraft: boolean) => {
        // Validate required fields
        const requiredFields = [
            "title",
            "department",
            "type",
            "location",
            "salaryMin",
            "salaryMax",
            "description",
            "requirements",
        ]
        const isValid = requiredFields.every((field) => newJob[field as keyof typeof newJob])

        if (!isValid) {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields",
                variant: "destructive",
            })
            return
        }

        const newJobPosting: JobPosting = {
            id: Date.now().toString(),
            ...newJob,
            status: isDraft ? "draft" : "active",
            postedDate: new Date().toISOString().split("T")[0],
            applicants: 0,
            views: 0,
            icon: <Code className="h-5 w-5 text-blue-600" />,
        }

        setJobPostings((prev) => [newJobPosting, ...prev])
        setIsModalOpen(false)
        setNewJob({
            title: "",
            department: "",
            type: "",
            location: "",
            salaryMin: "",
            salaryMax: "",
            description: "",
            requirements: "",
        })

        toast({
            title: isDraft ? "Draft Saved" : "Job Published",
            description: isDraft
                ? "Your job posting has been saved as a draft"
                : "Your job posting has been published successfully",
        })
    }

    const renderJobActions = (job: JobPosting) => {
        switch (job.status) {
            case "active":
                return (
                    <div className="flex space-x-2">
                        <Link href={`/employer/jobs/${job.id}`}>
                            <Button variant="outline" size="sm">
                                View Details
                            </Button>
                        </Link>
                        <Link href={`/employer/jobs/${job.id}/edit`}>
                            <Button variant="outline" size="sm">
                                Edit
                            </Button>
                        </Link>
                        <Button variant="destructive" size="sm" onClick={() => handleJobAction(job.id, "close")}>
                            Close
                        </Button>
                    </div>
                )
            case "draft":
                return (
                    <div className="flex space-x-2">
                        <Link href={`/employer/jobs/${job.id}/edit`}>
                            <Button variant="outline" size="sm">
                                Edit
                            </Button>
                        </Link>
                        <Button size="sm" onClick={() => handleJobAction(job.id, "publish")}>
                            Publish
                        </Button>
                    </div>
                )
            case "closed":
                return (
                    <div className="flex space-x-2">
                        <Link href={`/employer/jobs/${job.id}`}>
                            <Button variant="outline" size="sm">
                                View Details
                            </Button>
                        </Link>
                        <Button variant="outline" size="sm" onClick={() => handleJobAction(job.id, "duplicate")}>
                            Duplicate
                        </Button>
                    </div>
                )
            case "expired":
                return (
                    <div className="flex space-x-2">
                        <Link href={`/employer/jobs/${job.id}`}>
                            <Button variant="outline" size="sm">
                                View Details
                            </Button>
                        </Link>
                        <Button size="sm" onClick={() => handleJobAction(job.id, "renew")}>
                            Renew
                        </Button>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar userType="employer" activePage="jobPostings" />

            {/* Header */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="flex-1 min-w-0">
                            <h1 className="text-2xl font-bold leading-tight text-gray-900">Job Postings</h1>
                            <p className="mt-1 text-sm text-gray-600">Manage all your job listings in one place</p>
                        </div>
                        <div className="mt-4 flex md:mt-0 md:ml-4">
                            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                                <DialogTrigger asChild>
                                    <Button className="bg-blue-600 text-white hover:bg-blue-700">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Post New Job
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl bg-white">
                                    <DialogHeader>
                                        <DialogTitle>Create New Job Posting</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4 ">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="title">Job Title</Label>
                                                <Input
                                                    id="title"
                                                    value={newJob.title}
                                                    onChange={(e) => setNewJob((prev) => ({ ...prev, title: e.target.value }))}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="department">Department</Label>
                                                <Input
                                                    id="department"
                                                    value={newJob.department}
                                                    onChange={(e) => setNewJob((prev) => ({ ...prev, department: e.target.value }))}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="type">Job Type</Label>
                                                <Select
                                                    value={newJob.type}
                                                    onValueChange={(value) => setNewJob((prev) => ({ ...prev, type: value }))}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Type" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white">
                                                        <SelectItem value="Full-time">Full-time</SelectItem>
                                                        <SelectItem value="Part-time">Part-time</SelectItem>
                                                        <SelectItem value="Contract">Contract</SelectItem>
                                                        <SelectItem value="Internship">Internship</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label htmlFor="location">Location</Label>
                                                <Input
                                                    id="location"
                                                    value={newJob.location}
                                                    onChange={(e) => setNewJob((prev) => ({ ...prev, location: e.target.value }))}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="salaryMin">Min Salary</Label>
                                                <Input
                                                    id="salaryMin"
                                                    value={newJob.salaryMin}
                                                    onChange={(e) => setNewJob((prev) => ({ ...prev, salaryMin: e.target.value }))}
                                                    placeholder="e.g., $80k"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="salaryMax">Max Salary</Label>
                                                <Input
                                                    id="salaryMax"
                                                    value={newJob.salaryMax}
                                                    onChange={(e) => setNewJob((prev) => ({ ...prev, salaryMax: e.target.value }))}
                                                    placeholder="e.g., $120k"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="description">Job Description</Label>
                                            <Textarea
                                                id="description"
                                                value={newJob.description}
                                                onChange={(e) => setNewJob((prev) => ({ ...prev, description: e.target.value }))}
                                                rows={4}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="requirements">Requirements</Label>
                                            <Textarea
                                                id="requirements"
                                                value={newJob.requirements}
                                                onChange={(e) => setNewJob((prev) => ({ ...prev, requirements: e.target.value }))}
                                                rows={4}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button className="bg-yellow-400 text-white" onClick={() => handleSaveJob(false)}>
                                            Publish Job
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filters and Search */}
                <Card className="mb-6">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4">
                            <div className="flex-1 min-w-0">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <Input
                                        placeholder="Search job postings..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="All Status" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="closed">Closed</SelectItem>
                                        <SelectItem value="expired">Expired</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectItem value="newest">Newest First</SelectItem>
                                        <SelectItem value="oldest">Oldest First</SelectItem>
                                        <SelectItem value="applicants-high">Most Applicants</SelectItem>
                                        <SelectItem value="applicants-low">Fewest Applicants</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Job Listings */}
                <Card>
                    <CardContent className="p-0">
                        <div className="divide-y divide-gray-200">
                            {filteredAndSortedJobs.map((job) => (
                                <div key={job.id} className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-100">
                                                    {job.icon}
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-blue-600">{job.title}</div>
                                                <div className="text-sm text-gray-500">
                                                    {job.type} • {job.location} • {job.salaryMin} - {job.salaryMax}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ml-2 flex-shrink-0 flex">{getStatusBadge(job.status)}</div>
                                    </div>
                                    <div className="mt-2 sm:flex sm:justify-between">
                                        <div className="sm:flex">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Calendar className="mr-1.5 h-4 w-4 text-gray-400" />
                                                {job.status === "draft" ? "Created" : "Posted"} on{" "}
                                                {new Date(job.postedDate).toLocaleDateString()}
                                            </div>
                                            {job.status !== "draft" && (
                                                <>
                                                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                                        <Users className="mr-1.5 h-4 w-4 text-gray-400" />
                                                        {job.applicants} applicants
                                                    </div>
                                                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                                        <Eye className="mr-1.5 h-4 w-4 text-gray-400" />
                                                        {job.views} views
                                                    </div>
                                                </>
                                            )}
                                            {job.status === "draft" && (
                                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                                    <Users className="mr-1.5 h-4 w-4 text-gray-400" />
                                                    Not published
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">{renderJobActions(job)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Pagination */}
                <Card className="mt-6">
                    <CardContent className="px-4 py-3 flex items-center justify-between">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <Button variant="outline">Previous</Button>
                            <Button variant="outline">Next</Button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">1</span> to{" "}
                                    <span className="font-medium">{Math.min(5, filteredAndSortedJobs.length)}</span> of{" "}
                                    <span className="font-medium">{filteredAndSortedJobs.length}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    <Button variant="outline" size="sm" className="rounded-l-md">
                                        <ChevronLeft className="h-4 w-4" />
                                        <span className="sr-only">Previous</span>
                                    </Button>
                                    <Button variant="outline" size="sm" className="bg-blue-50 border-blue-500 text-blue-600">
                                        1
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        2
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        3
                                    </Button>
                                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                        ...
                                    </span>
                                    <Button variant="outline" size="sm">
                                        8
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        9
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        10
                                    </Button>
                                    <Button variant="outline" size="sm" className="rounded-r-md">
                                        <ChevronRight className="h-4 w-4" />
                                        <span className="sr-only">Next</span>
                                    </Button>
                                </nav>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default JobPostingsPage
