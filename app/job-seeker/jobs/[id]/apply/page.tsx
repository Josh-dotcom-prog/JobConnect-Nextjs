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
    coverLetter: string
    experience: string
    availability: string
    salaryExpectation: string
    agreedToTerms: boolean
}

export default function JobApplicationPage() {
    const [formData, setFormData] = useState<ApplicationFormData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        location: "",
        coverLetter: "",
        experience: "",
        availability: "",
        salaryExpectation: "",
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
                    href={`/job-seeker/jobs/${MOCK_JOB.id}`}
                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to job details
                </Link>

                <div className="lg:col-span-2">
                    <Card className="border-0 shadow-lg">
                        <CardContent className="pt-12 pb-12">
                            <div className="text-center max-w-md mx-auto">
                                {/* Success Icon */}
                                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <svg
                                        className="w-10 h-10 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        strokeWidth={3}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>

                                {/* Success Title */}
                                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                                    Application Submitted Successfully! 🎉
                                </h1>

                                {/* Success Message */}
                                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                    Thank you for applying to the <span className="font-semibold text-gray-800">{MOCK_JOB.title}</span> position at <span className="font-semibold text-gray-800">{MOCK_JOB.company}</span>.
                                </p>

                                {/* Additional Info */}
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0">
                                            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-sm font-medium text-blue-800 mb-1">What happens next?</h3>
                                            <p className="text-sm text-blue-700">
                                                We'll review your application and get back to you within <strong>5-7 business days</strong>.
                                                Keep an eye on your email for updates!
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-3">
                                    <Link href="/job-seeker/browse-jobs">
                                        <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                                            Browse More Jobs
                                        </Button>
                                    </Link>
                                    <Link href="/job-seeker/applications">
                                        <Button
                                            variant="outline"
                                            className="w-full bg-yellow-300 hover:bg-yellow-400 text-white font-medium py-3 rounded-lg transition-all duration-200 mt-4"
                                        >
                                            View My Applications
                                        </Button>
                                    </Link>
                                </div>

                                {/* Decorative Elements */}
                                <div className="mt-8 flex justify-center space-x-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>


                {/* Job summary sidebar */}
                {/* <div>
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
                    </div> */}
            </div>
        </div>
        // </div >
    )
}
