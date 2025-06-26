import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Navigation } from 'lucide-react';
import React from 'react'

const LocationQuickAccess = () => {
  return (
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
  )
}

export default LocationQuickAccess;