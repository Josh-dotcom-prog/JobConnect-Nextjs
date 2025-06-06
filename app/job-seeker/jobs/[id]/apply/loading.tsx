export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-t-blue-600 border-b-blue-600 border-l-gray-200 border-r-gray-200 rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-gray-600">Applying for job...</p>
            </div>
        </div>
    )
}
