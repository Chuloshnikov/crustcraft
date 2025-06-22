"use client"

import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Eye, EyeOff, Lock, Mail, Pizza, SeparatorHorizontal, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';

import { signIn } from 'next-auth/react';


const AuthForm = ({ formType }: {formType: string}) => {
   const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

   

    try {
      if (formType === "login") {
        if (!formData.email || !formData.password) {
        throw new Error("Please fill in all fields")
        }
        if (!formData.email.includes("@")) {
        throw new Error("Please enter a valid email address")
        }

        await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          callbackUrl: '/',
        });
      } else {
        if (!formData.name || !formData.email || !formData.password) {
        throw new Error("Please fill in all fields")
        }
        if (!formData.email.includes("@")) {
        throw new Error("Please enter a valid email address")
        }
        const res = await fetch('/api/register', {
          method: 'POST',
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        console.log(data);
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    console.log("Google login clicked")
    // Implement Google OAuth here
  }


  return (
    <div className="w-full max-w-md space-y-8">
      {/* Logo and Welcome */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl">
            <Pizza className="h-8 w-8 text-white" />
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            CRUSTCRAFT
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome!</h2>
        <p className="text-gray-600 mt-2">
            {formType === "login" ? "Sign in to your account to continue" : "Sign up to continue"}
        </p>
      </div>

      <Card className="shadow-xl border-0">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-2xl font-bold text-center">
            {formType === "login" ? "Login" : "Register"}
          </CardTitle>
            <CardDescription className="text-center">
                 {formType === "login" ? "Enter your credentials to access your account" : "Enter your credentials to create account"}
            </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <div>
                error
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            {formType !== "login" && (
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                        Name
                    </Label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                        id="name"
                        type="name"
                        placeholder="Enter your name"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10 h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                        required
                        />
                    </div>
                </div>
            )}
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 pr-10 h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className={`${formType === "login" ? "" : "hidden"} flex items-center justify-between`}>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                />
                <Label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </Label>
              </div>
              <Link href="/forgot-password" className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                Forgot password?
              </Link>
            </div>

            {/* Auth Button */}
            {formType === "login" ? (
                    <Button
                    type="submit"
                    disabled={isLoading}
                    className="cursor-pointer w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold text-lg"
                    >
                    {isLoading ? (
                        <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                        </div>
                    ) : (
                        "Sign In"
                    )}
                    </Button>
                    ) : (
                    <Button
                    type="submit"
                    disabled={isLoading}
                    className="cursor-pointer w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold text-lg"
                    >
                    {isLoading ? (
                        <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Signing up...</span>
                        </div>
                    ) : (
                        "Sign Up"
                    )}
                    </Button>
            )}
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <SeparatorHorizontal className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              className="w-full cursor-pointer w h-12 border-gray-200 hover:bg-gray-50"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
          </div>
          {formType === "login" ? (
            <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link href={"/register"} className="text-orange-600 hover:text-orange-700 font-semibold">
                    Sign up here
                </Link>
                </p>
          </div>
          ) : (
            <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                Existing account?{" "}
                <Link href={"/login"} className="text-orange-600 hover:text-orange-700 font-semibold">
                    Log in here
                </Link>
                </p>
          </div>
          )}
        </CardContent>
      </Card>
      {/* Additional Links */}
      <div className="text-center space-y-2">
        <p className="text-xs text-gray-500">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="text-orange-600 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-orange-600 hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AuthForm;