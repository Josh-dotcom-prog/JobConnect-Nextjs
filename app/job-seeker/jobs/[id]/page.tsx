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
• Excellent communication and collaboration skills

Benefits:
• Competitive salary and equity package
• Comprehensive health, dental, and vision insurance
• Flexible work arrangements (hybrid/remote options)
• Professional development budget
• Unlimited PTO policy
• Modern office with free meals and snacks`,
        companySize: "500-1000 employees",
        industry: "Technology",
        companyDescription:
            "TechCorp Inc. is a leading technology company that builds innovative software solutions for businesses worldwide. We're committed to creating products that make a positive impact on people's lives.",
        benefits: [
            "Health Insurance",
            "Dental Insurance",
            "Vision Insurance",
            "401(k) with matching",
            "Flexible PTO",
            "Remote work options",
            "Professional development budget",
            "Free meals",
        ],
        requirements: [
            "5+ years frontend development experience",
            "Expert React and TypeScript skills",
            "Experience with state management",
            "CSS framework proficiency",
            "Testing framework experience",
            "Web performance optimization knowledge",
        ],
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
        benefits: [
            "Competitive salary",
            "Remote work",
            "Health benefits",
            "Learning stipend",
            "Conference attendance",
            "Flexible hours",
        ],
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
                <Link href="/browse-jobs" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6">
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

                        {/* Requirements */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Requirements</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {job.requirements.map((requirement, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                                            <span className="text-gray-700">{requirement}</span>
                                        </li>
                                    ))}
                                </ul>
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
                                <Link href={`/jobs/${job.id}/apply`}>
                                    <Button className="w-full" size="lg">
                                        Apply Now
                                    </Button>
                                </Link>
                                <Button variant="outline" className="w-full mt-3" size="lg">
                                    Save Job
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Job details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Job Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Salary</span>
                                    <span className="font-medium">{job.salary}</span>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Job Type</span>
                                    <span className="font-medium">{job.jobType}</span>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Location</span>
                                    <span className="font-medium">{job.location}</span>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Industry</span>
                                    <span className="font-medium">{job.industry}</span>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Company Size</span>
                                    <span className="font-medium">{job.companySize}</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Benefits */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Benefits</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {job.benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-center">
                                            <Star className="w-4 h-4 text-yellow-500 mr-2" />
                                            <span className="text-sm text-gray-700">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Company info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>About {job.company}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-700">{job.companyDescription}</p>
                                <div className="mt-4 flex items-center text-sm text-gray-500">
                                    <Users className="w-4 h-4 mr-1" />
                                    {job.companySize}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
