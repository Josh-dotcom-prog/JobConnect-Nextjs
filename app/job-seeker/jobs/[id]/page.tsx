import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MapPin, Clock, Calendar, Users, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Navbar from "@/components/navigation/navbar"

// Mock data - in a real app, this would come from an API
const MOCK_JOBS = [
    {
        id: "1",
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        location: "San Francisco, CA",
        jobType: "Full-time",
        salary: "$120,000 - $150,000 per year",
        description:
            "We're looking for an experienced Frontend Developer to join our team. You'll be responsible for building responsive web applications using React, TypeScript, and modern CSS frameworks.",
        postedDate: "2 days ago",
        skills: ["React", "TypeScript", "Tailwind CSS", "Redux"],
        logoUrl: "https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg",
        isNew: true,
        fullDescription: `We are seeking a talented Senior Frontend Developer to join our growing engineering team. In this role, you will be responsible for developing and maintaining high-quality web applications that serve millions of users worldwide.

Key Responsibilities:
• Develop responsive web applications using React, TypeScript, and modern CSS frameworks
• Collaborate with designers and backend engineers to implement user-facing features
• Optimize applications for maximum speed and scalability
• Write clean, maintainable, and well-documented code
• Participate in code reviews and mentor junior developers
• Stay up-to-date with the latest frontend technologies and best practices

Requirements:
• 5+ years of experience in frontend development
• Expert knowledge of React, TypeScript, and modern JavaScript
• Experience with state management libraries (Redux, Zustand, etc.)
• Proficiency in CSS frameworks (Tailwind CSS, styled-components)
• Experience with testing frameworks (Jest, React Testing Library)
• Strong understanding of web performance optimization
• Excellent communication and collaboration skills`,
    },
    {
        id: "2",
        title: "Data Scientist",
        company: "DataViz Analytics",
        location: "Remote",
        jobType: "Full-time",
        salary: "$110,000 - $140,000 per year",
        description:
            "Join our data science team to analyze large datasets and build predictive models. You'll work with cutting-edge ML technologies to solve complex business problems.",
        postedDate: "1 week ago",
        skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
        logoUrl: "https://tailwindui.com/img/logos/workflow-mark-blue-600.svg",
        fullDescription: `We are looking for a passionate Data Scientist to join our analytics team and help drive data-driven decision making across the organization.

Key Responsibilities:
• Analyze large, complex datasets to extract meaningful insights
• Build and deploy machine learning models for predictive analytics
• Collaborate with cross-functional teams to identify business opportunities
• Create data visualizations and reports for stakeholders
• Develop and maintain data pipelines and ETL processes
• Present findings to technical and non-technical audiences

Requirements:
• Master's degree in Data Science, Statistics, or related field
• 3+ years of experience in data science or analytics
• Proficiency in Python, R, and SQL
• Experience with machine learning frameworks (TensorFlow, PyTorch, scikit-learn)
• Strong statistical analysis and modeling skills
• Experience with cloud platforms (AWS, GCP, Azure)
• Excellent communication and presentation skills`,
        companySize: "100-500 employees",
        industry: "Analytics",
        companyDescription:
            "DataViz Analytics helps companies unlock the power of their data through advanced analytics and machine learning solutions.",
        requirements: [
            "Master's degree preferred",
            "3+ years data science experience",
            "Python/R/SQL proficiency",
            "ML framework experience",
            "Statistical modeling skills",
            "Cloud platform experience",
        ],
    },
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

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar userType="jobSeeker" activePage="browse jobs" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back button */}
                <Link href="/job-seeker/browse-jobs" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to job listings
                </Link>

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
                                        className="w-16 h-16 rounded-lg"
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
                    {/* Apply button */}
                    <Card>
                        <CardContent className="pt-6">
                            <Link href={`/job-seeker/jobs/${id}/apply`}>
                                <Button className="w-full mt-3 bg-yellow-500 text-white hover:bg-yellow-200 hover:text-black" size="lg">
                                    Apply Now
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
