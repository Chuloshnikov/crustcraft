import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const MapPlaceholder = () => {
  return (
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
  )
}

export default MapPlaceholder;