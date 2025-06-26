import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation } from "lucide-react"

export function LocationMap() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Visit us at any of our three convenient locations. Each offers the same great food and warm atmosphere.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 overflow-hidden">
              <div className="bg-gray-200 h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">Interactive Map</p>
                  <p className="text-gray-400 text-sm">Google Maps integration would go here</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Location Quick Access */}
          <div className="space-y-4">
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Downtown Location</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-orange-600 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-600">123 Main Street, Downtown, City 12345</span>
                  </div>
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Westside Location</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-orange-600 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-600">456 Oak Avenue, Westside, City 12346</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Northside Location</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-orange-600 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-600">789 Pine Boulevard, Northside, City 12347</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
