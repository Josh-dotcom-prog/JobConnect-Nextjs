'use client'

import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    Bell,
    ArrowLeft,
    Save,
    Plus,
    Edit,
    Trash2,
    Menu,
    X,
    Check,
    Upload
} from 'lucide-react'
import Image from 'next/image'

interface TeamMember {
    id: string
    name: string
    title: string
    bio?: string
    photo?: string
    linkedin?: string
}

interface CompanyProfile {
    name: string
    industry: string
    description: string
    size: string
    foundedYear: number
    headquarters: string
    website: string
    contactEmail: string
    contactPhone: string
    slogan: string
    values: string
    socialMedia: {
        linkedin: string
        X: string
        instagram: string
        facebook: string
        youtube: string
    }
}

export default function CompanyProfilePage() {
    const { toast } = useToast()
    const [activeTab, setActiveTab] = useState('basic-info')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    // const [teamModalOpen, setTeamModalOpen] = useState(false)
    // const [editingMember, setEditingMember] = useState<TeamMember | null>(null)

    const [profile, setProfile] = useState<CompanyProfile>({
        name: '',
        industry: 'technology',
        description: '',
        size: '51-200',
        foundedYear: 2010,
        headquarters: '',
        website: '',
        contactEmail: '',
        contactPhone: '',
        slogan: '',
        values: 'Innovation, Integrity, Collaboration, Excellence, Customer Focus',
        socialMedia: {
            linkedin: 'https://www.linkedin.com/company/techcorp',
            X: 'https://x.com/techcorp',
            instagram: 'https://www.instagram.com/techcorp',
            facebook: 'https://www.facebook.com/techcorp',
            youtube: 'https://www.youtube.com/techcorp'
        }
    })

    // const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    //     {
    //         id: '1',
    //         name: 'Sarah Johnson',
    //         title: 'CEO & Founder',
    //         photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    //     },
    //     {
    //         id: '2',
    //         name: 'Michael Chen',
    //         title: 'CTO',
    //         photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    //     },
    //     {
    //         id: '3',
    //         name: 'Robert Taylor',
    //         title: 'VP of Engineering',
    //         photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    //     },
    //     {
    //         id: '4',
    //         name: 'Jessica Martinez',
    //         title: 'Head of HR',
    //         photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    //     }
    // ])

    // const [newMember, setNewMember] = useState<Partial<TeamMember>>({
    //     name: '',
    //     title: '',
    //     bio: '',
    //     linkedin: ''
    // })

    const tabs = [
        { id: 'basic-info', label: 'Basic Information' },
        { id: 'branding', label: 'Branding' },
        // { id: 'team', label: 'Team Members' },
        { id: 'social', label: 'Social Media' }
    ]

    const handleSaveProfile = () => {
        // In a real app, this would be an API call
        toast({
            title: 'Profile Saved!',
            description: 'Your company profile has been updated successfully.',
        })
    }

    // const handleAddTeamMember = () => {
    //     if (!newMember.name || !newMember.title) {
    //         toast({
    //             title: 'Error',
    //             description: 'Please fill in all required fields.',
    //             variant: 'destructive'
    //         })
    //         return
    //     }

    //     const member: TeamMember = {
    //         id: Date.now().toString(),
    //         name: newMember.name!,
    //         title: newMember.title!,
    //         bio: newMember.bio,
    //         linkedin: newMember.linkedin
    //     }

    //     if (editingMember) {
    //         setTeamMembers(prev => prev.map(m => m.id === editingMember.id ? { ...member, id: editingMember.id } : m))
    //         toast({
    //             title: 'Team Member Updated!',
    //             description: `${member.name} has been updated.`,
    //         })
    //     } else {
    //         setTeamMembers(prev => [member, ...prev])
    //         toast({
    //             title: 'Team Member Added!',
    //             description: `${member.name} has been added to your team.`,
    //         })
    //     }

    //     setNewMember({ name: '', title: '', bio: '', linkedin: '' })
    //     setEditingMember(null)
    //     setTeamModalOpen(false)
    // }

    // const handleEditMember = (member: TeamMember) => {
    //     setEditingMember(member)
    //     setNewMember(member)
    //     setTeamModalOpen(true)
    // }

    // const handleDeleteMember = (memberId: string) => {
    //     const member = teamMembers.find(m => m.id === memberId)
    //     if (member && confirm(`Are you sure you want to remove ${member.name} from your team?`)) {
    //         setTeamMembers(prev => prev.filter(m => m.id !== memberId))
    //         toast({
    //             title: 'Team Member Removed',
    //             description: `${member.name} has been removed from your team.`,
    //         })
    //     }
    // }

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
                                <a href="/employer/dashboard" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium hover:text-yellow-400">
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
                                    <Image
                                        className="h-8 w-8 rounded-full"
                                        src="/images/logo2.jpeg"
                                        alt="logo"
                                        width={32}
                                        height={32}
                                    />
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
                            <a href="/employer/dashboard" className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Dashboard</a>
                            <a href="/employer/jobs" className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Job Postings</a>
                            <a href="/employer/applications" className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Applications</a>
                            <a href="/employer/profile" className="bg-blue-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Company Profile</a>
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
                                <Button onClick={handleSaveProfile} className="ml-3">
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
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
                                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
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
                                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="company-name" className="block text-sm font-medium text-gray-700">Company Name</label>
                                            <Input
                                                id="company-name"
                                                value={profile.name}
                                                onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                                                className="mt-1"
                                            />
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
                                            <Select value={profile.industry} onValueChange={(value) => setProfile(prev => ({ ...prev, industry: value }))}>
                                                <SelectTrigger className="mt-1">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="technology">Technology</SelectItem>
                                                    <SelectItem value="finance">Finance</SelectItem>
                                                    <SelectItem value="healthcare">Healthcare</SelectItem>
                                                    <SelectItem value="education">Education</SelectItem>
                                                    <SelectItem value="retail">Retail</SelectItem>
                                                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="sm:col-span-6">
                                            <label htmlFor="company-description" className="block text-sm font-medium text-gray-700">Company Description</label>
                                            <Textarea
                                                id="company-description"
                                                rows={4}
                                                value={profile.description}
                                                onChange={(e) => setProfile(prev => ({ ...prev, description: e.target.value }))}
                                                className="mt-1"
                                            />
                                            <p className="mt-2 text-sm text-gray-500">Brief description of your company that will appear on your profile and job listings.</p>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="company-size" className="block text-sm font-medium text-gray-700">Company Size</label>
                                            <Select value={profile.size} onValueChange={(value) => setProfile(prev => ({ ...prev, size: value }))}>
                                                <SelectTrigger className="mt-1">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1-10">1-10 employees</SelectItem>
                                                    <SelectItem value="11-50">11-50 employees</SelectItem>
                                                    <SelectItem value="51-200">51-200 employees</SelectItem>
                                                    <SelectItem value="201-500">201-500 employees</SelectItem>
                                                    <SelectItem value="501-1000">501-1000 employees</SelectItem>
                                                    <SelectItem value="1001+">1001+ employees</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="founded-year" className="block text-sm font-medium text-gray-700">Founded Year</label>
                                            <Input
                                                id="founded-year"
                                                type="number"
                                                min="1900"
                                                max="2023"
                                                value={profile.foundedYear}
                                                onChange={(e) => setProfile(prev => ({ ...prev, foundedYear: parseInt(e.target.value) }))}
                                                className="mt-1"
                                            />
                                        </div>

                                        <div className="sm:col-span-6">
                                            <label htmlFor="headquarters" className="block text-sm font-medium text-gray-700">Headquarters</label>
                                            <Input
                                                id="headquarters"
                                                value={profile.headquarters}
                                                onChange={(e) => setProfile(prev => ({ ...prev, headquarters: e.target.value }))}
                                                className="mt-1"
                                            />
                                        </div>

                                        <div className="sm:col-span-6">
                                            <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website</label>
                                            <Input
                                                id="website"
                                                type="url"
                                                value={profile.website}
                                                onChange={(e) => setProfile(prev => ({ ...prev, website: e.target.value }))}
                                                className="mt-1"
                                            />
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700">Contact Email</label>
                                            <Input
                                                id="contact-email"
                                                type="email"
                                                value={profile.contactEmail}
                                                onChange={(e) => setProfile(prev => ({ ...prev, contactEmail: e.target.value }))}
                                                className="mt-1"
                                            />
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700">Contact Phone</label>
                                            <Input
                                                id="contact-phone"
                                                type="tel"
                                                value={profile.contactPhone}
                                                onChange={(e) => setProfile(prev => ({ ...prev, contactPhone: e.target.value }))}
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Branding Tab */}
                        {activeTab === 'branding' && (
                            <Card className="mb-6">
                                <CardContent className="p-6">
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Company Logo</label>
                                            <div className="mt-1 flex items-center">
                                                <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                                    <Image
                                                        src="/images/logo2.jpeg"
                                                        alt="Company logo"
                                                        width={48}
                                                        height={48}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </span>
                                                <Button variant="outline" className="ml-5">
                                                    Change
                                                </Button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Cover Image</label>
                                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                <div className="space-y-1 text-center">
                                                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                                    <div className="flex text-sm text-gray-600">
                                                        <label htmlFor="cover-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                                                            <span>Upload a new image</span>
                                                            <input id="cover-upload" name="cover-upload" type="file" className="sr-only" />
                                                        </label>
                                                    </div>
                                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="company-slogan" className="block text-sm font-medium text-gray-700">Company Slogan</label>
                                            <Input
                                                id="company-slogan"
                                                value={profile.slogan}
                                                onChange={(e) => setProfile(prev => ({ ...prev, slogan: e.target.value }))}
                                                className="mt-1"
                                            />
                                            <p className="mt-2 text-sm text-gray-500">A short tagline that represents your company's mission.</p>
                                        </div>

                                        <div>
                                            <label htmlFor="company-values" className="block text-sm font-medium text-gray-700">Company Values</label>
                                            <Textarea
                                                id="company-values"
                                                rows={4}
                                                value={profile.values}
                                                onChange={(e) => setProfile(prev => ({ ...prev, values: e.target.value }))}
                                                className="mt-1"
                                            />
                                            <p className="mt-2 text-sm text-gray-500">Core values that define your company culture.</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Team Members Tab
                        {activeTab === 'team' && (
                            <Card className="mb-6">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-lg font-medium text-gray-900">Team Members</h2>
                                        <Button onClick={() => setTeamModalOpen(true)}>
                                            <Plus className="w-4 h-4 mr-1.5" />
                                            Add Member
                                        </Button>
                                    </div>

                                    <div className="overflow-hidden">
                                        <ul className="divide-y divide-gray-200">
                                            {teamMembers.map((member) => (
                                                <li key={member.id} className="py-4 flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <Image
                                                            className="h-10 w-10 rounded-full"
                                                            src={member.photo || '/images/default-avatar.png'}
                                                            alt={member.name}
                                                            width={40}
                                                            height={40}
                                                        />
                                                        <div className="ml-3">
                                                            <p className="text-sm font-medium text-gray-900">{member.name}</p>
                                                            <p className="text-sm text-gray-500">{member.title}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleEditMember(member)}
                                                        >
                                                            <Edit className="w-3 h-3 mr-1" />
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => handleDeleteMember(member.id)}
                                                        >
                                                            <Trash2 className="w-3 h-3 mr-1" />
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        )} */}

                        {/* Social Media Tab */}
                        {activeTab === 'social' && (
                            <Card className="mb-6">
                                <CardContent className="p-6">
                                    <div className="space-y-6">
                                        {Object.entries(profile.socialMedia).map(([platform, url]) => (
                                            <div key={platform} className="flex items-center">
                                                <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-md text-white ${platform === 'linkedin' ? 'bg-blue-500' :
                                                    platform === 'twitter' ? 'bg-blue-400' :
                                                        platform === 'instagram' ? 'bg-pink-600' :
                                                            platform === 'facebook' ? 'bg-blue-600' :
                                                                platform === 'github' ? 'bg-black' :
                                                                    'bg-red-600'
                                                    }`}>
                                                    <i className={`fab fa-${platform}${platform === 'linkedin' ? '-in' : platform === 'facebook' ? '-f' : ''}`}></i>
                                                </div>
                                                <div className="ml-4 flex-1">
                                                    <label htmlFor={platform} className="block text-sm font-medium text-gray-700 capitalize">
                                                        {platform}
                                                    </label>
                                                    <Input
                                                        id={platform}
                                                        type="url"
                                                        value={url}
                                                        onChange={(e) => setProfile(prev => ({
                                                            ...prev,
                                                            socialMedia: { ...prev.socialMedia, [platform]: e.target.value }
                                                        }))}
                                                        className="mt-1"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </main>
            </div>

            {/* Team Member Modal */}
            {/* {teamModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" onClick={() => setTeamModalOpen(false)}>
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            {editingMember ? 'Edit Team Member' : 'Add Team Member'}
                                        </h3>

                                        <div className="mt-4 space-y-4">
                                            <div>
                                                <label htmlFor="member-name" className="block text-sm font-medium text-gray-700">Name</label>
                                                <Input
                                                    id="member-name"
                                                    value={newMember.name || ''}
                                                    onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                                                    className="mt-1"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="member-title" className="block text-sm font-medium text-gray-700">Job Title</label>
                                                <Input
                                                    id="member-title"
                                                    value={newMember.title || ''}
                                                    onChange={(e) => setNewMember(prev => ({ ...prev, title: e.target.value }))}
                                                    className="mt-1"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="member-bio" className="block text-sm font-medium text-gray-700">Bio</label>
                                                <Textarea
                                                    id="member-bio"
                                                    rows={3}
                                                    value={newMember.bio || ''}
                                                    onChange={(e) => setNewMember(prev => ({ ...prev, bio: e.target.value }))}
                                                    className="mt-1"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Photo</label>
                                                <div className="mt-1 flex items-center">
                                                    <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                                                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 014 4zm-8 0a4 4 0 11-8 0 014 4z" />
                                                        </svg>
                                                    </span>
                                                    <Button variant="outline" className="ml-5">
                                                        Upload Photo
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                {/* <Button
                                    onClick={handleSaveMember}
                                    className="w-full inline-flex justify-center sm:ml-3 sm:w-auto"
                                >
                                    {editingMember ? 'Update' : 'Add'} Member
                                </Button> */}
            {/* <Button
                                    variant="outline"
                                    onClick={() => {
                                        setTeamModalOpen(false)
                                        setEditingMember(null)
                                        setNewMember({ name: '', title: '', bio: '', photo: '' })
                                    }}
                                    className="mt-3 w-full inline-flex justify-center sm:mt-0 sm:ml-3 sm:w-auto"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div> */}
            {/* </div>
                </div> */}
            {/* )}  */}
        </div>
    )
}

