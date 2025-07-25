"use client"

import { MapPin } from "lucide-react"

interface OrderAddressDisplayProps {
  order: {
    phone: string
    address: string
  }
}

const OrderAddressDisplay = ({ order }: OrderAddressDisplayProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <MapPin className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
          <div className="font-base text-gray-600">{order.address}</div>
      </div>
    </div>
  )
}

export default OrderAddressDisplay;
