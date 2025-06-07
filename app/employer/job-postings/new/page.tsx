"use client"
import { useState } from "react"
import axios from 'axios'; // <-- Added axios import
import { Briefcase, MapPin, FileText, DollarSign, Send, X } from "lucide-react"
import Navbar from "@/components/navigation/navbar"

export default function CreateJobForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        employer_id: 1,
        title: "",
        job_type: "full_time",
        base_salary: 0,
        description: "",
        responsibilities: "",
        requirements: "",
        location: ""
    })

    // Function to send job data to backend
    async function createJob(jobData: { base_salary: number; employer_id: number; title: string; job_type: string; description: string; responsibilities: string; requirements: string; location: string; }) {
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/Jobs/create',
                jobData,
                {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log("Job created:", response.data);
            return response.data;
        } catch (error) {
            console.log(error);
          // console.error('Error creating job:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // Format numeric fields
            const submissionData = {
                ...formData,
                base_salary: Number(formData.base_salary),
                employer_id: Number(formData.employer_id)
            };

            // Submit data via axios
            await createJob(submissionData);

            alert("Job created successfully!")

            // Reset form after successful submission
            setFormData({
                employer_id: 0,
                title: "",
                job_type: "full_time",
                base_salary: 0,
                description: "",
                responsibilities: "",
                requirements: "",
                location: ""
            });

        } catch (error) {
            alert("Failed to create job. Please check the console for details.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Navbar userType="employer" activePage="#" />
            <div className="max-w-3xl mx-auto mt-12">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    {/* Form Header */}
                    <div className="bg-blue-700 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <Briefcase className="h-6 w-6 text-white" />
                                <h2 className="text-xl font-semibold text-white">Create New Job Posting</h2>
                            </div>
                            <button className="text-blue-200 hover:text-white">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                    {/* Main Form */}
                    <form onSubmit={handleSubmit} className="space-y-6 p-6">
                        {/* Employer ID (hidden in production, would come from auth) */}
                        <input type="hidden" name="employer_id" value={formData.employer_id} />
                        {/* Job Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                Job Title *
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    required
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g. Senior Software Engineer"
                                />
                            </div>
                        </div>
                        {/* Location and Job Type */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Location */}
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                                    Location *
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MapPin className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="location"
                                        id="location"
                                        required
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="e.g. New York, NY or Remote"
                                    />
                                </div>
                            </div>
                            {/* Job Type */}
                            <div>
                                <label htmlFor="job_type" className="block text-sm font-medium text-gray-700 mb-1">
                                    Job Type *
                                </label>
                                <select
                                    name="job_type"
                                    id="job_type"
                                    required
                                    value={formData.job_type}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                                >
                                    <option value="full_time">Full-time</option>
                                    <option value="part_time">Part-time</option>
                                    <option value="contract">Contract</option>
                                    <option value="internship">Internship</option>
                                </select>
                            </div>
                        </div>
                        {/* Salary */}
                        <div>
                            <label htmlFor="base_salary" className="block text-sm font-medium text-gray-700 mb-1">
                                Base Salary
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <DollarSign className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="number"
                                    name="base_salary"
                                    id="base_salary"
                                    min="0"
                                    value={formData.base_salary}
                                    onChange={handleInputChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g. 85000"
                                />
                            </div>
                        </div>
                        {/* Job Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Description *
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                                    <FileText className="h-5 w-5 text-gray-400" />
                                </div>
                                <textarea
                                    name="description"
                                    id="description"
                                    rows={4}
                                    required
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Describe the role, company culture, and what makes this opportunity special..."
                                />
                            </div>
                        </div>
                        {/* Responsibilities */}
                        <div>
                            <label htmlFor="responsibilities" className="block text-sm font-medium text-gray-700 mb-1">
                                Key Responsibilities
                            </label>
                            <textarea
                                name="responsibilities"
                                id="responsibilities"
                                rows={4}
                                value={formData.responsibilities}
                                onChange={handleInputChange}
                                className="mt-1 block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="List the main responsibilities of the role (bullet points work well)..."
                            />
                        </div>
                        {/* Requirements */}
                        <div>
                            <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
                                Requirements *
                            </label>
                            <textarea
                                name="requirements"
                                id="requirements"
                                rows={4}
                                required
                                value={formData.requirements}
                                onChange={handleInputChange}
                                className="mt-1 block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="List the required skills, qualifications, and experience..."
                            />
                        </div>
                        {/* Form Actions */}
                        <div className="flex justify-end pt-6 border-t border-gray-200">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    "Creating..."
                                ) : (
                                    <>
                                        <Send className="-ml-1 mr-3 h-5 w-5" />
                                        Create Job Posting
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}