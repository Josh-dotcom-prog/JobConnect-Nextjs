"use client"

import { useState } from "react"
import Link from "next/link"
import {
    Mail,
    Phone,
    MapPin,
    Calendar,
    GraduationCap,
    Edit,
    Save,
    X,
    Plus,
    Download,
    Eye,
    ExternalLink,
    Star,
    Clock,
    Building,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import Navbar from "@/components/navigation/navbar"

interface UserProfile {
    id: string
    name: string
    email: string
    phone: string
    location: string
    title: string
    bio: string
    avatar: string
    resumeUrl?: string
    portfolioUrl?: string
    linkedinUrl?: string
    githubUrl?: string
    website?: string
    expectedSalary: string
    availability: string
    workAuthorization: string
    skills: string[]
    languages: string[]
}

interface Experience {
    id: string
    company: string
    position: string
    location: string
    startDate: string
    endDate: string
    current: boolean
    description: string
    skills: string[]
}

interface Education {
    id: string
    institution: string
    degree: string
    field: string
    startDate: string
    endDate: string
    gpa?: string
    description?: string
}

interface Application {
    id: string
    jobTitle: string
    company: string
    appliedDate: string
    status: "pending" | "reviewed" | "interview" | "offer" | "rejected" | "withdrawn"
    location: string
    salary: string
}

// Mock data
const mockProfile: UserProfile = {
    id: "1",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    title: "Senior Frontend Developer",
    bio: "Passionate frontend developer with 5+ years of experience building scalable web applications. Specialized in React, TypeScript, and modern web technologies. Love creating exceptional user experiences and collaborating with cross-functional teams.",
    avatar: "https://images.unsplash.com/photo-1472099103004-8b4350e481a5?w=150&h=150&fit=crop&crop=face",
    resumeUrl: "/resume-john-smith.pdf",
    portfolioUrl: "https://johnsmith.dev",
    linkedinUrl: "https://linkedin.com/in/johnsmith",
    githubUrl: "https://github.com/johnsmith",
    website: "https://johnsmith.dev",
    expectedSalary: "$120,000 - $150,000",
    availability: "2 weeks notice",
    workAuthorization: "US Citizen",
    skills: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "HTML/CSS", "Redux", "GraphQL", "AWS", "Git"],
    languages: ["English (Native)", "Spanish (Conversational)", "French (Basic)"],
}

const mockExperience: Experience[] = [
    {
        id: "1",
        company: "TechCorp Inc.",
        position: "Senior Frontend Developer",
        location: "San Francisco, CA",
        startDate: "2022-01",
        endDate: "",
        current: true,
        description:
            "Lead frontend development for multiple web applications serving 100k+ users. Collaborate with design and backend teams to implement new features and improve user experience. Mentor junior developers and conduct code reviews.",
        skills: ["React", "TypeScript", "Next.js", "GraphQL", "AWS"],
    },
    {
        id: "2",
        company: "StartupXYZ",
        position: "Frontend Developer",
        location: "San Francisco, CA",
        startDate: "2020-03",
        endDate: "2021-12",
        current: false,
        description:
            "Developed responsive web applications using React and Redux. Implemented automated testing and CI/CD pipelines. Worked closely with UX designers to create pixel-perfect interfaces.",
        skills: ["React", "Redux", "JavaScript", "CSS", "Jest"],
    },
    {
        id: "3",
        company: "WebDev Agency",
        position: "Junior Frontend Developer",
        location: "Remote",
        startDate: "2019-06",
        endDate: "2020-02",
        current: false,
        description:
            "Built custom websites and web applications for various clients. Gained experience with multiple frameworks and content management systems. Focused on performance optimization and SEO.",
        skills: ["HTML", "CSS", "JavaScript", "WordPress", "jQuery"],
    },
]

const mockEducation: Education[] = [
    {
        id: "1",
        institution: "Stanford University",
        degree: "Bachelor of Science",
        field: "Computer Science",
        startDate: "2015-09",
        endDate: "2019-05",
        gpa: "3.8",
        description:
            "Focused on software engineering and web development. Completed senior project on machine learning applications.",
    },
]

const mockApplications: Application[] = [
    {
        id: "1",
        jobTitle: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        appliedDate: "2024-01-20",
        status: "interview",
        location: "San Francisco, CA",
        salary: "$120,000 - $150,000",
    },
    {
        id: "2",
        jobTitle: "Full Stack Developer",
        company: "StartupABC",
        appliedDate: "2024-01-18",
        status: "reviewed",
        location: "Remote",
        salary: "$110,000 - $140,000",
    },
    {
        id: "3",
        jobTitle: "React Developer",
        company: "WebTech Solutions",
        appliedDate: "2024-01-15",
        status: "pending",
        location: "New York, NY",
        salary: "$100,000 - $130,000",
    },
    {
        id: "4",
        jobTitle: "Frontend Engineer",
        company: "InnovateLab",
        appliedDate: "2024-01-10",
        status: "rejected",
        location: "Austin, TX",
        salary: "$95,000 - $125,000",
    },
]

export default function ProfilePage() {
    const [profile, setProfile] = useState<UserProfile>(mockProfile)
    const [experience, setExperience] = useState<Experience[]>(mockExperience)
    const [education, setEducation] = useState<Education[]>(mockEducation)
    const [applications] = useState<Application[]>(mockApplications)
    const [isEditing, setIsEditing] = useState(false)
    const [editingExperience, setEditingExperience] = useState<Experience | null>(null)
    const [editingEducation, setEditingEducation] = useState<Education | null>(null)
    const [showExperienceModal, setShowExperienceModal] = useState(false)
    const [showEducationModal, setShowEducationModal] = useState(false)
    const [newSkill, setNewSkill] = useState("")
    const { toast } = useToast()

    const handleSaveProfile = () => {
        setIsEditing(false)
        toast({
            title: "Profile Updated",
            description: "Your profile has been successfully updated.",
        })
    }

    const handleAddSkill = () => {
        if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
            setProfile({
                ...profile,
                skills: [...profile.skills, newSkill.trim()],
            })
            setNewSkill("")
        }
    }

    const handleRemoveSkill = (skillToRemove: string) => {
        setProfile({
            ...profile,
            skills: profile.skills.filter((skill) => skill !== skillToRemove),
        })
    }

    const handleSaveExperience = () => {
        if (!editingExperience) return

        if (editingExperience.id === "new") {
            const newExp = { ...editingExperience, id: Date.now().toString() }
            setExperience([newExp, ...experience])
        } else {
            setExperience(experience.map((exp) => (exp.id === editingExperience.id ? editingExperience : exp)))
        }

        setEditingExperience(null)
        setShowExperienceModal(false)
        toast({
            title: "Experience Updated",
            description: "Your work experience has been saved.",
        })
    }

    const handleSaveEducation = () => {
        if (!editingEducation) return

        if (editingEducation.id === "new") {
            const newEdu = { ...editingEducation, id: Date.now().toString() }
            setEducation([newEdu, ...education])
        } else {
            setEducation(education.map((edu) => (edu.id === editingEducation.id ? editingEducation : edu)))
        }

        setEditingEducation(null)
        setShowEducationModal(false)
        toast({
            title: "Education Updated",
            description: "Your education has been saved.",
        })
    }

    const getStatusBadge = (status: Application["status"]) => {
        const statusConfig = {
            pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800" },
            reviewed: { label: "Reviewed", className: "bg-blue-100 text-blue-800" },
            interview: { label: "Interview", className: "bg-purple-100 text-purple-800" },
            offer: { label: "Offer", className: "bg-green-100 text-green-800" },
            rejected: { label: "Rejected", className: "bg-red-100 text-red-800" },
            withdrawn: { label: "Withdrawn", className: "bg-gray-100 text-gray-800" },
        }

        const config = statusConfig[status]
        return <Badge className={config.className}>{config.label}</Badge>
    }

    const openExperienceModal = (exp?: Experience) => {
        if (exp) {
            setEditingExperience(exp)
        } else {
            setEditingExperience({
                id: "new",
                company: "",
                position: "",
                location: "",
                startDate: "",
                endDate: "",
                current: false,
                description: "",
                skills: [],
            })
        }
        setShowExperienceModal(true)
    }

    const openEducationModal = (edu?: Education) => {
        if (edu) {
            setEditingEducation(edu)
        } else {
            setEditingEducation({
                id: "new",
                institution: "",
                degree: "",
                field: "",
                startDate: "",
                endDate: "",
                gpa: "",
                description: "",
            })
        }
        setShowEducationModal(true)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar userType="jobSeeker" activePage="profile" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                    <p className="mt-2 text-gray-600">Manage your professional profile and track your job applications</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <Avatar className="w-24 h-24 mx-auto mb-4">
                                        <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                                        <AvatarFallback className="text-xl">
                                            {profile.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
                                    <p className="text-gray-600">{profile.title}</p>
                                    <div className="flex items-center justify-center mt-2 text-sm text-gray-500">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        {profile.location}
                                    </div>
                                </div>

                                <div className="mt-6 space-y-3">
                                    <div className="flex items-center text-sm">
                                        <Mail className="w-4 h-4 mr-3 text-gray-400" />
                                        <span>{profile.email}</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Phone className="w-4 h-4 mr-3 text-gray-400" />
                                        <span>{profile.phone}</span>
                                    </div>
                                    {profile.website && (
                                        <div className="flex items-center text-sm">
                                            <ExternalLink className="w-4 h-4 mr-3 text-gray-400" />
                                            <a
                                                href={profile.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                Portfolio
                                            </a>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 space-y-2">
                                    {profile.resumeUrl && (
                                        <Button variant="outline" className="w-full" asChild>
                                            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                                                <Download className="w-4 h-4 mr-2" />
                                                Download Resume
                                            </a>
                                        </Button>
                                    )}
                                    <Button
                                        variant={isEditing ? "default" : "outline"}
                                        className="w-full"
                                        onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
                                    >
                                        {isEditing ? (
                                            <>
                                                <Save className="w-4 h-4 mr-2" />
                                                Save Changes
                                            </>
                                        ) : (
                                            <>
                                                <Edit className="w-4 h-4 mr-2" />
                                                Edit Profile
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Stats */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Application Stats</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total Applications</span>
                                    <span className="font-semibold">{applications.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">In Progress</span>
                                    <span className="font-semibold">
                                        {applications.filter((app) => ["pending", "reviewed", "interview"].includes(app.status)).length}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Interviews</span>
                                    <span className="font-semibold">
                                        {applications.filter((app) => app.status === "interview").length}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Tabs defaultValue="overview" className="space-y-6">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="experience">Experience</TabsTrigger>
                                <TabsTrigger value="education">Education</TabsTrigger>
                                <TabsTrigger value="applications">Applications</TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="space-y-6">
                                {/* About */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>About</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {isEditing ? (
                                            <Textarea
                                                value={profile.bio}
                                                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                                rows={4}
                                                placeholder="Tell us about yourself..."
                                            />
                                        ) : (
                                            <p className="text-gray-700">{profile.bio}</p>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Skills */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Skills</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {profile.skills.map((skill, index) => (
                                                <Badge key={index} variant="outline" className="flex items-center space-x-1">
                                                    <span>{skill}</span>
                                                    {isEditing && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveSkill(skill)}
                                                            className="ml-1 text-gray-400 hover:text-gray-600"
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    )}
                                                </Badge>
                                            ))}
                                        </div>
                                        {isEditing && (
                                            <div className="flex space-x-2">
                                                <Input
                                                    value={newSkill}
                                                    onChange={(e) => setNewSkill(e.target.value)}
                                                    placeholder="Add a skill"
                                                    onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                                                />
                                                <Button type="button" onClick={handleAddSkill}>
                                                    <Plus className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Languages */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Languages</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            {profile.languages.map((language, index) => (
                                                <div key={index} className="flex items-center">
                                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                                                    <span className="text-gray-700">{language}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Preferences */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Job Preferences</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label>Expected Salary</Label>
                                                {isEditing ? (
                                                    <Input
                                                        value={profile.expectedSalary}
                                                        onChange={(e) => setProfile({ ...profile, expectedSalary: e.target.value })}
                                                        placeholder="e.g., $100,000 - $120,000"
                                                    />
                                                ) : (
                                                    <p className="text-gray-700">{profile.expectedSalary}</p>
                                                )}
                                            </div>
                                            <div>
                                                <Label>Availability</Label>
                                                {isEditing ? (
                                                    <Select
                                                        value={profile.availability}
                                                        onValueChange={(value) => setProfile({ ...profile, availability: value })}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Immediately">Immediately</SelectItem>
                                                            <SelectItem value="2 weeks notice">2 weeks notice</SelectItem>
                                                            <SelectItem value="1 month notice">1 month notice</SelectItem>
                                                            <SelectItem value="2+ months">2+ months</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                ) : (
                                                    <p className="text-gray-700">{profile.availability}</p>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="experience" className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold">Work Experience</h2>
                                    <Button onClick={() => openExperienceModal()}>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Experience
                                    </Button>
                                </div>

                                <div className="space-y-6">
                                    {experience.map((exp) => (
                                        <Card key={exp.id}>
                                            <CardContent className="pt-6">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-3 mb-2">
                                                            <Building className="w-5 h-5 text-gray-400" />
                                                            <div>
                                                                <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                                                                <p className="text-gray-600">{exp.company}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                                                            <span className="flex items-center">
                                                                <Calendar className="w-4 h-4 mr-1" />
                                                                {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                                                            </span>
                                                            <span className="flex items-center">
                                                                <MapPin className="w-4 h-4 mr-1" />
                                                                {exp.location}
                                                            </span>
                                                        </div>
                                                        <p className="text-gray-700 mb-3">{exp.description}</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {exp.skills.map((skill, index) => (
                                                                <Badge key={index} variant="outline" className="text-xs">
                                                                    {skill}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <Button variant="outline" size="sm" onClick={() => openExperienceModal(exp)}>
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="education" className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold">Education</h2>
                                    <Button onClick={() => openEducationModal()}>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Education
                                    </Button>
                                </div>

                                <div className="space-y-6">
                                    {education.map((edu) => (
                                        <Card key={edu.id}>
                                            <CardContent className="pt-6">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-3 mb-2">
                                                            <GraduationCap className="w-5 h-5 text-gray-400" />
                                                            <div>
                                                                <h3 className="text-lg font-semibold text-gray-900">
                                                                    {edu.degree} in {edu.field}
                                                                </h3>
                                                                <p className="text-gray-600">{edu.institution}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                                                            <span className="flex items-center">
                                                                <Calendar className="w-4 h-4 mr-1" />
                                                                {edu.startDate} - {edu.endDate}
                                                            </span>
                                                            {edu.gpa && (
                                                                <span className="flex items-center">
                                                                    <Star className="w-4 h-4 mr-1" />
                                                                    GPA: {edu.gpa}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {edu.description && <p className="text-gray-700">{edu.description}</p>}
                                                    </div>
                                                    <Button variant="outline" size="sm" onClick={() => openEducationModal(edu)}>
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="applications" className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold">My Applications</h2>
                                    <Link href="/browse-jobs">
                                        <Button>
                                            <Plus className="w-4 h-4 mr-2" />
                                            Apply to Jobs
                                        </Button>
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    {applications.map((application) => (
                                        <Card key={application.id}>
                                            <CardContent className="pt-6">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-3 mb-2">
                                                            <h3 className="text-lg font-semibold text-gray-900">{application.jobTitle}</h3>
                                                            {getStatusBadge(application.status)}
                                                        </div>
                                                        <p className="text-gray-600 mb-2">{application.company}</p>
                                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                            <span className="flex items-center">
                                                                <MapPin className="w-4 h-4 mr-1" />
                                                                {application.location}
                                                            </span>
                                                            <span className="flex items-center">
                                                                <Calendar className="w-4 h-4 mr-1" />
                                                                Applied {new Date(application.appliedDate).toLocaleDateString()}
                                                            </span>
                                                            <span className="flex items-center">
                                                                <Clock className="w-4 h-4 mr-1" />
                                                                {application.salary}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <Link href={`/jobs/${application.id}`}>
                                                            <Button variant="outline" size="sm">
                                                                <Eye className="w-4 h-4 mr-1" />
                                                                View Job
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>

                {/* Experience Modal */}
                <Dialog open={showExperienceModal} onOpenChange={setShowExperienceModal}>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>{editingExperience?.id === "new" ? "Add Experience" : "Edit Experience"}</DialogTitle>
                        </DialogHeader>
                        {editingExperience && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Position</Label>
                                        <Input
                                            value={editingExperience.position}
                                            onChange={(e) => setEditingExperience({ ...editingExperience, position: e.target.value })}
                                            placeholder="e.g., Senior Frontend Developer"
                                        />
                                    </div>
                                    <div>
                                        <Label>Company</Label>
                                        <Input
                                            value={editingExperience.company}
                                            onChange={(e) => setEditingExperience({ ...editingExperience, company: e.target.value })}
                                            placeholder="e.g., TechCorp Inc."
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label>Location</Label>
                                    <Input
                                        value={editingExperience.location}
                                        onChange={(e) => setEditingExperience({ ...editingExperience, location: e.target.value })}
                                        placeholder="e.g., San Francisco, CA"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Start Date</Label>
                                        <Input
                                            type="month"
                                            value={editingExperience.startDate}
                                            onChange={(e) => setEditingExperience({ ...editingExperience, startDate: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <Label>End Date</Label>
                                        <Input
                                            type="month"
                                            value={editingExperience.endDate}
                                            onChange={(e) => setEditingExperience({ ...editingExperience, endDate: e.target.value })}
                                            disabled={editingExperience.current}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="current"
                                        checked={editingExperience.current}
                                        onChange={(e) => setEditingExperience({ ...editingExperience, current: e.target.checked })}
                                    />
                                    <Label htmlFor="current">I currently work here</Label>
                                </div>
                                <div>
                                    <Label>Description</Label>
                                    <Textarea
                                        value={editingExperience.description}
                                        onChange={(e) => setEditingExperience({ ...editingExperience, description: e.target.value })}
                                        rows={4}
                                        placeholder="Describe your role and achievements..."
                                    />
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <Button variant="outline" onClick={() => setShowExperienceModal(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSaveExperience}>Save</Button>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>

                {/* Education Modal */}
                <Dialog open={showEducationModal} onOpenChange={setShowEducationModal}>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>{editingEducation?.id === "new" ? "Add Education" : "Edit Education"}</DialogTitle>
                        </DialogHeader>
                        {editingEducation && (
                            <div className="space-y-4">
                                <div>
                                    <Label>Institution</Label>
                                    <Input
                                        value={editingEducation.institution}
                                        onChange={(e) => setEditingEducation({ ...editingEducation, institution: e.target.value })}
                                        placeholder="e.g., Stanford University"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Degree</Label>
                                        <Input
                                            value={editingEducation.degree}
                                            onChange={(e) => setEditingEducation({ ...editingEducation, degree: e.target.value })}
                                            placeholder="e.g., Bachelor of Science"
                                        />
                                    </div>
                                    <div>
                                        <Label>Field of Study</Label>
                                        <Input
                                            value={editingEducation.field}
                                            onChange={(e) => setEditingEducation({ ...editingEducation, field: e.target.value })}
                                            placeholder="e.g., Computer Science"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <Label>Start Date</Label>
                                        <Input
                                            type="month"
                                            value={editingEducation.startDate}
                                            onChange={(e) => setEditingEducation({ ...editingEducation, startDate: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <Label>End Date</Label>
                                        <Input
                                            type="month"
                                            value={editingEducation.endDate}
                                            onChange={(e) => setEditingEducation({ ...editingEducation, endDate: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <Label>GPA (Optional)</Label>
                                        <Input
                                            value={editingEducation.gpa}
                                            onChange={(e) => setEditingEducation({ ...editingEducation, gpa: e.target.value })}
                                            placeholder="e.g., 3.8"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label>Description (Optional)</Label>
                                    <Textarea
                                        value={editingEducation.description}
                                        onChange={(e) => setEditingEducation({ ...editingEducation, description: e.target.value })}
                                        rows={3}
                                        placeholder="Relevant coursework, achievements, etc."
                                    />
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <Button variant="outline" onClick={() => setShowEducationModal(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSaveEducation}>Save</Button>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
