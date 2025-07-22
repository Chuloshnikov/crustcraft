"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, Minus } from "lucide-react"
import Image from "next/image"

interface CartProductProps {
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
  onRemove: (productId: string) => void
  price: number
}

const CartProduct = ({ product, onRemove, price }: CartProductProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
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
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Quantity:</span>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="w-8 h-8 p-0 bg-transparent"
              onClick={() => {
                // In real app, this would update quantity
                console.log("Decrease quantity")
              }}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="font-semibold min-w-[2rem] text-center">{product.quantity}</span>
            <Button
              size="sm"
              variant="outline"
              className="w-8 h-8 p-0 bg-transparent"
              onClick={() => {
                // In real app, this would update quantity
                console.log("Increase quantity")
              }}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Price and Remove */}
      <div className="flex  md:flex-col items-end gap-3">
        <div className="text-xl font-bold text-orange-600">${price.toFixed(2)}</div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onRemove(product.id)}
          className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}


export default CartProduct;
