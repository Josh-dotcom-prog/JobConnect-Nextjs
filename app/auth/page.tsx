"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, User, Mail, Lock, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface LoginFormData {
    emailOrUsername: string
    password: string
}

interface SignupFormData {
    email: string
    password: string
    confirmPassword: string
}

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const [loginData, setLoginData] = useState<LoginFormData>({
        emailOrUsername: "",
        password: "",
    })

    const [signupData, setSignupData] = useState<SignupFormData>({
        email: "",
        password: "",
        confirmPassword: "",
    })

    const handleLoginChange = (field: keyof LoginFormData, value: string) => {
        setLoginData((prev) => ({ ...prev, [field]: value }))
        setError("")
    }

    const handleSignupChange = (field: keyof SignupFormData, value: string) => {
        setSignupData((prev) => ({ ...prev, [field]: value }))
        setError("")
    }

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const validatePassword = (password: string) => {
        return password.length >= 8
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        // Basic validation
        if (!loginData.emailOrUsername || !loginData.password) {
            setError("Please fill in all fields")
            setIsLoading(false)
            return
        }

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // Mock authentication logic
            if (loginData.emailOrUsername === "admin@example.com" && loginData.password === "password123") {
                setSuccess("Login successful! Redirecting...")
                setTimeout(() => {
                    // In a real app, you would redirect based on user role
                    window.location.href = "/employer/profile" // Redirect to profile page
                }, 1000)
            } else {
                setError("Invalid credentials. Please try again.")
            }
        } catch (err) {
            setError("An error occurred. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        // Validation
        if (!signupData.email || !signupData.password || !signupData.confirmPassword) {
            setError("Please fill in all fields")
            setIsLoading(false)
            return
        }

        if (!validateEmail(signupData.email)) {
            setError("Please enter a valid email address")
            setIsLoading(false)
            return
        }

        if (!validatePassword(signupData.password)) {
            setError("Password must be at least 8 characters long")
            setIsLoading(false)
            return
        }

        if (signupData.password !== signupData.confirmPassword) {
            setError("Passwords do not match")
            setIsLoading(false)
            return
        }

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000))

            setSuccess("Account created successfully! Please check your email to verify your account.")

            // Reset form
            setSignupData({
                email: "",
                password: "",
                confirmPassword: "",
            })

            // Switch to login after successful signup
            setTimeout(() => {
                setIsLogin(true)
                setSuccess("")
            }, 3000)
        } catch (err) {
            setError("An error occurred. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const toggleMode = () => {
        setIsLogin(!isLogin)
        setError("")
        setSuccess("")
        setLoginData({ emailOrUsername: "", password: "" })
        setSignupData({ email: "", password: "", confirmPassword: "" })
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="text-center">
                    <Link href="/" className="text-6xl font-bold">
                        <p className="text-blue-800">JOB <span className="text-yellow-400"> CONNECT</span></p>
                    </Link>
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                        {isLogin ? "Sign in to your account" : "Create your account"}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button
                            type="button"
                            onClick={toggleMode}
                            className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                        >
                            {isLogin ? "Sign up" : "Sign in"}
                        </button>
                    </p>
                </div>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">{isLogin ? "Welcome back" : "Get started"}</CardTitle>
                        <CardDescription className="text-center">
                            {isLogin
                                ? "Enter your credentials to access your account"
                                : "Fill in your information to create an account"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {error && (
                            <Alert variant="destructive" className="mb-6">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {success && (
                            <Alert className="mb-6 border-green-200 bg-green-50">
                                <AlertDescription className="text-green-800">{success}</AlertDescription>
                            </Alert>
                        )}

                        {isLogin ? (
                            <form onSubmit={handleLogin} className="space-y-6">
                                <div>
                                    <Label htmlFor="emailOrUsername">Email or Username</Label>
                                    <div className="mt-1 relative">
                                        <Input
                                            id="emailOrUsername"
                                            type="text"
                                            value={loginData.emailOrUsername}
                                            onChange={(e) => handleLoginChange("emailOrUsername", e.target.value)}
                                            placeholder="Enter your email or username"
                                            className="pl-10"
                                            required
                                        />
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-4 w-4 text-gray-400" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="password">Password</Label>
                                    <div className="mt-1 relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            value={loginData.password}
                                            onChange={(e) => handleLoginChange("password", e.target.value)}
                                            placeholder="Enter your password"
                                            className="pl-10 pr-10"
                                            required
                                        />
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <Link href="/job-seeker/profile">
                                    <Button type="submit" className="w-full bg-yellow-400 text-white hover:bg-yellow-200 hover:text-black mb-2 mt-2" disabled={isLoading}>
                                        {isLoading ? "Signing in..." : "Sign in as Job Seeker"}
                                    </Button>
                                </Link>

                                <Link href="/employer/profile">
                                    <Button type="submit" className="w-full bg-blue-700 text-white hover:bg-blue-400" disabled={isLoading}>
                                        {isLoading ? "Signing in..." : "Sign in Employer"}
                                    </Button>
                                </Link>

                            </form>
                        ) : (
                            <form onSubmit={handleSignup} className="space-y-6">
                                <div>
                                    <Label htmlFor="email">Email Address</Label>
                                    <div className="mt-1 relative">
                                        <Input
                                            id="email"
                                            type="email"
                                            value={signupData.email}
                                            onChange={(e) => handleSignupChange("email", e.target.value)}
                                            placeholder="Enter your email address"
                                            className="pl-10"
                                            required
                                        />
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-4 w-4 text-gray-400" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="signup-password">Password</Label>
                                    <div className="mt-1 relative">
                                        <Input
                                            id="signup-password"
                                            type={showPassword ? "text" : "password"}
                                            value={signupData.password}
                                            onChange={(e) => handleSignupChange("password", e.target.value)}
                                            placeholder="Create a password (min. 8 characters)"
                                            className="pl-10 pr-10"
                                            required
                                        />
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="confirm-password">Confirm Password</Label>
                                    <div className="mt-1 relative">
                                        <Input
                                            id="confirm-password"
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={signupData.confirmPassword}
                                            onChange={(e) => handleSignupChange("confirmPassword", e.target.value)}
                                            placeholder="Confirm your password"
                                            className="pl-10 pr-10"
                                            required
                                        />
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="text-xs text-gray-500">
                                    By creating an account, you agree to our{" "}
                                    <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                                        Privacy Policy
                                    </Link>
                                    .
                                </div>

                                <Button type="submit" className="w-full bg-blue-700 text-white hover:bg-blue-500" disabled={isLoading}>
                                    {isLoading ? "Creating account..." : "Create account"}
                                </Button>
                            </form>
                        )}

                        {/* <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <Separator />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <Button variant="outline" type="button" disabled={isLoading}>
                                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                    Google
                                </Button>

                                <Button variant="outline" type="button" disabled={isLoading}>
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    Facebook
                                </Button>
                            </div>
                        </div> */}
                    </CardContent>
                </Card>

                <div className="mt-8 text-center text-sm text-gray-600">
                    <p>
                        Need help?{" "}
                        <Link href="/support" className="font-medium text-blue-600 hover:text-blue-500">
                            Contact Support
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
