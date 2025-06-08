import Link from "next/link"
import Image from "next/image"

interface JobCardProps {
  id: string
  title: string
  company: string
  location: string
  jobType: string
  salary: string
  description: string
  postedDate: string
  skills: string[]
  logoUrl: string
  isNew?: boolean
  isFeatured?: boolean
}

export default function JobCard({
  id,
  title,
  company,
  location,
  jobType,
  salary,
  description,
  postedDate,
  skills,
  logoUrl,
  isNew,
  isFeatured,
}: JobCardProps) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 rounded-md bg-gray-200 flex items-center justify-center">
              <Image
                className="h-10 w-10 rounded-md"
                src={logoUrl || "/placeholder.svg?height=40&width=40"}
                alt={`${company} logo`}
                width={40}
                height={40}
              />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-blue-600 truncate">{title}</h3>
              <div className="flex items-center">
                <p className="text-sm font-medium text-gray-900">{company}</p>
                <span className="mx-2 text-gray-500">•</span>
                <p className="text-sm text-gray-500">{location}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 mt-1">
              {jobType}
            </span>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        </div>
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="mt-2 flex justify-between items-center">
            <p className="text-sm font-medium text-gray-900">{salary}</p>
            <div className="flex space-x-2">
              <Link
                href={`/job-seeker/jobs/${id}`}
                className="inline-flex items-center px-3 py-1.5 border border-yellow-300 shadow-sm text-xs font-medium rounded text-yellow-400 bg-white hover:bg-yellow-50"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3 border-t border-gray-200">
        <div className="text-xs text-gray-500">Posted {postedDate}</div>
      </div>
    </div>
  )
}
