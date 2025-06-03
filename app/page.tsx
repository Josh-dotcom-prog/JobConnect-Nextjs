import Link from "next/link"
import bgimage from "../assets/Landing Page.png"

export default function Home() {
  return (
    <div
      className="hero-section min-h-screen flex flex-col items-center justify-center text-white p-4"
      style={{
        backgroundImage:
          `linear-gradient(rgba(0, 0, 0, 0.69), rgba(0, 0, 0, 0.7)), url('${bgimage.src}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-8">
            <span className="text-white">JOB</span> <span className="text-yellow-400">CONNECT</span>
          </h1>

          <h2 className="text-4xl font-light mb-10 italic">" Bridge From Campus to Career"</h2>

          <div className="mb-20">
            <h3 className="text-3xl text-yellow-400 font-medium">Start Your Journey</h3>
          </div>

          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8 mb-16">
            <Link
              href="/auth"
              className="bg-blue-700 text-white font-bold py-4 px-12 rounded-full text-xl transition duration-300 hover:opacity-90"
            >
              JOB SEEKER
            </Link>
            <Link
              href="/auth"
              className="bg-yellow-400 text-white font-bold py-4 px-12 rounded-full text-xl transition duration-300 hover:opacity-90"
            >
              EMPLOYER
            </Link>
          </div>

          <div className="text-center text-lg">
            <span className="text-white">Already have an account? </span>
            <Link href="/login" className="text-yellow-400 font-semibold hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
