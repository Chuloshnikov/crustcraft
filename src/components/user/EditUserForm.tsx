"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Save,
  AlertCircle,
  CheckCircle,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Trash2,
  Camera,
} from "lucide-react"
import Link from "next/link"
import EditableImage from "../EditableImage"
import { UserInfoProps } from "../../../types/types"
import { UserProfileType, validateUserProfile } from "@/lib/validation"



export function EditUserForm({ userInfo }: { userInfo: UserInfoProps }) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState("")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const [email, setEmail] = useState(userInfo.email || "");
  const [firstName, setFirstName] = useState(userInfo.firstName || "");
  const [lastName, setLastName] = useState(userInfo.lastName || "");
  const [avatarUrl, setAvatarUrl] = useState(userInfo.avatarUrl || "")
  const [dateOfBirth, setDateOfBirth] = useState(userInfo.dateOfBirth || "1990-05-15")
  const [address, setAddress] = useState(userInfo.address || "")
  const [phone, setPhone] = useState(userInfo.phone || "")
  const [admin, setAdmin] = useState(userInfo.admin || false);

  // Additional fields for address breakdown
  const [streetAddress, setStreetAddress] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [city, setCity] = useState("")


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("");

    try {
       // Combine address fields
      const fullAddress = `${streetAddress}, ${city} ${postalCode}`.trim()
      setAddress(fullAddress);

      const validationData: UserProfileType = {
      email,
      firstName,
      lastName,
      avatarUrl,
      phone,
      address: fullAddress,
      dateOfBirth
      };

      const validationErrors = validateUserProfile(validationData);
     
      if (validationErrors.length > 0) {
        alert(`Validation error:\n${validationErrors.join("\n")}`);
        return;
      };

      const payload = {
            _id: userInfo._id,
            ...validationData
        };

      const res = await fetch("/api/user-info", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
  
        if (!res.ok) {
            const errorData = await res.json();
            alert(`Error: ${errorData.error || errorData.message}`);
            return;
        }
  
      // Simulate successful save
      setIsSuccess(true)
      setTimeout(() => {
        // Redirect to users list
        window.location.href = "/profile"
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update user")
    } finally {
      setIsLoading(false)
    }
  }


  const handleDelete = async () => {
    setIsDeleting(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate successful delete
      setIsSuccess(true)
      setTimeout(() => {
        // Redirect to users list
        window.location.href = "/admin/users"
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete user")
    } finally {
      setIsDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  if (isSuccess) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{isDeleting ? "User Deleted!" : "User Updated!"}</h2>
            <p className="text-gray-600 mb-6">
              {isDeleting
                ? "The user has been successfully removed from the system."
                : "The user information has been successfully updated."}
            </p>
            <Link href="/profile">
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                Back to Users
              </Button>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/profile">
              <Button variant="outline" className="cursor-pointer border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent">
                <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to dashboard
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
                <User className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Edit User</h1>
            </div>
            <p className="text-gray-600">Update user information and permissions</p>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Avatar Section */}
              <div className="lg:col-span-1">
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Camera className="h-5 w-5 text-orange-600" />
                        Profile Picture
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                       <div className="space-y-3">
                          <div className="relative w-24 h-24">
                        <Avatar className="absolute w-full h-full border-4 border-white shadow-lg rounded-full overflow-hidden">
                          {avatarUrl && (<AvatarImage 
                            src={avatarUrl} 
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full"/>
                          )}
                          {!avatarUrl && 
                          (<AvatarFallback className="text-2xl font-bold bg-white text-orange-600 flex items-center justify-center w-full h-full rounded-full">
                            {firstName && firstName[0]}
                            {lastName && lastName[0]}
                          </AvatarFallback>
                          )}              
                        </Avatar>
                        <EditableImage setLink={setAvatarUrl}/>
                        </div>
                          <div>
                            <p className="text-sm text-gray-600">Click the camera icon to change avatar</p>
                          </div>
                       </div>
                    </CardContent>
                  </Card>
              </div>

              {/* Basic Information */}
              <div className="lg:col-span-2">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-orange-600" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Name Fields */}
                    <div className="space-y-2">
                      <Label htmlFor="fullName">
                        First and Last Name <span className="text-red-500">*</span>
                      </Label>
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="First name"
                          className="h-12"
                          required
                        />
                        <Input
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Last name"
                          className="h-12"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="user@example.com"
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (555) 123-4567"
                          className="pl-10 h-12"
                        />
                      </div>
                    </div>

                    {/* Date of Birth */}
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e.target.value)}
                          className="pl-10 h-12"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Address Information */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-orange-600" />
                  Address Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Street Address */}
                <div className="space-y-2">
                  <Label htmlFor="streetAddress">Street Address</Label>
                  <Input
                    id="streetAddress"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="123 Main Street"
                    className="h-12"
                  />
                </div>

                {/* Postal Code and City */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="12345"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="New York"
                      className="h-12"
                    />
                  </div>
                </div>
              </CardContent>
              <p
              className="p-6 text-sm"
              >{address}</p>
            </Card>

            {/* Permissions */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-orange-600" />
                  Permissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">Administrator Access</div>
                    <div className="text-sm text-gray-600">
                      Grant this user administrative privileges to manage the system
                    </div>
                  </div>
                  <Switch checked={admin} onCheckedChange={setAdmin} />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 md:flex-row justify-between">
              {/* Delete Button */}
              <div>
                {!showDeleteConfirm ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowDeleteConfirm(true)}
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete User
                  </Button>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Are you sure?</span>
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      {isDeleting ? "Deleting..." : "Yes, Delete"}
                    </Button>
                    <Button type="button" size="sm" variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              {/* Save/Cancel Buttons */}
              <div className="flex gap-4">
                <Link href="/profile">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-gray-200 text-gray-600 hover:bg-gray-50 bg-transparent"
                  >
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </div>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Update User
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
