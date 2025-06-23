import React from 'react'
import { Button } from '../ui/button';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const LocationSection = () => {
     const locations = [
    {
      name: "Downtown Location",
      address: "123 Main Street, Downtown, City 12345",
      phone: "(555) 123-PIZZA",
      hours: "Mon-Thu: 11AM-10PM, Fri-Sat: 11AM-11PM, Sun: 12PM-9PM",
      isMain: true,
    },
    {
      name: "Westside Location",
      address: "456 Oak Avenue, Westside, City 12346",
      phone: "(555) 456-PIZZA",
      hours: "Mon-Thu: 11AM-10PM, Fri-Sat: 11AM-11PM, Sun: 12PM-9PM",
      isMain: false,
    },
    {
      name: "Northside Location",
      address: "789 Pine Boulevard, Northside, City 12347",
      phone: "(555) 789-PIZZA",
      hours: "Mon-Thu: 11AM-10PM, Fri-Sat: 11AM-11PM, Sun: 12PM-9PM",
      isMain: false,
    },
  ];

  return (
     <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Visit Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find us at one of our three convenient locations across the city. Each location offers the same great taste
            and warm atmosphere.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {locations.map((location, index) => (
            <Card
              key={index}
              className={`hover:shadow-xl transition-all duration-300 ${location.isMain ? "ring-2 ring-orange-200" : ""}`}
            >
              <CardContent className="p-6">
                {location.isMain && (
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                    Main Location
                  </div>
                )}

                <h3 className="font-bold text-xl mb-4">{location.name}</h3>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{location.address}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-orange-600 flex-shrink-0" />
                    <span className="text-gray-600">{location.phone}</span>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{location.hours}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                    Get Directions
                  </Button>
                  <Button variant="outline" className="w-full border-orange-200 text-orange-600 hover:bg-orange-50">
                    Call Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact CTA */}
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
      </div>
    </section>
  )
}

export default LocationSection;