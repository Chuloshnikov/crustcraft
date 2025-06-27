import React from 'react'
import { Card, CardContent } from '../ui/card';
import { Clock, Phone } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

const ContactInfo = () => {
  return (
    <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
        <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
              <p className="text-orange-100 mb-6">
                Our team is here to help you find what you&apos;re looking for or answer any questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5" />
                  <span>(555) 123-PIZZA</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Open until 10PM</span>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/contact">
                  <Button variant="secondary" size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                    Contact Us
                  </Button>
                </Link>
              </div>
        </CardContent>
    </Card>
  )
}

export default ContactInfo;