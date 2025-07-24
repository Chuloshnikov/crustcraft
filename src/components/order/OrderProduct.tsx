"use client"

import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface OrderProductProps {
  product: {
    _id: string
    name: string
    image: string
    basePrice: number
    size?: {
      name: string
      price: number
    }
    extras?: Array<{
      name: string
      price: number
    }>
    quantity: number
  }
  price: number
}

const OrderProduct = ({ product, price }: OrderProductProps) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={80}
          height={80}
          className="w-20 h-20 object-cover rounded-lg"
        />
      </div>

      {/* Product Details */}
      <div className="flex-grow space-y-2">
        <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>

        {/* Size */}
        {product.size && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              Size: {product.size.name}
            </Badge>
            {product.size.price > 0 && <span className="text-sm text-gray-600">+${product.size.price.toFixed(2)}</span>}
          </div>
        )}

        {/* Extras */}
        {product.extras && product.extras.length > 0 && (
          <div className="space-y-1">
            <div className="text-sm text-gray-600">Extras:</div>
            <div className="flex flex-wrap gap-1">
              {product.extras.map((extra, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {extra.name} +${extra.price.toFixed(2)}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
      
      </div>

      {/* Price */}
      <div className="text-xl font-bold text-orange-600">${price.toFixed(2)}</div>
    </div>
  )
};

export default OrderProduct;
