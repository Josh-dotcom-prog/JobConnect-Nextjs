"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Save, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import Navbar from "@/components/navigation/navbar"

// Mock data - in a real app, this would come from an API
const MOCK_JOB = {
    id: "1",
    title: "Senior Frontend Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
    salaryMin: "100000",
    salaryMax: "130000",
    description: `We are seeking a talented Senior Frontend Developer to join our growing engineering team. You will be responsible for developing and maintaining high-quality web applications using modern technologies.

Key Responsibilities:
• Develop responsive web applications using React, TypeScript, and modern CSS frameworks
• Collaborate with designers and backend engineers to implement user-facing features
• Optimize applications for maximum speed and scalability
• Write clean, maintainable, and well-documented code
• Participate in code reviews and mentor junior developers
• Stay up-to-date with the latest frontend technologies and best practices`,
    requirements: `Requirements:
• 5+ years of experience in frontend development
• Expert knowledge of React, TypeScript, and modern JavaScript
• Experience with state management libraries (Redux, Zustand, etc.)
• Proficiency in CSS frameworks (Tailwind CSS, styled-components)
• Experience with testing frameworks (Jest, React Testing Library)
• Strong understanding of web performance optimization
• Excellent communication and collaboration skills

Preferred Qualifications:
• Experience with Next.js or similar React frameworks
• Knowledge of backend technologies (Node.js, GraphQL)
• Experience with cloud platforms (AWS, Vercel)
• Contributions to open-source projects`,
    skills: ["React", "TypeScript", "JavaScript", "CSS", "HTML", "Next.js", "Redux"],
    benefits: ["Health Insurance", "Remote Work", "Flexible Hours", "Professional Development", "Stock Options"],
    status: "active",
    postedDate: "2023-01-15",
}

interface EditJobPageProps {
    params: Promise<{ id: string }>
}

export default function EditJobPage({ params }: EditJobPageProps) {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [jobData, setJobData] = useState(MOCK_JOB)
    const [skillInput, setSkillInput] = useState("")
    const [benefitInput, setBenefitInput] = useState("")

    const handleInputChange = (field: string, value: string) => {
        setJobData((prev) => ({ ...prev, [field]: value }))
    }

    const handleAddSkill = () => {
        if (skillInput.trim() && !jobData.skills.includes(skillInput.trim())) {
            setJobData((prev) => ({
                ...prev,
                skills: [...prev.skills, skillInput.trim()],
            }))
            setSkillInput("")
        }
    }

    const handleRemoveSkill = (skillToRemove: string) => {
        setJobData((prev) => ({
            ...prev,
            skills: prev.skills.filter((skill) => skill !== skillToRemove),
        }))
    }

    const handleAddBenefit = () => {
        if (benefitInput.trim() && !jobData.benefits.includes(benefitInput.trim())) {
            setJobData((prev) => ({
                ...prev,
                benefits: [...prev.benefits, benefitInput.trim()],
            }))
            setBenefitInput("")
        }
    }

    const handleRemoveBenefit = (benefitToRemove: string) => {
        setJobData((prev) => ({
            ...prev,
            benefits: prev.benefits.filter((benefit) => benefit !== benefitToRemove),
        }))
    }

    const handleSave = async (isDraft = false) => {
        setIsLoading(true)

        // Basic validation
        if (!jobData.title || !jobData.department || !jobData.type || !jobData.location) {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields",
                variant: "destructive",
            })
            setIsLoading(false)
            return
        }

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500))

            toast({
                title: isDraft ? "Draft Saved" : "Job Updated",
                description: isDraft ? "Your changes have been saved as a draft" : "Job posting has been updated successfully",
            })

            // In a real app, you would redirect or update the job status
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save changes. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar userType="employer" activePage="jobPostings" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                        <Link
                            href={`/employer/jobs/${jobData.id}`}
                            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to job details
                        </Link>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Link href={`/employer/jobs/${jobData.id}`}>
                            <Button variant="outline">
                                <Eye className="w-4 h-4 mr-2" />
                                Preview
                            </Button>
                        </Link>
                        <Button onClick={() => handleSave(true)} variant="outline" disabled={isLoading}>
                            Save as Draft
                        </Button>
                        <Button onClick={() => handleSave(false)} disabled={isLoading}>
                            <Save className="w-4 h-4 mr-2" />
                            {isLoading ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="title">Job Title *</Label>
                                    <Input
                                        id="title"
                                        value={jobData.title}
                                        onChange={(e) => handleInputChange("title", e.target.value)}
                                        placeholder="e.g., Senior Frontend Developer"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="department">Department *</Label>
                                    <Input
                                        id="department"
                                        value={jobData.department}
                                        onChange={(e) => handleInputChange("department", e.target.value)}
                                        placeholder="e.g., Engineering"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="type">Job Type *</Label>
                                    <Select value={jobData.type} onValueChange={(value) => handleInputChange("type", value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select job type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Full-time">Full-time</SelectItem>
                                            <SelectItem value="Part-time">Part-time</SelectItem>
                                            <SelectItem value="Contract">Contract</SelectItem>
                                            <SelectItem value="Internship">Internship</SelectItem>
                                            <SelectItem value="Freelance">Freelance</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="location">Location *</Label>
                                    <Input
                                        id="location"
                                        value={jobData.location}
                                        onChange={(e) => handleInputChange("location", e.target.value)}
                                        placeholder="e.g., Remote, San Francisco, CA"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="salaryMin">Minimum Salary</Label>
                                    <Input
                                        id="salaryMin"
                                        type="number"
                                        value={jobData.salaryMin}
                                        onChange={(e) => handleInputChange("salaryMin", e.target.value)}
                                        placeholder="100000"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="salaryMax">Maximum Salary</Label>
                                    <Input
                                        id="salaryMax"
                                        type="number"
                                        value={jobData.salaryMax}
                                        onChange={(e) => handleInputChange("salaryMax", e.target.value)}
                                        placeholder="130000"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Job Description */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Job Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    value={jobData.description}
                                    onChange={(e) => handleInputChange("description", e.target.value)}
                                    placeholder="Describe the role, responsibilities, and what makes this position exciting..."
                                    rows={12}
                                    className="mt-1"
                                    required
                                />
                                <p className="text-sm text-gray-500 mt-2">
                                    Use bullet points and clear formatting to make the description easy to read.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Requirements */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Requirements & Qualifications</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <Label htmlFor="requirements">Requirements *</Label>
                                <Textarea
                                    id="requirements"
                                    value={jobData.requirements}
                                    onChange={(e) => handleInputChange("requirements", e.target.value)}
                                    placeholder="List the required skills, experience, education, and qualifications..."
                                    rows={10}
                                    className="mt-1"
                                    required
                                />
                                <p className="text-sm text-gray-500 mt-2">
                                    Separate required and preferred qualifications for better clarity.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Skills */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Required Skills</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex space-x-2">
                                <Input
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    placeholder="Add a skill (e.g., React, TypeScript)"
                                    onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                                />
                                <Button type="button" onClick={handleAddSkill}>
                                    Add
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {jobData.skills.map((skill, index) => (
                                    <Badge key={index} variant="outline" className="flex items-center space-x-1">
                                        <span>{skill}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveSkill(skill)}
                                            className="ml-1 text-gray-400 hover:text-gray-600"
                                        >
                                            ×
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Benefits */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Benefits & Perks</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex space-x-2">
                                <Input
                                    value={benefitInput}
                                    onChange={(e) => setBenefitInput(e.target.value)}
                                    placeholder="Add a benefit (e.g., Health Insurance, Remote Work)"
                                    onKeyPress={(e) => e.key === "Enter" && handleAddBenefit()}
                                />
                                <Button type="button" onClick={handleAddBenefit}>
                                    Add
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {jobData.benefits.map((benefit, index) => (
                                    <Badge key={index} variant="outline" className="flex items-center space-x-1">
                                        <span>{benefit}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveBenefit(benefit)}
                                            className="ml-1 text-gray-400 hover:text-gray-600"
                                        >
                                            ×
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Save Actions */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-600">Make sure to save your changes before leaving this page.</p>
                                <div className="flex space-x-3">
                                    <Button onClick={() => handleSave(true)} variant="outline" disabled={isLoading}>
                                        Save as Draft
                                    </Button>
                                    <Button onClick={() => handleSave(false)} disabled={isLoading}>
                                        <Save className="w-4 h-4 mr-2" />
                                        {isLoading ? "Saving..." : "Save & Publish"}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
