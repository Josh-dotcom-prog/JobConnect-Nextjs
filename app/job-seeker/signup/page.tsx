"use client"


import { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Users, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function JobSeekerAuth() {
    const [activeTab, setActiveTab] = useState('login');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        remember: false
    });
    const [signupData, setSignupData] = useState({
        fullName: '',
        email: '',
        dob: '',
        address: '',
        nationality: '',
        jobPreference: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        fullName: '',
        dob: '',
        address: '',
        nationality: '',
        jobPreference: '',
        confirmPassword: '',
        agreeTerms: ''
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateLoginForm = () => {
        const newErrors = {};

        if (!loginData.email.trim()) {
            newErrors.email = 'Email address is required';
        } else if (!emailRegex.test(loginData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!loginData.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (loginData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateSignupForm = () => {
        const newErrors = {};

        if (!signupData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!signupData.email.trim()) {
            newErrors.email = 'Email address is required';
        } else if (!emailRegex.test(signupData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!signupData.dob) {
            newErrors.dob = 'Date of birth is required';
        }

        if (!signupData.address.trim()) {
            newErrors.address = 'Address is required';
        }

        if (!signupData.nationality.trim()) {
            newErrors.nationality = 'Nationality is required';
        }

        if (!signupData.jobPreference.trim()) {
            newErrors.jobPreference = 'Job preference is required';
        }

        if (!signupData.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (signupData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (signupData.password !== signupData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!signupData.agreeTerms) {
            newErrors.agreeTerms = 'You must agree to the terms and conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        if (validateLoginForm()) {
            // Handle successful login - replace with actual authentication
            alert('Login successful! Redirecting to dashboard...');
            // In a real app: router.push('/dashboard')
        }
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        if (validateSignupForm()) {
            alert('Account created successfully! You can now log in.');
            setActiveTab('login');
            // Reset signup form
            setSignupData({
                fullName: '',
                email: '',
                dob: '',
                address: '',
                nationality: '',
                jobPreference: '',
                password: '',
                confirmPassword: '',
                agreeTerms: false
            });
        }
    };

    const handleInputChange = (form, field, value) => {
        if (form === 'login') {
            setLoginData(prev => ({ ...prev, [field]: value }));
        } else {
            setSignupData(prev => ({ ...prev, [field]: value }));
        }
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            {/* Navigation */}
            <nav className="bg-blue-700 text-white shadow-lg">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <User className="text-2xl" />
                        <span className="text-2xl font-bold">JOB <span className="text-yellow-300">SEEKER</span></span>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Page Tabs */}
                <div className="max-w-md mx-auto mb-8">
                    <div className="flex">
                        <button
                            onClick={() => setActiveTab('login')}
                            className={`w-1/2 py-3 font-medium text-center border-b-2 transition-colors ${activeTab === 'login'
                                ? 'border-blue-500 text-blue-500'
                                : 'border-gray-200 text-gray-500 hover:text-blue-400'
                                }`}
                        >
                            LOGIN
                        </button>
                        <button
                            onClick={() => setActiveTab('signup')}
                            className={`w-1/2 py-3 font-medium text-center border-b-2 transition-colors ${activeTab === 'signup'
                                ? 'border-blue-500 text-blue-500'
                                : 'border-gray-200 text-gray-500 hover:text-blue-400'
                                }`}
                        >
                            SIGNUP
                        </button>
                    </div>
                </div>

                {/* Login Form */}
                {activeTab === 'login' && (
                    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="bg-blue-700 text-white py-4 px-6">
                            <h2 className="text-xl font-semibold">Job Seeker Login</h2>
                        </div>
                        <div className="p-6">
                            <div>
                                <div className="mb-4">
                                    <label htmlFor="loginEmail" className="block text-gray-700 mb-2 font-medium">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            id="loginEmail"
                                            value={loginData.email}
                                            onChange={(e) => handleInputChange('login', 'email', e.target.value)}
                                            className={`w-full pl-10 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                    )}
                                </div>

                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <label htmlFor="loginPassword" className="block text-gray-700 font-medium">
                                            Password
                                        </label>
                                        <button type="button" className="text-sm text-blue-600 hover:underline">
                                            Forgot Password?
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="loginPassword"
                                            value={loginData.password}
                                            onChange={(e) => handleInputChange('login', 'password', e.target.value)}
                                            className={`w-full pl-10 pr-10 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${errors.password ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                                    )}
                                </div>

                                <div className="flex items-center mb-6">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        checked={loginData.remember}
                                        onChange={(e) => handleInputChange('login', 'remember', e.target.checked)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                                        Remember me
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                >
                                    Log In
                                </button>
                            </div>

                            <div className="mt-4 text-center text-gray-500 text-sm">
                                <p>
                                    Don't have an account?{' '}
                                    <button
                                        onClick={() => setActiveTab('signup')}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Sign up
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Signup Form */}
                {activeTab === 'signup' && (
                    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="bg-blue-700 text-white py-4 px-6">
                            <h2 className="text-xl font-semibold">Job Seeker Registration</h2>
                        </div>
                        <div className="p-6">
                            <div>
                                <div className="space-y-3 mb-4">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            value={signupData.fullName}
                                            onChange={(e) => handleInputChange('signup', 'fullName', e.target.value)}
                                            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${errors.fullName ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.fullName && (
                                            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                                        )}
                                    </div>

                                    <div>
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            value={signupData.email}
                                            onChange={(e) => handleInputChange('signup', 'email', e.target.value)}
                                            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <input
                                            type="date"
                                            placeholder="Date of Birth"
                                            value={signupData.dob}
                                            onChange={(e) => handleInputChange('signup', 'dob', e.target.value)}
                                            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${errors.dob ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.dob && (
                                            <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
                                        )}
                                    </div>

                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Address"
                                            value={signupData.address}
                                            onChange={(e) => handleInputChange('signup', 'address', e.target.value)}
                                            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${errors.address ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.address && (
                                            <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                                        )}
                                    </div>

                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Nationality"
                                            value={signupData.nationality}
                                            onChange={(e) => handleInputChange('signup', 'nationality', e.target.value)}
                                            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${errors.nationality ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.nationality && (
                                            <p className="text-red-500 text-xs mt-1">{errors.nationality}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <input
                                        type="text"
                                        placeholder="Job preference"
                                        value={signupData.jobPreference}
                                        onChange={(e) => handleInputChange('signup', 'jobPreference', e.target.value)}
                                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${errors.jobPreference ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.jobPreference && (
                                        <p className="text-red-500 text-xs mt-1">{errors.jobPreference}</p>
                                    )}
                                </div>

                                <div className="space-y-3 mb-4">
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Password"
                                            value={signupData.password}
                                            onChange={(e) => handleInputChange('signup', 'password', e.target.value)}
                                            className={`w-full px-4 py-2 pr-10 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${errors.password ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                            )}
                                        </button>
                                        {errors.password && (
                                            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                                        )}
                                    </div>

                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="Confirm Password"
                                            value={signupData.confirmPassword}
                                            onChange={(e) => handleInputChange('signup', 'confirmPassword', e.target.value)}
                                            className={`w-full px-4 py-2 pr-10 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                            )}
                                        </button>
                                        {errors.confirmPassword && (
                                            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <div className="flex items-start">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            checked={signupData.agreeTerms}
                                            onChange={(e) => handleInputChange('signup', 'agreeTerms', e.target.checked)}
                                            className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                            I agree to the{' '}
                                            <button type="button" className="text-blue-600 hover:underline">
                                                Terms of Service
                                            </button>{' '}
                                            and{' '}
                                            <button type="button" className="text-blue-600 hover:underline">
                                                Privacy Policy
                                            </button>
                                        </label>
                                    </div>
                                    {errors.agreeTerms && (
                                        <p className="text-red-500 text-xs mt-1">{errors.agreeTerms}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                >
                                    Create Account
                                </button>
                            </div>

                            <div className="mt-4 text-center text-gray-500 text-sm">
                                <p>
                                    Already registered?{' '}
                                    <button
                                        onClick={() => setActiveTab('login')}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Log in
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8 mt-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center">
                                <Users className="mr-2" />
                                JOB <span className="text-yellow-300 ml-1">CONNECT</span>
                            </h3>
                            <p className="text-gray-400">Bridge From Campus to Career</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><button className="hover:text-white transition-colors">Home</button></li>
                                <li><button className="hover:text-white transition-colors">Signup as Job seeker</button></li>
                                <li><button className="hover:text-white transition-colors">For Employers</button></li>
                                <li><button className="hover:text-white transition-colors">About Us</button></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Contact</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li className="flex items-center">
                                    <Mail className="mr-2 h-4 w-4" /> info@jobconnect.com
                                </li>
                                <li className="flex items-center">
                                    <Phone className="mr-2 h-4 w-4" /> +256 394 727 476
                                </li>
                                <li className="flex items-center">
                                    <MapPin className="mr-2 h-4 w-4" /> PortBell Road, Nakawa-Kampala(U)
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Connect</h3>
                            <div className="flex space-x-4">
                                <button className="text-gray-400 hover:text-white transition-colors">
                                    <Facebook className="h-6 w-6" />
                                </button>
                                <button className="text-gray-400 hover:text-white transition-colors">
                                    <Twitter className="h-6 w-6" />
                                </button>
                                <button className="text-gray-400 hover:text-white transition-colors">
                                    <Linkedin className="h-6 w-6" />
                                </button>
                                <button className="text-gray-400 hover:text-white transition-colors">
                                    <Instagram className="h-6 w-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
                        <p>&copy; 2025 JobConnect. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}