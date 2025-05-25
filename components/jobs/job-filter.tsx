"use client"

import type React from "react"

import { useState } from "react"

interface JobFilterProps {
  onFilter: (filters: any) => void
}

export default function JobFilter({ onFilter }: JobFilterProps) {
  const [keyword, setKeyword] = useState("")
  const [location, setLocation] = useState("")
  const [jobType, setJobType] = useState("")
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [experience, setExperience] = useState("")
  const [salary, setSalary] = useState("")
  const [datePosted, setDatePosted] = useState("")
  const [industry, setIndustry] = useState("")
  const [education, setEducation] = useState("")
  const [companySize, setCompanySize] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const filters = {
      keyword,
      location,
      jobType,
      experience,
      salary,
      datePosted,
      industry,
      education,
      companySize,
    }

    onFilter(filters)
  }

  const clearFilters = () => {
    setKeyword("")
    setLocation("")
    setJobType("")
    setExperience("")
    setSalary("")
    setDatePosted("")
    setIndustry("")
    setEducation("")
    setCompanySize("")

    onFilter({})
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <form id="job-search-form" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="search-keyword" className="block text-sm font-medium text-gray-700">
              Keywords
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
              <input
                type="text"
                name="search-keyword"
                id="search-keyword"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md p-2 border"
                placeholder="Job title, skills, or company"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="search-location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-map-marker-alt text-gray-400"></i>
              </div>
              <input
                type="text"
                name="search-location"
                id="search-location"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md p-2 border"
                placeholder="City, state, or remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="search-type" className="block text-sm font-medium text-gray-700">
              Job Type
            </label>
            <select
              id="search-type"
              name="search-type"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
              <option value="remote">Remote</option>
            </select>
          </div>
        </div>

        {/* Advanced Filters (collapsible) */}
        <div className="mt-6">
          <button
            type="button"
            className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <i className="fas fa-sliders-h mr-2"></i> Advanced Filters
            <i
              className={`fas fa-chevron-down ml-1 text-xs transition-transform ${showAdvanced ? "rotate-180" : ""}`}
            ></i>
          </button>

          {showAdvanced && (
            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <label htmlFor="search-experience" className="block text-sm font-medium text-gray-700">
                  Experience Level
                </label>
                <select
                  id="search-experience"
                  name="search-experience"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                >
                  <option value="">Any Experience</option>
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                  <option value="executive">Executive</option>
                </select>
              </div>
              <div>
                <label htmlFor="search-salary" className="block text-sm font-medium text-gray-700">
                  Salary Range
                </label>
                <select
                  id="search-salary"
                  name="search-salary"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                >
                  <option value="">Any Salary</option>
                  <option value="0-30000">$0 - $30,000</option>
                  <option value="30000-60000">$30,000 - $60,000</option>
                  <option value="60000-90000">$60,000 - $90,000</option>
                  <option value="90000-120000">$90,000 - $120,000</option>
                  <option value="120000-">$120,000+</option>
                </select>
              </div>
              <div>
                <label htmlFor="search-posted" className="block text-sm font-medium text-gray-700">
                  Date Posted
                </label>
                <select
                  id="search-posted"
                  name="search-posted"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
                  value={datePosted}
                  onChange={(e) => setDatePosted(e.target.value)}
                >
                  <option value="">Any Time</option>
                  <option value="today">Today</option>
                  <option value="3days">Last 3 Days</option>
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                </select>
              </div>
              <div>
                <label htmlFor="search-industry" className="block text-sm font-medium text-gray-700">
                  Industry
                </label>
                <select
                  id="search-industry"
                  name="search-industry"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                >
                  <option value="">All Industries</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance</option>
                  <option value="education">Education</option>
                  <option value="retail">Retail</option>
                  <option value="manufacturing">Manufacturing</option>
                </select>
              </div>
              <div>
                <label htmlFor="search-education" className="block text-sm font-medium text-gray-700">
                  Education Level
                </label>
                <select
                  id="search-education"
                  name="search-education"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                >
                  <option value="">Any Education</option>
                  <option value="high-school">High School</option>
                  <option value="associate">Associate Degree</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="doctorate">Doctorate</option>
                </select>
              </div>
              <div>
                <label htmlFor="search-company-size" className="block text-sm font-medium text-gray-700">
                  Company Size
                </label>
                <select
                  id="search-company-size"
                  name="search-company-size"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                >
                  <option value="">Any Size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501-1000">501-1000 employees</option>
                  <option value="1001+">1001+ employees</option>
                </select>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <i className="fas fa-search mr-2"></i> Search Jobs
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
