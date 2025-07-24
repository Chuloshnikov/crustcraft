"use client"

import { MapPin, Globe } from "lucide-react"

interface OrderAddressDisplayProps {
  order: {
    phone: string
    streetAddress: string
    city: string
    postalCode: string
    country: string
  }
}

const OrderAddressDisplay = ({ order }: OrderAddressDisplayProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <MapPin className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
        <div className="space-y-1">
          <div className="font-semibold">{order.streetAddress}</div>
          <div className="text-gray-600">
            {order.city}, {order.postalCode}
          </div>
          <div className="text-gray-600 flex items-center gap-1">
            <Globe className="h-4 w-4" />
            {order.country}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderAddressDisplay;
