"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Send, CheckCircle } from "lucide-react"
import { contactFormSchema, FormErrors, ContactFormValues } from "@/lib/validation"
import { z } from "zod"

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [formData, setFormData] = useState<ContactFormValues>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    newsletter: false,
  })

  const validateField = <K extends keyof ContactFormValues>(
    fieldName: K,
    value: ContactFormValues[K]
  ) => {
    try {
      const result = contactFormSchema.safeParse({ ...formData, [fieldName]: value });
      
      if (!result.success) {
        const fieldError = result.error.errors.find(e => e.path[0] === fieldName);
        if (fieldError) {
          setErrors(prev => ({
            ...prev,
            [fieldName]: [fieldError.message]
          }));
        }
      } else {
        setErrors(prev => ({ ...prev, [fieldName]: undefined }));
      }
    } catch (error) {
      console.error("Validation error:", error);
    }
};

  const handleChange = <K extends keyof ContactFormValues>(
    field: K,
    value: ContactFormValues[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    if (field !== 'newsletter') {
      validateField(field, value)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    handleChange(id as keyof ContactFormValues, value)
  }

  const handleSelectChange = (value: string) => {
    handleChange('subject', value)
  }

  const handleCheckboxChange = (checked: boolean) => {
    handleChange('newsletter', checked)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    try {
      const result = contactFormSchema.safeParse(formData)
      if (!result.success) {
        const fieldErrors: FormErrors = {}
        result.error.errors.forEach(error => {
          const fieldName = error.path[0] as keyof FormErrors
          fieldErrors[fieldName] = fieldErrors[fieldName] || []
          fieldErrors[fieldName]!.push(error.message)
        })
        setErrors(fieldErrors)
        throw new Error("Form validation failed")
      }

      const response = await fetch('/api/contact-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result.data),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to submit form")
      }

      setIsSuccess(true)
    } catch (error) {
      console.error("Form submission error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <section className="bg-white p-8 lg:p-12 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Message Sent!</h3>
          <p className="text-gray-600 mb-6">Thank you for contacting us. We&apos;ll get back to you soon.</p>
          <Button
            onClick={() => setIsSuccess(false)}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
          >
            Send Another Message
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white p-8 lg:p-12">
      <div className="max-w-2xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Send us a Message</h2>
          <p className="text-gray-600">
            Fill out the form below. All fields marked with * are required.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter your first name"
                className="h-12"
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name"
                className="h-12"
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName[0]}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="h-12"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1234567890"
                className="h-12"
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone[0]}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Select 
              value={formData.subject} 
              onValueChange={handleSelectChange}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectItem value="catering">Catering Services</SelectItem>
                <SelectItem value="feedback">Feedback</SelectItem>
                <SelectItem value="complaint">Complaint</SelectItem>
                <SelectItem value="partnership">Partnership</SelectItem>
                <SelectItem value="careers">Careers</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.subject && (
              <p className="text-sm text-red-500">{errors.subject[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              Message <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell us how we can help you..."
              className="min-h-32 resize-none"
            />
            {errors.message && (
              <p className="text-sm text-red-500">{errors.message[0]}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="newsletter"
              checked={formData.newsletter}
              onCheckedChange={handleCheckboxChange}
            />
            <Label htmlFor="newsletter" className="text-sm text-gray-600">
              Subscribe to our newsletter
            </Label>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold text-lg"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Sending...</span>
              </div>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  )
}