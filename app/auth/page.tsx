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

// API Service functions
const API_BASE_URL = 'http://127.0.0.1:8000'

const apiService = {
    async createUser(emailAddress: string, password: string) {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email_address: emailAddress,
                password: password
            })
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.detail || 'Failed to create user')
        }

        return response.json()
    },

    async loginUser(emailAddress: string, password: string) {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'PATCH',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email_address: emailAddress,
                password: password
            })
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.detail || 'Invalid credentials')
        }

        return response.json()
    },

    async getUserDetails(userId: number) {
        const response = await fetch(`${API_BASE_URL}/detail/${userId}`, {
            headers: {
                'accept': 'application/json'
            }
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.detail || 'Failed to fetch user details')
        }

        return response.json()
    }
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
            // Call the actual API
            const response = await apiService.loginUser(loginData.emailOrUsername, loginData.password)

            // Store user data in localStorage or context
            if (response.user_id) {
                localStorage.setItem('userId', response.user_id.toString())
                localStorage.setItem('userEmail', loginData.emailOrUsername)
            }

            setSuccess("Login successful! Redirecting...")

            // Get user details to determine role/redirect
            if (response.user_id) {
                try {
                    const userDetails = await apiService.getUserDetails(response.user_id)

                    setTimeout(() => {
                        // Redirect based on user type or default to profile
                        if (userDetails.user_type === 'employer') {
                            window.location.href = "/employer/dashboard"
                        } else {
                            window.location.href = "/job-seeker/profile"
                        }
                    }, 1000)
                } catch (detailError) {
                    // If we can't get details, redirect to generic profile
                    setTimeout(() => {
                        window.location.href = "/profile"
                    }, 1000)
                }
            }

        } catch (err: any) {
            setError(err.message || "An error occurred. Please try again.")
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
            // Call the actual API
            const response = await apiService.createUser(signupData.email, signupData.password)

            setSuccess("Account created successfully! You can now sign in with your credentials.")

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

        } catch (err: any) {
            setError(err.message || "An error occurred. Please try again.")
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

    const handleRoleBasedLogin = async (e: React.FormEvent, userType: 'job_seeker' | 'employer') => {
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
            // Call the login API
            const response = await apiService.loginUser(loginData.emailOrUsername, loginData.password)

            // Store user data
            if (response.user_id) {
                localStorage.setItem('userId', response.user_id.toString())
                localStorage.setItem('userEmail', loginData.emailOrUsername)
                localStorage.setItem('userType', userType)
            }

            setSuccess("Login successful! Redirecting...")

            setTimeout(() => {
                // Redirect based on selected user type
                if (userType === 'employer') {
                    window.location.href = "/employer/dashboard"
                } else {
                    window.location.href = "/job-seeker/profile"
                }
            }, 1000)

        } catch (err: any) {
            setError(err.message || "An error occurred. Please try again.")
        } finally {
            setIsLoading(false)
        }
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
                            <form className="space-y-6">
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

                                <Button
                                    type="button"
                                    onClick={(e) => handleRoleBasedLogin(e, 'job_seeker')}
                                    className="w-full bg-yellow-400 text-white hover:bg-yellow-200 hover:text-black mb-2 mt-2"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Signing in..." : "Sign in as Job Seeker"}
                                </Button>

                                <Button
                                    type="button"
                                    onClick={(e) => handleRoleBasedLogin(e, 'employer')}
                                    className="w-full bg-blue-700 text-white hover:bg-blue-400"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Signing in..." : "Sign in as Employer"}
                                </Button>
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
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}