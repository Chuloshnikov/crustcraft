import { Card, CardContent } from '@/components/ui/card';
import { CONTACT_BUSINESS_HOURS } from '@/lib/constants';
import { Clock } from 'lucide-react';

const BusinessHours = () => {
  return (
     <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            <h3 className="font-bold text-xl mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-orange-600" />
              Business Hours
            </h3>
            <div className="space-y-3">
              {CONTACT_BUSINESS_HOURS.map((schedule, index) => (
                <div key={index} className="flex justify-between items-center text-xs lg:text-base">
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
  )
}

export default BusinessHours;