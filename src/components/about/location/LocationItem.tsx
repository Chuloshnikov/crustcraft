import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, MapPin, Phone } from 'lucide-react';
import React from 'react'
import { LocationsPropTypes } from '../../../../types/types';

interface LocationProps {
    location: LocationsPropTypes;
}

const LocationItem = ({ location }: LocationProps) => {
  return (
    <Card
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
  )
}

export default LocationItem;