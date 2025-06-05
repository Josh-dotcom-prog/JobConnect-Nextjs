"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Download, Eye, Calendar, MapPin, Mail, Phone } from "lucide-react"
import Navbar from "@/components/navigation/navbar"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Application {
    id: string
    name: string
    position: string
    jobId: string
    status: "new" | "review" | "interview" | "offer" | "hired" | "rejected"
    jobType: "frontend" | "ui-ux" | "data" | "devops"
    image: string
    education: string
    experience: string
    appliedDate: string
    email: string
    phone: string
    skills: string[]
    notes?: string
    location: string
    resumeUrl?: string
    coverLetter?: string
}

const mockApplications: Application[] = [
    {
        id: "1",
        name: "William Obwana",
        position: "Senior Frontend Developer",
        jobId: "1",
        status: "new",
        jobType: "frontend",
        image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        education: "Stanford University",
        experience: "5 years experience",
        appliedDate: "Jan 20, 2024",
        email: "michael.johnson@example.com",
        phone: "(555) 123-4567",
        location: "San Francisco, CA",
        skills: ["JavaScript", "React", "TypeScript", "HTML/CSS", "Redux", "Node.js"],
        resumeUrl: "/resume-michael-johnson.pdf",
        coverLetter: "I am excited to apply for the Senior Frontend Developer position...",
    },
    {
        id: "3",
        name: "David Chen",
        position: "Data Scientist",
        jobId: "3",
        status: "interview",
        jobType: "data",
        image:
            "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        education: "MIT",
        experience: "7 years experience",
        appliedDate: "Jan 15, 2024",
        email: "david.chen@example.com",
        phone: "(555) 345-6789",
        location: "Boston, MA",
        skills: ["Python", "R", "Machine Learning", "SQL", "TensorFlow"],
        resumeUrl: "/resume-david-chen.pdf",
        coverLetter: "As a data scientist with 7 years of experience...",
    },

]

const statusConfig = {
    new: { label: "New", className: "bg-blue-100 text-blue-800" },
    review: { label: "In Review", className: "bg-yellow-100 text-yellow-800" },
    interview: { label: "Interview", className: "bg-purple-100 text-purple-800" },
    offer: { label: "Offer Sent", className: "bg-green-100 text-green-800" },
    hired: { label: "Hired", className: "bg-green-100 text-green-800" },
    rejected: { label: "Rejected", className: "bg-red-100 text-red-800" },
}

export default function ApplicationsPage() {
    const [applications, setApplications] = useState<Application[]>(mockApplications)
    const [filteredApplications, setFilteredApplications] = useState<Application[]>(mockApplications)
    const [searchTerm, setSearchTerm] = useState("")
    const [jobFilter, setJobFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")
    const [sortBy, setSortBy] = useState("newest")

    const { toast } = useToast()

    useEffect(() => {
        let filtered = applications

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(
                (app) =>
                    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    app.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    app.email.toLowerCase().includes(searchTerm.toLowerCase()),
            )
        }

        // Apply job filter
        if (jobFilter !== "all") {
            filtered = filtered.filter((app) => app.jobType === jobFilter)
        }

        // Apply status filter
        if (statusFilter !== "all") {
            filtered = filtered.filter((app) => app.status === statusFilter)
        }

        // Apply sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "newest":
                    return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
                case "oldest":
                    return new Date(a.appliedDate).getTime() - new Date(b.appliedDate).getTime()
                case "name":
                    return a.name.localeCompare(b.name)
                default:
                    return 0
            }
        })

        setFilteredApplications(filtered)
    }, [applications, searchTerm, jobFilter, statusFilter, sortBy])

    const handleQuickStatusUpdate = (applicationId: string, newStatus: Application["status"]) => {
        const updatedApplications = applications.map((app) =>
            app.id === applicationId ? { ...app, status: newStatus } : app,
        )
        setApplications(updatedApplications)

        const application = applications.find((app) => app.id === applicationId)
        toast({
            title: "Status Updated",
            description: `${application?.name}'s status has been updated to ${statusConfig[newStatus].label}`,
        })
    }

    const getStatusCounts = () => {
        return {
            all: applications.length,
            new: applications.filter((app) => app.status === "new").length,
            review: applications.filter((app) => app.status === "review").length,
            interview: applications.filter((app) => app.status === "interview").length,
            offer: applications.filter((app) => app.status === "offer").length,
            hired: applications.filter((app) => app.status === "hired").length,
            rejected: applications.filter((app) => app.status === "rejected").length,
        }
    }

    const statusCounts = getStatusCounts()

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar userType="employer" activePage="jobPostings" />

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">All Job Applications</h1>
                        <p className="mt-2 text-gray-600">Manage and review applications across all your job postings</p>
                    </div>

                    {/* Filters */}
                    <Card className="mb-6">
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
                                <div className="flex-1">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                        <Input
                                            placeholder="Search by name, position, or email..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <Select value={jobFilter} onValueChange={setJobFilter}>
                                        <SelectTrigger className="w-[150px]">
                                            <SelectValue placeholder="All Jobs" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Jobs</SelectItem>
                                            <SelectItem value="frontend">Frontend</SelectItem>
                                            <SelectItem value="ui-ux">UI/UX</SelectItem>
                                            <SelectItem value="data">Data Science</SelectItem>
                                            <SelectItem value="devops">DevOps</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                                        <SelectTrigger className="w-[150px]">
                                            <SelectValue placeholder="All Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Status</SelectItem>
                                            <SelectItem value="new">New</SelectItem>
                                            <SelectItem value="review">In Review</SelectItem>
                                            <SelectItem value="interview">Interview</SelectItem>
                                            <SelectItem value="offer">Offer Sent</SelectItem>
                                            <SelectItem value="hired">Hired</SelectItem>
                                            <SelectItem value="rejected">Rejected</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select value={sortBy} onValueChange={setSortBy}>
                                        <SelectTrigger className="w-[150px]">
                                            <SelectValue placeholder="Sort by" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="newest">Newest First</SelectItem>
                                            <SelectItem value="oldest">Oldest First</SelectItem>
                                            <SelectItem value="name">Name A-Z</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Button variant="outline">
                                        <Download className="w-4 h-4 mr-2" />
                                        Export
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Applications List */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Applications ({filteredApplications.length})</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-gray-200">
                                {filteredApplications.map((application) => (
                                    <div key={application.id} className="p-6 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start space-x-4 flex-1">
                                                <Avatar className="w-12 h-12">
                                                    <AvatarImage src={application.image || "/placeholder.svg"} alt={application.name} />
                                                    <AvatarFallback>
                                                        {application.name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center space-x-3 mb-2">
                                                        <h3 className="text-lg font-medium text-gray-900">{application.name}</h3>
                                                        <Badge className={statusConfig[application.status].className}>
                                                            {statusConfig[application.status].label}
                                                        </Badge>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-500 mb-3">
                                                        <div className="flex items-center">
                                                            <Mail className="w-4 h-4 mr-2" />
                                                            {application.email}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Phone className="w-4 h-4 mr-2" />
                                                            {application.phone}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <MapPin className="w-4 h-4 mr-2" />
                                                            {application.location}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Calendar className="w-4 h-4 mr-2" />
                                                            Applied {application.appliedDate}
                                                        </div>
                                                    </div>

                                                    <div className="mb-3">
                                                        <p className="text-sm text-gray-700 mb-2">
                                                            Applied for <span className="font-medium">{application.position}</span> •{" "}
                                                            {application.experience}
                                                        </p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {application.skills.slice(0, 4).map((skill, index) => (
                                                                <Badge key={index} variant="outline" className="text-xs">
                                                                    {skill}
                                                                </Badge>
                                                            ))}
                                                            {application.skills.length > 4 && (
                                                                <Badge variant="outline" className="text-xs">
                                                                    +{application.skills.length - 4} more
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-3 ml-4">
                                                <Link href={`/employer/applications/${application.id}`}>
                                                    <Button variant="outline" size="sm">
                                                        <Eye className="w-4 h-4 mr-1" />
                                                        View Profile
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {filteredApplications.length === 0 && (
                                    <div className="p-12 text-center">
                                        <div className="text-gray-400 mb-4">
                                            <Eye className="w-12 h-12 mx-auto" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
                                        <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pagination */}
                    <div className="mt-6 flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Showing <span className="font-medium">1</span> to{" "}
                            <span className="font-medium">{Math.min(10, filteredApplications.length)}</span> of{" "}
                            <span className="font-medium">{filteredApplications.length}</span> results
                        </div>
                        <div className="flex space-x-2">
                            <Button variant="outline" size="sm" disabled>
                                Previous
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
                            <Button variant="outline" size="sm">
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
