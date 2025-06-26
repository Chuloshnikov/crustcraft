import { Card, CardContent } from '@/components/ui/card';
import { CONTACT_LOCATIONS } from '@/lib/constants';
import { MapPin } from 'lucide-react';

const Locations = () => {
  return (
     <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            <h3 className="font-bold text-xl mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-orange-600" />
              Our Locations
            </h3>
            <div className="space-y-4">
              {CONTACT_LOCATIONS.map((location, index) => (
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

  )
}

export default Locations;