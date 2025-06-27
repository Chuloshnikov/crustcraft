import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, Link } from 'lucide-react';
import React from 'react'

const NavigationButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              onClick={() => window.history.back()}
              variant="outline"
              className="border-orange-200 text-orange-600 hover:bg-orange-50 px-8"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </Button>
            <Link href="/">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8"
              >
                <Home className="h-5 w-5 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
  )
}

export default NavigationButtons;