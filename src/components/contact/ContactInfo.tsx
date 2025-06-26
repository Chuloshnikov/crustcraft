import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram } from "lucide-react";

export function ContactInfo() {
  const locations = [
    {
      name: "Downtown Location",
      address: "123 Main Street, Downtown, City 12345",
      phone: "(555) 123-PIZZA",
      isMain: true,
    },
    {
      name: "Westside Location",
      address: "456 Oak Avenue, Westside, City 12346",
      phone: "(555) 456-PIZZA",
      isMain: false,
    },
    {
      name: "Northside Location",
      address: "789 Pine Boulevard, Northside, City 12347",
      phone: "(555) 789-PIZZA",
      isMain: false,
    },
  ]

  const businessHours = [
    { day: "Monday - Thursday", hours: "11:00 AM - 10:00 PM" },
    { day: "Friday - Saturday", hours: "11:00 AM - 11:00 PM" },
    { day: "Sunday", hours: "12:00 PM - 9:00 PM" },
  ]

  return (
    <section className="bg-gradient-to-br from-orange-50 to-red-50 p-8 lg:p-12">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Information</h2>
          <p className="text-gray-600">Multiple ways to reach us. Choose the method that works best for you.</p>
        </div>

        {/* Quick Contact */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            <h3 className="font-bold text-xl mb-4">Quick Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Main Line</p>
                  <p className="text-gray-600">(555) 123-PIZZA</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-600">hello@crustcraft.com</p>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
              <Button variant="outline" className="w-full border-orange-200 text-orange-600 hover:bg-orange-50">
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Business Hours */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            <h3 className="font-bold text-xl mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-orange-600" />
              Business Hours
            </h3>
            <div className="space-y-3">
              {businessHours.map((schedule, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-medium">{schedule.day}</span>
                  <span className="text-gray-600">{schedule.hours}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-800">
                <strong>Holiday Hours:</strong> Please call ahead during holidays as hours may vary.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Locations */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            <h3 className="font-bold text-xl mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-orange-600" />
              Our Locations
            </h3>
            <div className="space-y-4">
              {locations.map((location, index) => (
                <div key={index} className="border-l-4 border-orange-500 pl-4">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{location.name}</h4>
                    {location.isMain && (
                      <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">Main</span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{location.address}</p>
                  <p className="text-gray-600 text-sm">{location.phone}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            <h3 className="font-bold text-xl mb-4">Follow Us</h3>
            <p className="text-gray-600 mb-4">
              Stay connected for the latest updates, special offers, and behind-the-scenes content.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="sm" className="border-orange-200 text-orange-600 hover:bg-orange-50">
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              <Button variant="outline" size="sm" className="border-orange-200 text-orange-600 hover:bg-orange-50">
                <Instagram className="h-4 w-4 mr-2" />
                Instagram
              </Button>
              <Button variant="outline" size="sm" className="border-orange-200 text-orange-600 hover:bg-orange-50">
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
