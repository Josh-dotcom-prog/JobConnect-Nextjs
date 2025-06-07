"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, ArrowLeft, Save, Plus, Menu, X, Check, Upload } from "lucide-react"
import Image from "next/image"

interface JobSeekerProfile {
    firstName: string
    lastName: string
    email: string
    phone: string
    experience: string
    education: string
    profilePicture?: File | string
    resume?: File | string
    userId?: number
}

interface ValidationErrors {
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
    experience?: string
    education?: string
    profilePicture?: string
    resume?: string
}

export default function JobSeekerProfilePage() {
    const { toast } = useToast()
    const [activeTab, setActiveTab] = useState("basic-info")
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [errors, setErrors] = useState<ValidationErrors>({})
    const [touched, setTouched] = useState<Record<string, boolean>>({})
    const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null)
    const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null)
    const [resumeFile, setResumeFile] = useState<File | null>(null)
    const [newSkill, setNewSkill] = useState("")

    // This should come from your authentication system
    const currentUserId = 4 // Replace with actual user ID from auth context/state

    const [profile, setProfile] = useState<JobSeekerProfile>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        experience: "",
        education: "",
        userId: currentUserId
    })

    // API functions
    const submitJobseekerProfile = async (profileData: FormData) => {
        const response = await fetch('http://127.0.0.1:8000/jobseeker/profile', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
            },
            body: profileData
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.detail || 'Failed to submit profile')
        }

        return response.json()
    }

    const getJobseekerProfile = async (userId: number) => {
        const response = await fetch(`http://127.0.0.1:8000/jobseeker/profile?user_id=${userId}`, {
            headers: {
                'accept': 'application/json'
            }
        })

        if (!response.ok) {
            if (response.status === 404) {
                // Profile doesn't exist yet, return null
                return null
            }
            throw new Error('Failed to fetch profile')
        }

        return response.json()
    }

    const getJobseekerResume = async (userId: number) => {
        const response = await fetch(`http://127.0.0.1:8000/jobseeker/profile/${userId}/resume`, {
            headers: {
                'accept': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error('Failed to fetch resume')
        }

        return response.blob()
    }

    const getJobseekerProfileImage = async (userId: number) => {
        const response = await fetch(`http://127.0.0.1:8000/jobseeker/profile/${userId}/image`, {
            headers: {
                'accept': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error('Failed to fetch profile image')
        }

        return response.blob()
    }

    // Validation functions
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const validatePhone = (phone: string): boolean => {
        const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
        return phoneRegex.test(phone.replace(/[\s\-()]/g, ""))
    }

    const validateField = (field: keyof JobSeekerProfile, value: string | string[] | undefined): string | undefined => {
        switch (field) {
            case "firstName": {
                const val = typeof value === "string" ? value : ""
                if (!val.trim()) return "First name is required"
                if (val.trim().length < 2) return "First name must be at least 2 characters"
                if (val.trim().length > 50) return "First name must be less than 50 characters"
                break
            }

            case "lastName": {
                const val = typeof value === "string" ? value : ""
                if (!val.trim()) return "Last name is required"
                if (val.trim().length < 2) return "Last name must be at least 2 characters"
                if (val.trim().length > 50) return "Last name must be less than 50 characters"
                break
            }

            case "email": {
                const val = typeof value === "string" ? value : ""
                if (!val.trim()) return "Email is required"
                if (!validateEmail(val)) return "Please enter a valid email address"
                break
            }

            case "phone": {
                const val = typeof value === "string" ? value : ""
                if (!val.trim()) return "Phone number is required"
                if (!validatePhone(val)) return "Please enter a valid phone number"
                break
            }

            case "experience": {
                const val = typeof value === "string" ? value : ""
                if (!val.trim()) return "Work experience is required"
                if (val.trim().length < 10) return "Experience must be at least 10 characters"
                break
            }

            case "education": {
                const val = typeof value === "string" ? value : ""
                if (!val.trim()) return "Education is required"
                if (val.trim().length < 5) return "Education must be at least 5 characters"
                break
            }

            default:
                break
        }
        return undefined
    }

    const validateForm = (): ValidationErrors => {
        const newErrors: ValidationErrors = {}

        // Validate basic fields
        const fieldsToValidate: (keyof JobSeekerProfile)[] = ['firstName', 'lastName', 'email', 'phone', 'experience', 'education']

        fieldsToValidate.forEach((field) => {
            const error = validateField(field, profile[field]?.toString())
            if (error) {
                newErrors[field as keyof Omit<JobSeekerProfile, 'userId'>] = error
            }
        })
        return newErrors
    }

    // Load existing profile data
    useEffect(() => {
        const loadProfile = async () => {
            try {
                setIsLoading(true)
                const existingProfile = await getJobseekerProfile(currentUserId)

                if (existingProfile) {
                    setProfile({
                        firstName: existingProfile.first_name || "",
                        lastName: existingProfile.last_name || "",
                        email: existingProfile.email || "",
                        phone: existingProfile.phone_number || "",
                        experience: existingProfile.work_experience || "",
                        education: existingProfile.education_level || "",
                        userId: currentUserId
                    })

                    // Load profile image if exists
                    try {
                        const imageBlob = await getJobseekerProfileImage(currentUserId)
                        const imageUrl = URL.createObjectURL(imageBlob)
                        setProfilePicturePreview(imageUrl)
                    } catch (error) {
                        // Profile image doesn't exist, that's okay
                        console.log('No profile image found')
                    }
                }
            } catch (error) {
                console.error('Error loading profile:', error)
                toast({
                    title: "Error",
                    description: "Failed to load profile data.",
                    variant: "destructive",
                })
            } finally {
                setIsLoading(false)
            }
        }

        loadProfile()
    }, [currentUserId, toast])

    const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        // Validate file type
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"]
        if (!allowedTypes.includes(file.type)) {
            setErrors((prev) => ({ ...prev, profilePicture: "Please upload a valid image file (JPEG, PNG, or GIF)" }))
            return
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024 // 5MB in bytes
        if (file.size > maxSize) {
            setErrors((prev) => ({ ...prev, profilePicture: "Image size must be less than 5MB" }))
            return
        }

        // Clear any existing profile picture errors
        setErrors((prev) => ({ ...prev, profilePicture: undefined }))

        // Set the file and create preview
        setProfilePictureFile(file)
        const reader = new FileReader()
        reader.onload = (e) => {
            const result = e.target?.result as string
            setProfilePicturePreview(result)
        }
        reader.readAsDataURL(file)
    }

    const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        // Validate file type
        const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
        if (!allowedTypes.includes(file.type)) {
            setErrors(prev => ({ ...prev, resume: "Please upload a valid resume file (PDF, DOC, or DOCX)" }))
            return
        }

        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024 // 10MB in bytes
        if (file.size > maxSize) {
            setErrors(prev => ({ ...prev, resume: "Resume file size must be less than 10MB" }))
            return
        }

        // Clear errors and set file
        setErrors(prev => ({ ...prev, resume: undefined }))
        setResumeFile(file)
        setProfile(prev => ({ ...prev, resume: file.name }))
    }

    const removeProfilePicture = () => {
        setProfilePictureFile(null)
        setProfilePicturePreview(null)
        setErrors((prev) => ({ ...prev, profilePicture: undefined }))

        // Reset the file input
        const fileInput = document.getElementById("profile-picture-upload") as HTMLInputElement
        if (fileInput) {
            fileInput.value = ""
        }
    }

    const removeResume = () => {
        setResumeFile(null)
        setProfile(prev => ({ ...prev, resume: undefined }))
        setErrors(prev => ({ ...prev, resume: undefined }))

        const fileInput = document.getElementById("resume-upload") as HTMLInputElement
        if (fileInput) fileInput.value = ""
    }

    const handleFieldChange = (field: keyof JobSeekerProfile, value: string | string[]) => {
        setProfile((prev) => ({ ...prev, [field]: value }))

        // Clear error for this field when user starts typing
        if (errors[field as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }

        // Validate field on change if it was previously touched
        if (touched[field]) {
            const error = validateField(field, value)
            setErrors((prev) => ({ ...prev, [field]: error }))
        }
    }
    const handleFieldBlur = (field: keyof JobSeekerProfile) => {
        setTouched((prev) => ({ ...prev, [field]: true }))
        const error = validateField(field, String(profile[field]))
        setErrors((prev) => ({ ...prev, [field]: error }))
    }

    const handleSaveProfile = async () => {
        // Mark all fields as touched
        const allFields: (keyof JobSeekerProfile)[] = ['firstName', 'lastName', 'email', 'phone', 'experience', 'education']
        const newTouched = allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
        setTouched(newTouched)

        // Validate entire form
        const formErrors = validateForm()
        setErrors(formErrors)

        // Check if there are any errors
        if (Object.keys(formErrors).length > 0) {
            toast({
                title: "Validation Error",
                description: "Please fix the errors below before saving.",
                variant: "destructive",
            })
            return
        }

        setIsSubmitting(true)

        try {
            // Show loading state
            toast({
                title: "Saving...",
                description: "Updating your profile.",
            })

            // Create FormData object
            const formData = new FormData()

            // Map frontend field names to backend field names
            formData.append('first_name', profile.firstName)
            formData.append('last_name', profile.lastName)
            formData.append('phone_number', profile.phone)
            formData.append('work_experience', profile.experience)
            formData.append('education_level', profile.education)
            formData.append('user_id', currentUserId.toString())

            // Add files if they exist
            if (profilePictureFile) {
                formData.append('profile_pic', profilePictureFile)
            }
            if (resumeFile) {
                formData.append('resume', resumeFile)
            }

            // Submit to API
            await submitJobseekerProfile(formData)

            toast({
                title: "Profile Saved!",
                description: "Your profile has been updated successfully.",
            })

        } catch (error) {
            console.error('Error saving profile:', error)
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to save profile. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const tabs = [
        { id: "basic-info", label: "Basic Information" },
        { id: "professional", label: "Professional Details" },
    ]

    if (isLoading) {
        return (
            <div className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your profile...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Navigation */}
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <span className="text-3xl font-bold text-blue-800">
                                    <span className="text-yellow-400">JOB</span>CONNECT
                                </span>
                            </div>
                            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                                <a
                                    href="/job-seeker/dashboard"
                                    className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-bold hover:text-yellow-400"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Dashboard
                                </a>
                            </div>
                        </div>

                        <div className="hidden sm:ml-6 sm:flex sm:items-center">
                            <Button variant="ghost" size="sm" className="p-1 rounded-full text-gray-400 hover:text-gray-500">
                                <Bell className="w-5 h-5" />
                            </Button>

                            <div className="ml-3 relative">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="max-w-xs bg-white flex items-center text-sm rounded-full"
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                >
                                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                                        <span className="text-white text-sm font-bold">JS</span>
                                    </div>
                                </Button>

                                {userMenuOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Your Profile
                                        </a>
                                        <a href="/auth" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Sign out
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                                <Menu className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="sm:hidden">
                        <div className="pt-2 pb-3 space-y-1">
                            <a
                                href="/job-seeker/dashboard"
                                className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-bold"
                            >
                                Dashboard
                            </a>
                            <a
                                href="/job-seeker/browse-jobs"
                                className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-bold"
                            >
                                Browse Jobs
                            </a>
                            <a
                                href="/job-seeker/applications"
                                className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-bold"
                            >
                                My Applications
                            </a>
                            <a
                                href="/job-seeker/profile"
                                className="bg-blue-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-bold"
                            >
                                My Profile
                            </a>
                        </div>
                    </div>
                )}
            </nav>

            <div className="py-10">
                <header>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="md:flex md:items-center md:justify-between">
                            <div className="flex-1 min-w-0">
                                <h1 className="text-2xl font-bold leading-tight text-gray-900">My Profile</h1>
                                <p className="mt-1 text-sm text-gray-600">Manage your professional profile and showcase your skills</p>
                            </div>
                            <div className="mt-4 flex md:mt-0 md:ml-4">
                                <Button onClick={handleSaveProfile} className="ml-3" disabled={isSubmitting}>
                                    <Save className="w-4 h-4 mr-2" />
                                    {isSubmitting ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </header>

                <main>
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {/* Profile Tabs */}
                        <div className="mb-6">
                            <div className="sm:hidden">
                                <Select value={activeTab} onValueChange={setActiveTab}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {tabs.map((tab) => (
                                            <SelectItem key={tab.id} value={tab.id}>
                                                {tab.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="hidden sm:block">
                                <div className="border-b border-gray-200">
                                    <nav className="-mb-px flex space-x-8">
                                        {tabs.map((tab) => (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-bold text-sm ${activeTab === tab.id
                                                    ? "border-blue-500 text-blue-600"
                                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                                    }`}
                                            >
                                                {tab.label}
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </div>

                        {/* Basic Information Tab */}
                        {activeTab === "basic-info" && (
                            <Card className="mb-6">
                                <CardContent className="p-6">
                                    <div className="space-y-6">
                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Profile Picture</label>
                                            <div className="flex items-start space-x-4">
                                                {/* Profile Picture Preview */}
                                                <div className="flex-shrink-0">
                                                    <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                                                        {profilePicturePreview ? (
                                                            <Image
                                                                src={profilePicturePreview}
                                                                alt="Profile picture preview"
                                                                width={80}
                                                                height={80}
                                                                className="w-full h-full object-cover rounded-full"
                                                            />
                                                        ) : (
                                                            <div className="text-center">
                                                                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                                                                <span className="text-xs text-gray-500">Photo</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Upload Controls */}
                                                <div className="flex-1">
                                                    <div className="flex flex-wrap gap-2">
                                                        <label htmlFor="profile-picture-upload">
                                                            <Button type="button" variant="outline" size="sm" className="cursor-pointer" asChild>
                                                                <span>
                                                                    <Upload className="w-4 h-4 mr-2" />
                                                                    {profilePicturePreview ? "Change Photo" : "Upload Photo"}
                                                                </span>
                                                            </Button>
                                                        </label>
                                                        {profilePicturePreview && (
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={removeProfilePicture}
                                                                className="text-red-600 hover:text-red-700"
                                                            >
                                                                <X className="w-4 h-4 mr-2" />
                                                                Remove
                                                            </Button>
                                                        )}
                                                    </div>
                                                    <input
                                                        id="profile-picture-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleProfilePictureUpload}
                                                        className="hidden"
                                                    />
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Recommended: Square image, max 5MB (JPEG, PNG, or GIF)
                                                    </p>
                                                    {errors.profilePicture && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.profilePicture}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-bold text-gray-700">
                                                    First Name *
                                                </label>
                                                <Input
                                                    id="first-name"
                                                    value={profile.firstName}
                                                    onChange={(e) => handleFieldChange("firstName", e.target.value)}
                                                    onBlur={() => handleFieldBlur("firstName")}
                                                    className={`mt-1 ${errors.firstName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                                                    placeholder="Enter your first name"
                                                />
                                                {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="last-name" className="block text-sm font-bold text-gray-700">
                                                    Last Name *
                                                </label>
                                                <Input
                                                    id="last-name"
                                                    value={profile.lastName}
                                                    onChange={(e) => handleFieldChange("lastName", e.target.value)}
                                                    onBlur={() => handleFieldBlur("lastName")}
                                                    className={`mt-1 ${errors.lastName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                                                    placeholder="Enter your last name"
                                                />
                                                {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="sm:col-span-3">
                                                <label htmlFor="email" className="block text-sm font-bold text-gray-700">
                                                    Email Address *
                                                </label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={profile.email}
                                                    onChange={(e) => handleFieldChange("email", e.target.value)}
                                                    onBlur={() => handleFieldBlur("email")}
                                                    className={`mt-1 ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                                                    placeholder="your.email@example.com"
                                                />
                                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="phone" className="block text-sm font-bold text-gray-700">
                                                    Phone Number *
                                                </label>
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    value={profile.phone}
                                                    onChange={(e) => handleFieldChange("phone", e.target.value)}
                                                    onBlur={() => handleFieldBlur("phone")}
                                                    className={`mt-1 ${errors.phone ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                                                    placeholder="+1 (555) 123-4567"
                                                />
                                                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Professional Details Tab */}
                        {activeTab === "professional" && (
                            <Card className="mb-6">
                                <CardContent className="p-6">
                                    <div className="space-y-6">
                                        <div className="sm:col-span-6">
                                            <label htmlFor="experience" className="block text-sm font-bold text-gray-700">
                                                Work Experience *
                                            </label>
                                            <Textarea
                                                id="experience"
                                                rows={6}
                                                value={profile.experience}
                                                onChange={(e) => handleFieldChange("experience", e.target.value)}
                                                onBlur={() => handleFieldBlur("experience")}
                                                className={`mt-1 ${errors.experience ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                                                placeholder="Describe your work experience, including job titles, companies, responsibilities, and achievements."
                                            />
                                            {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience}</p>}
                                        </div>

                                        <div className="sm:col-span-6">
                                            <label htmlFor="education" className="block text-sm font-bold text-gray-700">
                                                Education *
                                            </label>
                                            <Textarea
                                                id="education"
                                                rows={4}
                                                value={profile.education}
                                                onChange={(e) => handleFieldChange("education", e.target.value)}
                                                onBlur={() => handleFieldBlur("education")}
                                                className={`mt-1 ${errors.education ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                                                placeholder="List your educational background, including degrees, institutions, and years of attendance."
                                            />
                                            {errors.education && <p className="mt-1 text-sm text-red-600">{errors.education}</p>}
                                        </div>

                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Resume/CV</label>
                                            <div className="flex items-start gap-4">
                                                {resumeFile ? (
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <Badge variant="outline" className="px-3 py-1 text-sm">
                                                                <Check className="w-4 h-4 mr-2 text-green-500" />
                                                                {resumeFile.name}
                                                            </Badge>
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={removeResume}
                                                                className="text-red-600 hover:text-red-700"
                                                            >
                                                                <X className="w-4 h-4 mr-1" />
                                                                Remove
                                                            </Button>
                                                        </div>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            Last updated: {new Date().toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <div className="flex-1">
                                                        <label htmlFor="resume-upload">
                                                            <Button type="button" variant="outline" size="sm" className="cursor-pointer" asChild>
                                                                <span>
                                                                    <Upload className="w-4 h-4 mr-2" />
                                                                    Upload Resume
                                                                </span>
                                                            </Button>
                                                        </label>
                                                        <input
                                                            id="resume-upload"
                                                            type="file"
                                                            accept=".pdf,.doc,.docx"
                                                            onChange={handleResumeUpload}
                                                            className="hidden"
                                                        />
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            PDF, DOC, or DOCX. Max file size: 10MB
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                            {errors.resume && <p className="mt-1 text-sm text-red-600">{errors.resume}</p>}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Save Button (Sticky Footer) */}
                        <div className="sticky bottom-0 bg-white border-t border-gray-200 py-4 px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-end">
                                <Button
                                    onClick={handleSaveProfile}
                                    className="ml-3"
                                    disabled={isSubmitting}
                                    size="lg"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    {isSubmitting ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}