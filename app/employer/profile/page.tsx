'use client'

import { useState, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Bell, ArrowLeft, Save, Plus, Edit, Trash2, Menu, X, Check, Upload } from 'lucide-react'
import Image from 'next/image'


interface CompanyProfile {
    name: string
    description: string
    location: string
    contactEmail: string
    contactPhone: string
    logo?: string // Add this line
}

interface ValidationErrors {
    name?: string
    description?: string
    location?: string
    contactEmail?: string
    contactPhone?: string
    logo?: string // Add this line
}

export default function CompanyProfilePage() {
    const { toast } = useToast()
    const [activeTab, setActiveTab] = useState('basic-info')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState<ValidationErrors>({})
    const [touched, setTouched] = useState<Record<string, boolean>>({})
    const [logoFile, setLogoFile] = useState<File | null>(null)
    const [logoPreview, setLogoPreview] = useState<string | null>(null)

    const [profile, setProfile] = useState<CompanyProfile>({
        name: '',
        description: '',
        location: '',
        contactEmail: '',
        contactPhone: '',
    })

    // Validation functions
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const validatePhone = (phone: string): boolean => {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
        return phoneRegex.test(phone.replace(/[\s\-$$$$]/g, ''))
    }

    const validateField = (field: keyof CompanyProfile, value: string | undefined): string | undefined => {
        // If value is undefined, treat it as an empty string
        const val = value || '';

        switch (field) {
            case 'name':
                if (!val.trim()) return 'Company name is required'
                if (val.trim().length < 2) return 'Company name must be at least 2 characters'
                if (val.trim().length > 100) return 'Company name must be less than 100 characters'
                break

            case 'description':
                if (!val.trim()) return 'Company description is required'
                if (val.trim().length < 10) return 'Description must be at least 10 characters'
                if (val.trim().length > 1000) return 'Description must be less than 1000 characters'
                break

            case 'location':
                if (!val.trim()) return 'Location is required'
                if (val.trim().length < 2) return 'Location must be at least 2 characters'
                break

            case 'contactEmail':
                if (!val.trim()) return 'Contact email is required'
                if (!validateEmail(val)) return 'Please enter a valid email address'
                break

            case 'contactPhone':
                if (!val.trim()) return 'Contact phone is required'
                if (!validatePhone(val)) return 'Please enter a valid phone number'
                break

            default:
                break
        }
        return undefined
    }

    const validateForm = (): ValidationErrors => {
        const newErrors: ValidationErrors = {}

        Object.keys(profile).forEach((key) => {
            const field = key as keyof CompanyProfile
            const error = validateField(field, profile[field])
            if (error) {
                newErrors[field] = error
            }
        })

        return newErrors
    }

    const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
        if (!allowedTypes.includes(file.type)) {
            setErrors(prev => ({ ...prev, logo: 'Please upload a valid image file (JPEG, PNG, or GIF)' }))
            return
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024 // 5MB in bytes
        if (file.size > maxSize) {
            setErrors(prev => ({ ...prev, logo: 'Image size must be less than 5MB' }))
            return
        }

        // Clear any existing logo errors
        setErrors(prev => ({ ...prev, logo: undefined }))

        // Set the file and create preview
        setLogoFile(file)
        const reader = new FileReader()
        reader.onload = (e) => {
            const result = e.target?.result as string
            setLogoPreview(result)
            setProfile(prev => ({ ...prev, logo: result }))
        }
        reader.readAsDataURL(file)
    }

    const removeLogo = () => {
        setLogoFile(null)
        setLogoPreview(null)
        setProfile(prev => ({ ...prev, logo: undefined }))
        setErrors(prev => ({ ...prev, logo: undefined }))

        // Reset the file input
        const fileInput = document.getElementById('logo-upload') as HTMLInputElement
        if (fileInput) {
            fileInput.value = ''
        }
    }

    const handleFieldChange = (field: keyof CompanyProfile, value: string) => {
        setProfile(prev => ({ ...prev, [field]: value }))

        // Clear error for this field when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }))
        }

        // Validate field on change if it was previously touched
        if (touched[field]) {
            const error = validateField(field, value)
            setErrors(prev => ({ ...prev, [field]: error }))
        }
    }

    const handleFieldBlur = (field: keyof CompanyProfile) => {
        setTouched(prev => ({ ...prev, [field]: true }))
        const error = validateField(field, profile[field])
        setErrors(prev => ({ ...prev, [field]: error }))
    }

    // Add this useEffect after the state declarations
    useEffect(() => {
        // Load saved profile data from localStorage
        const savedProfile = localStorage.getItem('companyProfile')
        if (savedProfile) {
            try {
                const parsedProfile = JSON.parse(savedProfile)
                setProfile(parsedProfile)
                if (parsedProfile.logo) {
                    setLogoPreview(parsedProfile.logo)
                }
            } catch (error) {
                console.error('Error loading saved profile:', error)
            }
        }
    }, [])

    const tabs = [
        { id: 'basic-info', label: 'Basic Information' },
    ]

    const handleSaveProfile = async () => {
        // Mark all fields as touched
        const allFields = Object.keys(profile) as (keyof CompanyProfile)[]
        const newTouched = allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
        setTouched(newTouched)

        // Validate entire form
        const formErrors = validateForm()
        setErrors(formErrors)

        // Check if there are any errors
        if (Object.keys(formErrors).length > 0) {
            toast({
                title: 'Validation Error',
                description: 'Please fix the errors below before saving.',
                variant: 'destructive'
            })
            return
        }

        setIsSubmitting(true)

        try {
            // Show loading state
            toast({
                title: 'Saving...',
                description: 'Updating your company profile.',
            })

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500))

            // In a real app, this would be an API call
            localStorage.setItem('companyProfile', JSON.stringify(profile))

            toast({
                title: 'Profile Saved!',
                description: 'Your company profile has been updated successfully.',
            })
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to save profile. Please try again.',
                variant: 'destructive'
            })
        } finally {
            setIsSubmitting(false)
        }
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
                                <a href="/employer/dashboard" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-bold hover:text-yellow-400">
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
                                        <span className="text-white text-sm font-bold">JC</span>
                                    </div>
                                </Button>

                                {userMenuOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                <Menu className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="sm:hidden">
                        <div className="pt-2 pb-3 space-y-1">
                            <a href="/employer/dashboard" className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-bold">Dashboard</a>
                            <a href="/employer/jobs" className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-bold">Job Postings</a>
                            <a href="/employer/applications" className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-bold">Applications</a>
                            <a href="/employer/profile" className="bg-blue-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-bold">Company Profile</a>
                        </div>
                    </div>
                )}
            </nav>

            <div className="py-10">
                <header>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="md:flex md:items-center md:justify-between">
                            <div className="flex-1 min-w-0">
                                <h1 className="text-2xl font-bold leading-tight text-gray-900">Company Profile</h1>
                                <p className="mt-1 text-sm text-gray-600">Manage your company information and branding</p>
                            </div>
                            <div className="mt-4 flex md:mt-0 md:ml-4">
                                <Button
                                    onClick={handleSaveProfile}
                                    className="ml-3"
                                    disabled={isSubmitting}
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    {isSubmitting ? 'Saving...' : 'Save Changes'}
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
                                        {tabs.map(tab => (
                                            <SelectItem key={tab.id} value={tab.id}>{tab.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="hidden sm:block">
                                <div className="border-b border-gray-200">
                                    <nav className="-mb-px flex space-x-8">
                                        {tabs.map(tab => (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-bold text-sm ${activeTab === tab.id
                                                    ? 'border-blue-500 text-blue-600'
                                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
                        {activeTab === 'basic-info' && (
                            <Card className="mb-6">
                                <CardContent className="p-6">
                                    <div className="space-y-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="company-name" className="block text-sm font-bold text-gray-700">
                                                Company Name *
                                            </label>
                                            <Input
                                                id="company-name"
                                                value={profile.name}
                                                onChange={(e) => handleFieldChange('name', e.target.value)}
                                                onBlur={() => handleFieldBlur('name')}
                                                className={`mt-1 ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                                                placeholder="Enter your company name"
                                            />
                                            {errors.name && (
                                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                            )}
                                        </div>

                                        <div className="sm:col-span-6">
                                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                                Company Logo
                                            </label>
                                            <div className="flex items-start space-x-4">
                                                {/* Logo Preview */}
                                                <div className="flex-shrink-0">
                                                    <div className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                                                        {logoPreview ? (
                                                            <img
                                                                src={logoPreview || "/placeholder.svg"}
                                                                alt="Company logo preview"
                                                                className="w-full h-full object-cover rounded-lg"
                                                            />
                                                        ) : (
                                                            <div className="text-center">
                                                                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                                                                <span className="text-xs text-gray-500">Logo</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Upload Controls */}
                                                <div className="flex-1">
                                                    <div className="flex flex-wrap gap-2">
                                                        <label htmlFor="logo-upload">
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                size="sm"
                                                                className="cursor-pointer"
                                                                asChild
                                                            >
                                                                <span>
                                                                    <Upload className="w-4 h-4 mr-2" />
                                                                    {logoPreview ? 'Change Logo' : 'Upload Logo'}
                                                                </span>
                                                            </Button>
                                                        </label>
                                                        {logoPreview && (
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={removeLogo}
                                                                className="text-red-600 hover:text-red-700"
                                                            >
                                                                <X className="w-4 h-4 mr-2" />
                                                                Remove
                                                            </Button>
                                                        )}
                                                    </div>
                                                    <input
                                                        id="logo-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleLogoUpload}
                                                        className="hidden"
                                                    />
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Recommended: Square image, max 5MB (JPEG, PNG, or GIF)
                                                    </p>
                                                    {errors.logo && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.logo}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-6">
                                            <label htmlFor="company-description" className="block text-sm font-bold text-gray-700">
                                                Company Description *
                                            </label>
                                            <Textarea
                                                id="company-description"
                                                rows={4}
                                                value={profile.description}
                                                onChange={(e) => handleFieldChange('description', e.target.value)}
                                                onBlur={() => handleFieldBlur('description')}
                                                className={`mt-1 ${errors.description ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                                                placeholder="Describe your company, its mission, and what makes it unique..."
                                            />
                                            <div className="flex justify-between items-center mt-1">
                                                <p className="text-sm text-gray-500">
                                                    Brief description of your company that will appear on your profile and job listings.
                                                </p>
                                                <span className="text-xs text-gray-400">
                                                    {profile.description.length}/1000
                                                </span>
                                            </div>
                                            {errors.description && (
                                                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                            )}
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="location" className="block text-sm font-bold text-gray-700">
                                                Location *
                                            </label>
                                            <Input
                                                id="location"
                                                value={profile.location}
                                                onChange={(e) => handleFieldChange('location', e.target.value)}
                                                onBlur={() => handleFieldBlur('location')}
                                                className={`mt-1 ${errors.location ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                                                placeholder="City, State/Country"
                                            />
                                            {errors.location && (
                                                <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="sm:col-span-3">
                                                <label htmlFor="contact-email" className="block text-sm font-bold text-gray-700">
                                                    Contact Email *
                                                </label>
                                                <Input
                                                    id="contact-email"
                                                    type="email"
                                                    value={profile.contactEmail}
                                                    onChange={(e) => handleFieldChange('contactEmail', e.target.value)}
                                                    onBlur={() => handleFieldBlur('contactEmail')}
                                                    className={`mt-1 ${errors.contactEmail ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                                                    placeholder="contact@company.com"
                                                />
                                                {errors.contactEmail && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.contactEmail}</p>
                                                )}
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="contact-phone" className="block text-sm font-bold text-gray-700">
                                                    Contact Phone *
                                                </label>
                                                <Input
                                                    id="contact-phone"
                                                    type="tel"
                                                    value={profile.contactPhone}
                                                    onChange={(e) => handleFieldChange('contactPhone', e.target.value)}
                                                    onBlur={() => handleFieldBlur('contactPhone')}
                                                    className={`mt-1 ${errors.contactPhone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                                                    placeholder="+1 (555) 123-4567"
                                                />
                                                {errors.contactPhone && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.contactPhone}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}