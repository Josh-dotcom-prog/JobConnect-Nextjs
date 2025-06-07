"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import {
    ArrowLeft,
    Mail,
    Phone,
    MapPin,
    Calendar,
    GraduationCap,
    Briefcase,
    FileText,
    Star,
    Download,
    MessageSquare,
    User,
    CheckCircle,
    XCircle,
    AlertCircle,
    Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import Navbar from "@/components/navigation/navbar"

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
    portfolioUrl?: string
    linkedinUrl?: string
    expectedSalary?: string
    availability?: string
    workAuthorization?: string
    rating?: number
}

// Mock data - in a real app, this would come from an API
const MOCK_APPLICATIONS: Application[] = [
    {
        id: "1",
        name: "William Obwana",
        position: "Senior Frontend Developer",
        jobId: "1",
        status: "new",
        jobType: "frontend",
        image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        education: "BS Computer Science, Stanford University",
        experience: "5 years experience",
        appliedDate: "Jan 20, 2024",
        email: "williamobwana@gmail.com",
        phone: "(555) 123-4567",
        location: "San Francisco, CA",
        skills: ["JavaScript", "React", "TypeScript", "HTML/CSS", "Redux", "Node.js"],
        resumeUrl: "/resume-michael-johnson.pdf",
        coverLetter:
            "I am excited to apply for the Senior Frontend Developer position at your company. With 5 years of experience in React and TypeScript, I believe I would be a great fit for this role. I have successfully led multiple projects and have a passion for creating exceptional user experiences.",
        portfolioUrl: "https://michaeljohnson.dev",
        linkedinUrl: "https://linkedin.com/in/michaeljohnson",
        expectedSalary: "$120,000",
        availability: "2 weeks notice",
        workAuthorization: "US Citizen",
        rating: 4,
        notes: "Strong technical background, good communication skills during initial screening.",
    },
    {
        id: "2",
        name: "Sarah Williams",
        position: "UI/UX Designer",
        jobId: "2",
        status: "review",
        jobType: "ui-ux",
        image:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        education: "MFA Design, Rhode Island School of Design",
        experience: "3 years experience",
        appliedDate: "Jan 18, 2024",
        email: "sarah.williams@example.com",
        phone: "(555) 234-5678",
        location: "New York, NY",
        skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"],
        resumeUrl: "/resume-sarah-williams.pdf",
        coverLetter:
            "With my passion for creating intuitive user experiences and 3 years of design experience, I am excited about the opportunity to contribute to your design team. My portfolio showcases various projects where I've improved user engagement and satisfaction.",
        portfolioUrl: "https://sarahwilliams.design",
        linkedinUrl: "https://linkedin.com/in/sarahwilliams",
        expectedSalary: "$85,000",
        availability: "Immediately",
        workAuthorization: "US Citizen",
        rating: 5,
        notes: "Excellent portfolio, strong design thinking process. Recommended for interview.",
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
        education: "PhD Data Science, MIT",
        experience: "7 years experience",
        appliedDate: "Jan 15, 2024",
        email: "david.chen@example.com",
        phone: "(555) 345-6789",
        location: "Boston, MA",
        skills: ["Python", "R", "Machine Learning", "SQL", "TensorFlow"],
        resumeUrl: "/resume-david-chen.pdf",
        coverLetter:
            "As a data scientist with 7 years of experience in machine learning and statistical analysis, I am excited about the opportunity to contribute to your data team. I have published several papers and led data-driven initiatives that resulted in significant business impact.",
        portfolioUrl: "https://davidchen.ai",
        linkedinUrl: "https://linkedin.com/in/davidchen",
        expectedSalary: "$140,000",
        availability: "1 month notice",
        workAuthorization: "H1B Visa",
        rating: 5,
        notes: "Exceptional technical skills, PhD from MIT. Interview scheduled for next week.",
    },
]

export default function ApplicationDetailPage() {
    const params = useParams()
    const router = useRouter()
    const { toast } = useToast()
    const [application, setApplication] = useState<Application | null>(null)
    const [loading, setLoading] = useState(true)
    const [showNotesModal, setShowNotesModal] = useState(false)
    const [notes, setNotes] = useState("")
    const [rating, setRating] = useState(0)

    useEffect(() => {
        // Simulate API fetch
        setTimeout(() => {
            const id = params.id as string
            const foundApplication = MOCK_APPLICATIONS.find((app) => app.id === id)
            setApplication(foundApplication || null)
            setLoading(false)
        }, 500)
    }, [params.id])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-t-blue-600 border-b-blue-600 border-l-gray-200 border-r-gray-200 rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading application details...</p>
                </div>
            </div>
        )
    }

    if (!application) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Application Not Found</h1>
                    <p className="mt-2 text-gray-600">The application you're looking for doesn't exist or has been removed.</p>
                    <Link href="/employer/applications">
                        <Button className="mt-4">Back to Applications</Button>
                    </Link>
                </div>
            </div>
        )
    }

    const getStatusBadge = (status: Application["status"]) => {
        const statusConfig = {
            new: { label: "New", className: "bg-blue-100 text-blue-800", icon: AlertCircle },
            review: { label: "In Review", className: "bg-yellow-100 text-yellow-800", icon: Eye },
            interview: { label: "Interview", className: "bg-purple-100 text-purple-800", icon: Calendar },
            offer: { label: "Offer Sent", className: "bg-green-100 text-green-800", icon: CheckCircle },
            hired: { label: "Hired", className: "bg-green-100 text-green-800", icon: CheckCircle },
            rejected: { label: "Rejected", className: "bg-red-100 text-red-800", icon: XCircle },
        }

        const config = statusConfig[status]
        const Icon = config.icon

        return (
            <Badge className={config.className}>
                <Icon className="w-3 h-3 mr-1" />
                {config.label}
            </Badge>
        )
    }

    const handleStatusChange = (newStatus: Application["status"]) => {
        if (!application) return

        setApplication({ ...application, status: newStatus })
        toast({
            title: "Status Updated",
            description: `Application status has been updated to ${newStatus}`,
        })
    }

    const handleSaveNotes = () => {
        if (!application) return

        setApplication({ ...application, notes, rating })
        setShowNotesModal(false)
        toast({
            title: "Notes Saved",
            description: "Your notes and rating have been saved successfully",
        })
    }

    const openNotesModal = () => {
        setNotes(application?.notes || "")
        setRating(application?.rating || 0)
        setShowNotesModal(true)
    }

    const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
        return (
            <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-4 h-4 ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
                            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
                        onClick={() => interactive && onRatingChange && onRatingChange(star)}
                    />
                ))}
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar userType="employer" activePage="jobPostings" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back button */}
                <Link
                    href="/employer/applications"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to applications
                </Link>

                {/* Header */}
                <Card className="mb-8">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                                <Avatar className="w-16 h-16">
                                    <AvatarImage src={application.image || "/placeholder.svg"} alt={application.name} />
                                    <AvatarFallback>
                                        {application.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h1 className="text-2xl font-bold text-gray-900">{application.name}</h1>
                                        {getStatusBadge(application.status)}
                                        {application.rating && renderStars(application.rating)}
                                    </div>
                                    <p className="text-gray-600 mb-2">Applied for {application.position}</p>
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                        <span className="flex items-center">
                                            <Mail className="w-4 h-4 mr-1" />
                                            {application.email}
                                        </span>
                                        <span className="flex items-center">
                                            <Phone className="w-4 h-4 mr-1" />
                                            {application.phone}
                                        </span>
                                        <span className="flex items-center">
                                            <MapPin className="w-4 h-4 mr-1" />
                                            {application.location}
                                        </span>
                                        <span className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            Applied {application.appliedDate}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsContent value="overview" className="space-y-6">
                        {/* Main content */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Education</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-start space-x-3">
                                        <GraduationCap className="w-5 h-5 text-gray-400 mt-1" />
                                        <div>
                                            <p className="font-medium">{application.education}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Skills</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {application.skills.map((skill, index) => (
                                            <Badge key={index} variant="outline">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Professional Experience</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-start space-x-3">
                                        <Briefcase className="w-5 h-5 text-gray-400 mt-1" />
                                        <div>
                                            <p className="font-medium">{application.experience}</p>
                                            <p className="text-gray-500">Applied for {application.position}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Documents & Links</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {application.resumeUrl && (
                                        <div className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <FileText className="w-5 h-5 text-gray-400" />
                                                <span>Resume.pdf</span>
                                            </div>
                                            <Button variant="outline" size="sm" asChild>
                                                <a href="/assets/OBWANA CV-1.pdf" target="_blank" rel="noopener noreferrer">
                                                    <Eye className="w-4 h-4 mr-1" />
                                                    View
                                                </a>
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                    <Button variant="outline" size="sm" className="mr-6 bg-green-500 text-white" onClick={openNotesModal}>
                        Accept Application
                    </Button>

                    <Button variant="outline" size="sm" className="bg-red-500 text-white" onClick={() => handleStatusChange("rejected")}>
                        Reject Application
                    </Button>
                </Tabs>
            </div>
        </div>
    )
}
