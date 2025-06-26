import { Button } from '@/components/ui/button';
import { Mail, Phone } from 'lucide-react';
import React from 'react'

const ContactCta = () => {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Have Questions?</h3>
          <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
            We&apos;d love to hear from you! Whether you have questions about our menu, want to book a private event, or just
            want to say hello, don&apos;t hesitate to reach out.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>hello@crustcraft.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>(555) 123-PIZZA</span>
            </div>
          </div>

          <div className="mt-6">
            <Button variant="secondary" size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
              Contact Us
            </Button>
          </div>
        </div>
  )
}

export default ContactCta;