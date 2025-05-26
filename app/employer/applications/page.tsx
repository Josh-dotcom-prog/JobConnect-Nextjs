'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

interface Application {
    id: string
    name: string
    position: string
    status: 'new' | 'review' | 'interview' | 'offer' | 'hired' | 'rejected'
    jobType: 'frontend' | 'ui-ux' | 'data' | 'devops'
    image: string
    education: string
    experience: string
    appliedDate: string
    email: string
    phone: string
    skills: string[]
    notes?: string
}

const mockApplications: Application[] = [
    {
        id: '1',
        name: 'Michael Johnson',
        position: 'Senior Frontend Developer',
        status: 'new',
        jobType: 'frontend',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        education: 'Stanford University',
        experience: '5 years experience',
        appliedDate: 'Jan 20, 2023',
        email: 'michael.johnson@example.com',
        phone: '(555) 123-4567',
        skills: ['JavaScript', 'React', 'TypeScript', 'HTML/CSS', 'Redux', 'Node.js']
    },
    {
        id: '2',
        name: 'Sarah Williams',
        position: 'UI/UX Designer',
        status: 'review',
        jobType: 'ui-ux',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        education: 'Rhode Island School of Design',
        experience: '3 years experience',
        appliedDate: 'Jan 18, 2023',
        email: 'sarah.williams@example.com',
        phone: '(555) 234-5678',
        skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research']
    },
    {
        id: '3',
        name: 'David Chen',
        position: 'Data Scientist',
        status: 'interview',
        jobType: 'data',
        image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        education: 'MIT',
        experience: '7 years experience',
        appliedDate: 'Jan 15, 2023',
        email: 'david.chen@example.com',
        phone: '(555) 345-6789',
        skills: ['Python', 'R', 'Machine Learning', 'SQL', 'TensorFlow']
    },
    {
        id: '4',
        name: 'Robert Taylor',
        position: 'DevOps Engineer',
        status: 'offer',
        jobType: 'devops',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        education: 'University of Washington',
        experience: '6 years experience',
        appliedDate: 'Jan 10, 2023',
        email: 'robert.taylor@example.com',
        phone: '(555) 456-7890',
        skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform']
    },
    {
        id: '5',
        name: 'Jessica Martinez',
        position: 'Senior Frontend Developer',
        status: 'hired',
        jobType: 'frontend',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        education: 'UC Berkeley',
        experience: '8 years experience',
        appliedDate: 'Dec 15, 2022',
        email: 'jessica.martinez@example.com',
        phone: '(555) 567-8901',
        skills: ['JavaScript', 'React', 'Vue.js', 'TypeScript', 'GraphQL']
    },
    {
        id: '6',
        name: 'Thomas Wilson',
        position: 'UI/UX Designer',
        status: 'rejected',
        jobType: 'ui-ux',
        image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        education: 'Parsons School of Design',
        experience: '2 years experience',
        appliedDate: 'Dec 10, 2022',
        email: 'thomas.wilson@example.com',
        phone: '(555) 678-9012',
        skills: ['Photoshop', 'Illustrator', 'InDesign', 'Wireframing']
    }
]

const statusConfig = {
    new: { label: 'New', className: 'bg-green-100 text-green-800' },
    review: { label: 'In Review', className: 'bg-yellow-100 text-yellow-800' },
    interview: { label: 'Interview', className: 'bg-blue-100 text-blue-800' },
    offer: { label: 'Offer Sent', className: 'bg-purple-100 text-purple-800' },
    hired: { label: 'Hired', className: 'bg-green-100 text-green-800' },
    rejected: { label: 'Rejected', className: 'bg-red-100 text-red-800' }
}

export default function ApplicationsPage() {
    const [applications, setApplications] = useState<Application[]>(mockApplications)
    const [filteredApplications, setFilteredApplications] = useState<Application[]>(mockApplications)
    const [searchTerm, setSearchTerm] = useState('')
    const [jobFilter, setJobFilter] = useState('all')
    const [statusFilter, setStatusFilter] = useState('all')
    const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
    const [showProfileModal, setShowProfileModal] = useState(false)
    const [showStatusModal, setShowStatusModal] = useState(false)
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [showUserMenu, setShowUserMenu] = useState(false)
    const [newStatus, setNewStatus] = useState<Application['status']>('new')
    const [statusNotes, setStatusNotes] = useState('')
    const [applicantNotes, setApplicantNotes] = useState('')

    const { toast } = useToast()

    useEffect(() => {
        let filtered = applications

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(app =>
                app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.position.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        // Apply job filter
        if (jobFilter !== 'all') {
            filtered = filtered.filter(app => app.jobType === jobFilter)
        }

        // Apply status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(app => app.status === statusFilter)
        }

        setFilteredApplications(filtered)
    }, [applications, searchTerm, jobFilter, statusFilter])

    const handleViewProfile = (application: Application) => {
        setSelectedApplication(application)
        setApplicantNotes(application.notes || '')
        setShowProfileModal(true)
    }

    const handleUpdateStatus = () => {
        if (!selectedApplication) return

        const updatedApplications = applications.map(app =>
            app.id === selectedApplication.id
                ? { ...app, status: newStatus }
                : app
        )

        setApplications(updatedApplications)
        setSelectedApplication({ ...selectedApplication, status: newStatus })
        setShowStatusModal(false)

        toast({
            title: "Status Updated!",
            description: `Applicant status has been updated to ${statusConfig[newStatus].label}.`,
        })
    }

    const handleSaveNotes = () => {
        if (!selectedApplication) return

        const updatedApplications = applications.map(app =>
            app.id === selectedApplication.id
                ? { ...app, notes: applicantNotes }
                : app
        )

        setApplications(updatedApplications)
        setSelectedApplication({ ...selectedApplication, notes: applicantNotes })

        toast({
            title: "Notes Saved!",
            description: "Your notes have been saved successfully.",
        })
    }

    const handleScheduleInterview = (application: Application) => {
        const updatedApplications = applications.map(app =>
            app.id === application.id
                ? { ...app, status: 'interview' as const }
                : app
        )

        setApplications(updatedApplications)

        toast({
            title: "Interview Scheduled!",
            description: `Interview has been scheduled for ${application.name}.`,
        })
    }

    const handleSendOffer = (application: Application) => {
        const updatedApplications = applications.map(app =>
            app.id === application.id
                ? { ...app, status: 'offer' as const }
                : app
        )

        setApplications(updatedApplications)

        toast({
            title: "Offer Sent!",
            description: `An offer has been sent to ${application.name}.`,
        })
    }

    const handleReconsider = (application: Application) => {
        const updatedApplications = applications.map(app =>
            app.id === application.id
                ? { ...app, status: 'review' as const }
                : app
        )

        setApplications(updatedApplications)

        toast({
            title: "Application Reconsidered!",
            description: `The application of ${application.name} has been moved back to review.`,
        })
    }

    const renderActionButtons = (application: Application) => {
        const baseButtonClass = "inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"

        switch (application.status) {
            case 'new':
            case 'review':
                return (
                    <>
                        <button
                            onClick={() => handleViewProfile(application)}
                            className={cn(baseButtonClass, "border border-gray-300 shadow-sm text-gray-700 bg-white hover:bg-gray-50")}
                        >
                            View Profile
                        </button>
                        <button
                            onClick={() => handleScheduleInterview(application)}
                            className={cn(baseButtonClass, "border border-transparent shadow-sm text-white bg-blue-600 hover:bg-blue-700")}
                        >
                            Schedule Interview
                        </button>
                    </>
                )
            case 'interview':
                return (
                    <>
                        <button
                            onClick={() => handleViewProfile(application)}
                            className={cn(baseButtonClass, "border border-gray-300 shadow-sm text-gray-700 bg-white hover:bg-gray-50")}
                        >
                            View Profile
                        </button>
                        <button
                            onClick={() => handleSendOffer(application)}
                            className={cn(baseButtonClass, "border border-transparent shadow-sm text-white bg-blue-600 hover:bg-blue-700")}
                        >
                            Send Offer
                        </button>
                    </>
                )
            case 'offer':
                return (
                    <>
                        <button
                            onClick={() => handleViewProfile(application)}
                            className={cn(baseButtonClass, "border border-gray-300 shadow-sm text-gray-700 bg-white hover:bg-gray-50")}
                        >
                            View Profile
                        </button>
                        <button
                            onClick={() => toast({ title: "Checking Status", description: `Checking offer status for ${application.name}` })}
                            className={cn(baseButtonClass, "border border-gray-300 shadow-sm text-gray-700 bg-white hover:bg-gray-50")}
                        >
                            Check Status
                        </button>
                    </>
                )
            case 'hired':
                return (
                    <>
                        <button
                            onClick={() => handleViewProfile(application)}
                            className={cn(baseButtonClass, "border border-gray-300 shadow-sm text-gray-700 bg-white hover:bg-gray-50")}
                        >
                            View Profile
                        </button>
                        <button
                            onClick={() => toast({ title: "Onboarding", description: `Starting onboarding process for ${application.name}` })}
                            className={cn(baseButtonClass, "border border-transparent shadow-sm text-white bg-blue-600 hover:bg-blue-700")}
                        >
                            Onboarding
                        </button>
                    </>
                )
            case 'rejected':
                return (
                    <>
                        <button
                            onClick={() => handleViewProfile(application)}
                            className={cn(baseButtonClass, "border border-gray-300 shadow-sm text-gray-700 bg-white hover:bg-gray-50")}
                        >
                            View Profile
                        </button>
                        <button
                            onClick={() => handleReconsider(application)}
                            className={cn(baseButtonClass, "border border-gray-300 shadow-sm text-gray-700 bg-white hover:bg-gray-50")}
                        >
                            Reconsider
                        </button>
                    </>
                )
            default:
                return null
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
                                    <span className="text-yellow-400">JOB</span>Connect
                                </span>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <a href="/employer/dashboard" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                                    Dashboard
                                </a>
                                <a href="/employer/jobs" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                                    Jobs
                                </a>
                                <a href="/employer/applications" className="text-blue-600 border-b-2 border-blue-600 px-3 py-2 text-sm font-medium">
                                    Applications
                                </a>
                                <a href="/employer/profile" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                                    Profile
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                                Post Job
                            </button>
                            <button className="ml-3 text-gray-500 hover:text-gray-700">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Job Applications</h1>
                        <p className="mt-2 text-gray-600">Manage and review applications for your job postings</p>
                    </div>

                    {/* Filters */}
                    <div className="bg-white p-6 rounded-lg shadow mb-6">
                        <div className="flex flex-wrap gap-4 items-center">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Job</label>
                                <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                                    <option>All Jobs</option>
                                    <option>Frontend Developer</option>
                                    <option>Backend Developer</option>
                                    <option>UI/UX Designer</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                                    <option>All Status</option>
                                    <option>New</option>
                                    <option>Under Review</option>
                                    <option>Shortlisted</option>
                                    <option>Rejected</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                                <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                                    <option>Last 7 days</option>
                                    <option>Last 30 days</option>
                                    <option>Last 3 months</option>
                                    <option>All time</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Applications List */}
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-medium text-gray-900">Recent Applications</h2>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {/* Application Item */}
                            <div className="p-6 hover:bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                                                <span className="text-blue-600 font-medium text-lg">JD</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900">John Doe</h3>
                                            <p className="text-sm text-gray-500">Applied for Frontend Developer</p>
                                            <p className="text-sm text-gray-400">Applied 2 hours ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                            New
                                        </span>
                                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* More Application Items */}
                            <div className="p-6 hover:bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                                                <span className="text-green-600 font-medium text-lg">SM</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900">Sarah Miller</h3>
                                            <p className="text-sm text-gray-500">Applied for UI/UX Designer</p>
                                            <p className="text-sm text-gray-400">Applied 1 day ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            Under Review
                                        </span>
                                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 hover:bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                                                <span className="text-purple-600 font-medium text-lg">MJ</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900">Michael Johnson</h3>
                                            <p className="text-sm text-gray-500">Applied for Backend Developer</p>
                                            <p className="text-sm text-gray-400">Applied 3 days ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Shortlisted
                                        </span>
                                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="mt-6 flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                            <span className="font-medium">97</span> results
                        </div>
                        <div className="flex space-x-2">
                            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                                Previous
                            </button>
                            <button className="px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
                                1
                            </button>
                            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                                2
                            </button>
                            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                                3
                            </button>
                            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

