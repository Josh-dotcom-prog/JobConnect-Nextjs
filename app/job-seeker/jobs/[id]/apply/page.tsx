"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Navbar from "@/components/navigation/navbar"

// Mock job data - in a real app, this would come from an API
const MOCK_JOB = {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    logoUrl: "https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg",
}

interface ApplicationFormData {
    firstName: string
    lastName: string
    email: string
    phone: string
    location: string
    linkedinUrl: string
    portfolioUrl: string
    coverLetter: string
    experience: string
    availability: string
    salaryExpectation: string
    workAuthorization: string
    willingToRelocate: boolean
    agreedToTerms: boolean
}

export default function JobApplicationPage() {
    const [formData, setFormData] = useState<ApplicationFormData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        location: "",
        linkedinUrl: "",
        portfolioUrl: "",
        coverLetter: "",
        experience: "",
        availability: "",
        salaryExpectation: "",
        workAuthorization: "",
        willingToRelocate: false,
        agreedToTerms: false,
    })

    const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleInputChange = (field: keyof ApplicationFormData, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || [])
        setUploadedFiles((prev) => [...prev, ...files])
    }

    const removeFile = (index: number) => {
        setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))

        setIsSubmitting(false)
        setSubmitted(true)
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar userType="jobSeeker" activePage="browse jobs" />

                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <Card className="text-center">
                        <CardContent className="pt-8 pb-8">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h1>
                            <p className="text-gray-600 mb-6">
                                Thank you for applying to the {MOCK_JOB.title} position at {MOCK_JOB.company}. We'll review your
                                application and get back to you within 5-7 business days.
                            </p>
                            <div className="space-y-3">
                                <Link href="/browse-jobs">
                                    <Button className="w-full">Browse More Jobs</Button>
                                </Link>
                                <Link href="/dashboard">
                                    <Button variant="outline" className="w-full">
                                        Go to Dashboard
                                    </Button>
                                </Link>
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

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back button */}
                <Link
                    href={`/jobs/${MOCK_JOB.id}`}
                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to job details
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Application form */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">Apply for this position</CardTitle>
                                <p className="text-gray-600">
                                    Fill out the form below to submit your application. All fields marked with * are required.
                                </p>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Personal Information */}
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="firstName">First Name *</Label>
                                                <Input
                                                    id="firstName"
                                                    value={formData.firstName}
                                                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="lastName">Last Name *</Label>
                                                <Input
                                                    id="lastName"
                                                    value={formData.lastName}
                                                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="email">Email Address *</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="phone">Phone Number *</Label>
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => handleInputChange("phone", e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <Label htmlFor="location">Current Location *</Label>
                                                <Input
                                                    id="location"
                                                    value={formData.location}
                                                    onChange={(e) => handleInputChange("location", e.target.value)}
                                                    placeholder="City, State/Country"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Professional Information */}
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Professional Information</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="linkedinUrl">LinkedIn Profile</Label>
                                                <Input
                                                    id="linkedinUrl"
                                                    value={formData.linkedinUrl}
                                                    onChange={(e) => handleInputChange("linkedinUrl", e.target.value)}
                                                    placeholder="https://linkedin.com/in/yourprofile"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="portfolioUrl">Portfolio/Website</Label>
                                                <Input
                                                    id="portfolioUrl"
                                                    value={formData.portfolioUrl}
                                                    onChange={(e) => handleInputChange("portfolioUrl", e.target.value)}
                                                    placeholder="https://yourportfolio.com"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="experience">Years of Experience *</Label>
                                                <Select onValueChange={(value) => handleInputChange("experience", value)}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select experience level" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="0-1">0-1 years</SelectItem>
                                                        <SelectItem value="2-3">2-3 years</SelectItem>
                                                        <SelectItem value="4-5">4-5 years</SelectItem>
                                                        <SelectItem value="6-8">6-8 years</SelectItem>
                                                        <SelectItem value="9+">9+ years</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Resume Upload */}
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Resume & Documents</h3>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                                            <div className="text-center">
                                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                                <div className="mt-4">
                                                    <label htmlFor="file-upload" className="cursor-pointer">
                                                        <span className="mt-2 block text-sm font-medium text-gray-900">
                                                            Upload your resume and cover letter
                                                        </span>
                                                        <span className="mt-1 block text-sm text-gray-500">PDF, DOC, or DOCX up to 10MB</span>
                                                    </label>
                                                    <input
                                                        id="file-upload"
                                                        name="file-upload"
                                                        type="file"
                                                        className="sr-only"
                                                        multiple
                                                        accept=".pdf,.doc,.docx"
                                                        onChange={handleFileUpload}
                                                    />
                                                </div>
                                                <Button type="button" variant="outline" className="mt-4">
                                                    Choose Files
                                                </Button>
                                            </div>
                                        </div>

                                        {uploadedFiles.length > 0 && (
                                            <div className="mt-4 space-y-2">
                                                {uploadedFiles.map((file, index) => (
                                                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                                        <span className="text-sm text-gray-700">{file.name}</span>
                                                        <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                                                            <X className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Cover Letter */}
                                    <div>
                                        <Label htmlFor="coverLetter">Cover Letter</Label>
                                        <Textarea
                                            id="coverLetter"
                                            value={formData.coverLetter}
                                            onChange={(e) => handleInputChange("coverLetter", e.target.value)}
                                            placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                                            rows={6}
                                        />
                                    </div>

                                    {/* Additional Information */}
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="availability">Availability *</Label>
                                                <Select onValueChange={(value) => handleInputChange("availability", value)}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="When can you start?" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="immediately">Immediately</SelectItem>
                                                        <SelectItem value="2-weeks">2 weeks notice</SelectItem>
                                                        <SelectItem value="1-month">1 month</SelectItem>
                                                        <SelectItem value="2-months">2 months</SelectItem>
                                                        <SelectItem value="3-months">3+ months</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label htmlFor="salaryExpectation">Salary Expectation</Label>
                                                <Input
                                                    id="salaryExpectation"
                                                    value={formData.salaryExpectation}
                                                    onChange={(e) => handleInputChange("salaryExpectation", e.target.value)}
                                                    placeholder="e.g., $120,000 - $150,000"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="workAuthorization">Work Authorization *</Label>
                                                <Select onValueChange={(value) => handleInputChange("workAuthorization", value)}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select your work authorization status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="citizen">US Citizen</SelectItem>
                                                        <SelectItem value="permanent-resident">Permanent Resident</SelectItem>
                                                        <SelectItem value="h1b">H1B Visa</SelectItem>
                                                        <SelectItem value="opt">F1 OPT</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                        <SelectItem value="require-sponsorship">Require Sponsorship</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Checkboxes */}
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="willingToRelocate"
                                                checked={formData.willingToRelocate}
                                                onCheckedChange={(checked) => handleInputChange("willingToRelocate", checked as boolean)}
                                            />
                                            <Label htmlFor="willingToRelocate" className="text-sm">
                                                I am willing to relocate for this position
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="agreedToTerms"
                                                checked={formData.agreedToTerms}
                                                onCheckedChange={(checked) => handleInputChange("agreedToTerms", checked as boolean)}
                                                required
                                            />
                                            <Label htmlFor="agreedToTerms" className="text-sm">
                                                I agree to the terms and conditions and privacy policy *
                                            </Label>
                                        </div>
                                    </div>

                                    {/* Submit button */}
                                    <div className="pt-6">
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            size="lg"
                                            disabled={isSubmitting || !formData.agreedToTerms}
                                        >
                                            {isSubmitting ? "Submitting Application..." : "Submit Application"}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Job summary sidebar */}
                    <div>
                        <Card className="sticky top-8">
                            <CardHeader>
                                <CardTitle>Job Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={MOCK_JOB.logoUrl || "/placeholder.svg"}
                                        alt={`${MOCK_JOB.company} logo`}
                                        className="w-12 h-12 rounded-lg"
                                    />
                                    <div>
                                        <h3 className="font-semibold">{MOCK_JOB.title}</h3>
                                        <p className="text-sm text-gray-600">{MOCK_JOB.company}</p>
                                        <p className="text-sm text-gray-500">{MOCK_JOB.location}</p>
                                    </div>
                                </div>

                                <div className="pt-4 border-t">
                                    <h4 className="font-medium mb-2">Application Tips</h4>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>• Tailor your resume to match the job requirements</li>
                                        <li>• Write a compelling cover letter</li>
                                        <li>• Highlight relevant experience and skills</li>
                                        <li>• Double-check all information before submitting</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
